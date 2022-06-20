import {
  Node,
  SourceFile,
  isMethodDeclaration,
  isPropertyAssignment,
} from 'typescript';

import { LIFECYCLE_CHOICES } from './constants';
import {
  parseMethodDeclarationFunction,
  parsePropertyAssignmentFunction,
} from './function';
import { ConvertedExpression, ParsedFunction } from './types';

export const convertLifecycleExpression = (
  node: Node,
  sourceFile: SourceFile
): ConvertedExpression | null => {
  let lifecycleProperty: ParsedFunction | null = null;

  if (isMethodDeclaration(node)) {
    lifecycleProperty = parseMethodDeclarationFunction(node, sourceFile);
  }
  if (isPropertyAssignment(node)) {
    lifecycleProperty = parsePropertyAssignmentFunction(node, sourceFile);
  }

  if (!lifecycleProperty) return null;

  const { async, name, body } = lifecycleProperty;

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
