import {
  Node,
  SourceFile,
  SyntaxKind,
  isMethodDeclaration,
  isPropertyAssignment,
  isObjectLiteralExpression,
  MethodDeclaration,
  PropertyAssignment,
} from 'typescript';

import { getFirstNodeBySyntaxKind } from '../utils/ast';

import {
  parseMethodDeclarationFunction,
  parsePropertyAssignmentFunction,
} from './function';
import { ConvertedExpression } from './types';

export const convertEachMethodExpression = (
  node: Node,
  sourceFile: SourceFile
): ConvertedExpression | null => {
  if (isMethodDeclaration(node)) {
    return convertMethodDeclaration(node, sourceFile);
  }
  if (isPropertyAssignment(node)) {
    return convertPropertyAssignment(node, sourceFile);
  }
  return null;
};

const convertMethodDeclaration = (
  node: MethodDeclaration,
  sourceFile: SourceFile
): ConvertedExpression => {
  const methodsProperty = parseMethodDeclarationFunction(node, sourceFile);
  if (!methodsProperty) return { script: '' };
  const { async, name, parameters, type, body } = methodsProperty;
  const innerFunction = `${async}(${parameters})${type} =>${body}`;

  return {
    script: `const ${name} = ${innerFunction}`,
  };
};

const convertPropertyAssignment = (
  node: PropertyAssignment,
  sourceFile: SourceFile
): ConvertedExpression | null => {
  const methodsProperty = parsePropertyAssignmentFunction(node, sourceFile);
  if (!methodsProperty) return null;
  const { async, name, parameters, type, body } = methodsProperty;

  const innerFunction = `${async}(${parameters})${type} =>${body}`;
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
