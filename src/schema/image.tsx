import { Schema, SettingType } from "../types/schema";
import { v4 as uuidv4 } from "uuid";
import useStore from "../store";

export const image: Omit<Schema, "id"> = {
  settings: [
    {
      type: SettingType.Input,
      name: "url",
      value:
        "https://images.unsplash.com/photo-1661961112134-fbce0fdf3d99?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1586&q=80",
    },
    {
      type: SettingType.Input,
      name: "width",
      value: "400",
    },
    {
      type: SettingType.Choose,
      name: "justifyContent",
      value: "center",
      options: ["flex-start", "center", "flex-end"],
    },
  ],
  type: "image",
  props: {
    url: {
      value:
        "https://images.unsplash.com/photo-1661961112134-fbce0fdf3d99?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1586&q=80",
      isStyle: false,
    },
    width: {
      value: "400",
      isStyle: true,
      suffix: "px",
    },
    justifyContent: {
      value: "center",
      isStyle: true,
      parentStyle: true,
    },
  },
  renderJSStyle: (props, defaultStyle, isParent = false) => {
    const keys = Object.keys(props);
    const styles = keys.reduce(
      (acc, currentValue) => {
        if (isParent) {
          if (
            props[currentValue] &&
            props[currentValue].isStyle &&
            props[currentValue].parentStyle
          ) {
            return {
              ...acc,
              [currentValue]: props[currentValue].suffix
                ? `${props[currentValue].value}${props[currentValue].suffix}`
                : props[currentValue].value,
            };
          }
        } else {
          if (props[currentValue] && props[currentValue].isStyle) {
            return {
              ...acc,
              [currentValue]: props[currentValue].suffix
                ? `${props[currentValue].value}${props[currentValue].suffix}`
                : props[currentValue].value,
            };
          }
        }

        return {
          ...acc,
        };
      },
      {
        ...defaultStyle,
      }
    );
    return styles;
  },
  render: (
    props: { [key: string]: any },
    styles: string,
    parentStyle?: string
  ) => {
    return `<div style="${parentStyle}">
      <img style="${styles}" src="${props.url.value.toString()}" />
    </div>`;
  },
};

export const initialImage = (): Schema => ({
  ...image,
  id: uuidv4(),
});

export const ImageElement = ({
  element,
}: {
  element: Schema;
  onChange: () => void;
}) => {
  const { elements, selectedElementId, onSelectedElementId, onUpdateElement } =
    useStore((state) => state);

  const onChangeText = (e: any) => {
    console.log(e.target.innerHTML);
  };

  const styles = element.renderJSStyle(element.props);
  const parentStyle = element.renderJSStyle(
    element.props,
    defaultStyleParent,
    true
  );

  return (
    <div
      onClick={() => onSelectedElementId(element.id)}
      style={parentStyle}
      className={`image ${
        selectedElementId === element.id ? "image-active" : ""
      }`}
    >
      <img style={styles} src={element.props.url.value as string} alt="" />
    </div>
  );
};

export const defaultStyleParent = {
  display: "flex",
};
