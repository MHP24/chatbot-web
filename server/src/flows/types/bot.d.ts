import { MessageType } from '../../common/types';

export type BotMessage = {
  type: MessageType;
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
  option?: Option[];
  input?: Input;
};

export type Option = {
  label: string;
  redirect: string;
};

export type Input = {
  input: string;
  regex: null | string; // ! Transform to regex when is necessary (use string to store db, json...)
  error_message: string;
  on_input_valid: OnInputValid;
};

export type OnInputValid = {
  redirect: string;
};

export type BotResponse = {
  data?: any;
  response: SystemMessage;
};
