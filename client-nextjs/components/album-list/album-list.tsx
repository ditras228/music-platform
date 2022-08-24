import React, { useState } from "react";
import classes from "./album-list.module.scss";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import AlbumItem from "../album-item/album-item";
import { IAlbum } from "../../types/album";
import InputField from "../../ui/input-field/input-field";
import { searchAlbums } from "../../pages/albums/store/album.actions";

interface AlbumListProps {
  albums: IAlbum[];
  token: string;
  userId: number;
}

const AlbumList: React.FC<AlbumListProps> = ({ albums, token, userId }) => {
  const [timer, setTimer] = useState(null);
  const dispatch = useDispatch();

  const handleSearch = async (values) => {
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(async () => {
        await dispatch(searchAlbums(values, token));
      }, 500)
    );
  };

  return (
    <>
      <Formik
        initialValues={{
          query: "",
        }}
        onSubmit={(values) => {
          handleSearch(values.query);
        }}
      >
        {(formik) => (
          <div className={classes.albumList__search}>
            <InputField
              label={"Введите запрос"}
              name={"query"}
              value={formik.values.query}
            />
          </div>
        )}
      </Formik>
      <div>
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
      </div>
    </>
  );
};

export default AlbumList;
