export const withAutoRedirect = (isPublic: boolean, isAuth: boolean, router: any) =>{
        if (!isAuth && !isPublic) return   typeof window !== 'undefined' && router.push('auth/')
        if (isAuth && isPublic) return   typeof window !== 'undefined' && router.push('/tracks')
}
