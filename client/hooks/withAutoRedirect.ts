import {useRouter} from 'next/router'
import {useTypedSelector} from './useTypedSelector'

export const withAutoRedirect = (login: boolean) =>{
        const router = useRouter()
        const {isAuth} = useTypedSelector(state=> state.user)
        if (!isAuth && !login) return   typeof window !== 'undefined' && router.push('auth/')
        if (isAuth && login) return   typeof window !== 'undefined' && router.push('/')
}
