import { convertComputedExpression } from '../../converter/computed';
import { formatScript } from '../../utils/format';

import {
  computedExpressionNode,
  computedExpressionSourceFile,
  collectConvertedComputedExpression,
} from './computed.case';

describe('convertComputedExpression', () => {
  it('should convert Computed expression', () => {
    const convertedExpression = convertComputedExpression(
      computedExpressionNode,
      computedExpressionSourceFile
    );

    expect(
      convertedExpression.map((item) => formatScript(item.script))
    ).toEqual(
      collectConvertedComputedExpression.map((item) =>
        formatScript(item.script)
      )
    );
  });
});
