import { createSourceFile, ScriptTarget } from 'typescript';

export const convertTextToTypeScript = (text: string) => {
  return createSourceFile('src.ts', text, ScriptTarget.Latest);
};
