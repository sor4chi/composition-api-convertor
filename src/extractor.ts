import * as vueCompilerSFC from '@vue/compiler-sfc';
import * as vueTemplateCompiler from 'vue-template-compiler';

export const extractFromVue2SFC = (source: string) => {
  const { template, script, styles } =
    vueTemplateCompiler.parseComponent(source);

  return {
    template: template ? template : undefined,
    script: script ? script : undefined,
    styles,
  };
};

export const extractFromVue3SFC = (
  source: string,
  isSetupExpression: boolean
) => {
  const { descriptor: sfc, errors: ParseErrors } = vueCompilerSFC.parse(source);

  if (ParseErrors.length) throw new Error(ParseErrors.join('\n'));

  return {
    template: sfc.template,
    script: isSetupExpression ? sfc.scriptSetup : sfc.script,
    styles: sfc.styles,
  };
};
