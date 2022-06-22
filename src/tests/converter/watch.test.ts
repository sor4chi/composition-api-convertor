import { convertWatchExpression } from '../../converter/watch';
import { formatScript } from '../../utils/format';

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
      convertedWatchExpressions.map((item) => formatScript(item.script))
    ).toEqual(
      collectConvertedWatchExpression.map((item) => formatScript(item.script))
    );
  });
});
