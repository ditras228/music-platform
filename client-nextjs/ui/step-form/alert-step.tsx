import React, { useEffect, useState } from "react";
import { useFormikContext } from "formik";

const AlertStep = () => {
  const formik = useFormikContext() as any;
  const [errors, setErrors] = useState(null);

  for (let i = 0; i < formik.errors.length; i++) {
    errors.push(formik.errors);
  }

  useEffect(() => {
    setErrors(Array.from(formik.errors) || null);
  }, [formik]);

  return (
    <>
      {errors?.map((error, index) => (
        <div key={index}>{error}</div>
      ))}
    </>
  );
};

export default AlertStep;
