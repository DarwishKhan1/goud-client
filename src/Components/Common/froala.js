import React from "react";

import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

import FroalaEditor from "react-froala-wysiwyg";

class EditorFroala extends React.Component {
  constructor() {
    super();

    this.handleModelChange = this.handleModelChange.bind(this);

    this.state = {
      model: "Example text",
    };
  }

  handleModelChange = (model) => {
    this.setState({
      model: model,
    });
  };

  render() {
    return (
      <FroalaEditor
        model={this.state.model}
        onModelChange={this.handleModelChange}
      />
    );
  }
}

export default EditorFroala;
