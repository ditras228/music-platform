import React, { useEffect } from "react";
import { signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import classes from "./navbar.module.scss";
import { menuItem } from "../sidebar/sidebar";
import { useActions } from "../../hooks/useAction";
import { useTypedSelector } from "../../hooks/useTypedSelector";

export default function Navbar() {
  const [session] = useSession() as any;
  const router = useRouter();
  const { showNavbar } = useActions();
  const { isShow } = useTypedSelector((state) => state.navbar);

  useEffect(() => {
    if (!session && router.pathname == "") {
      logOutHandler();
    }
  }, [session]);

  const logOutHandler = async () => {
    await signOut();
  };

  const tracksHandler = async () => {
    await router.push("/tracks");
  };

  const burgerHandler = () => {
    showNavbar();
  };

  return (
    <div className={classes.navbar}>
      <div className={classes.navbar__container}>
        <div
          className={classes.navbar__container__burgerIcon}
          onClick={() => burgerHandler()}
        ></div>
        <div>
          <div
            className={classes.navbar__container__logo}
            onClick={() => tracksHandler()}
          >
            <div className={classes.navbar__container__logo__icon}></div>
            MERNMusic
          </div>
        </div>
        <div className={classes.navbar__container__auth}>
          {session && <div onClick={logOutHandler}>Logout</div>}
        </div>
      </div>
      {isShow && (
        <div className={classes.navbar__burger}>
          {menuItem.map(({ text, href }, index) => (
            <div
              className={classes.navbar__burger__item}
              key={href}
              onClick={() => router.push(href)}
            >
              {getIcon(index)}
              {text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const getIcon = (index) => {
  switch (index) {
    case 0:
      return <div className={classes.navbar__burger__item__iconTrack}></div>;
    case 1:
      return <div className={classes.navbar__burger__item__iconAlbum}></div>;
    default:
      return "icon not found!";
  }
};
