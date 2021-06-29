import React from 'react'
import Index from './tracks'
import {NextThunkDispatch, wrapper} from '../store'
import cookies from 'next-cookies'
import {Auth} from '../store/action-creators/user'
import {fetchTracks} from '../store/action-creators/track'
import {withAutoRedirect} from '../hooks/withAutoRedirect'
import {useTypedSelector} from '../hooks/useTypedSelector'
import {useRouter} from 'next/router'

const Main =  ({token, isAuth}) => {
    return (
        <Index token={token} isAuth={isAuth}/>
    )
}
export default  Main

export const getServerSideProps = wrapper.getServerSideProps
(async (ctx) => {
    const dispatch = ctx.store.dispatch as NextThunkDispatch
    const token = cookies(ctx).token;
    await dispatch( Auth(token))
    const isAuth = cookies(ctx).isAuth;
    await dispatch( fetchTracks(token))
    return {
        props:{
            token: token || null,
            isAuth: isAuth || null
        }
    }
})