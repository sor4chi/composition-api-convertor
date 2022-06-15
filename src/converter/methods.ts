import {
  Node,
  SourceFile,
  SyntaxKind,
  isMethodDeclaration,
  isPropertyAssignment,
  isObjectLiteralExpression,
  isFunctionExpression,
  MethodDeclaration,
  PropertyAssignment,
} from 'typescript';

import { ConvertedExpression } from './types';

export const convertEachMethodExpression = (
  node: Node,
  sourceFile: SourceFile
): ConvertedExpression | undefined => {
  if (isMethodDeclaration(node)) {
    return convertMethodDeclaration(node, sourceFile);
  }
  if (isPropertyAssignment(node)) {
    return convertPropertyAssignment(node, sourceFile);
  }
  return undefined;
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
): ConvertedExpression | undefined => {
  if (!isFunctionExpression(node.initializer)) return;
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
  if (!isPropertyAssignment(node)) return [];
  if (!isObjectLiteralExpression(node.initializer)) return [];
  return node.initializer.properties
    .filter((prop) => isMethodDeclaration(prop))
    .map((prop) =>
      convertEachMethodExpression(prop as MethodDeclaration, sourceFile)
    )
    .filter((item): item is NonNullable<typeof item> => item !== null);
};
