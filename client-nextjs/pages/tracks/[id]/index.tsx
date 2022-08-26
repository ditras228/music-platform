import React from "react";
import MainLayout from "../../../layouts/MainLayout";
import { useRouter } from "next/router";
import { TracksAPI } from "../../../API/tracksAPI";
import classes from "./[id].module.scss";
import { useSession } from "next-auth/client";
import TrackLyrics from "../../../components/track-lyrics/track-lyrics";
import TrackComments from "../../../components/track-comments/track-comments";
import TrackInfo from "../../../components/track-info/track-info";
import { NextThunkDispatch, wrapper } from "../../../store/index.reducer";
import { getBaseServerSideProps } from "../../../methods/getBaseServerSideProps";
import { setTrack } from "./store/track-page.actions";

const TrackPage = ({ track, token }) => {
  const router = useRouter();
  const [session] = useSession() as any;

  return (
    <MainLayout
      title={"Музыкальная площадка - " + track.name + " - " + track.artist}
      keywords={"Музыка, артисты," + track.name + track.artist}
    >
      <div className={classes.trackId}>
        <div
          className={classes.trackId__title}
          onClick={() => router.push("/tracks")}
        >
          К списку
        </div>
        <TrackInfo track={track} token={token} />
        <TrackLyrics lyrics={track.lyrics} />
        <TrackComments session={session} token={token} />
      </div>
    </MainLayout>
  );
};

export default TrackPage;

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const session = await getBaseServerSideProps({ ctx });
  const response = await TracksAPI.getOne(ctx.params.id, session.accessToken);
  const dispatch = ctx.store.dispatch as NextThunkDispatch;
  dispatch(setTrack(response.data));

  return {
    props: {
      track: response.data,
      token: session.accessToken,
    },
  };
});
