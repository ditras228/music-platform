import React from "react";
import MainLayout from "../../../layouts/MainLayout";
import classes from "./register-success.module.scss";

const Index = () => {
  return (
    <MainLayout>
      <div className={classes.registerSuccess}>
        <div className={classes.registerSuccess__title}>
          Спасибо за регистрацию! Проверьте свою почту
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
