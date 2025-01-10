import { SvelteKitAuth } from "@auth/sveltekit"
import Nextcloud from "@auth/sveltekit/providers/nextcloud"
import { env } from "$env/dynamic/private"
import { NextcloudUsers } from "$lib/server/nextcloudUsers"
import type { NextcloudUser } from "$lib/interfaces"


export const {handle, signIn, signOut} = SvelteKitAuth({
    callbacks: {
        jwt: async ({token, account}) => {

            // Save tokens
            if (account?.user_id && token?.sub) {
                const username = account.user_id as string
                const accessToken = account.access_token as string
                const refreshToken = account.refresh_token as string
                const sub = token.sub as string

                const nextcloudUser: NextcloudUser = {username, accessToken, refreshToken, sub}
                NextcloudUsers.setUser(nextcloudUser)
            }

            // Save expiration date
            if (token && token.sub && token.exp) {
                const nextcloudUser: NextcloudUser = NextcloudUsers.getUserBySub(token.sub)
                if (nextcloudUser) {
                    nextcloudUser.expiresAt = new Date(token.exp * 1000)
                    NextcloudUsers.setUser(nextcloudUser)
                }
            }

            return token
        },

        session: async ({session, token}) => {

            // 512 px Thumbnail nach 64 px umschreiben
            if (session?.user?.image && session?.user?.image.endsWith("512")) {
                session.user.image = session.user.image.substring(0, session.user.image.length - 3) + "64"
            }

            // Get username and return as "id"
            if (token?.sub) {
                const username = NextcloudUsers.getUsernameBySub(token.sub)
                if (username) {
                    session.user.id = username
                }
            }

            return session
        },
    },

    providers: [
        Nextcloud({
            clientId: env.AUTH_NEXTCLOUD_CLIENT_ID,
            clientSecret: env.AUTH_NEXTCLOUD_CLIENT_SECRET,
            issuer: env.NEXTCLOUD_URL,
        })
    ],
})

