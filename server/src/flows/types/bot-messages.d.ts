export type BotMessageType =
  | 'input'
  | 'option'
  | 'action'
  | 'close'
  | 'transfer';

export type Image = {
  type: 'image';
  image: string;
};
export type Text = {
  type: 'text';
  text: string;
};
export type Video = {
  type: 'video';
  video: string;
};
export type Audio = {
  type: 'audio';
  audio: string;
};

export type BotBodyMessage = Image | Text | Video | Audio;

export type BotMenu<T> = {
  type: BotMessageType;
  header: string;
  body: Array<BotBodyMessage>;
  data: T;
};

export type Menu = Option | Input | Action | Close;

// * Data types using generic

export type Option = {
  option: Array<{
    label: string;
    redirect: string;
  }>;
};

export type Input = {
  input: {
    regex: null | string;
    errorMessage: string;
    reference: string;
    onValid: {
      redirect: string;
    };
  };
};

export type Action = {
  action: {
    name: string;
    options: Array<Option>;
  };
};

export type Close = {
  close: {
    detail: string;
  };
};

//export type Transfer = {};
