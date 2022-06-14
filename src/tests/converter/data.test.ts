import { convertDataExpression } from '../../converter/data';
import { ConvertedExpression } from '../../converter/types';
import { formatCode } from '../../utils/format';
import { convertTextToTypeScript } from '../../utils/source';

describe('convertDataExpression', () => {
  it('should convert primitive data expression', () => {
    const dataExpression = `
      data() {
        return {
          foo: 'bar',
          hoge: 1,
          fuga: true,
        }
      }
    `;
    const sourceFile = convertTextToTypeScript(dataExpression);

    const convertedDataExpression = convertDataExpression(
      sourceFile,
      sourceFile
    );

    const collectConvertedDataExpression: ConvertedExpression[] = [
      { script: `const foo = ref('bar');` },
      { script: `const hoge = ref(1);` },
      { script: `const fuga = ref(true);` },
    ];

    expect(convertedDataExpression).toEqual(
      collectConvertedDataExpression.map((item) => ({
        script: formatCode(item.script),
      }))
    );
  });

  it('should convert object data expression', () => {
    const dataExpression = `
      data() {
        return {
          foo: {
            bar: 'baz',
            hoge: 1,
            fuga: true,
          },
        }
      }
    `;

    const sourceFile = convertTextToTypeScript(dataExpression);
    const convertedDataExpression = convertDataExpression(
      sourceFile,
      sourceFile
    );

    const collectConvertedDataExpression: ConvertedExpression[] = [
      {
        script: `const foo = reactive({ 
            bar: 'baz', 
            hoge: 1, 
            fuga: true,
          });`,
      },
    ];

    expect(convertedDataExpression).toEqual(
      collectConvertedDataExpression.map((item) => ({
        script: formatCode(item.script),
      }))
    );
  });
});
