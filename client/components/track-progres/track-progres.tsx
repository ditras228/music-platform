import React from 'react'

interface TrackProgress {
    left: number
    right: number
    onChange: any
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
                <input
                    type='range'
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
