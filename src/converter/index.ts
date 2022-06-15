import { SFCScriptBlock } from '@vue/compiler-sfc';
import { SFCBlock } from 'vue-template-compiler';

import { convertTextToTypeScript } from '../utils/source';

import { convertDataExpression } from './data';
import { getExportObjNode } from './instance';

export const convertO2C = (script: SFCScriptBlock | SFCBlock) => {
  const { content } = script;
  const convertingSourceFile = convertTextToTypeScript(content);
  const exportObjNode = getExportObjNode(convertingSourceFile);

  if (!exportObjNode) {
    throw new Error('No export object found');
  }

  const dataProps = []; // Ref or Reactive expression
  const methodsProps = []; // Simple Arrow function
  const computedProps = []; // ComputedRef or WritableComputedRef
  const watchProps = []; // Watch expression not WatchEffect
  const lifecycleProps = []; // beforeMount, mounted, beforeUpdate, updated, beforeDestroy, destroyed ect.

  exportObjNode.properties.forEach((prop) => {
    switch (prop.name?.getText()) {
      case 'data':
        dataProps.push(...convertDataExpression(prop, convertingSourceFile));
        break;
      case 'methods':
        methodsProps.push(prop);
        break;
      case 'computed':
        computedProps.push(prop);
        break;
      case 'watch':
        watchProps.push(prop);
        break;
      case 'lifecycle':
        lifecycleProps.push(prop);
        break;
    }
  });
};
