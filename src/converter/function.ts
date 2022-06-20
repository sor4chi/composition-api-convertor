import {
  SourceFile,
  PropertyAssignment,
  isFunctionExpression,
  SyntaxKind,
  MethodDeclaration,
} from 'typescript';

import { ParsedFunction } from './types';

export const parsePropertyAssignmentFunction = (
  node: PropertyAssignment,
  sourceFile: SourceFile
): ParsedFunction | null => {
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

  return {
    async,
    name,
    type,
    parameters,
    body,
  };
};

export const parseMethodDeclarationFunction = (
  node: MethodDeclaration,
  sourceFile: SourceFile
): ParsedFunction => {
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

  return {
    async,
    name,
    type,
    parameters,
    body,
  };
};
