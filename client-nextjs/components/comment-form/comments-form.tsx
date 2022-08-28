import classes from "./comments-form.module.scss";
import React, { FC } from "react";
import TextArea from "../../ui/text-area/text-area";
import { IComments } from "../../pages/tracks/[id]/store/track-page.types";

interface ITrackComments {
  formik: any;
  comments: IComments;
  session: any;
}

const CommentsForm: FC<ITrackComments> = ({ formik, session, comments }) => {
  return (
    <div>
      <div className={classes.commentsForm__title}>
        {comments?.total === 0 ? "нет комментариев" : "комментарии"}
        {" (" + comments?.total + ")"}
      </div>
      {session && (
        <div className={classes.commentsForm}>
          <TextArea
            label={"Введите текст"}
            value={formik.values.text}
            name={"text"}
          ></TextArea>
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
