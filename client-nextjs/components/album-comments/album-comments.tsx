import React from "react";
import { Formik } from "formik";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { addComment } from "../../pages/albums/[id]/store/album-page.actions";
import CommentsForm from "../comment-form/comments-form";
import CommentsList from "../comments-list/comments-list";

const AlbumComments = ({ session, token }) => {
  const dispatch = useDispatch();
  const { id, comments } = useTypedSelector((state) => state.albumPage);

  return (
    <>
      <Formik
        initialValues={{
          text: "",
          album_id: id,
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

export default AlbumComments;
