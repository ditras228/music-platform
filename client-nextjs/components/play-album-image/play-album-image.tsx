import React from "react";
import Image from "next/image";
import { imagesURL } from "../../API";
import classes from "./play-album-image.module.scss";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { IAlbum } from "../../types/album";
import { fetchNextAlbumPlaylist } from "../player/store/playlist.actions";

interface IPlayAlbumImage {
  album?: IAlbum;
  list?: boolean;
  token: string;
}

const PlayAlbumImage = ({ album, token, list }: IPlayAlbumImage) => {
  const player = useTypedSelector((state) => state.player);
  const dispatch = useDispatch();
  const { pause } = player;
  const trackClickHandler = (e): void => {
    e.stopPropagation();
    dispatch(fetchNextAlbumPlaylist(token, 1, album.id));
  };

  let size = 170;

  if (list) {
    size = 70;
  }

  return (
    <div className={classes.playImage} onClick={(e) => trackClickHandler(e)}>
      <Image
        width={size}
        height={size}
        src={imagesURL + album.image}
        className={classes.playImage__img}
        alt={"Обложка альбома"}
      />
      {pause ||
        (player?.albumId == album.id && (
          <div className={classes.playImage__nowIcon} />
        ))}
      {pause && player?.albumId == album.id && (
        <div className={classes.playImage__dotsIcon} />
      )}
      {((list && player?.albumId != album.id) ||
        (pause && player?.albumId == album.id)) && (
        <div className={classes.playImage__playIcon} />
      )}
    </div>
  );
};
export default PlayAlbumImage;
