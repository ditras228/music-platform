import React, { useEffect } from "react";
import { Formik } from "formik";
import {
  addComment,
  fetchTrackNext,
} from "../../pages/tracks/[id]/store/track-page.actions";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import CommentsForm from "../comment-form/comments-form";
import CommentsList from "../comments-list/comments-list";
import { TrackPageActionTypes } from "../../pages/tracks/[id]/store/track-page.types";

const TrackComments = ({ session, token }) => {
  const dispatch = useDispatch();
  const { id, comments, isFetching } = useTypedSelector(
    (state) => state.trackPage
  );
  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);

    return function () {
      document.removeEventListener("scroll", null);
    };
  }, []);

  useEffect(() => {
    if (
      comments?.last_page &&
      isFetching === true &&
      comments.last_page != comments.current_page &&
      session
    ) {
      dispatch(
        fetchTrackNext(id, session.accessToken, comments.current_page + 1)
      );
    }
  }, [isFetching]);

  const scrollHandler = (e): void => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      dispatch({ type: TrackPageActionTypes.SET_FETCHING, payload: true });
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          text: "",
        }}
        onSubmit={(values) => {
          dispatch(addComment(values, id, token));
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
