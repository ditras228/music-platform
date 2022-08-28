import React, { useEffect, useState } from "react";
import classes from "./album-list.module.scss";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import AlbumItem from "../album-item/album-item";
import InputField from "../../ui/input-field/input-field";
import {
  fetchAlbums,
  searchAlbums,
} from "../../pages/albums/store/album.actions";
import { AlbumActionTypes, IAlbum } from "../../pages/albums/store/album.types";
import {
  fetchTracks,
  searchTracks,
} from "../../pages/tracks/store/track.actions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { TrackActionTypes } from "../../pages/tracks/store/track.types";
import AlbumSearch from "../album-search/album-search";

interface AlbumListProps {
  albums: IAlbum[];
  token: string;
  userId: number;
}

const AlbumList: React.FC<AlbumListProps> = ({ albums, token, userId }) => {
  const dispatch = useDispatch();
  const { total, current_page, isFetching } = useTypedSelector(
    (state) => state.album
  );

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);

    return function () {
      document.removeEventListener("scroll", null);
    };
  }, []);

  useEffect(() => {
    if (isFetching === true && total != albums.length) {
      dispatch(fetchAlbums(token, current_page + 1));
    }
  }, [isFetching]);

  const scrollHandler = (e): void => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      dispatch({ type: AlbumActionTypes.SET_IS_FETCHING, payload: true });
    }
  };

  return (
    <>
      <AlbumSearch token={token}></AlbumSearch>
      <div className={classes.albumList__content}>
        {albums.map((album) => (
          <AlbumItem
            key={album.id}
            album={album}
            token={token}
            userId={userId}
          />
        ))}
      </div>
    </>
  );
};

export default AlbumList;
