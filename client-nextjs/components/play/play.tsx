import React from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useAction";
import classes from "./play.module.scss";

interface IPlay {
  audio: any;
}
const Play = ({ audio }: IPlay) => {
  const player = useTypedSelector((state) => state.player);
  const { pause } = player;
  const { pauseTrack, playTrack } = useActions();

  const play = (): void => {
    playTrack();
    if (pause) {
      playTrack();
      if (audio) audio.play();
    } else {
      pauseTrack();
      if (audio) audio.pause();
    }
  };

  return (
    <div onClick={() => play()}>
      {pause ? (
        <div className={classes.icon__play}></div>
      ) : (
        <div className={classes.icon__pause}></div>
      )}
    </div>
  );
};

export default Play;
