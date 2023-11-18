export const getOption = (menu: unknown, option: string) => {
  return option.split(':').reduce((output, key) => {
    return output[key];
  }, menu);
};
