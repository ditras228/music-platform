import classes from "./comments-list.module.scss";
import React, { FC } from "react";
import CommentFC from "../comment/comment";
import { IComment } from "../../pages/tracks/store/track.types";
import { IComments } from "../../pages/tracks/[id]/store/track-page.types";

interface ICommentsList {
  comments: IComments;
}

const CommentsList: FC<ICommentsList> = ({ comments }) => {
  return (
    <div className={classes.commentsList}>
      {comments?.data.map((comment: IComment, index) => (
        <CommentFC key={index} comment={comment} />
      ))}
    </div>
  );
};
export default CommentsList;
