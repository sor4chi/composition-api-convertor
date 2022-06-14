import {
  Node,
  SourceFile,
  SyntaxKind,
  isObjectLiteralExpression,
  isPropertyAssignment,
} from 'typescript';

import { ConvertedExpression } from './types';
import { getNodeBySyntaxKind } from './utils/ast';

export const convertDataExpression = (
  node: Node,
  sourceFile: SourceFile
): ConvertedExpression[] => {
  const objNode = getNodeBySyntaxKind(node, SyntaxKind.ObjectLiteralExpression);

  if (!(objNode && isObjectLiteralExpression(objNode))) {
    return [];
  }
  return objNode.properties
    .map((prop) => {
      if (!isPropertyAssignment(prop)) {
        return;
      }
      const name = prop.name.getText(sourceFile);
      const text = prop.initializer.getText(sourceFile);
      const kind = prop.initializer.kind;
      let insertingScript = '';

      switch (kind) {
        case SyntaxKind.ObjectLiteralExpression:
          insertingScript = `const ${name} = reactive(${text});`;
          break;
        default:
          insertingScript = `const ${name} = ref(${text});`;
      }

      return {
        script: insertingScript,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);
};
