import React from "react";
import { FormikValues, useFormikContext } from "formik";
import classes from "./form-navigation.module.scss";

interface Props {
  hasPrevious?: boolean;
  isLastStep?: boolean;
  onBackClick: (values: FormikValues) => void;
}

const FormNavigation = (props: Props) => {
  const formik = useFormikContext();
  return (
    <div className={classes.formNavigation}>
      <button
        className={classes.formNavigation__button}
        type={"button"}
        disabled={!props.hasPrevious}
        onClick={props.onBackClick}
      >
        Назад
      </button>
      <div className={classes.formNavigation__error}>
        {formik.errors?.tracks}
      </div>
      <button
        className={classes.formNavigation__button}
        type={"submit"}
        color={"primary"}
      >
        {props.isLastStep ? "Готово" : "Далее"}
      </button>
    </div>
  );
};

export default FormNavigation;
