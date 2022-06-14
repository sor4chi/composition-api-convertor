import { convertDataExpression } from '../../src/converter/data';
import { convertTextToTypeScript } from '../../src/converter/utils/source';

import type { ConvertedExpression } from '../../src/converter/types';

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

    expect(convertedDataExpression).toEqual(collectConvertedDataExpression);
  });
});
