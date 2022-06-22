import {
  SFCTemplateBlock,
  SFCScriptBlock,
  SFCStyleBlock,
} from '@vue/compiler-sfc';
import { SFCBlock } from 'vue-template-compiler';

import { convertO2C } from './converter';

export const outputVue2ExtractedContent = (
  template: SFCBlock | undefined,
  script: SFCBlock | undefined,
  styles: SFCBlock[]
) => {
  if (!script) return;
  const convertedScript = convertO2C(script);
  return {
    convertedTemplateContent: template?.content || '',
    convertedScriptContent: convertedScript,
    convertedStylesContent: styles.map((style) => style.content),
  };
};

export const outputVue3ExtractedContent = (
  template: SFCTemplateBlock | null,
  script: SFCScriptBlock | null,
  styles: SFCStyleBlock[]
) => {
  return {
    convertedTemplateContent: template?.content ?? '',
    convertedScriptContent: script?.content ?? '',
    convertedStylesContent:
      styles.map((style) => style.content).join('\n') ?? '',
  };
};
