import { SFCScriptBlock } from '@vue/compiler-sfc';
import { SFCBlock } from 'vue-template-compiler';

import { convertTextToTypeScript } from './utils/source';

export const convertO2C = (script: SFCScriptBlock | SFCBlock) => {
  const { content } = script;
  const convertingSourceFile = convertTextToTypeScript(content);
};
