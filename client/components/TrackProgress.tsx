import React from 'react'
interface  TrackProgress{
    left: number
    right: number
    onChange: (e) => void
    format?: string
}
const TrackProgress: React.FC<TrackProgress> =
    ({
         left,right,onChange, format
    }) => {
        function fmtMSS(s){return(s-(s%=60))/60+(9<s?':':':0')+s}
        return (
        <div>
            <input
                type="range"
                min={0}
                max={right}
                value={left}
                onChange={onChange}
            />
            {format==='time'
                ?<div>{fmtMSS(left)}/{fmtMSS(right)}</div>
                :<div>{left}/{right}</div>
            }
        </div>
    )
}

export default TrackProgress