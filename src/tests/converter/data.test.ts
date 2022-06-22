import { convertDataExpression } from '../../converter/data';
import {
  primitiveDataExpressionSourceFile,
  primitiveDataExpressionNode,
  collectConvertedPrimitiveDataExpression,
  objectDataExpressionSourceFile,
  objectDataExpressionNode,
  collectConvertedObjectDataExpression,
} from '../../tests/converter/data.case';
import { formatScript } from '../../utils/format';

describe('convertDataExpression', () => {
  it('should convert primitive data expression', () => {
    const convertedDataExpression = convertDataExpression(
      primitiveDataExpressionNode,
      primitiveDataExpressionSourceFile
    );

    expect(
      convertedDataExpression.map((item) => ({
        script: formatScript(item.script),
      }))
    ).toEqual(
      collectConvertedPrimitiveDataExpression.map((item) => ({
        script: formatScript(item.script),
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
        script: formatScript(item.script),
      }))
    ).toEqual(
      collectConvertedObjectDataExpression.map((item) => ({
        script: formatScript(item.script),
      }))
    );
  });
});
