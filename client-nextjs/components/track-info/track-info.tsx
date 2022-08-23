import React from "react";
import classes from './track-info.module.scss'
import PlayImage from "../play-image/play-image";

const TrackInfo = ({track, token}) => {
    return <div className={classes.trackInfo}>
        <PlayImage track={track} token={token}></PlayImage>
        <div className={classes.trackInfo__desc}>
            <div className={classes.line}>
                <h3 className={classes.item_title}>Название</h3>
                <h3 className={classes.item_value}>{track.name}</h3>
            </div>
            <div className={classes.line}>
                <h3 className={classes.item_title}>Автор</h3>
                <h3 className={classes.item_value}>{track.artist}</h3>
            </div>
            <div className={classes.line}>
                <h3 className={classes.item_title}>Прослушиваний</h3>
                <h3 className={classes.item_value}>{track.listens}</h3>
            </div>
        </div>
    </div>

}
export default TrackInfo
