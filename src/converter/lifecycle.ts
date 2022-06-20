import { Node, SourceFile, isMethodDeclaration } from 'typescript';

import { LIFECYCLE_CHOICES } from './constants';
import { parseMethodDeclarationFunction } from './function';
import { ConvertedExpression } from './types';

export const convertLifecycleExpression = (
  node: Node,
  sourceFile: SourceFile
): ConvertedExpression | null => {
  if (!node || !isMethodDeclaration(node)) return null;

  const { async, name, body } = parseMethodDeclarationFunction(
    node,
    sourceFile
  );

  const lifecycleKind = LIFECYCLE_CHOICES.find(
    (choice) => choice.name === name
  );

  if (!lifecycleKind) return null;
  if (lifecycleKind.convertingName === undefined) {
    return {
      script: `(${async} () => ${body})`,
    };
  }

  return {
    script: `${lifecycleKind.convertingName}(${async}() => ${body})`,
  };
};
