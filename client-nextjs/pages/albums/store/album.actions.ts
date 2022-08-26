import { Dispatch } from "react";
import { AlbumsAPI } from "../../../API/albumsAPI";
import { AlbumAction, AlbumActionTypes } from "../../../types/album";
import { AlbumPageActionTypes } from "../[id]/store/album-page.types";

export const fetchAlbums = (token) => {
  return async (dispatch: Dispatch<AlbumAction>) => {
    try {
      const { data } = await AlbumsAPI.getAlbums(token);
      dispatch({ type: AlbumActionTypes.FETCH_ALBUMS, payload: data.data });
    } catch (e) {
      dispatch({
        type: AlbumActionTypes.FETCH_ALBUMS_ERROR,
        payload: "Произошла ошибка загрузки альбомов",
      });
    }
  };
};

export const searchAlbums = (query: string, token: string) => {
  return async (dispatch: Dispatch<AlbumAction>) => {
    try {
      const response = await AlbumsAPI.searchAlbums(query, token);
      dispatch({ type: AlbumActionTypes.FETCH_ALBUMS, payload: response.data });
    } catch (e) {
      dispatch({
        type: AlbumActionTypes.FETCH_ALBUMS_ERROR,
        payload: "Произошла ошибка поиска альбомов",
      });
    }
  };
};

export const deleteAlbum = (id: number, token: string) => {
  return async (dispatch: any) => {
    try {
      AlbumsAPI.deleteOneAlbum(id, token).then((response) => {
        dispatch({
          type: AlbumActionTypes.REMOVE_ALBUM,
          payload: response.data,
        });
      });
      await dispatch(fetchAlbums(token));
    } catch (e) {
      dispatch({
        type: AlbumActionTypes.FETCH_ALBUMS_ERROR,
        payload: "Произошла ошибка удаления альбома",
      });
    }
  };
};

export const fetchAlbumNext = (id, token, page) => {
  return async (dispatch: any) => {
    const response = await AlbumsAPI.getOneAlbum(id, token, page);
    console.log(response.data.tracks.data);
    dispatch({
      type: AlbumPageActionTypes.SET_ALBUM_TRACKS,
      payload: response.data,
    });
    dispatch({
      type: AlbumPageActionTypes.SET_IS_FETCHING,
      payload: false,
    });
  };
};
