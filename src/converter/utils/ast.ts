import { SourceFile, forEachChild, Node, SyntaxKind } from 'typescript';

export const getNodeBySyntaxKind = (
  sourceFile: SourceFile,
  kind: SyntaxKind
) => {
  const findNode = (node: Node): Node | undefined => {
    return forEachChild(node, (child) => {
      if (child.kind === kind) {
        return child;
      }

      return findNode(child);
    });
  };
  return findNode(sourceFile);
};
