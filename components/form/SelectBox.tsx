import React, { forwardRef } from "react";
import Label from "./Label";
import { SelectBoxType } from "@/utils/types";

const SelectBox = forwardRef<HTMLSelectElement, SelectBoxType>(
  (
    {
      label,
      id,
      className,
      inputClassName,
      inputParentClassName,
      hideEmptyOption,
      formClassName,
      emptyOptionLabel,
      options,
      type,
      placeholder,
      labelClassName,
      error,
      ...props
    },
    ref
  ) => {
    return (
      <div className={`${className} flex flex-col gap-2`}>
        <div className={`${formClassName} flex flex-col gap-2`}>
          {label && (
            <Label
              className={`${labelClassName}`}
              htmlFor={id || label || "input-rad"}
            >
              {label}
            </Label>
          )}

          <div
            className={`${inputParentClassName} w-full relative flex items-stretch justify-center`}
          >
            <select
              {...props}
              title={label}
              id={id || label || "input-rad"}
              ref={ref}
              className={`${inputClassName} peer/radio-btn border py-3 px-5 outline-none rounded-md w-full h-full`}
            >
              {!hideEmptyOption && (
                <option value="">
                  {placeholder || emptyOptionLabel || "Select option"}
                </option>
              )}
              {options &&
                Array.isArray(options) &&
                options.map(({ value, label }, index) => (
                  <option key={index} value={value}>
                    {label}
                  </option>
                ))}
            </select>
          </div>
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>
    );
  }
);

SelectBox.displayName = "Select box";

export default SelectBox;
