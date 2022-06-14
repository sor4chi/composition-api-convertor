import {
  Node,
  SourceFile,
  SyntaxKind,
  isMethodDeclaration,
  isPropertyAssignment,
  isObjectLiteralExpression,
  MethodDeclaration,
} from 'typescript';

import { ConvertedExpression } from './types';

export const convertEachMethodExpression = (
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
  const fn = `${async}(${parameters})${type} =>${body}`;

  return {
    script: `const ${name} = ${fn}`,
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
    );
};
