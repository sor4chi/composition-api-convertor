import { SFCScriptBlock } from '@vue/compiler-sfc';
import { isPropertyAssignment } from 'typescript';
import { SFCBlock } from 'vue-template-compiler';

import { convertTextToTypeScript } from '../utils/source';

import { formatScript } from './../utils/format';
import { convertComputedExpression } from './computed';
import { LIFECYCLE_CHOICES } from './constants';
import { convertDataExpression } from './data';
import { getExportObjNode } from './instance';
import { convertLifecycleExpression } from './lifecycle';
import { convertMethodsExpression } from './methods';
import { ConvertedExpression } from './types';
import { convertWatchExpression } from './watch';

export const convertO2C = (script: SFCScriptBlock | SFCBlock) => {
  const { content } = script;
  const convertingSourceFile = convertTextToTypeScript(content);
  const exportObjNode = getExportObjNode(convertingSourceFile);

  if (!exportObjNode) {
    throw new Error('No export object found');
  }

  const dataProps: ConvertedExpression[] = []; // Ref or Reactive expression
  const computedProps: ConvertedExpression[] = []; // ComputedRef or WritableComputedRef
  const methodsProps: ConvertedExpression[] = []; // Simple Arrow function
  const watchProps: ConvertedExpression[] = []; // Watch expression not WatchEffect
  const lifecycleProps: ConvertedExpression[] = []; // beforeMount, mounted, beforeUpdate, updated, beforeDestroy, destroyed ect.

  const lifecyclePropsNames = LIFECYCLE_CHOICES.map((choice) => choice.name);

  exportObjNode.properties.forEach((prop) => {
    if (!isPropertyAssignment(prop)) return;
    const propName = prop.name.getText(convertingSourceFile);
    switch (propName) {
      case 'data':
        dataProps.push(...convertDataExpression(prop, convertingSourceFile));
        break;
      case 'computed':
        computedProps.push(
          ...convertComputedExpression(prop, convertingSourceFile)
        );
        break;
      case 'methods':
        methodsProps.push(
          ...convertMethodsExpression(prop, convertingSourceFile)
        );
        break;
      case 'watch':
        watchProps.push(...convertWatchExpression(prop, convertingSourceFile));
        break;
      default: {
        if (propName in lifecyclePropsNames) {
          const convertedLifecycleExpression = convertLifecycleExpression(
            prop,
            convertingSourceFile
          );
          if (convertedLifecycleExpression) {
            lifecycleProps.push(convertedLifecycleExpression);
          }
        }
      }
    }
  });

  const convertedScripts = [
    ...dataProps,
    ...computedProps,
    ...methodsProps,
    ...watchProps,
    ...lifecycleProps,
  ];
  const preFormattedScripts = convertedScripts
    .map((script) => script.script)
    .join(';');

  const joinedScript = formatScript(preFormattedScripts);

  return joinedScript
    .replaceAll(/;;/g, ';')
    .replaceAll(/this\.\$(\w+)/g, (_, p1) => `root.$${p1}`) // replace global method such like this.$xxx to root.$xxx
    .replaceAll(/this\.([\w-]+\([\w-]*\))/g, (_, p1) => `${p1}`) // replace method such like this.xxx() to xxx()
    .replaceAll(/this\.([\w-]+)/g, (_, p1) => `${p1}.value`); // replace reactive data such like this.xxx to xxx.value
};
