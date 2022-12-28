import React from "react";

const Select = ({
  name,
  searchKey = "docID",
  searchValue,
  label,
  data,
  error,
  ...rest
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="col-form-label font-weight-bold">
        {label}
      </label>

      <select name={name} {...rest} className="form-control">
        <option value="">Search {label}</option>
        {data.map((e, i) => (
          <option key={i} value={e[searchKey]}>
            {typeof searchValue !== "undefined"
              ? e[searchValue]
              : e.fistName + "" + e.lastName}
          </option>
        ))}
      </select>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default Select;
