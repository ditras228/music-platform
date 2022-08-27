import React from "react";
import classes from "./comment.module.scss";
import Avatar from "../avatar/avatar";
import { IComment } from "../../pages/tracks/store/track.types";

const CommentFC: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className={classes.comment}>
      {/*{comment.name.substring(0,1)}*/}
      <Avatar url={comment.image} />
      <div className={classes.comment__content}>
        <div className={classes.comment__content__name}>{comment.name}</div>
        <div className={classes.comment__content__text}>{comment.text}</div>
      </div>
    </div>
  );
};

export default CommentFC;

type CommentProps = {
  comment: IComment;
};
