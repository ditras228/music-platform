import React from "react";
import Image from "next/image";
import {imagesURL} from "../../api";
import classes from './play-image.module.scss'
import {useActions} from "../../hooks/useAction";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {setPreview} from "../../store/action-creators/player";
import {ITrack} from "../../types/track";
import {fetchPlaylist} from "../../store/action-creators/playlist";
import {useDispatch} from "react-redux";

interface IPlayImage{
    track?: ITrack,
    list?: boolean
    token: string
}

const PlayImage = ({track, list, token}: IPlayImage) => {
    const player = useTypedSelector(state => state.player)

    const { setPreview} = useActions()
    const {pause, active} = player
    const dispatch = useDispatch()
    const trackClickHandler = async (e) => {
        e.stopPropagation()
        setPreview(active, track, pause )
        await dispatch(fetchPlaylist(token,track.page))
    }

    let size = 170

    if(list){
        size = 70
    }

    return <div className={classes.playImage} onClick={e=>trackClickHandler(e)}>
        <Image width={size} height={size} src={imagesURL + track.image}
               className={classes.playImage__img} alt={'Обложка трека'}/>

        {
            pause || active?.id == track.id && <div className={classes.playImage__pauseIcon}/>
        }
        {
           list &&   active?.id != track.id  &&<div className={classes.playImage__playIcon}/>
        }
    </div>

}
export default PlayImage
