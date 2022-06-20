import { SyntaxKind, PropertyAssignment } from 'typescript';

import { ConvertedExpression } from '../../converter/types';
import { getFirstNodeBySyntaxKind } from '../../utils/ast';
import { convertTextToTypeScript } from '../../utils/source';

const watchExpression = `
export default {
  watch: {
    foo() {
      console.log('foo');
    },
    aaa: function() {
      console.log('aaa');
    },
    withType(newVal: string) {
      console.log(newVal);
    },
  },
}
`;

export const watchExpressionSourceFile =
  convertTextToTypeScript(watchExpression);

export const watchExpressionNode = getFirstNodeBySyntaxKind(
  watchExpressionSourceFile,
  SyntaxKind.PropertyAssignment
) as PropertyAssignment;

export const collectConvertedWatchExpression: ConvertedExpression[] = [
  {
    script: `
    watch(foo, () => {
      console.log('foo');
    });
    `,
  },
  {
    script: `
    watch(aaa, () => {
      console.log('aaa');
    });
    `,
  },
  {
    script: `
    watch(withType, (newVal: string) => {
      console.log(newVal);
    });
    `,
  },
];
