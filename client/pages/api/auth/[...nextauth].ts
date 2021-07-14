import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import {UsersAPI} from '../../../api/usersAPI'

export default(req, res)=>{
    NextAuth(req,res,{
        providers:[
            Providers.Credentials({
                name: 'Login',
                credentials: {
                    email: {label: 'Email', type: 'text', placeholder: 'example@gmail.com'},
                    name: {label: 'Username', type: 'text', placeholder: 'example'},
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
        session: {
            jwt: true,
            // Seconds - How long until an idle session expires and is no longer valid.
            maxAge: 30 * 24 * 60 * 60, // 30 days
        },
        jwt: {
            secret: process.env.JWT_SECRET,
        },
        database: process.env.DB_URL,
        callbacks: {
            session: async (session, token) => {
                session.accessToken = token.accessToken
                return Promise.resolve(session)
            }

        }
    })
}