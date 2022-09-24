import ReactDOM from "react-dom";
import { X } from "react-feather";
import useStore from "../../store";
import { initialParagraph } from "../../schema/paragraph";
import { initialImage } from "../../schema/image";

interface DialogProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
}

const Dialog = (props: DialogProps): React.ReactElement | null => {
  const { isOpen, title, onClose } = props;
  const { elements, onAddElement, onSelectedElementId, onUpdateElement } =
    useStore((state) => state);

  const addNewParagraph = () => {
    onAddElement(initialParagraph());
    onClose();
  };

  const onAddNewImage = () => {
    onAddElement(initialImage());
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="dialog">
      <div className="dialog-overlay" onClick={onClose}></div>
      <div className="dialog-container">
        <div className="dialog-header">
          {title}
          <button className="btn btn-primary btn--icon" onClick={onClose}>
            <X />
          </button>
        </div>
        <div className="dialog-body">
          <div className="elements">
            <div className="element" onClick={addNewParagraph}>
              Paragraph
            </div>
            <div className="element" onClick={onAddNewImage}>
              Image
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DialogPortalWrapper = (props: DialogProps) => {
  if (typeof document === "undefined") {
    return <Dialog {...props} />;
    // during server evaluation
  } else {
    return ReactDOM.createPortal(
      <Dialog {...props} />,
      document.querySelector("body")!
    );
  }
};

export default DialogPortalWrapper;
