import { convertWatchExpression } from '../../converter/watch';
import { formatCode } from '../../utils/format';

import {
  watchExpressionSourceFile,
  watchExpressionNode,
  collectConvertedWatchExpression,
} from './watch.case';

describe('convertWatchExpression', () => {
  it('should convert watch expression', () => {
    const convertedWatchExpressions = convertWatchExpression(
      watchExpressionNode,
      watchExpressionSourceFile
    );

    expect(
      convertedWatchExpressions.map((item) => formatCode(item.script))
    ).toEqual(
      collectConvertedWatchExpression.map((item) => formatCode(item.script))
    );
  });
});
