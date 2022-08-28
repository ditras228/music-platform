import { TrackPageActions, TrackPageActionTypes } from "./track-page.types";
import { Dispatch } from "react";
import { TracksAPI } from "../../../../API/tracksAPI";
import { AlbumsAPI } from "../../../../API/albumsAPI";
import { AlbumPageActionTypes } from "../../../albums/[id]/store/album-page.types";

export const setTrack = (track) => {
  return { type: TrackPageActionTypes.FETCH_TRACK, payload: track };
};

export const addComment = (values, id, token) => {
  return async (dispatch: Dispatch<TrackPageActions>) => {
    TracksAPI.addComment({ ...values, track_id: id }, token)
      .then((res) => {
        dispatch({ type: TrackPageActionTypes.ADD_COMMENT, payload: res.data });
      })
      .catch((e) => {
        dispatch({
          type: TrackPageActionTypes.SET_ERROR,
          payload: "Произошла ошибка добавления комментария",
        });
      });
  };
};

export const fetchTrackNext = (id, token, page) => {
  return async (dispatch: any) => {
    const response = await TracksAPI.next(id, page, token);
    dispatch({
      type: TrackPageActionTypes.SET_TRACK_COMMENTS,
      payload: response.data,
    });
    dispatch({
      type: TrackPageActionTypes.SET_FETCHING,
      payload: false,
    });
  };
};
