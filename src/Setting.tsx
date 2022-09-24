import { defaultStyleParent } from "./schema/image";
import { defaultStyleParagraph } from "./schema/paragraph";
import useStore from "./store";
import { SettingType } from "./types/schema";
import { convertJSStyleToCssStyle } from "./utils/style";
import { nameToString } from "./utils/text";

const Setting = () => {
  const { elements, selectedElementId, onUpdateElement, removeElement } =
    useStore((state) => state);

  const onChange = (value: any, name: any) => {
    onUpdateElement(value, name, selectedElementId);
  };

  const selectedElement = elements.find((v) => selectedElementId === v.id);

  const buildHTML = () => {
    const elementString = elements.map((element) => {
      if (element.type === "text") {
        const styles = element.renderJSStyle(
          element.props,
          defaultStyleParagraph
        );
        return element.render(element.props, convertJSStyleToCssStyle(styles));
      }
      if (element.type === "image") {
        const parentStyle = element.renderJSStyle(
          element.props,
          defaultStyleParent,
          true
        );
        const styles = element.renderJSStyle(element.props);
        return element.render(
          element.props,
          convertJSStyleToCssStyle(styles),
          convertJSStyleToCssStyle(parentStyle)
        );
      }
      return "";
    });

    return elementString.join("");
  };

  const exportUserInfo = () => {
    const body = buildHTML();
    const fileData = `<html><head></head><body>${body}</body></html>`;
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "index.html";
    link.href = url;
    link.click();
  };

  return (
    <div className="setting-container">
      <div className="p-12 flex justify-end">
        <button onClick={exportUserInfo} className="btn btn-primary">
          EXPORT HTML
        </button>
      </div>
      {selectedElement && (
        <div className="setting-box">
          {selectedElement.settings.map((setting) => {
            if (setting.type === SettingType.Input) {
              return (
                <div className="form-input">
                  <label>{nameToString[setting.name]}</label>
                  <input
                    className={"input"}
                    onChange={(e) => onChange(e.target.value, setting.name)}
                    value={selectedElement.props[setting.name].value || ""}
                  />
                </div>
              );
            }
            if (setting.type === SettingType.Slide) {
              return (
                <div className="form-input">
                  <label>{nameToString[setting.name]}</label>
                  <div className={"slide-container"}>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      className={"input-slide"}
                      onChange={(e) => onChange(e.target.value, setting.name)}
                      value={selectedElement.props[setting.name].value || ""}
                    />
                    <span className={"value-slide"}>
                      {selectedElement.props[setting.name].value}
                    </span>
                  </div>
                </div>
              );
            }

            if (setting.type === SettingType.Choose) {
              return (
                <div className="form-input">
                  <label>{nameToString[setting.name]}</label>
                  <div className={"options-group"}>
                    {setting.options &&
                      setting.options.map((v) => (
                        <button
                          className={`${
                            v === selectedElement.props[setting.name].value
                              ? "btn-primary"
                              : "btn-outline"
                          } btn  mr-8 mb-4`}
                          onClick={(e) => onChange(v, setting.name)}
                        >
                          {v}
                        </button>
                      ))}
                  </div>
                </div>
              );
            }
            return null;
          })}

          <div className="p-12 flex justify-end">
            <button
              onClick={() => removeElement(selectedElementId!)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Setting;
