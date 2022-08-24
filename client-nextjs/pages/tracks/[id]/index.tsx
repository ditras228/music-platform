import React, { useState } from "react";
import MainLayout from "../../../layouts/MainLayout";
import { useRouter } from "next/router";
import { TracksAPI } from "../../../api/tracksAPI";
import { ITrack } from "../../../types/track";
import classes from "./[id].module.scss";
import { useSession } from "next-auth/client";
import TrackLyrics from "../../../components/track-lyrics/track-lyrics";
import TrackComments from "../../../components/track-comments/track-comments";
import TrackInfo from "../../../components/track-info/track-info";
import { wrapper } from "../../../store/index.reducer";
import { getBaseServerSideProps } from "../../../methods/getBaseServerSideProps";

const TrackPage = ({ serverTrack, token }) => {
  const router = useRouter();
  const [track, setTrack] = useState<ITrack>(serverTrack);
  const [session, loading] = useSession() as any;

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
        <TrackComments track={track} session={session} token={token} />
      </div>
    </MainLayout>
  );
};

export default TrackPage;

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const session = await getBaseServerSideProps({ ctx });
  const response = await TracksAPI.getOne(ctx.params.id, session.accessToken);

  return {
    props: {
      serverTrack: response.data,
      token: session.accessToken,
    },
  };
});
