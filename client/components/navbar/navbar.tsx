import React, {useEffect} from 'react'
import {signOut, useSession} from 'next-auth/client'
import {useDispatch} from 'react-redux'
import {useTypedSelector} from '../../hooks/useTypedSelector'
import {ChangeTheme} from '../../store/action-creators/user'
import {useRouter} from 'next/router'
import classes from './navbar.module.scss'

const menuItem = [
    {text: 'Треки', href: '/'},
    {text: 'Альбомы', href: '/albums'},
]

export default function Navbar() {
    const [session, loading] = useSession() as any
    const router = useRouter()
    useEffect(() => {
        if (!session?.user?.email) {
            logOutHandler
        }
    }, [session])

    const logOutHandler = async () => {
        await signOut()
    }
    const tracksHandler = async () => {
        await router.push('/tracks')
    }
    const logInHandler = async () => {
        await router.push('/')
    }

    return (
        <div
            className={classes.navbar}
        >
            <div>
                <div className={classes.navbar__logo} onClick={() => tracksHandler()}>
                    <div className={classes.navbar__logo__icon}></div>
                    MERNMusic
                </div>
            </div>
            <div className={classes.navbar__auth}>
                {
                    !session
                        ? <div onClick={() => logInHandler()}>Login</div>
                        : <>
                            <div onClick={logOutHandler}>Logout</div>
                            {/*<button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>*/}
                            {/*<Avatar alt="Remy Sharp" src={session.image}*/}
                            {/*        style={{backgroundColor: session.color || 'gray'}}>*/}
                            {/*    {session.user?.name?.substring(0, 1)}*/}
                            {/*</Avatar>*/}
                            {/*</button>*/}
                        </>
                }
            </div>

        </div>
    )
}
const getIcon = (index) => {
    switch (index) {
        case 0:
            return <div>tracks</div>
        case 1:
            return <div>album</div>
    }
}

