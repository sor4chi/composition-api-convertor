import { SyntaxKind } from 'typescript';

import { ConvertedExpression } from '../../converter/types';
import { getAllNodesBySyntaxKind } from '../../utils/ast';
import { convertTextToTypeScript } from '../../utils/source';

const methodExpression = `
export default {
  methods: {
    foo() {
      return 'bar';
    },
    async hoge() {
      return 'fuga';
    },
    piyo(hoge, fuga) {
      return hoge + fuga;
    },
    poyo(hoge: number, fuga: number): number {
      return hoge + fuga;
    },
    bar: function() {
      return 'foo';
    },
    fuga: async function() {
      return 'hoge';
    },
    pao: function(hoge: number, fuga: number): number {
      return hoge + fuga;
    }
  },
};
`;

export const methodExpressionSourceFile =
  convertTextToTypeScript(methodExpression);

export const methodExpressionNodes = [
  ...getAllNodesBySyntaxKind(
    methodExpressionSourceFile,
    SyntaxKind.MethodDeclaration
  ),
  ...getAllNodesBySyntaxKind(
    methodExpressionSourceFile,
    SyntaxKind.PropertyAssignment
  ),
];

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
  const hoge = async () => {
    return 'fuga';
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
  {
    script: `
  const bar = () => {
    return 'foo';
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
  const pao = (hoge: number, fuga: number): number => {
    return hoge + fuga;
  }
  `,
  },
];
