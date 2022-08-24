import React from "react";
import MainLayout from "../layouts/MainLayout";
import { Formik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { GetError } from "../store/selectors";
import { getCsrfToken, getSession, signIn } from "next-auth/client";
import { UsersActionTypes } from "../types/user";
import { wrapper } from "../store";
import classes from "./index.module.scss";
import InputField from "../ui/input-field/input-field";

const SignupSchema = Yup.object({
  email: Yup.string().email("Неккоректный email").required("Обязательно"),
  password: Yup.string()
    .min(6, "Должен быть больше 5 символов")
    .max(16, "Должен быть меньше 17 символов")
    .required("Обязательно"),
});

const LogIn = ({ session, csrfToken }) => {
  const router = useRouter();
  const error = useSelector((state) => GetError(state, "login"));
  const dispatch = useDispatch();

  const loginHandler = async (e: any) => {
    e.preventDefault();
    await router.push("/auth/register");
  };
  const handleSignIn = async (data) => {
    if (typeof data.error === "string") {
      dispatch({
        type: UsersActionTypes.ADD_ERROR,
        payload: { type: "login", message: data.error },
      });
    } else {
      await router.push("/tracks");
    }
  };
  return (
    <MainLayout>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values) => {}}
        validationSchema={SignupSchema}
      >
        {(formik) => (
          <div className={classes.login}>
            <h2 className={classes.login__title}>Вход</h2>
            <div className={classes.login__content}>
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <div className={classes.login__content__inputs}>
                <InputField
                  label={"Email"}
                  name={"email"}
                  value={formik.values.email}
                />
                <InputField
                  label={"Пароль"}
                  name={"password"}
                  value={formik.values.password}
                  type={"password"}
                />
              </div>
              {error ? <div>{error.message}</div> : null}
              <div className={classes.login__content__buttons}>
                <button
                  className={classes.login__content__buttons__item}
                  onClick={() => {
                    formik.handleSubmit();
                    signIn("credentials", {
                      email: formik.values.email,
                      password: formik.values.password,
                      redirect: false,
                    }).then((data) => handleSignIn(data));
                  }}
                >
                  Войти
                </button>
                <button
                  className={classes.login__content__buttons__item}
                  onClick={() => signIn("github")}
                >
                  Войти с помощью GitHub
                </button>
              </div>

              <div
                onClick={(e) => loginHandler(e)}
                className={classes.login__content__link}
              >
                Ещё нет аккаунта? Зарегистрируйтесь
              </div>
            </div>
          </div>
        )}
      </Formik>
    </MainLayout>
  );
};

export default LogIn;

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const session = await getSession({ req: ctx.req });
  const csrfToken = await getCsrfToken(ctx);

  if (session?.accessToken) {
    return {
      redirect: {
        destination: "/tracks",
        permanent: false,
      },
    };
  }

  return { props: { session, csrfToken } };
});
