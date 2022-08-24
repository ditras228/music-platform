import React, { useEffect } from "react";
import { signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import classes from "./navbar.module.scss";

export default function Navbar() {
  const [session] = useSession() as any;
  const router = useRouter();

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

  return (
    <div className={classes.navbar}>
      <div className={classes.navbar__container}>
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
    </div>
  );
}
