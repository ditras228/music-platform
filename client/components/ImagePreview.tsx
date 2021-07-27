import React from 'react'
import classes from './ImagePreview.module.css'
interface Props{
    src: string
}
const ImagePreview = ({src}: Props) => {
    return (
        <div className={classes.grid}>
            <img className={classes.imageBig} src={src} alt=""/>
            <img className={classes.imageMid} src={src} alt=""/>
            <img className={classes.imageSm} src={src} alt=""/>

        </div>
    )
}

export default ImagePreview