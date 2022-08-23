import React from 'react'
import classes from './track-progress.module.scss'
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useAction";

interface TrackVolume {
    audio: any
}

const Slider: React.FC<TrackVolume> =
    ({
         audio
     }) => {
        const player = useTypedSelector(state => state.player)
        const {volume} = player

        const {setVolume} = useActions()


        const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.valueAsNumber
            audio.volume = newValue / 100
            setVolume(newValue)
        }

        return (
            <div className={classes.slider}>
                <div className={classes.slider__text}>
                    {volume}/{100}
                </div>
                <input
                    type='range'
                    className={classes.slider__input}
                    min={0}
                    max={100 - 2}
                    value={volume}
                    onChange={changeVolume}
                />
            </div>
        )
    }

export default Slider
