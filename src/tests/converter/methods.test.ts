import { convertMethodsExpression } from '../../converter/methods';
import { formatScript } from '../../utils/format';

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
      convertedMethodExpressions.map((item) => formatScript(item.script))
    ).toEqual(
      collectConvertedMethodExpression.map((item) => formatScript(item.script))
    );
  });
});
