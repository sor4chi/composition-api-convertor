import {
  SourceFile,
  SyntaxKind,
  isExportAssignment,
  isObjectLiteralExpression,
} from 'typescript';

import { getFirstNodeBySyntaxKind } from '../utils/ast';

/** Get the Node exporting the Vue instance */
export const getExportObjNode = (sourceFile: SourceFile) => {
  const exportAssignmentNode = getFirstNodeBySyntaxKind(
    sourceFile,
    SyntaxKind.ExportAssignment
  );

  if (!exportAssignmentNode || !isExportAssignment(exportAssignmentNode))
    return null;

  const exportObjNode = getFirstNodeBySyntaxKind(
    exportAssignmentNode,
    SyntaxKind.ObjectLiteralExpression
  );

  if (!exportObjNode || !isObjectLiteralExpression(exportObjNode)) return null;

  return exportObjNode;
};
