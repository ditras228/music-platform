import React from "react";
import Image from "next/image";
import classes from "./avatar.module.scss";

const Avatar = ({ url }) => {
  return (
    <div className={classes.avatar}>
      <Image width={70} height={70} src={url} alt={"Аватар"} />
    </div>
  );
};
export default Avatar;
