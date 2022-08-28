import React, { useEffect, useRef, useState } from "react";
import { FieldConfig, useField } from "formik";
import classes from "./text-area.module.scss";

interface Props extends FieldConfig {
  label: string;
  rows?: number;
}

const TextArea = ({ label, rows, ...props }: Props) => {
  const [field, meta] = useField(props);
  const textareaRef = useRef(null);
  const [currentValue, setCurrentValue] = useState("");

  useEffect(() => {
    textareaRef.current.style.height = "0px";
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + "px";
  }, [currentValue]);

  return (
    <div className={classes.input}>
      <textarea
        placeholder=" "
        className={classes.input__area}
        {...field}
        {...props}
        maxLength={250}
        ref={textareaRef}
        onInput={(e) => setCurrentValue(e.target.value)}
      ></textarea>
      <label className={classes.input__label}>{label}</label>
      <div className={classes.input__error}>
        {meta.touched && Boolean(meta.error)}
        {meta.touched && meta.error}
      </div>
    </div>
  );
};

export default TextArea;
