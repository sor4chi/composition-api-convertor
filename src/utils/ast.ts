import { forEachChild, Node, SyntaxKind } from 'typescript';

export const getNodeBySyntaxKind = (node: Node, kind: SyntaxKind) => {
  const findNode = (node: Node): Node | undefined => {
    return forEachChild(node, (child) => {
      if (child.kind === kind) {
        return child;
      }

      return findNode(child);
    });
  };
  return findNode(node);
};
