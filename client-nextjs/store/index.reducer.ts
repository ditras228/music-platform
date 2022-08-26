import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  createStore,
  Store,
} from "redux";
import { playerReducer } from "../components/player/store/player.reducer";
import { Context, createWrapper, HYDRATE } from "next-redux-wrapper";
import { trackReducer } from "../pages/tracks/store/track.reducer";
import { usersReducer } from "../pages/store/user.reducer";
import { playlistReducer } from "../components/player/store/playlist.reducer";
import { albumPageReducer } from "../pages/albums/[id]/store/album-page.reducer";
import { createAlbumReducer } from "../pages/albums/create/store/create-album.reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkDispatch } from "redux-thunk";
import { albumReducer } from "../pages/albums/store/album.reducer";
import { navbarReducer } from "../components/navbar/store/navbar.reducer";
import { trackPageReducer } from "../pages/tracks/[id]/store/track-page.reducer";

export const rootReducer = combineReducers({
  player: playerReducer,
  track: trackReducer,
  album: albumReducer,
  albumPage: albumPageReducer,
  user: usersReducer,
  playlist: playlistReducer,
  createAlbum: createAlbumReducer,
  navbar: navbarReducer,
  trackPage: trackPageReducer,
});

export const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (state.count) nextState.count = state.count; // preserve count value on client side navigation
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};

export type RootState = ReturnType<typeof rootReducer>;

// Миддвейр для redux dev tools
const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
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
