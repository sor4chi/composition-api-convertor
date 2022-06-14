import {
  Node,
  SourceFile,
  SyntaxKind,
  isObjectLiteralExpression,
  isPropertyAssignment,
} from 'typescript';

import { getNodeBySyntaxKind } from '../utils/ast';
import { formatCode } from '../utils/format';

import { ConvertedExpression } from './types';

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

      if (kind === SyntaxKind.ObjectLiteralExpression) {
        insertingScript = `const ${name} = reactive(${text});`;
      } else {
        insertingScript = `const ${name} = ref(${text});`;
      }

      return {
        script: formatCode(insertingScript),
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);
};
