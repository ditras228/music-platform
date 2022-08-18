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
    const [open, setOpen] = React.useState(false)
    const dispatch = useDispatch()
    // const theme = useTheme()
    const isDark = useTypedSelector(state => state.user.isDark) as any
    useEffect(() => {
        if (!session?.user?.email) {
            logOutHandler
        }
    }, [session])
    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }
    const logOutHandler = async () => {
        await signOut()
    }
    const tracksHandler = async () => {
        await router.push('/tracks')
    }
    const logInHandler = async () => {
        await router.push('/')
    }
    const click = () => {
        dispatch(ChangeTheme(!isDark))
    };
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div>
            <div
                className={classes.navbar}
            >
                <div className={classes.toolbar}>
                    <>
                        <div
                            onClick={handleDrawerOpen}
                        >
                            <div/>
                        </div>
                        <div className={classes.logo} onClick={() => tracksHandler()}>
                            <div/>MERNMusic
                        </div>
                    </>
                    <div className={classes.log}>
                        <div
                        >
                            <div onClick={logOutHandler}>Logout</div>
                        </div>
                        {
                            !session
                                ? <button onClick={() => logInHandler()}>Login</button>
                                : (
                                    <button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                        {/*<Avatar alt="Remy Sharp" src={session.image}*/}
                                        {/*        style={{backgroundColor: session.color || 'gray'}}>*/}
                                        {/*    {session.user?.name?.substring(0, 1)}*/}
                                        {/*</Avatar>*/}
                                    </button>
                                )
                        }
                    </div>
                </div>
            </div>
            <div
            >
                <div className={classes.List_header}>
                    {/*<button onClick={handleDrawerClose}>*/}
                    {/*    {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}*/}
                    {/*</button>*/}
                    <div className={classes.logo}>
                        <div><div/>MERNMusic
                    </div>
                </div>

                <div>
                    {menuItem.map(({text, href}, index) => (
                        <div  key={href} onClick={() => router.push(href)}>
                            <div>
                                {getIcon(index)}
                            </div>
                            {text}
                        </div>
                    ))}
                </div>
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

