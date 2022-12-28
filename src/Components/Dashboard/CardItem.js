import React from "react";

const CardItem = ({ title, value, bgcolor, Icon, txtcolor, borderColor }) => {
  return (
    <div className="col-md-6">
      <div className={`dash__card ${borderColor}`}>
        <div>
          <p className={`font-weight-bold ml-3 ${txtcolor}`}>{value}</p>
          <span className="font-weight-bold ml-3 text-muted">{title}</span>
        </div>
        <div className={`dash__card_icon ${bgcolor}`}>
          <Icon />
        </div>
      </div>
    </div>
  );
};

export default CardItem;
