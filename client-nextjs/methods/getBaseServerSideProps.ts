import { Session } from "next-auth";
import { getSession } from "next-auth/client";
import cookies from "next-cookies";
import { ITrack } from "../types/track";
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
} from "../components/player/store/playlist.actions";
import { PlayerState } from "../types/player";
import { TracksAPI } from "../API/tracksAPI";

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

  if (player) {
    const response = await TracksAPI.getOne(
      player.active.id,
      session.accessToken
    );

    dispatch(setPlayer({ ...player, active: response.data }));
    if (player.albumId) {
      dispatch(setCurrentAlbum(player.albumId));
    }
  }

  if (session?.accessToken) {
    if (player?.active?.pivot?.album_id) {
      await dispatch(
        fetchAlbumPlaylist(
          session.accessToken,
          player?.page || 1,
          player?.active.pivot.album_id
        )
      );
    } else {
      await dispatch(fetchPlaylist(session.accessToken, player?.page || 1));
    }
  }

  return session;
};
