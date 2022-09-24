export interface Setting {
  type: SettingType;
  name: string;
  value: string;
  options?: string[];
  suffix?: string;
}

export enum SettingType {
  Input,
  Select,
  Choose,
  Slide,
}

export interface Schema {
  id: string;
  settings: Setting[];
  type: string;
  props: {
    [key: string]: {
      value: string | number;
      isStyle: boolean;
      suffix?: string;
      parentStyle?: boolean;
    };
  };
  renderJSStyle: (
    props: {
      [key: string]: any;
    },
    defaultStyle?: {
      [key: string]: any;
    },
    isParent?: boolean
  ) => { [key: string]: string };
  render: (
    props: { [key: string]: any },
    styles: string,
    parentStyle?: string
  ) => string;
}
