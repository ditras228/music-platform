import { Dispatch } from "react";
import { TracksAPI } from "../../../API/tracksAPI";
import { PlaylistActions, PlaylistActionTypes } from "../../../types/playlist";
import { PlayerActionTypes } from "../../../types/player";
import { AlbumsAPI } from "../../../API/albumsAPI";
import { AlbumActionTypes } from "../../../types/album";
import { AlbumPageActionTypes } from "../../../types/album-page";

export const fetchPlaylist = (token, page) => {
  return async (dispatch: Dispatch<PlaylistActions>) => {
    await TracksAPI.getTracks(token, page)
      .then((res) => {
        dispatch({ type: PlaylistActionTypes.SET_PLAYLIST, payload: res.data });
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const fetchNextPlaylist = (token, page) => {
  return async (dispatch: Dispatch<any>) => {
    await TracksAPI.getTracks(token, page)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: PlaylistActionTypes.SET_PLAYLIST, payload: res.data });
        dispatch({
          type: PlayerActionTypes.SET_ACTIVE,
          payload: res.data.data[0],
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const fetchAlbumPlaylist = (token, page, albumId) => {
  return async (dispatch: Dispatch<any>) => {
    await AlbumsAPI.getOneAlbum(albumId, token, page)
      .then((res) => {
        dispatch({
          type: PlaylistActionTypes.SET_PLAYLIST,
          payload: res.data.tracks,
        });
        dispatch({
          type: PlayerActionTypes.SET_CURRENT_ALBUM,
          payload: res.data.id,
        });
        dispatch({
          type: PlaylistActionTypes.SET_TOTAL,
          payload: res.data.tracks.last_page,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const fetchNextAlbumPlaylist = (token, page, albumId) => {
  return async (dispatch: Dispatch<any>) => {
    await AlbumsAPI.getOneAlbum(albumId, token, page)
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: PlaylistActionTypes.SET_PLAYLIST,
          payload: res.data.tracks,
        });
        dispatch({
          type: PlayerActionTypes.SET_CURRENT_ALBUM,
          payload: res.data.id,
        });
        dispatch({
          type: PlayerActionTypes.SET_ACTIVE,
          payload: res.data.tracks.data[0],
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
};
