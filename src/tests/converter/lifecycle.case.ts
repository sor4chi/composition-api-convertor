import { SyntaxKind, MethodDeclaration } from 'typescript';

import { ConvertedExpression } from '../../converter/types';
import { getAllNodesBySyntaxKind } from '../../utils/ast';
import { convertTextToTypeScript } from '../../utils/source';

const lifecycleExpression = `
export default {
  mounted() {
    console.log('mounted');
  },
  async beforeDestroy() {
    console.log('beforeDestroy');
  },
  created () {
    console.log('created');
  },
  beforeCreate () {
    console.log('beforeCreate');
  },
}
`;

export const lifecycleExpressionSourceFile =
  convertTextToTypeScript(lifecycleExpression);

export const lifecycleExpressionNodes = getAllNodesBySyntaxKind(
  lifecycleExpressionSourceFile,
  SyntaxKind.MethodDeclaration
) as MethodDeclaration[]

export const collectConvertedLifecycleExpression: ConvertedExpression[] = [
  {
    script: `
    onMounted(() => {
      console.log('mounted');
    });
    `,
  },
  {
    script: `
    onBeforeUnmount(async () => {
      console.log('beforeDestroy');
    });
    `,
  },
  {
    script: `
    (() => {
      console.log('created');
    });
    `,
  },
  {
    script: `
    (() => {
      console.log('beforeCreate');
    });
    `,
  },
];
