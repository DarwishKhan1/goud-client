import React from "react";

import { useQuill } from "react-quilljs";
// or const { useQuill } = require('react-quilljs');

import "quill/dist/quill.snow.css"; // Add css for snow theme
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme

const RichEditor = ({ textHandler, value = null }) => {
  const { quill, quillRef } = useQuill();

  React.useEffect(() => {
    if (quill && value) {
      quill.clipboard.dangerouslyPasteHTML(value);
    }
    if (quill) {
      quill.on("text-change", () => {
        textHandler(quill.root.innerHTML);
        // console.log(quill.root.innerHTML);
      });
    }
  }, [quill]);

  return (
    <div>
      <div ref={quillRef} />
    </div>
  );
};

export default RichEditor;
