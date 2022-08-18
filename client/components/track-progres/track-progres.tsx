import React from 'react'
import * as classes from './track-progress.module.scss'

interface TrackProgress {
    left: number
    right: number
    onChange: any
    format?: string
}

const Slider: React.FC<TrackProgress> =
    ({
         left, right, onChange, format
     }) => {

        function fmtMSS(s): string {
            return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s
        }

        return (
            <div className={classes.slider}>
                <div className={classes.slider__text}>
                    {format === 'time'
                        ? <div>{fmtMSS(left)}/{fmtMSS(right)}</div>
                        : <div>{left}/{right}</div>
                    }
                </div>
                <input
                    type='range'
                    className={classes.slider__input}
                    min={0}
                    max={right - 2}
                    value={left}
                    onChange={onChange}
                />
            </div>
        )
    }

export default Slider
