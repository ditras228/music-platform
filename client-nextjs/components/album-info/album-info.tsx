import React from "react";
import classes from "./albm-info.module.scss";
import PlayAlbumImage from "../play-album-image/play-album-image";
import { IAlbum } from "../../pages/albums/store/album.types";

interface IAlbumInfo {
  album: IAlbum;
  token: string;
}

const AlbumInfo = ({ album, token }: IAlbumInfo) => {
  return (
    <div className={classes.albumInfo}>
      <PlayAlbumImage token={token} album={album} list={false} />
      <div className={classes.albumInfo__desc}>
        <div className={classes.line}>
          <h3 className={classes.item_title}>Название</h3>
          <h3 className={classes.item_value}>{album.name}</h3>
        </div>
        <div className={classes.line}>
          <h3 className={classes.item_title}>Автор</h3>
          <h3 className={classes.item_value}>{album.author}</h3>
        </div>
        <div className={classes.line}>
          <h3 className={classes.item_title}>Прослушиваний</h3>
          <h3 className={classes.item_value}>{album.listens}</h3>
        </div>
      </div>
    </div>
  );
};
export default AlbumInfo;
