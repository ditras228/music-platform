import React, {FC, useEffect} from 'react'
import {AppProps} from 'next/app';
import {wrapper} from '../store'
import { Provider } from 'next-auth/client'
import {ThemeProvider} from '@material-ui/styles'
import {initTheme} from '../components/Navbar'

const WrappedApp: FC<AppProps> = ({Component, pageProps}) => (
    <ThemeProvider theme={()=>initTheme()}>
    <Provider session={pageProps.session}>
        <Component {...pageProps} />
    </Provider>
    </ThemeProvider>
);

export default wrapper.withRedux(WrappedApp);