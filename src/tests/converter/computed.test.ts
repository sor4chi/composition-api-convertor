import { convertComputedExpression } from '../../converter/computed';
import { formatCode } from '../../utils/format';

import {
  getterOnlyComputedExpressionNode,
  getterOnlyComputedExpressionSourceFile,
  collectConvertedGetterOnlyComputedExpression,
} from './computed.case';

describe('convertComputedExpression', () => {
  it('should convert Getter Only Computed expression', () => {
    const convertedExpression = convertComputedExpression(
      getterOnlyComputedExpressionNode,
      getterOnlyComputedExpressionSourceFile
    );

    expect(convertedExpression.map((item) => formatCode(item.script))).toEqual(
      collectConvertedGetterOnlyComputedExpression.map((item) =>
        formatCode(item.script)
      )
    );
  });
});
