import React from "react";

const TextArea = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group row">
      <label className="ml-3 font-weight-bold">{label}</label>
      <div className="col-sm-12">
        <textarea
          className="form-control"
          id={name}
          name={name}
          rows="6"
          {...rest}
        ></textarea>
        {error && <span className="error-message">{error}</span>}
      </div>
    </div>
  );
};

export default TextArea;
