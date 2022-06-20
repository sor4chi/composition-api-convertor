import {
  Node,
  SourceFile,
  isMethodDeclaration,
  isPropertyAssignment,
  isObjectLiteralExpression,
  SyntaxKind,
} from 'typescript';

import { getFirstNodeBySyntaxKind } from '../utils/ast';

import {
  parseMethodDeclarationFunction,
  parsePropertyAssignmentFunction,
} from './function';
import { ConvertedExpression, ParsedFunction } from './types';

export const convertEachWatchExpression = (
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
  const { async, name, parameters, body } = methodsProperty;
  return {
    script: `watch(${name}, ${async}(${parameters}) => ${body})`,
  };
};

export const convertWatchExpression = (
  node: Node,
  sourceFile: SourceFile
): ConvertedExpression[] => {
  const watchNode = getFirstNodeBySyntaxKind(
    node,
    SyntaxKind.ObjectLiteralExpression
  );

  if (!watchNode || !isObjectLiteralExpression(watchNode)) return [];

  return watchNode.properties
    .map((prop) => convertEachWatchExpression(prop, sourceFile))
    .filter((item): item is NonNullable<typeof item> => item !== null);
};
