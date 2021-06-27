import React from 'react'
import {useTheme} from '@material-ui/core/styles'
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
import AppsIcon from '@material-ui/icons/Apps';
import {LockOpen, Note} from '@material-ui/icons'
import classes from './NavBar.module.css'
import {Button} from '@material-ui/core'
import {useTypedSelector} from '../hooks/useTypedSelector'

const menuItem = [
    {text: 'Треки', href: '/tracks'},
    {text: 'Альбомы', href: '/albums'},
]

export default function Navbar() {
    const router = useRouter()
    const theme = useTheme()
    const [open, setOpen] = React.useState(false)
    const {isAuth} = useTypedSelector(state=>state.user)
    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }
    const logOutHandler = ()=>{

    }
    return (
        <div>
            <CssBaseline/>
            <AppBar
                position="fixed"
                color={'secondary'}
                className={classes.AppBar}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h5" noWrap className={classes.logo}>
                        <MusicNoteIcon/>MERNMusic
                    </Typography>
                    {
                        !isAuth
                            ?<Button onClick={()=>router.push('/auth')}>Login</Button>
                            :<Button onClick={()=>logOutHandler()}>LogoOut</Button>
                    }
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
const getIcon = (index)=>{
    switch(index){
        case 0:
            return <MusicNoteIcon/>
        case 1:
            return <AlbumIcon/>
    }
}