import React, { useState } from "react";
import Image from "next/image";
import { imagesURL } from "../../API";
import classes from "./play-image.module.scss";
import { useActions } from "../../hooks/useAction";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import { useDispatch } from "react-redux";
import {
  fetchAlbumPlaylist,
  fetchPlaylist,
} from "../playlist/store/playlist.actions";
import { ITrack } from "../../pages/tracks/store/track.types";

interface IPlayImage {
  track?: ITrack;
  list?: boolean;
  token: string;
}

const PlayImage = ({ track, list, token }: IPlayImage) => {
  const player = useTypedSelector((state) => state.player);
  const album = useTypedSelector((state) => state.albumPage);
  const [isHover, setIsHover] = useState(false);
  const { setPreview } = useActions();
  const { pause, active } = player;
  const dispatch = useDispatch();
  const trackClickHandler = async (e) => {
    e.stopPropagation();
    setPreview(active, track, pause);

    if (album.id) {
      await dispatch(fetchAlbumPlaylist(token, track.page, album.id));
    } else {
      await dispatch(fetchPlaylist(token, track.page));
    }
  };

  let size = 170;

  if (list) {
    size = 70;
  }

  const hoverHandler = () => {
    setIsHover(!isHover);
  };

  return (
    <div className={classes.playImage} onClick={(e) => trackClickHandler(e)}>
      <Image
        width={size}
        height={size}
        src={imagesURL + track.image}
        className={classes.playImage__img}
        alt={"Обложка трека"}
        onMouseEnter={() => hoverHandler()}
        onMouseLeave={() => hoverHandler()}
      />

      {pause ||
        (active?.id == track.id && (
          <div className={classes.playImage__nowIcon} />
        ))}
      {pause && active?.id == track.id && (
        <div className={classes.playImage__dotsIcon} />
      )}
      {((list && active?.id != track.id) ||
        (pause && active?.id == track.id)) && (
        <div className={classes.playImage__playIcon} />
      )}
    </div>
  );
};
export default PlayImage;
