import React from "react";
import classes from "./track-progress.module.scss";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useAction";

interface TrackProgress {
  audio: any;
}

const TrackProgress: React.FC<TrackProgress> = ({ audio }) => {
  const player = useTypedSelector((state) => state.player);
  const { duration, currentTime } = player;
  const { setCurrentTime } = useActions();

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.valueAsNumber;
    if (audio) {
      audio.currentTime = newValue;
      setCurrentTime(newValue);
    }
  };

  return (
    <div className={classes.slider}>
      <div className={classes.slider__text}></div>
      <input
        type="range"
        className={classes.slider__input}
        min={0}
        max={(duration || 0) - 2}
        value={currentTime}
        onChange={changeCurrentTime}
      />
    </div>
  );
};

export default TrackProgress;
