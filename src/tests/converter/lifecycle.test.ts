import { convertLifecycleExpression } from '../../converter/lifecycle';
import { formatCode } from '../../utils/format';

import {
  lifecycleExpressionSourceFile,
  lifecycleExpressionNodes,
  collectConvertedLifecycleExpression,
} from './lifecycle.case';

describe('convertLifecycleExpression', () => {
  it('should convert Lifecycle expression', () => {
    const convertedLifecycleExpressions = lifecycleExpressionNodes
      .map((node) =>
        convertLifecycleExpression(node, lifecycleExpressionSourceFile)
      )
      .filter((item): item is NonNullable<typeof item> => item !== null);

    expect(
      convertedLifecycleExpressions.map((item) => formatCode(item.script))
    ).toEqual(
      collectConvertedLifecycleExpression.map((item) => formatCode(item.script))
    );
  });
});
