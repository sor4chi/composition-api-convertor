import { forEachChild, Node, SyntaxKind } from 'typescript';

export const getFirstNodeBySyntaxKind = (node: Node, kind: SyntaxKind) => {
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

export const getAllNodesBySyntaxKind = (node: Node, kind: SyntaxKind) => {
  const nodes: Node[] = [];
  const findNode = (node: Node): Node | undefined => {
    return forEachChild(node, (child) => {
      if (child.kind === kind) {
        nodes.push(child);
      }

      return findNode(child);
    });
  };
  findNode(node);
  return nodes;
};
