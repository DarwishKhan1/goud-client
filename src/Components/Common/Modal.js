import React from "react";

const Modal = (props) => {
  return (
    <div
      className="modal fade"
      id={props.id ? props.id : "paymentmodal"}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="paymentmodalLabel"
      aria-hidden="true"
    >
      <div
        className={`modal-dialog ${
          props.modalsize ? props.modalsize : "modal-lg"
        }`}
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="paymentmodalLabel">
              {props.label}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">{props.children}</div>
          <div className="modal-footer">
            {!props.showCloseBtn && (
              <button
                type="button"
                className="btn primary-button"
                data-dismiss="modal"
              >
                Close
              </button>
            )}
            {props.buttonLabel && (
              <button
                type="button"
                className="btn primary-button"
                onClick={props.buttonClicked}
                data-dismiss="modal"
              >
                {props.buttonLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
