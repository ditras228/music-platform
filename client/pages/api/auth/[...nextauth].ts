import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import {UsersAPI} from '../../../api/usersAPI'

export default (req, res) => {
    NextAuth(req, res, {
        providers: [
            Providers.Credentials({
                name: 'Credentials',
                async authorize(credentials) {
                    const response = await UsersAPI.login(credentials)
                    if (response.data.status !== 500) {
                        return response.data
                    } else {
                        throw new Error(response.data.message)

                    }
                },
            }),
            Providers.GitHub({
                clientId: process.env.GITHUB_CLIENT_ID,
                clientSecret: process.env.GITHUB_CLIENT_SECRET
            })
        ],
        debug: process.env.NODE_ENV === 'development',
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
                if (token?.sub) {
                    console.log(token.sub)
                    token = await UsersAPI.getOne(token.sub).then(res => res.data)
                    token.accessToken = token.access_token
                }
                if (user?.accessToken) {
                    token.accessToken = user.accessToken
                    token.color = user.color
                    token.id = user.id
                }
                return token
            },
            async session(session, token) {
                console.log(token)
                session.accessToken = token.accessToken
                session.color = token.color
                session.userId = token.id
                session.image = token.image
                return session
            }

        }
    })
}
