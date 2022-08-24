import { combineReducers } from "redux";
import { playerReducer } from "./player.reducer";
import { HYDRATE } from "next-redux-wrapper";
import { trackReducer } from "./track.reducer";
import { usersReducer } from "./user.reducer";
import { playlistReducer } from "./playlist.reducer";
import { albumReducer } from "./album-reducer";
import { albumPageReducer } from "../../pages/albums/[id]/store/album-page.reducer";
import { createAlbumReducer } from "../../pages/albums/create/store/create-album.reducer";

export const rootReducer = combineReducers({
  player: playerReducer,
  track: trackReducer,
  album: albumReducer,
  albumPage: albumPageReducer,
  user: usersReducer,
  playlist: playlistReducer,
  createAlbum: createAlbumReducer,
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
