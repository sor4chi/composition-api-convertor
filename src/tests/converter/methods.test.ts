import { convertMethodsExpression } from '../../converter/methods';
import { ConvertedExpression } from '../../converter/types';
import { formatCode } from '../../utils/format';
import { convertTextToTypeScript } from '../../utils/source';

describe('convertMethodsExpression', () => {
  it('should convert methods expression', () => {
    const methodsExpression = `
      methods: {
        foo() {
          return 'bar';
        },
        hoge: function() {
          return 1;
        },
        async fuga() {
          return true;
        },
        some: async function() {
          return true;
        },
        some2: function(a, b) {
          return true;
        },
        some3: function(a: string, b: number): boolean {
          return true;
        }
      }
    `;

    const sourceFile = convertTextToTypeScript(methodsExpression);

    const convertedMethodsExpression = convertMethodsExpression(
      sourceFile,
      sourceFile
    );

    const collectConvertedMethodsExpression: ConvertedExpression[] = [
      {
        script: `const foo = () => 'bar';`,
      },
      {
        script: `const hoge = () => 1;`,
      },
      {
        script: `const async = () => true;`,
      },
      {
        script: `const some = async () => true;`,
      },
      {
        script: `const some2 = (a, b) => true;`,
      },
      {
        script: `const some3 = (a: string, b: number): boolean => true;`,
      },
    ];

    expect(convertedMethodsExpression).toEqual(
      collectConvertedMethodsExpression.map((item) => ({
        script: formatCode(item.script),
      }))
    );
  });
});
