import React from "react";

import { useQuill } from "react-quilljs";
// or const { useQuill } = require('react-quilljs');

import "quill/dist/quill.snow.css"; // Add css for snow theme
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme

const RichEditor = ({ descriptionHandler, longDescription = null }) => {
  const { quill, quillRef } = useQuill();

  React.useEffect(() => {
    if (quill && longDescription) {
      quill.clipboard.dangerouslyPasteHTML(longDescription);
    }
    if (quill) {
      quill.on("text-change", () => {
        descriptionHandler(quill.root.innerHTML);
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

// import React, { Component } from "react";
// import { Editor } from "react-draft-wysiwyg";
// import { EditorState, convertToRaw } from "draft-js";
// import draftjsToHtml from "draftjs-to-html";
// import htmlToDraft from "html-to-draftjs";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { ContentState } from "draft-js";

// class HtmlEditor extends Component {
//   state = { editorState: EditorState.createEmpty() };

//   componentDidMount() {
//     if (this.props.longDescription !== "") {
//       // this.setState({ editorState: htmlToDraft(this.props.longDescription) });
//       const blocksFromHtml = htmlToDraft(this.props.longDescription);
//       const { contentBlocks, entityMap } = blocksFromHtml;
//       const contentState = ContentState.createFromBlockArray(
//         contentBlocks,
//         entityMap
//       );
//       const editorState = EditorState.createWithContent(contentState);
//       this.setState({ editorState });
//     }
//     console.log(this.props.longDescription);
//   }

//   onEditorStateChange = (editorState) => {
//     this.props.descriptionHandler(
//       draftjsToHtml(convertToRaw(editorState.getCurrentContent()))
//     );
//     this.setState({ editorState });
//   };

//   render() {
//     const { editorState } = this.state;
//     return (
//       <>
//         <label className="font-weight-bold">
//           {this.props.label ? this.props.label : "Description"}
//         </label>
//         <div className="editor">
//           <Editor
//             editorState={editorState}
//             toolbarClassName="toolbarClassName"
//             wrapperClassName="wrapperClassName"
//             editorClassName="editorClassName"
//             onEditorStateChange={this.onEditorStateChange}
//           />
//         </div>
//       </>
//     );
//   }
// }

// export default HtmlEditor;
