import { SourceFile, SyntaxKind, isObjectLiteralExpression } from 'typescript';

import { getFirstNodeBySyntaxKind } from '../utils/ast';

/**
 * Get the Node exporting the Vue instance
 */
export const getExportObjNode = (sourceFile: SourceFile) => {
  const exportAssignmentNode = getFirstNodeBySyntaxKind(
    sourceFile,
    SyntaxKind.ExportDeclaration
  );

  const exportObjectNode = getFirstNodeBySyntaxKind(
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
