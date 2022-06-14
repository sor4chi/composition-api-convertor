import * as fs from 'fs';
import * as path from 'path';

import { extractFromVue2SFC, extractFromVue3SFC } from '../extractor';
import {
  outputVue2ExtractedContent,
  outputVue3ExtractedContent,
} from '../output';
import { convertMultipleDataFormats } from '../utils/format';

const srcPath = path.join(__dirname, './src');

describe('Extractor', () => {
  it('should extract the correct data in Vue2 OptionAPI', () => {
    const file = fs.readFileSync(
      path.join(srcPath, './Vue2OptionApi.vue'),
      'utf8'
    );
    const { template, script, styles } = extractFromVue2SFC(file);
    const answer = fs.readFileSync(
      path.join(srcPath, './Vue2OptionApi.answer.txt'),
      'utf8'
    );
    const outputs = outputVue2ExtractedContent(template, script, styles);
    expect(
      convertMultipleDataFormats([
        outputs.convertedTemplateContent,
        outputs.convertedScriptContent,
        outputs.convertedStylesContent,
      ])
    ).toBe(answer);
  });

  it('should extract the correct data in Vue3 OptionAPI no setup expression', () => {
    const file = fs.readFileSync(
      path.join(srcPath, './Vue3OptionApiNoSetup.vue'),
      'utf8'
    );
    const { template, script, styles } = extractFromVue3SFC(file, false);
    const answer = fs.readFileSync(
      path.join(srcPath, './Vue3OptionApiNoSetup.answer.txt'),
      'utf8'
    );
    const outputs = outputVue3ExtractedContent(template, script, styles);
    expect(
      convertMultipleDataFormats([
        outputs.convertedTemplateContent,
        outputs.convertedScriptContent,
        outputs.convertedStylesContent,
      ])
    ).toBe(answer);
  });

  it('should extract the correct data in Vue3 OptionAPI setup expression', () => {
    const file = fs.readFileSync(
      path.join(srcPath, './Vue3OptionApiSetup.vue'),
      'utf8'
    );
    const { template, script, styles } = extractFromVue3SFC(file, true);
    const answer = fs.readFileSync(
      path.join(srcPath, './Vue3OptionApiSetup.answer.txt'),
      'utf8'
    );
    const outputs = outputVue3ExtractedContent(template, script, styles);
    expect(
      convertMultipleDataFormats([
        outputs.convertedTemplateContent,
        outputs.convertedScriptContent,
        outputs.convertedStylesContent,
      ])
    ).toBe(answer);
  });
});
