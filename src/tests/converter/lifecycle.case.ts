import { SyntaxKind, PropertyAssignment } from 'typescript';

import { ConvertedExpression } from '../../converter/types';
import { getFirstNodeBySyntaxKind } from '../../utils/ast';
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
  beforeUpdate: function async () {
    console.log('beforeUpdate');
  },
}
`;

export const lifecycleExpressionSourceFile =
  convertTextToTypeScript(lifecycleExpression);

export const lifecycleExpressionNode = getFirstNodeBySyntaxKind(
  lifecycleExpressionSourceFile,
  SyntaxKind.PropertyAssignment
) as PropertyAssignment;

export const collectConvertedWatchExpression: ConvertedExpression[] = [
  {
    script: `
    onMounted(() => {
      console.log('mounted');
    });
    `,
  },
  {
    script: `
    onBeforeDestroy(async () => {
      console.log('beforeDestroy');
    });
    `,
  },
  {
    script: `
    console.log('created');
    `,
  },
  {
    script: `
    console.log('beforeCreate');
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
