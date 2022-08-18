import React from 'react'
import Navbar from '../components/navbar/navbar'
import Player from '../components/player/player'
import Head from 'next/head'
import classes from './MainLayout.module.scss'
import LoadingModal from "../modals/loading-modal/loading-modal";

interface MainLayoutProps {
    children:any;
    title?: string
    description?: string
    keywords?: string
}

const MainLayout: React.FC<MainLayoutProps> = ({
                                                   children,
                                                   title,
                                                   description,
                                                   keywords,
                                               }) => {
    return (
        <>
            <Head>
                <title>{title || 'MERNMusic'}</title>
                <meta name={'description'} content={'MERNMusic. Здесь каждый может стать знаменитым'
                    + description}/>
                <meta name={'robots'} content={'index, follow'}/>
                <meta name={'keyword'} content={keywords || 'Музыка, треки, артисты'}/>
                <meta name={'viewport'} content={'width=device-width, initialScale=1'}/>
                <link rel="stylesheet"
                      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>

            </Head>
            <Navbar/>
            <div className={classes.container}>
                {children}
            </div>
            <Player/>
            <LoadingModal/>
        </>
    )
}
export default MainLayout
