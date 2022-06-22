import { format } from 'prettier';
import { SFCBlock } from 'vue-template-compiler';

export const formatScript = (code: string) => {
  return format(code, {
    parser: 'typescript',
    semi: false,
    singleQuote: true,
    trailingComma: 'es5',
    bracketSpacing: true,
  });
};

export const formatVue = (code: string) => {
  return format(code, {
    parser: 'vue',
  });
};

export const convertMultipleDataFormats = (
  sources: (string | undefined)[]
): string => {
  return sources.join('\n----------\n');
};

const generateAttribute = (attrs: Record<string, string | boolean>) => {
  return Object.entries(attrs || {})
    .map(([key, value]) => {
      return value === true ? key : `${key}="${value}"`;
    })
    .join(' ');
};

export const wrapTemplateTag = (content: string, sfcBlock: SFCBlock) =>
  `<template ${generateAttribute(sfcBlock?.attrs)}>\n${content}</template>\n`;

export const wrapScriptTag = (content: string, sfcBlock: SFCBlock) =>
  `<script ${generateAttribute(sfcBlock?.attrs)}>\n${content}</script>\n`;

export const wrapStyleTag = (contents: string[], sfcBlocks: SFCBlock[]) =>
  `<style ${generateAttribute(sfcBlocks[0]?.attrs)}>\n${contents.join(
    '\n'
  )}</style>\n`;
