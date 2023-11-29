export const getVariable = (
  arg: string,
  variables: Array<{
    reference: string;
    value: unknown;
  }>,
): unknown | undefined => {
  return variables.find(({ reference }) => reference === arg)?.value;
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
