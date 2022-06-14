import { SourceFile, SyntaxKind, isObjectLiteralExpression } from 'typescript';

import { getNodeBySyntaxKind } from './utils/ast';

/**
 * Get the Node exporting the Vue instance
 */
export const getExportObjNode = (sourceFile: SourceFile) => {
  const exportAssignmentNode = getNodeBySyntaxKind(
    sourceFile,
    SyntaxKind.ExportDeclaration
  );

  const exportObjectNode = getNodeBySyntaxKind(
    sourceFile,
    SyntaxKind.ObjectLiteralExpression
  );

  if (
    !exportAssignmentNode ||
    !exportObjectNode ||
    !isObjectLiteralExpression(exportObjectNode)
  ) {
    return null;
  }

  return exportObjectNode;
};
