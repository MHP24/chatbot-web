export type BotMessage = {
  type: string;
  header?: string;
  body?: BodyElement[] | string;
  data?: Data;
  action?: string;
  parameters_required?: number;
};

export type BodyElement = {
  type: string;
  text?: string;
  image?: string;
  caption?: string;
};

export type Data = {
  options?: Option[];
  question?: Question;
};

export type Option = {
  label: string;
  redirect: string;
};

export type Question = {
  isOptional: boolean;
  question: string;
  regex: null | RegExp;
  error_message: string;
  on_input_valid: OnInputValid;
};

export type OnInputValid = {
  redirect: string;
};
