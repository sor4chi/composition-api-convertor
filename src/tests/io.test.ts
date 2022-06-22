import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

import { extractFromVue2SFC } from './../extractor';
import { outputVue2ExtractedContent } from './../output';
import {
  wrapTemplateTag,
  wrapScriptTag,
  wrapStyleTag,
  formatVue,
} from './../utils/format';

describe('successfully convert Vue2 OptionAPI to CompositionAPI', () => {
  it('should return collect converted CompositionAPI', () => {
    const testFilePath = resolve(__dirname, './src/Test.vue');
    const testAnswerFilePath = resolve(__dirname, './src/Test.ans.vue');
    const testFileContent = readFileSync(testFilePath, 'utf-8');
    const testAnswerFileContent = readFileSync(testAnswerFilePath, 'utf-8');
    const { template, script, styles } = extractFromVue2SFC(testFileContent);
    const convertedContents = outputVue2ExtractedContent(
      template,
      script,
      styles
    );

    if (!convertedContents) return;

    const convertedSFCContents: string[] = [];

    if (template) {
      convertedSFCContents.push(
        wrapTemplateTag(convertedContents.convertedTemplateContent, template)
      );
    }

    if (script) {
      convertedSFCContents.push(
        wrapScriptTag(convertedContents.convertedScriptContent, script)
      );
    }

    if (styles) {
      convertedSFCContents.push(
        wrapStyleTag(convertedContents.convertedStylesContent, styles)
      );
    }

    writeFileSync('./output.vue', convertedSFCContents.join('\n'));

    expect(formatVue(convertedSFCContents.join('\n'))).toEqual(
      formatVue(testAnswerFileContent)
    );
  });
});
