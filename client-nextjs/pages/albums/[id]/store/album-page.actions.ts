import { Dispatch } from "react";
import { AlbumPageAction, AlbumPageActionTypes } from "./album-page.types";
import { AlbumsAPI } from "../../../../API/albumsAPI";

export const setAlbum = (album) => {
  return { type: AlbumPageActionTypes.SET_ALBUM, payload: album };
};

export const addComment = (values, token) => {
  return async (dispatch: Dispatch<AlbumPageAction>) => {
    AlbumsAPI.addComment(values, token)
      .then((res) => {
        dispatch({ type: AlbumPageActionTypes.ADD_COMMENT, payload: res.data });
      })
      .catch((e) => {
        dispatch({
          type: AlbumPageActionTypes.SET_ERROR,
          payload: "Произошла ошибка добавления комментария",
        });
      });
  };
};
