import React, { useId } from "react";

function Input(
  {
    label,
    placeholder,
    labelClassName = "",
    className = "bg-gray-100 border border-black/15 outline-none text-gray-800 text-lg p-2 w-full rounded-md mb-4 mt-1 ml-0 mr-auto",
    type = "text",
    icon,
    ...props
  },
  ref
) {
  const id = useId();

  return (
    <div className="p-3">
      {label && (
        <label
          htmlFor={id}
          className={
            labelClassName ? labelClassName : `text-lg ml-0 mr-auto mb-3`
          }
        >
          {icon ? icon : null}{label}
        </label>
      )}

      <input
        ref={ref}
        id={id}
        type={type}
        className={className}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}

export default React.forwardRef(Input);
