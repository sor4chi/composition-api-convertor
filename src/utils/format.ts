import { format } from 'prettier';

export const formatCode = (code: string) => {
  return format(code, {
    parser: 'typescript',
    semi: false,
    singleQuote: true,
    trailingComma: 'es5',
    printWidth: 80,
    tabWidth: 2,
  });
};

export const convertMultipleDataFormats = (
  sources: (string | undefined)[]
): string => {
  return sources.join('\n----------\n');
};
