import React from 'react'
import Index from './tracks'
import {NextThunkDispatch, wrapper} from '../store'
import cookies from 'next-cookies'
import {Auth} from '../store/action-creators/user'
import {fetchTracks} from '../store/action-creators/track'

const Main =  () => {
    return (
        <Index/>
    )
}
export default  Main

export const getServerSideProps = wrapper.getServerSideProps
(async (ctx) => {
    const dispatch = ctx.store.dispatch as NextThunkDispatch
    const token = cookies(ctx).token;
    console.log(token)
    await dispatch( Auth(token))
    await dispatch( fetchTracks(token))
})
