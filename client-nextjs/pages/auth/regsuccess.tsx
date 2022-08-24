import React from "react";
import MainLayout from "../../layouts/MainLayout";
import classes from "./register.module.scss";

const RegSuccess = () => {
  return (
    <MainLayout>
      <div className={classes.error}>
        <h2>Спасибо за регистрацию! Проверьте свою почту</h2>
      </div>
    </MainLayout>
  );
};

export default RegSuccess;
