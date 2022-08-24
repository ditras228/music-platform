import { Session } from "next-auth";
import { getSession } from "next-auth/client";
import cookies from "next-cookies";
import { ITrack } from "../types/track";
import { NextThunkDispatch } from "../store/index.reducer";
import { GetServerSidePropsContext } from "next-redux-wrapper";
import { Store } from "redux";
import { setPlayer } from "../components/player/store/player.actions";
import { fetchPlaylist } from "../components/player/store/playlist.actions";

interface IBaseServerSideProps {
  ctx: GetServerSidePropsContext & { store: Store };
}

// Метод получения сессии и трека
export const getBaseServerSideProps = async ({
  ctx,
}: IBaseServerSideProps): Promise<Session> => {
  const session = await getSession(ctx);
  const dispatch = ctx.store.dispatch as NextThunkDispatch;
  const player = cookies(ctx).player as unknown as ITrack;

  if (player) {
    dispatch(setPlayer(player));
  }

  if (session?.accessToken) {
    await dispatch(fetchPlaylist(session.accessToken, player?.page || 1));
  }

  return session;
};
