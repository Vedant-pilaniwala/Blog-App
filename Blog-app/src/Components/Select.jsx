import React, { useId } from "react";

function Select({ options = [], label, className = "", ...props }, ref) {
  const id = useId();

  return (
    <div className="p-3">
      {label && (
        <label htmlFor={id} className="text-xl ml-0 mr-44">
          {label}
        </label>
      )}

      <select ref={ref} className={className} id={id} {...props}>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
