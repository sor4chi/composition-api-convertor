import { SyntaxKind, PropertyAssignment } from 'typescript';

import { ConvertedExpression } from '../../converter/types';
import { getFirstNodeBySyntaxKind } from '../../utils/ast';
import { convertTextToTypeScript } from '../../utils/source';

const getterOnlyComputedExpression = `
export default {
  computed: {
    foo() {
      return 'bar';
    },
    aaa: function() { 
      return 'aaa';
    }
    withType(aaa: string): string {
      return aaa;
    }
    withType2: function(aaa: string): string {
      return aaa;
    }
  }
}
`;

export const getterOnlyComputedExpressionSourceFile = convertTextToTypeScript(
  getterOnlyComputedExpression
);

export const getterOnlyComputedExpressionNode = getFirstNodeBySyntaxKind(
  getterOnlyComputedExpressionSourceFile,
  SyntaxKind.PropertyAssignment
) as PropertyAssignment;

export const collectConvertedGetterOnlyComputedExpression: ConvertedExpression[] =
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
  ];
