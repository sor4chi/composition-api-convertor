import {
  Node,
  SourceFile,
  SyntaxKind,
  PropertyAssignment,
  isMethodDeclaration,
  isPropertyAssignment,
  isObjectLiteralExpression,
} from 'typescript';

import { getFirstNodeBySyntaxKind } from '../utils/ast';

import {
  parseMethodDeclarationFunction,
  parsePropertyAssignmentFunction,
} from './function';
import { ConvertedExpression, ParsedFunction } from './types';

export const convertEachComputedExpression = (
  node: Node,
  sourceFile: SourceFile
): ConvertedExpression | null => {
  let isWithGetterSetter = false;
  let methodsProperty: ParsedFunction | null = null;
  if (isMethodDeclaration(node)) {
    methodsProperty = parseMethodDeclarationFunction(node, sourceFile);
  }
  if (isPropertyAssignment(node)) {
    methodsProperty = parsePropertyAssignmentFunction(node, sourceFile);
    if (!methodsProperty) {
      methodsProperty = parseGetterSetterFunction(node, sourceFile);
      if (methodsProperty) isWithGetterSetter = true;
    }
  }
  if (!methodsProperty) return null;

  const { async, name, parameters, type, body } = methodsProperty;
  let innerFunction = '';
  if (isWithGetterSetter) {
    innerFunction = `{${body}}`;
  } else {
    innerFunction = `${async}(${parameters}) => ${body}`;
  }
  const computedType = type ? `<${type}>` : '';

  return {
    script: `const ${name} = computed${computedType}(${innerFunction});`,
  };
};

const parseGetterSetterFunction = (
  node: PropertyAssignment,
  sourceFile: SourceFile
): ParsedFunction | null => {
  const name = node.name.getText(sourceFile);
  const objectLiteral = node.initializer;
  if (!isObjectLiteralExpression(objectLiteral)) return null;
  const get = objectLiteral.properties.find(
    (prop) => prop.name?.getText(sourceFile) === 'get'
  );
  const set = objectLiteral.properties.find(
    (prop) => prop.name?.getText(sourceFile) === 'set'
  );
  if (!get || !set) return null;
  return {
    name,
    async: '',
    type: '',
    parameters: '',
    body: `${get.getText(sourceFile)},${set.getText(sourceFile)}`,
  };
};

export const convertComputedExpression = (
  node: Node,
  sourceFile: SourceFile
): ConvertedExpression[] => {
  const methodNode = getFirstNodeBySyntaxKind(
    node,
    SyntaxKind.ObjectLiteralExpression
  );

  if (!methodNode || !isObjectLiteralExpression(methodNode)) return [];

  return methodNode.properties
    .map((prop) => convertEachComputedExpression(prop, sourceFile))
    .filter((item): item is NonNullable<typeof item> => item !== null);
};
