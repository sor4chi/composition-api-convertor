export const convertMultipleDataFormats = (
  sources: (string | undefined)[]
): string => {
  return sources.join('\n----------\n');
};
