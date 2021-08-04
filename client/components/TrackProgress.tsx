import React from 'react'
import {Slider} from '@material-ui/core'
interface  TrackProgress{
    left: number
    right: number
    onChange: any
    format?: string
}
const TrackProgress: React.FC<TrackProgress> =
    ({
         left,right,onChange, format
    }) => {
        function fmtMSS(s){return(s-(s%=60))/60+(9<s?':':':0')+s}
        return (
        <div>
            <Slider
                style={{width:'100%'}}
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