import React from 'react'
import {Slider} from '@material-ui/core'

interface TrackProgress {
    left: number
    right: number
    onChange: (e, number) => void
    format?: string
}

const TrackProgress: React.FC<TrackProgress> =
    ({
         left, right, onChange, format
     }) => {
        function fmtMSS(s) {
            return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s
        }

        return (
            <div>
                {format === 'time'
                    ? <div>{fmtMSS(left)}/{fmtMSS(right)}</div>
                    : <div>{left}/{right}</div>
                }
                <Slider
                    style={{width: '100%'}}
                    min={0}
                    max={right - 2}
                    value={left}
                    onChange={onChange}
                />
            </div>
        )
    }

export default TrackProgress
