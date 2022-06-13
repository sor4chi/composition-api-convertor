import { SFCTemplateBlock, SFCScriptBlock, SFCStyleBlock } from '@vue/compiler-sfc';
import { SFCBlock } from 'vue-template-compiler';

export const outputVue2ExtractedContent = (
    template: SFCBlock | undefined,
    script: SFCBlock | undefined,
    styles: SFCBlock[]
) => {
    return {
        convertedTemplateContent: template?.content ?? "",
        convertedScriptContent: script?.content ?? "",
        convertedStylesContent: styles.map(style => style.content).join('\n') ?? ""
    }
}

export const outputVue3ExtractedContent = (
    template: SFCTemplateBlock | null,
    script: SFCScriptBlock | null,
    styles: SFCStyleBlock[]
) => {
    return {
        convertedTemplateContent: template?.content ?? "",
        convertedScriptContent: script?.content ?? "",
        convertedStylesContent: styles.map(style => style.content).join('\n') ?? ""
    }
}
