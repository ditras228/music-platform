import React from 'react'
import Navbar from '../components/Navbar'
import {Container} from '@material-ui/core'
import s from './MainLayout.module.css'
const MainLayout: React.FC = ({children}) => {
    return (
        <div>
            <Navbar/>
            <Container className={s.container}>
                {children}
            </Container>
        </div>
    )
}

export default MainLayout