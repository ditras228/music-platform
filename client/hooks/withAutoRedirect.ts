import {useRouter} from 'next/router'
import {useTypedSelector} from './useTypedSelector'

export const withAutoRedirect = () =>{
        const router = useRouter()
        const {isAuth} = useTypedSelector(state=> state.user)
        if (!isAuth) return   typeof window !== 'undefined' && router.push('auth/')
}
