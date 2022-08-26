import classes from "./track-comments.module.scss";
import React from "react";
import CommentFC from "../comment/comment";
import * as yup from "yup";
import { Formik } from "formik";
import { TracksAPI } from "../../API/tracksAPI";
import InputField from "../../ui/input-field/input-field";
import { addComment } from "../../pages/tracks/[id]/store/track-page.actions";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const commentSchema = yup.object({
  text: yup.string().max(255, "Максимум 255 символов"),
});

const TrackComments = ({ session, token }) => {
  const dispatch = useDispatch();
  const { id, comments } = useTypedSelector((state) => state.trackPage);
  return (
    <div className={classes.trackComment}>
      <Formik
        initialValues={{
          text: "",
          track_id: id,
        }}
        validationSchema={commentSchema}
        onSubmit={(values) => {
          dispatch(addComment(values, token));
        }}
      >
        {(formik) => (
          <>
            <div className={classes.trackComment__title}>
              {comments?.length === 0 ? "нет комментариев" : "комментарии"}
            </div>
            {session && (
              <div className={classes.comments_form}>
                <div className={classes.trackComment__form}>
                  <InputField
                    label={"Введите текст"}
                    value={formik.values.text}
                    name={"text"}
                    multiline={true}
                  ></InputField>
                  <button
                    disabled={!formik.values.text}
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
        {comments?.map((comment: any) => (
          <CommentFC key={comment.text} comment={comment} />
        ))}
      </div>
    </div>
  );
};
export default TrackComments;
