import { TrackPageActions, TrackPageActionTypes } from "./track-page.types";
import { Dispatch } from "react";
import { TracksAPI } from "../../../../API/tracksAPI";

export const setTrack = (track) => {
  return { type: TrackPageActionTypes.FETCH_TRACK, payload: track };
};

export const addComment = (values, token) => {
  return async (dispatch: Dispatch<TrackPageActions>) => {
    TracksAPI.addComment(values, token)
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
