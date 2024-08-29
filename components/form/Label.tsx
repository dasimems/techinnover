import { LabelProps } from "@/utils/types";
import React from "react";

const Label: React.FC<LabelProps> = ({
  children,
  className,
  optional,
  ...props
}) => {
  return (
    <label className={`${className}`} {...props}>
      {children} {optional && <span className="opacity-60">(Optional)</span>}
    </label>
  );
};

export default Label;
