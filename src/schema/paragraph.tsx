import { Schema, SettingType } from "../types/schema";
import { v4 as uuidv4 } from "uuid";
import useStore from "../store";
import { convertJSStyleToCssStyle } from "../utils/style";
import { useRef } from "react";

export const defaultStyleParagraph = {
  lineHeight: 1,
};

export const paragraph: Omit<Schema, "id"> = {
  settings: [
    {
      type: SettingType.Slide,
      name: "fontSize",
      value: "14",
    },
    {
      type: SettingType.Input,
      name: "color",
      value: "#000000",
    },
    {
      type: SettingType.Choose,
      name: "theme",
      value: "p",
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "p"],
    },
    {
      type: SettingType.Choose,
      name: "textAlign",
      value: "center",
      options: ["left", "center", "right", "justify"],
    },
  ],
  type: "text",
  props: {
    content: {
      value: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
      isStyle: false,
    },
    fontSize: {
      value: "20",
      isStyle: true,
      suffix: "px",
    },
    textAlign: {
      value: "center",
      isStyle: true,
    },
    theme: {
      value: "p",
      isStyle: false,
    },
    color: {
      value: "#000000",
      isStyle: true,
    },
  },
  renderJSStyle: (props, defaultStyleParagraph) => {
    const keys = Object.keys(props);
    const styles = keys.reduce(
      (acc, currentValue) => {
        if (props[currentValue] && props[currentValue].isStyle) {
          return {
            ...acc,
            [currentValue]: props[currentValue].suffix
              ? `${props[currentValue].value}${props[currentValue].suffix}`
              : props[currentValue].value,
          };
        }
        return {
          ...acc,
        };
      },
      {
        ...defaultStyleParagraph,
      }
    );
    return styles;
  },
  render: (props: { [key: string]: any }, styles) => {
    const tag = props.theme.value as string;
    return `<${tag} style="${styles}">
    ${props.content.value.toString()}
    </${tag}>`;
  },
};

export const initialParagraph = () => ({
  ...paragraph,
  id: uuidv4(),
});

export const ParagraphElement = ({
  element,
}: {
  element: Schema;
  onChange: () => void;
}) => {
  const defaultValue = useRef(element.props?.content.value.toString());

  const { selectedElementId, onSelectedElementId, onUpdateElement } = useStore(
    (state) => state
  );

  const onChangeText = (e: any) => {
    onUpdateElement(e.target.innerHTML, "content", selectedElementId);
  };

  const styles = element.renderJSStyle(element.props, defaultStyleParagraph);

  return (
    <div
      onInput={onChangeText}
      contentEditable
      onClick={() => onSelectedElementId(element.id)}
      style={styles}
      className={`paragraph ${
        selectedElementId === element.id ? "paragraph-active" : ""
      }`}
      dangerouslySetInnerHTML={{ __html: defaultValue.current }}
    ></div>
  );
};
