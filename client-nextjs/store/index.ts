import { AnyAction, applyMiddleware, createStore, Store } from "redux";
import {
  Context,
  createWrapper,
  GetServerSidePropsContext,
} from "next-redux-wrapper";
import { reducer, RootState } from "./reducers";
import thunk, { ThunkDispatch } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import cookies from "next-cookies";
import { setPlayer } from "./action-creators/player";
import { getSession } from "next-auth/client";
import { Session } from "next-auth";
import { fetchPlaylist } from "./action-creators/playlist";
import { ITrack } from "../types/track";

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    // I require this only in dev environment
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

export const makeStore = (context: Context) =>
  createStore(reducer, bindMiddleware([thunk]));
export const wrapper = createWrapper<Store<RootState>>(makeStore, {
  debug: true,
});
export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;

interface IBaseServerSideProps {
  ctx: GetServerSidePropsContext & { store: Store };
}

export const baseServerSideProps = async ({
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
