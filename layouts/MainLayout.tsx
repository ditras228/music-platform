import React from 'react'
import Navbar from '../components/Navbar'
import {Container} from '@material-ui/core'
import s from './MainLayout.module.css'
import Player from '../components/Player'
const MainLayout: React.FC = ({children}) => {
    return (
        <div>
            <Navbar/>
            <Container className={s.container}>
                {children}
            </Container>
            <Player/>
        </div>
    )
}

export default MainLayout