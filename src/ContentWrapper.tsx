import { useState } from "react";
import Dialog from "./components/Dialog";
import { ImageElement } from "./schema/image";
import { ParagraphElement } from "./schema/paragraph";
import useStore from "./store";

const ContentWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { elements, onUpdateElement } = useStore((state) => state);

  return (
    <div className="content-wrapper">
      <Dialog
        isOpen={isOpen}
        title="Add New Element"
        onClose={() => setIsOpen(false)}
      />
      {elements.map((el) => {
        if (el.type === "text") {
          return <ParagraphElement element={el} onChange={onUpdateElement} />;
        }
        if (el.type === "image") {
          return <ImageElement element={el} onChange={onUpdateElement} />;
        }
        return null;
      })}
      <div className={"flex justify-around mt-20"}>
        <button className={"btn btn-primary"} onClick={() => setIsOpen(true)}>
          Add new element
        </button>
      </div>
    </div>
  );
};

export default ContentWrapper;
