import { convertDataExpression } from '../../converter/data';
import {
  primitiveDataExpressionSourceFile,
  primitiveDataExpressionNode,
  collectConvertedPrimitiveDataExpression,
  objectDataExpressionSourceFile,
  objectDataExpressionNode,
  collectConvertedObjectDataExpression,
} from '../../tests/converter/data.case';
import { formatCode } from '../../utils/format';

describe('convertDataExpression', () => {
  it('should convert primitive data expression', () => {
    const convertedDataExpression = convertDataExpression(
      primitiveDataExpressionNode,
      primitiveDataExpressionSourceFile
    );

    expect(
      convertedDataExpression.map((item) => ({
        script: formatCode(item.script),
      }))
    ).toEqual(
      collectConvertedPrimitiveDataExpression.map((item) => ({
        script: formatCode(item.script),
      }))
    );
  });

  it('should convert object data expression', () => {
    const convertedDataExpression = convertDataExpression(
      objectDataExpressionNode,
      objectDataExpressionSourceFile
    );

    expect(
      convertedDataExpression.map((item) => ({
        script: formatCode(item.script),
      }))
    ).toEqual(
      collectConvertedObjectDataExpression.map((item) => ({
        script: formatCode(item.script),
      }))
    );
  });
});
