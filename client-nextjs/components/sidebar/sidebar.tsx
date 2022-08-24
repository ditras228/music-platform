import React from "react";
import { useRouter } from "next/router";
import classes from "./sidebar.module.scss";

export const menuItem = [
  { text: "Треки", href: "/" },
  { text: "Альбомы", href: "/albums" },
];

export default function Sidebar() {
  const router = useRouter();

  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebar__content}>
        {menuItem.map(({ text, href }, index) => (
          <div
            className={classes.sidebar__content__item}
            key={href}
            onClick={() => router.push(href)}
          >
            {getIcon(index)}
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}

const getIcon = (index) => {
  switch (index) {
    case 0:
      return <div className={classes.sidebar__content__item__iconTrack}></div>;
    case 1:
      return <div className={classes.sidebar__content__item__iconAlbum}></div>;
    default:
      return "icon not found!";
  }
};
