import React, {FC} from 'react';
import {AppProps} from 'next/app';
import {wrapper} from '../store'
import {CookiesProvider} from 'react-cookie'
import {AppWrapper} from './AppContext'

const WrappedApp: FC<AppProps> = ({Component, pageProps}) => (
    <AppWrapper>
    <Component {...pageProps} />
    </AppWrapper>
);

export default wrapper.withRedux(WrappedApp);