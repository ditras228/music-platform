import React, {FC} from 'react'
import {AppProps} from 'next/app'
import {wrapper} from '../store'
import {Provider} from 'next-auth/client'
import './reset.scss';
import './_app.scss';

const WrappedApp: FC<AppProps> = ({Component, pageProps}) => {
   return(
           <Provider session={pageProps.session}>
               <Component {...pageProps} />
           </Provider>
   )
}

export default wrapper.withRedux(WrappedApp);
