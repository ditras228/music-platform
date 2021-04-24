import React from 'react'
import Navbar from '../components/Navbar'
import {Container, makeStyles} from '@material-ui/core'
import Player from '../components/Player'
import Head from 'next/head'

interface MainLayoutProps {
    title?: string
    description?: string
    keywords?: string
}

const useStyles = makeStyles({
    container: {
        margin: '90px auto'
    }
})
const MainLayout: React.FC<MainLayoutProps> = ({
                                                   children,
                                                   title,
                                                   description,
                                                   keywords
                                               }) => {
    const classes=useStyles()

    return (
        <>
            <Head>
                <title>{title || 'Музыкальная площадка'}</title>
                <meta name={'description'} content={'Музыкальная площадка. Здесь каждый может стать знаменитым'
                + description}/>
                <meta name={'robots'} content={'index, follow'}/>
                <meta name={'keyword'} content={keywords || 'Музыка, треки, артисты'}/>
                <meta name={'viewport'} content={'width=device-width, initialScale=1'}/>
                <link rel="stylesheet"
                      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>

            </Head>
            <Navbar/>
            <Container className={classes.container}>
                {children}
            </Container>
            <Player/>
        </>
    )
}

export default MainLayout