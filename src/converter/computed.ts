import {
  Node,
  SourceFile,
  SyntaxKind,
  isMethodDeclaration,
  isPropertyAssignment,
  isObjectLiteralExpression,
} from 'typescript';

import { getFirstNodeBySyntaxKind } from '../utils/ast';

import {
  parseMethodDeclarationFunction,
  parsePropertyAssignmentFunction,
} from './function';
import { ConvertedExpression, ParsedFunction } from './types';

export const convertEachComputedExpression = (
  node: Node,
  sourceFile: SourceFile
): ConvertedExpression | null => {
  let methodsProperty: ParsedFunction | null = null;
  if (isMethodDeclaration(node)) {
    methodsProperty = parseMethodDeclarationFunction(node, sourceFile);
  }
  if (isPropertyAssignment(node)) {
    methodsProperty = parsePropertyAssignmentFunction(node, sourceFile);
  }
  if (!methodsProperty) return null;

  const { async, name, parameters, type, body } = methodsProperty;
  const innerFunction = `${async}(${parameters}) => ${body}`;
  const computedType = type ? `<${type}>` : '';

  return {
    script: `const ${name} = computed${computedType}(${innerFunction});`,
  };
};

export const convertComputedExpression = (
  node: Node,
  sourceFile: SourceFile
): ConvertedExpression[] => {
  const methodNode = getFirstNodeBySyntaxKind(
    node,
    SyntaxKind.ObjectLiteralExpression
  );

  if (!methodNode || !isObjectLiteralExpression(methodNode)) return [];

  return methodNode.properties
    .map((prop) => convertEachComputedExpression(prop, sourceFile))
    .filter((item): item is NonNullable<typeof item> => item !== null);
};
