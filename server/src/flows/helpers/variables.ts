export const getVariable = <T>(
  arg: string,
  variables: Array<{
    reference: string;
    value: unknown;
  }>,
): T | undefined => {
  return variables.find(({ reference }) => reference === arg)?.value as T;
};

export const deleteVariable = (
  arg: string,
  variables: Array<{
    reference: string;
    value: unknown;
  }>,
): Array<{
  reference: string;
  value: unknown;
}> => {
  return variables.filter(({ reference }) => reference !== arg);
};
