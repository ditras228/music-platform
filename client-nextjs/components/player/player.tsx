import React, { useEffect } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useAction";
import { audioURL } from "../../API";
import classes from "./player.module.scss";
import TrackVolume from "../track-volume/track-volume";
import TrackProgress from "../track-progress/track-progress";
import Play from "../play/play";
import cookie from "js-cookie";
import { useSession } from "next-auth/client";
import { useDispatch } from "react-redux";
import {
  fetchNextAlbumPlaylist,
  fetchNextPlaylist,
} from "../playlist/store/playlist.actions";
import { ITrack } from "../../pages/tracks/store/track.types";
import { PlayerActionTypes } from "./store/player.types";

let audio;

const Player = () => {
  const player = useTypedSelector((state) => state.player);
  const playlist = useTypedSelector((state) => state.playlist);
  const activeAlbum = useTypedSelector((state) => state.albumPage);
  const track = useTypedSelector((state) => state.track);
  const { active, pause, volume, currentTime, duration } = player;
  const { setCurrentTime, setDuration, setActiveTrack } = useActions();
  const dispatch = useDispatch();
  const [session] = useSession();

  useEffect(() => {
    if (!audio) {
      // В случае отстуствия аудио, создаем его
      audio = new Audio();
    }

    if (!duration) {
      setDuration(Math.ceil(audio.duration));
    }

    if (active) {
      // В случае, если id'шник другой, обнуляем currentTime и присваеваем новый src
      if (audio.src.split("/")[4] != active?.id) {
        audio.src = audioURL + active.id;
        audio.currentTime = currentTime;
        audio.play;
      }

      audio.volume = volume / 100;

      // По загрузке аудио
      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration));
      };

      // При воспроизведении аудио
      audio.ontimeupdate = () => {
        if (audio.duration >= audio.currentTime) {
          setCurrentTime(Math.ceil(audio.currentTime));
        }
      };

      // Если аудио закончило проигрывание..
      audio.onended = () => {
        if (playlist) {
          nextTrack(playlist.tracks);
        }
      };
    }
  }, [active?.id, pause, currentTime]);

  function nextTrack(tracks: ITrack[]) {
    if (tracks.length > 0) {
      const currentIndex = tracks.indexOf(
        tracks.filter((value) => value.id == active.id)[0]
      );
      if (tracks.length - 1 > currentIndex) {
        setActiveTrack(tracks[currentIndex + 1]);
      } else {
        if (playlist.page === playlist.total) {
          if (activeAlbum.id) {
            dispatch({
              type: PlayerActionTypes.SET_ACTIVE,
              payload: activeAlbum.tracks.data[0],
            });
          } else {
            dispatch({
              type: PlayerActionTypes.SET_ACTIVE,
              payload: track.tracks[0],
            });
          }
        } else {
          if (activeAlbum.id) {
            dispatch(
              fetchNextAlbumPlaylist(
                session.accessToken,
                active.page + 1,
                activeAlbum.id
              )
            );
          } else {
            dispatch(fetchNextPlaylist(session.accessToken, active.page + 1));
          }
        }
      }
    }
  }

  useEffect(() => {
    // Синхронизация redux и audio
    if (pause) {
      audio.pause();
    } else {
      audio.play();
    }
  }, [pause]);

  useEffect(() => {
    //Сохраняем в куки плеер
    active &&
      cookie.set(
        "player",
        `${JSON.stringify({
          ...player,
          active: {
            id: active.id,
            page: active.page,
          },
          albumId: active?.pivot?.album_id || player.albumId,
        })}`
      );
  }, [currentTime, pause, volume, active?.page]);

  // В случае отстуствия трека, возвращаем нуль
  if (active === null) return null;

  // Удаление куков паузы текущего трека, при закрытии вкладки
  if (typeof window !== "undefined") {
    window.addEventListener("beforeunload", (ev) => {
      ev.preventDefault();
      cookie.set("player", `${JSON.stringify({ ...player, pause: true })}`);
    });
  }

  return (
    <div className={classes.player}>
      <div className={classes.player__column}>
        <Play audio={audio} />
        <div className={classes.player__info}>
          <div className={classes.player__info__name}>{active?.name}</div>
          <div className={classes.player__info__author}>{active?.artist}</div>
        </div>
      </div>
      <TrackProgress audio={audio} />
      <TrackVolume audio={audio} />
    </div>
  );
};

export default Player;
