import React from "react";
import MainLayout from "../../layouts/MainLayout";
import { useRouter } from "next/router";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { baseServerSideProps, NextThunkDispatch, wrapper } from "../../store";
import { fetchTracks } from "../../store/action-creators/track";
import TrackList from "../../components/track-list/track-list";
import classes from "./index.module.scss";

const Index = ({ token, userId }) => {
  const router = useRouter();
  const { tracks, error } = useTypedSelector((state) => state.track);

  if (error) {
    return (
      <MainLayout title={error}>
        <div className={classes.error}>
          <h2>{error}</h2>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={"Треки"}>
      <div className={classes.tracks}>
        <div className={classes.tracks__top}>
          <div className={classes.tracks__top__title}> Треки</div>
          <div
            className={classes.tracks__top__createBtn}
            onClick={() => router.push("/tracks/create")}
          >
            Загрузить
          </div>
        </div>

        <TrackList tracks={tracks} token={token} user_id={userId} />
      </div>
    </MainLayout>
  );
};

export default Index;

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const session = await baseServerSideProps({ ctx });
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const dispatch = ctx.store.dispatch as NextThunkDispatch;
  await dispatch(fetchTracks(session.accessToken, 1));

  return {
    props: {
      token: session.accessToken,
      userId: session.userId,
    },
  };
});
