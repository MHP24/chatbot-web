export const getVariable = (
  arg: string,
  variables: Array<{
    reference: string;
    value: unknown;
  }>,
): unknown | undefined => {
  return variables.reverse().find(({ reference }) => reference === arg)?.value;
};
