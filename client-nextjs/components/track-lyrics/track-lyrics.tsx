import classes from "./track-lyrics.module.scss";
import React from "react";

const TrackLyrics = ({ lyrics }) => {
  return (
    <div>
      {lyrics && (
        <div className={classes.trackLyrics}>
          <div className={classes.trackLyrics__title}>Слова к треку</div>
          <pre className={classes.trackLyrics__content}>{lyrics}</pre>
        </div>
      )}
    </div>
  );
};
export default TrackLyrics;
