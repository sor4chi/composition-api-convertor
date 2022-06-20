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

export const convertEachMethodExpression = (
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
  const methodType = type ? `:${type}` : '';
  const innerFunction = `${async}(${parameters})${methodType} =>${body}`;
  return {
    script: `const ${name} = ${innerFunction}`,
  };
};

export const convertMethodsExpression = (
  node: Node,
  sourceFile: SourceFile
): ConvertedExpression[] => {
  const methodNode = getFirstNodeBySyntaxKind(
    node,
    SyntaxKind.ObjectLiteralExpression
  );

  if (!methodNode || !isObjectLiteralExpression(methodNode)) return [];

  return methodNode.properties
    .map((prop) => convertEachMethodExpression(prop, sourceFile))
    .filter((item): item is NonNullable<typeof item> => item !== null);
};
