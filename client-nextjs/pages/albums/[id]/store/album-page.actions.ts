import { Dispatch } from "react";
import { AlbumPageAction, AlbumPageActionTypes } from "./album-page.types";
import { AlbumsAPI } from "../../../../API/albumsAPI";
import { TracksAPI } from "../../../../API/tracksAPI";
import { TrackPageActionTypes } from "../../../tracks/[id]/store/track-page.types";

export const setAlbum = (album) => {
  return { type: AlbumPageActionTypes.SET_ALBUM, payload: album };
};

export const addComment = (values, id, token) => {
  return async (dispatch: Dispatch<AlbumPageAction>) => {
    AlbumsAPI.addComment({ ...values, album_id: id }, token)
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

export const fetchAlbumNext = (id, token, page) => {
  return async (dispatch: any) => {
    const response = await AlbumsAPI.next(id, page, token);
    dispatch({
      type: AlbumPageActionTypes.SET_ALBUM_COMMENTS,
      payload: response.data,
    });
    dispatch({
      type: AlbumPageActionTypes.SET_COMMENTS_FETCHING,
      payload: false,
    });
  };
};
