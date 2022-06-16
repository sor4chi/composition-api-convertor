import {
  Node,
  SourceFile,
  SyntaxKind,
  isMethodDeclaration,
  isObjectLiteralExpression,
} from 'typescript';

import { getFirstNodeBySyntaxKind } from '../utils/ast';

import { ConvertedExpression } from './types';

export const convertEachComputedExpression = (
  node: Node,
  sourceFile: SourceFile
): ConvertedExpression | null => {
  if (!isMethodDeclaration(node)) return null;
  const name = node.name.getText(sourceFile);
  const type = node.type ? `:${node.type.getText(sourceFile)}` : '';
  const body = node.body?.getText(sourceFile) || '{}';
  const parameters = node.parameters
    .map((param) => param.getText(sourceFile))
    .join(',');
  const innerFunction = `() => ${body}`;

  return {
    script: `const ${name} = computed(${innerFunction});`,
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
