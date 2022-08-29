import { Dispatch } from "react";
import { UsersAPI } from "../../API/usersAPI";
import { UserAction, UsersActionTypes } from "../../types/user";
import { TracksAPI } from "../../API/tracksAPI";
import { AlbumsAPI } from "../../API/albumsAPI";

export const Registration = (name, email, password) => {
  return async (dispatch: Dispatch<UserAction>) => {
    await UsersAPI.registration({ name, email, password })
      .then((response) => {
        if (response.data.status === 500) {
          dispatch({
            type: UsersActionTypes.ADD_ERROR,
            payload: {
              type: "register",
              message: response.data?.message || "Неизвестная ошибка",
            },
          });
        } else {
          dispatch({
            type: UsersActionTypes.REDIRECT_TO,
            payload: "/auth/register-success",
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: UsersActionTypes.ADD_ERROR,
          payload: {
            type: "register",
            message: e.data.message || "Неизвестная ошибка",
          },
        });
      });
  };
};

export const CreateTrack = (values, token) => {
  return async (dispatch: Dispatch<UserAction>) => {
    dispatch({
      type: UsersActionTypes.IS_LOADING,
    });
    await TracksAPI.createTrack(values, token).then((res) => {
      dispatch({
        type: UsersActionTypes.REDIRECT_TO,
        payload: res.data.id,
      });
    });
  };
};

export const CreateAlbum = (values, token) => {
  return async (dispatch: Dispatch<UserAction>) => {
    dispatch({
      type: UsersActionTypes.IS_LOADING,
    });
    await AlbumsAPI.createAlbum(values, token).then((res) => {
      dispatch({
        type: UsersActionTypes.REDIRECT_TO,
        payload: res.data.id,
      });
    });
  };
};
