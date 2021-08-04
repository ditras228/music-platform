import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import {UsersAPI} from '../../../api/usersAPI'
import {NextThunkDispatch} from '../../../store'
import {UsersActionTypes} from '../../../types/user'

export default(req, res)=>{
    NextAuth(req,res,{
        providers:[
            Providers.Credentials({
                name: 'Credentials',
                async authorize(credentials) {
                    const response = await UsersAPI.login(credentials)
                    console.log('auth= '+JSON.stringify(response.data))
                    if(response.data.status!==500){
                        return response.data
                    }else{
                        throw new Error(response.data.message)

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
        pages: {
            signIn: '/'
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
                if(token?.sub){
                   token =await UsersAPI.getOne(token.sub).then(res=>res.data)
                }
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
                session.id= token.sub
                session.image=token.image
                return session
            }

        }
    })
}