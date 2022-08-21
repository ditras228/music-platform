import React from "react";
import Image from "next/image";
import {imagesURL} from "../../api";
import classes from './track-info.module.scss'
import {useActions} from "../../hooks/useAction";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {setPreview} from "../../store/action-creators/player";

const TrackInfo = ({track}) => {
    const player = useTypedSelector(state => state.player)

    const { setPreview} = useActions()
    const {pause, active} = player

    const trackClickHandler = ():void => {
        setPreview(active, track, pause )
    }

    return <div className={classes.trackInfo}>
        <div className={classes.trackInfo__thumb} onClick={trackClickHandler}>
            <Image width={170} height={170} src={imagesURL + track.image}
                   className={classes.trackInfo__thumb__img} alt={'Обложка трека'} />

            {pause || active?.id != track.id?            <div className={classes.trackInfo__thumb__playIcon}/>
            :                <div className={classes.trackInfo__thumb__pauseIcon}/>

            }

        </div>
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
