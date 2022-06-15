import { SyntaxKind, MethodDeclaration } from 'typescript';

import { ConvertedExpression } from '../../converter/types';
import { getAllNodesBySyntaxKind } from '../../utils/ast';
import { convertTextToTypeScript } from '../../utils/source';

const methodExpression = `
export default {
  methods: {
    foo() {
      return 'bar';
    },
    bar: function() {
      return 'foo';
    },
    async hoge() {
      return 'fuga';
    },
    fuga: async function() {
      return 'hoge';
    },
    piyo(hoge, fuga) {
      return hoge + fuga;
    },
    poyo(hoge: number, fuga: number): number {
      return hoge + fuga;
    }
  },
};
`;

export const methodExpressionSourceFile =
  convertTextToTypeScript(methodExpression);

export const methodExpressionNode = getAllNodesBySyntaxKind(
  methodExpressionSourceFile,
  SyntaxKind.MethodDeclaration
) as MethodDeclaration[];

export const collectConvertedMethodExpression: ConvertedExpression[] = [
  {
    script: `
  const foo = () => {
    return 'bar';
  }
  `,
  },
  {
    script: `
  const bar = () => {
    return 'foo';
  }
  `,
  },
  {
    script: `
  const hoge = async () => {
    return 'fuga';
  }
  `,
  },
  {
    script: `
  const fuga = async () => {
    return 'hoge';
  }
  `,
  },
  {
    script: `
  const piyo = (hoge, fuga) => {
    return hoge + fuga;
  }
  `,
  },
  {
    script: `
  const poyo = (hoge: number, fuga: number): number => {
    return hoge + fuga;
  }
  `,
  },
];
