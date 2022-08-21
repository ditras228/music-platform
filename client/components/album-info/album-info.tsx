import React from "react";
import Image from "next/image";
import {imagesURL} from "../../api";
import {PlayerActionTypes} from "../../types/player";
import {useDispatch} from "react-redux";
import classes from './albm-info.module.scss'

const AlbumInfo = ({album,}) => {
    const dispatch = useDispatch()
    const albumClickHandler = () => {
        dispatch({
            type: PlayerActionTypes.SET_ACTIVE,
            payload: album
        })
    }

    return <div className={classes.albumInfo}>
        <div className={classes.albumInfo__thumb} onClick={albumClickHandler}>
            <Image width={170} height={170} src={imagesURL + album.image}
                   className={classes.albumInfo__thumb__img} alt={'Обложка трека'}/>
            <div className={classes.albumInfo__thumb__icon}/>
        </div>
        <div className={classes.albumInfo__desc}>
            <div className={classes.line}>
                <h3 className={classes.item_title}>Название</h3>
                <h3 className={classes.item_value}>{album.name}</h3>
            </div>
            <div className={classes.line}>
                <h3 className={classes.item_title}>Автор</h3>
                <h3 className={classes.item_value}>{album.author}</h3>
            </div>
            <div className={classes.line}>
                <h3 className={classes.item_title}>Прослушиваний</h3>
                <h3 className={classes.item_value}>{album.listens}</h3>
            </div>
        </div>
    </div>

}
export default AlbumInfo
