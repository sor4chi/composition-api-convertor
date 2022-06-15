import { SyntaxKind, Node } from 'typescript';

import { ConvertedExpression } from '../../converter/types';
import { getFirstNodeBySyntaxKind } from '../../utils/ast';
import { convertTextToTypeScript } from '../../utils/source';

const primitiveDataExpression = `
export default {
  data() {
    return {
      foo: 'bar',
      hoge: 1,
      fuga: true,
    }
  }
}
`;

export const primitiveDataExpressionSourceFile = convertTextToTypeScript(
  primitiveDataExpression
);

export const primitiveDataExpressionNode = getFirstNodeBySyntaxKind(
  primitiveDataExpressionSourceFile,
  SyntaxKind.MethodDeclaration
) as Node;

export const collectConvertedPrimitiveDataExpression: ConvertedExpression[] = [
  {
    script: `const foo = ref('bar');`,
  },
  {
    script: `const hoge = ref(1);`,
  },
  {
    script: `const fuga = ref(true);`,
  },
];

const objectDataExpression = `
export default {
  data() {
    return {
      foo: {
        bar: 'baz',
        hoge: 1,
        fuga: true,
      },
      hoge: {
        fuga: {
          piyo: 'poyo',
        },
      },
    }
  }
}
`;

export const objectDataExpressionSourceFile =
  convertTextToTypeScript(objectDataExpression);

export const objectDataExpressionNode = getFirstNodeBySyntaxKind(
  objectDataExpressionSourceFile,
  SyntaxKind.MethodDeclaration
) as Node;

export const collectConvertedObjectDataExpression: ConvertedExpression[] = [
  {
    script: `const foo = reactive({
      bar: 'baz',
      hoge: 1,
      fuga: true,
    });`,
  },
  {
    script: `const hoge = reactive({
      fuga: {
        piyo: 'poyo',
      },
    });`,
  },
];
