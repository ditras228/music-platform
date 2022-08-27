import React from "react";
import { Formik } from "formik";
import { addComment } from "../../pages/tracks/[id]/store/track-page.actions";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import CommentsForm from "../comment-form/comments-form";
import CommentsList from "../comments-list/comments-list";

const TrackComments = ({ session, token }) => {
  const dispatch = useDispatch();
  const { id, comments } = useTypedSelector((state) => state.trackPage);

  return (
    <>
      <Formik
        initialValues={{
          text: "",
          track_id: id,
        }}
        onSubmit={(values) => {
          dispatch(addComment(values, token));
        }}
      >
        {(formik) => (
          <CommentsForm formik={formik} comments={comments} session={session} />
        )}
      </Formik>
      <CommentsList comments={comments} />
    </>
  );
};
export default TrackComments;
