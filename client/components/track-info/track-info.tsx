import React from "react";
import Image from "next/image";
import {imagesURL} from "../../api";
import {PlayerActionTypes} from "../../types/player";
import {useDispatch} from "react-redux";
import classes from './track-info.module.scss'
import {useActions} from "../../hooks/useAction";
import {useTypedSelector} from "../../hooks/useTypedSelector";

const TrackInfo = ({track}) => {
    const dispatch = useDispatch()
    const player = useTypedSelector(state => state.player)

    const {pauseTrack, playTrack} = useActions()
    const {pause, active} = player

    const trackClickHandler = () => {
        if(active.id == track.id){
            if(pause){
                playTrack()
            }else{
                pauseTrack()
            }

        }else{
            dispatch({
                type: PlayerActionTypes.SET_ACTIVE,
                payload: track
            })        }

    }

    return <div className={classes.trackInfo}>
        <div className={classes.trackInfo__thumb} onClick={()=>trackClickHandler()}>
            <Image width={170} height={170} src={imagesURL + track.image}
                   className={classes.trackInfo__thumb__img} alt={'Обложка трека'} />
            {pause?            <div className={classes.trackInfo__thumb__playIcon}/>
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
