import React, {useEffect} from 'react'
import {signOut, useSession} from 'next-auth/client'
import {useRouter} from 'next/router'
import classes from './navbar.module.scss'

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
            <div className={classes.navbar__container}>
                <div>
                    <div className={classes.navbar__container__logo} onClick={() => tracksHandler()}>
                        <div className={classes.navbar__container__logo__icon}></div>
                        MERNMusic
                    </div>
                </div>
                <div className={classes.navbar__container__auth}>
                    {
                        !session
                            ? <div onClick={() => logInHandler()}>Login</div>
                            : <>
                                <div onClick={logOutHandler}>Logout</div>
                            </>
                    }
                </div>
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

