import * as vueCompilerSFC from '@vue/compiler-sfc';
import * as vueTemplateCompiler from 'vue-template-compiler';

export const extractFromVue2SFC = (source: string) => {
  const { template, script, styles } =
    vueTemplateCompiler.parseComponent(source);

  return {
    template: template ? template.content : undefined,
    script: script ? script.content : undefined,
    style: styles.map((s) => s.content).join('\n'),
  };
};

export const extractFromVue3SFC = (
  source: string,
  isSetupExpression: boolean
) => {
  const { descriptor: sfc, errors: ParseErrors } = vueCompilerSFC.parse(source);

  if (ParseErrors.length) throw new Error(ParseErrors.join('\n'));

  return {
    template: sfc.template?.content,
    script: isSetupExpression ? sfc.scriptSetup?.content : sfc.script?.content,
    style: sfc.styles.map((s) => s.content).join('\n'),
  };
};
