import { SyntaxKind, PropertyAssignment } from 'typescript';

import { ConvertedExpression } from '../../converter/types';
import { getFirstNodeBySyntaxKind } from '../../utils/ast';
import { convertTextToTypeScript } from '../../utils/source';

const computedExpression = `
export default {
  computed: {
    foo() {
      return 'bar';
    },
    aaa: function() { 
      return 'aaa';
    },
    withType(aaa: string): string {
      return aaa;
    },
    withType2: function(aaa: string): string {
      return aaa;
    },
    withGetter: {
      get() {
        return aaa;
      },
      set: function(value: string) {
        this.aaa = value;
      }
    },
    withGetter2: {
      get: function(aaa: string) {
        return aaa;
      },
      set(value: string) {
        this.aaa = value;
      }
    },
  }
}
`;

export const computedExpressionSourceFile = convertTextToTypeScript(
  computedExpression
);

export const computedExpressionNode = getFirstNodeBySyntaxKind(
  computedExpressionSourceFile,
  SyntaxKind.PropertyAssignment
) as PropertyAssignment;

export const collectConvertedComputedExpression: ConvertedExpression[] =
  [
    {
      script: ` 
    const foo = computed(() => {
      return 'bar';
    })
    `,
    },
    {
      script: `
    const aaa = computed(() => { 
      return 'aaa';
    })
    `,
    },
    {
      script: `
    const withType = computed<string>((aaa: string)=> {
      return aaa;
    })
    `,
    },
    {
      script: `
    const withType2 = computed<string>((aaa: string)=> {
      return aaa;
    })
    `,
    },
    {
      script: `
    const withGetter = computed({
      get() {
        return aaa;
      },
      set: function (value: string) {
        this.aaa = value;
      }
    })
    `,
    },
    {
      script: `
    const withGetter2 = computed({
      get: function (aaa: string) {
        return aaa;
      },
      set(value: string) {
        this.aaa = value;
      }
    })
    `,
    },
  ];
