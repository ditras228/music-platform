import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import {UsersAPI} from '../../../api/usersAPI'

export default(req, res)=>{
    NextAuth(req,res,{
        providers:[
            Providers.Credentials({
                name: 'Login',
                credentials: {
                    username: {label: 'Email', type: 'text', placeholder: 'example@gmail.com'},
                    password: {label: 'Password', type: 'password', placeholder: 'password'}
                },
                async authorize(credentials) {
                    const response = await UsersAPI.login(credentials)
                    if(response){
                        return response.data
                    }else{
                        return null
                    }
                },
            }),
            Providers.GitHub({
                clientId: process.env.GITHUB_CLIENT_ID,
                clientSecret: process.env.GITHUB_CLIENT_SECRET
            })
        ],
        debug: process.env.NODE_ENV==='development',
        secret: process.env.github_client_secret,
        jwt: {
            secret: process.env.JWT_SECRET,
        },
        database: process.env.DB_URL,
    })
}