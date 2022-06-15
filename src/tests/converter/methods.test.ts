import { convertMethodsExpression } from '../../converter/methods';
import { formatCode } from '../../utils/format';

import {
  methodExpressionSourceFile,
  methodExpressionNode,
  collectConvertedMethodExpression,
} from './methods.case';

describe('convertMethodsExpression', () => {
  it('should convert methods expression', () => {
    const convertedMethodExpressions = convertMethodsExpression(
      methodExpressionNode,
      methodExpressionSourceFile
    );

    expect(
      convertedMethodExpressions.map((item) => formatCode(item.script))
    ).toEqual(
      collectConvertedMethodExpression.map((item) => formatCode(item.script))
    );
  });
});
