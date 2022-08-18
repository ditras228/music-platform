import React, {useEffect} from 'react'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import {useRouter} from 'next/router'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import AlbumIcon from '@material-ui/icons/Album'
import classes from './Navbar.module.css'
import {Avatar, Button, Divider, Menu, MenuItem, useTheme} from '@material-ui/core'
import {signOut, useSession} from 'next-auth/client'
import {useDispatch} from 'react-redux'
import {useTypedSelector} from '../../hooks/useTypedSelector'
import {Brightness4, Brightness7} from '@material-ui/icons'
import {ChangeTheme} from '../../store/action-creators/user'

const menuItem = [
    {text: 'Треки', href: '/'},
    {text: 'Альбомы', href: '/albums'},
]

export default function Navbar() {
    const [session, loading] = useSession() as any
    const router = useRouter()
    const [open, setOpen] = React.useState(false)
    const dispatch = useDispatch()
    const theme = useTheme()
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
            <CssBaseline/>
            <AppBar
                position="fixed"
                color={'default'}
                className={classes.AppBar}
            >
                <Toolbar className={classes.toolbar}>
                    <>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" noWrap className={classes.logo} onClick={() => tracksHandler()}>
                            <MusicNoteIcon/>MERNMusic
                        </Typography>
                    </>
                    <div className={classes.log}>

                        <IconButton
                            onClick={click}>
                            {isDark
                                ? <Brightness7/>
                                : <Brightness4/>
                            }
                        </IconButton>

                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={logOutHandler}>Logout</MenuItem>
                        </Menu>
                        {
                            !session
                                ? <Button onClick={() => logInHandler()}>Login</Button>
                                : (
                                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                        <Avatar alt="Remy Sharp" src={session.image}
                                                style={{backgroundColor: session.color || 'gray'}}>
                                            {session.user?.name?.substring(0, 1)}
                                        </Avatar>
                                    </Button>
                                )
                        }
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="persistent"
                anchor="left"
                open={open}
            >
                <div className={classes.List_header}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                    <Typography variant="h5" noWrap className={classes.logo}>
                        <MusicNoteIcon/>MERNMusic
                    </Typography>
                </div>
                <Divider/>

                <List>
                    {menuItem.map(({text, href}, index) => (
                        <ListItem button key={href} onClick={() => router.push(href)}>
                            <ListItemIcon>
                                {getIcon(index)}
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </div>
    )
}
const getIcon = (index) => {
    switch (index) {
        case 0:
            return <MusicNoteIcon/>
        case 1:
            return <AlbumIcon/>
    }
}

