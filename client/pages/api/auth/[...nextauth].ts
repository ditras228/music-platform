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
                    console.log('auth= '+JSON.stringify(response.data))
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
            async jwt(token, user, account, profile, isNewUser) {
                // Add access_token to the token right after signin
                console.log('____________')
                console.log(token)
                console.log(`accessToken ====`+token.accessToken)
                console.log(user)
                console.log(account)
                console.log(profile)
                console.log(isNewUser)
               // if(account){
               //     token =await UsersAPI.getOne(user.id).then(res=>res.data)
               // }
                if (user?.accessToken) {
                    token.accessToken = user.accessToken
                    token.color = user.color
                }

                return token
            },
            async session(session, token) {
                // Add property to session, like an access_token from a provider.
                session.accessToken = token.accessToken
                session.color = token.color
                return session
            }

        }
    })
}