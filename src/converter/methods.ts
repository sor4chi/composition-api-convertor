import {
  Node,
  SourceFile,
  SyntaxKind,
  isMethodDeclaration,
  isPropertyAssignment,
  isFunctionExpression,
  isObjectLiteralExpression,
  MethodDeclaration,
  PropertyAssignment,
} from 'typescript';

import { getFirstNodeBySyntaxKind } from '../utils/ast';

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
  const async = node.modifiers?.some(
    (mod) => mod.kind === SyntaxKind.AsyncKeyword
  )
    ? 'async'
    : '';

  const name = node.name.getText(sourceFile);
  const type = node.type ? `:${node.type.getText(sourceFile)}` : '';
  const body = node.body?.getText(sourceFile) || '{}';
  const parameters = node.parameters
    .map((param) => param.getText(sourceFile))
    .join(',');
  const innerFunction = `${async}(${parameters})${type} =>${body}`;

  return {
    script: `const ${name} = ${innerFunction}`,
  };
};

const convertPropertyAssignment = (
  node: PropertyAssignment,
  sourceFile: SourceFile
): ConvertedExpression | null => {
  if (!isFunctionExpression(node.initializer)) return null;
  const name = node.name.getText(sourceFile);
  const functionNode = node.initializer;
  const async = functionNode.modifiers?.some(
    (mod) => mod.kind === SyntaxKind.AsyncKeyword
  )
    ? 'async'
    : '';

  const parameters = functionNode.parameters
    .map((param) => param.getText(sourceFile))
    .join(',');

  const type = functionNode.type
    ? `:${functionNode.type.getText(sourceFile)}`
    : '';

  const body = functionNode.body?.getText(sourceFile) || '{}';
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
