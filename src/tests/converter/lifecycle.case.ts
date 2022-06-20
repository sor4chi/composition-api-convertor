import { SyntaxKind, MethodDeclaration, PropertyAssignment } from 'typescript';

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
  async beforeCreate () {
    console.log('beforeCreate');
  },
  updated: function () {
    console.log('updated');
  },
  beforeUpdate: async function () {
    console.log('beforeUpdate');
  }
}
`;

export const lifecycleExpressionSourceFile =
  convertTextToTypeScript(lifecycleExpression);

export const lifecycleExpressionNodes = [
  ...(getAllNodesBySyntaxKind(
    lifecycleExpressionSourceFile,
    SyntaxKind.MethodDeclaration
  ) as MethodDeclaration[]),
  ...(getAllNodesBySyntaxKind(
    lifecycleExpressionSourceFile,
    SyntaxKind.PropertyAssignment
  ) as PropertyAssignment[]),
];

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
    (async () => {
      console.log('beforeCreate');
    });
    `,
  },
  {
    script: `
    onUpdated(() => {
      console.log('updated');
    });
    `,
  },
  {
    script: `
    onBeforeUpdate(async () => {
      console.log('beforeUpdate');
    });
    `,
  },
];
