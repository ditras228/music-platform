import React from "react";
import MainLayout from "../../../layouts/MainLayout";
import classes from "./register-confirmed.module.scss";
import { useRouter } from "next/router";

const RegisterSuccess = () => {
  const router = useRouter();
  return (
    <MainLayout>
      <div className={classes.registerConfirmed}>
        <div className={classes.registerConfirmed__title}>
          Пользователь подтвержден
        </div>
        <button
          className={classes.registerConfirmed__btn}
          onClick={() => router.push("/")}
        >
          Авторизоваться
        </button>
      </div>
    </MainLayout>
  );
};

export default RegisterSuccess;
