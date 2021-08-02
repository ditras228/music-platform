import React, {FC} from 'react'
import {AppProps} from 'next/app'
import {wrapper} from '../store'
import {Provider} from 'next-auth/client'
import {ThemeProvider} from '@material-ui/styles'

import {useTypedSelector} from '../hooks/useTypedSelector'
import {createMuiTheme} from '@material-ui/core/styles'


const WrappedApp: FC<AppProps> = ({Component, pageProps}) => {
    const isDark = useTypedSelector(state=>state.user.isDark) as any

    const theme= createMuiTheme({
        palette: {
            type: isDark ? 'dark' : 'light'
        }
    })

   return(
       <ThemeProvider theme={theme}>
           <Provider session={pageProps.session}>
               <Component {...pageProps} />
           </Provider>
       </ThemeProvider>
   )
}


export default wrapper.withRedux(WrappedApp);