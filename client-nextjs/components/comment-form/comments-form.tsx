import classes from "./comments-form.module.scss";
import React, { FC } from "react";
import InputField from "../../ui/input-field/input-field";
import { IComment } from "../../pages/tracks/store/track.types";

interface ITrackComments {
  formik: any;
  comments: IComment[];
  session: any;
}

const CommentsForm: FC<ITrackComments> = ({ formik, comments, session }) => {
  return (
    <div>
      <div className={classes.commentsForm__title}>
        {comments?.length === 0 ? "нет комментариев" : "комментарии"}
      </div>
      {session && (
        <div className={classes.commentsForm}>
          <InputField
            label={"Введите текст"}
            value={formik.values.text}
            name={"text"}
            multiline={true}
          ></InputField>
          <button
            disabled={!formik.values.text}
            onClick={() => formik.handleSubmit()}
            className={classes.commentsForm__submitBtn}
          >
            Отправить
          </button>
        </div>
      )}
    </div>
  );
};
export default CommentsForm;
