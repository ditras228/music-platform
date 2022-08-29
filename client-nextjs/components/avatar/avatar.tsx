import React from "react";
import Image from "next/image";
import classes from "./avatar.module.scss";

const Avatar = ({ comment }) => {
  if (!comment?.image) {
    return <div className={classes.avatar}>{comment.name.substring(0, 1)}</div>;
  }
  return (
    <div className={classes.avatar}>
      <Image width={70} height={70} src={comment.image} alt={"Аватар"} />
    </div>
  );
};
export default Avatar;
