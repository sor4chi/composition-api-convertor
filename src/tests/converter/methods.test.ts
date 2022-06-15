import { convertEachMethodExpression } from '../../converter/methods';
import { formatCode } from '../../utils/format';

import {
  methodExpressionSourceFile,
  methodExpressionNode,
  collectConvertedMethodExpression,
} from './methods.case';

describe('convertMethodsExpression', () => {
  it('should convert methods expression', () => {
    const convertedMethodExpressions = methodExpressionNode
      .map((node) =>
        convertEachMethodExpression(node, methodExpressionSourceFile)
      )
      .filter(
        (item): item is NonNullable<typeof item> =>
          item !== null
      );

    expect(
      convertedMethodExpressions.map((item) => formatCode(item.script))
    ).toEqual(
      collectConvertedMethodExpression.map((item) => formatCode(item.script))
    );
  });
});
