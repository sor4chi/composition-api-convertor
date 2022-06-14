import { convertDataExpression } from '../../src/converter/data';
import { ConvertedExpression } from '../../src/converter/types';
import { convertTextToTypeScript } from '../../src/converter/utils/source';

describe('convertDataExpression', () => {
  it('should convert data expression', () => {
    const dataExpression = `
      data() {
        return {
          foo: 'bar'
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
    ];

    expect(convertedDataExpression).toEqual(collectConvertedDataExpression);
  });
});
