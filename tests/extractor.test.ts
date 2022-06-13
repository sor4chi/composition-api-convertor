import * as fs from 'fs';
import * as path from 'path';

import { extractFromVue2SFC, extractFromVue3SFC } from './../src/extractor';
import { convertMultipleDataFormats } from './utils';

const srcPath = path.join(__dirname, './src');

describe('Extractor', () => {
  it('should extract the correct data in Vue2 OptionAPI', () => {
    const file = fs.readFileSync(
      path.join(srcPath, './Vue2OptionApi.vue'),
      'utf8'
    );
    const { template, script, style } = extractFromVue2SFC(file);
    const answer = fs.readFileSync(
      path.join(srcPath, './Vue2OptionApi.answer.txt'),
      'utf8'
    );
    const convertedScripts = [template, script, style];
    expect(convertMultipleDataFormats(convertedScripts)).toBe(answer);
  });

  it('should extract the correct data in Vue3 OptionAPI no setup expression', () => {
    const file = fs.readFileSync(
      path.join(srcPath, './Vue3OptionApiNoSetup.vue'),
      'utf8'
    );
    const { template, script, style } = extractFromVue3SFC(file, false);
    const answer = fs.readFileSync(
      path.join(srcPath, './Vue3OptionApiNoSetup.answer.txt'),
      'utf8'
    );
    const convertedScripts = [template, script, style];
    expect(convertMultipleDataFormats(convertedScripts)).toBe(answer);
  });

  it('should extract the correct data in Vue3 OptionAPI setup expression', () => {
    const file = fs.readFileSync(
      path.join(srcPath, './Vue3OptionApiSetup.vue'),
      'utf8'
    );
    const { template, script, style } = extractFromVue3SFC(file, true);
    const answer = fs.readFileSync(
      path.join(srcPath, './Vue3OptionApiSetup.answer.txt'),
      'utf8'
    );
    const convertedScripts = [template, script, style];
    expect(convertMultipleDataFormats(convertedScripts)).toBe(answer);
  });
});