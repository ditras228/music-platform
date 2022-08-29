import React from "react";
import classes from "./track-volume.module.scss";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useAction";

interface TrackVolume {
  audio: any;
}

const Slider: React.FC<TrackVolume> = ({ audio }) => {
  const player = useTypedSelector((state) => state.player);
  const { volume } = player;

  const { setVolume } = useActions();

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.valueAsNumber;
    audio.volume = newValue / 100;
    setVolume(newValue);
  };

  return (
    <div className={classes.slider}>
      <SwitchIcon value={volume}></SwitchIcon>
      <input
        type="range"
        className={classes.slider__input}
        min={0}
        max={100 - 2}
        value={volume}
        onChange={changeVolume}
      />
    </div>
  );
};

export default Slider;

const SwitchIcon = ({ value }) => {
  if (value >= 75) {
    return <div className={classes.slider__highIcon} />;
  }

  if (value >= 50 && value < 75) {
    return <div className={classes.slider__middleIcon} />;
  }

  if (value > 0 && value < 50) {
    return <div className={classes.slider__lowIcon} />;
  }

  if (value === 0) {
    return <div className={classes.slider__mutedIcon} />;
  }

  return <div>error</div>;
};
