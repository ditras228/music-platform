import { Session } from "next-auth";
import { getSession } from "next-auth/client";
import cookies from "next-cookies";
import { NextThunkDispatch } from "../store/index.reducer";
import { GetServerSidePropsContext } from "next-redux-wrapper";
import { Store } from "redux";
import {
  setCurrentAlbum,
  setPlayer,
} from "../components/player/store/player.actions";
import {
  fetchAlbumPlaylist,
  fetchPlaylist,
} from "../components/playlist/store/playlist.actions";
import { TracksAPI } from "../API/tracksAPI";
import { PlayerState } from "../components/player/store/player.types";
import { redirect } from "next/dist/server/api-utils";

interface IBaseServerSideProps {
  ctx: GetServerSidePropsContext & { store: Store };
}

// Метод получения сессии и трека
export const getBaseServerSideProps = async ({
  ctx,
}: IBaseServerSideProps): Promise<Session> => {
  const session = await getSession(ctx);
  const dispatch = ctx.store.dispatch as NextThunkDispatch;
  const player = cookies(ctx).player as unknown as PlayerState;

  if (session?.accessToken && player) {
    const response = await TracksAPI.getOne(
      player.active.id,
      session.accessToken
    );

    dispatch(setPlayer({ ...player, active: response.data }));

    if (player.albumId) {
      dispatch(setCurrentAlbum(player.albumId));
      await dispatch(
        fetchAlbumPlaylist(
          session.accessToken,
          player?.page || 1,
          player?.albumId
        )
      );
    } else {
      await dispatch(fetchPlaylist(session.accessToken, player?.page || 1));
    }
  }
  return session;
};

export const die = () => {
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};
