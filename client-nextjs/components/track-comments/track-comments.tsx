import classes from "./track-comments.module.scss";
import React from "react";
import CommentFC from "../comment/comment";
import * as yup from "yup";
import { Formik } from "formik";
import { TracksAPI } from "../../api/tracksAPI";
import InputField from "../../ui/input-field/input-field";

const commentSchema = yup.object({
  text: yup
    .string()
    .min(5, "Минимум 5 символов")
    .max(255, "Максимум 255 символов")
    .required("Обязательное поле"),
});

const TrackComments = ({ track, session, token }) => {
  return (
    <div className={classes.trackComment}>
      <Formik
        initialValues={{
          text: "",
          track_id: track.id,
        }}
        validationSchema={commentSchema}
        onSubmit={(values) => {
          TracksAPI.addComment(values, token).then((comment: any) => {
            // setTrack({...track, comments: [comment.data, ...track.comments]})
          });
        }}
      >
        {(formik) => (
          <>
            <div className={classes.trackComment__title}>
              {track.comments.length === 0 ? "нет комментариев" : "комментарии"}
            </div>
            {session && (
              <div className={classes.comments_form}>
                <div className={classes.trackComment__form}>
                  <InputField
                    label={"Введите текст"}
                    value={formik.values.text}
                    name={"text"}
                  ></InputField>
                  <button
                    onClick={() => formik.handleSubmit()}
                    className={classes.trackComment__form__submitBtn}
                  >
                    Отправить
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </Formik>
      <div className={classes.trackComment__list}>
        {track.comments.map((comment: any) => (
          <CommentFC key={comment.text} comment={comment} />
        ))}
      </div>
    </div>
  );
};
export default TrackComments;
