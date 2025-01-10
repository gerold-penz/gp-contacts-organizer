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
                const userId = account.user_id as string
                const accessToken = account.access_token as string
                const refreshToken = account.refresh_token as string
                const sub = token.sub as string

                const nextcloudUser: NextcloudUser = {userId, accessToken, refreshToken, sub}
                NextcloudUsers.set(nextcloudUser)
            }

            // Save expiration date
            if (token && token.sub && token.exp) {
                const nextcloudUser: NextcloudUser = NextcloudUsers.getBySub(token.sub)
                if (nextcloudUser) {
                    nextcloudUser.expiresAt = new Date(token.exp * 1000)
                    NextcloudUsers.set(nextcloudUser)
                }
            }

            return token
        },

        session: async ({session}) => {

            // 512 px Thumbnail nach 64 px umschreiben
            if (session?.user?.image && session?.user?.image.endsWith("512")) {
                session.user.image = session.user.image.substring(0, session.user.image.length - 3) + "64"
            }

            return session
        },
    },

    providers: [
        Nextcloud({
            clientId: env.AUTH_NEXTCLOUD_CLIENT_ID,
            clientSecret: env.AUTH_NEXTCLOUD_CLIENT_SECRET,
            issuer: env.AUTH_NEXTCLOUD_ISSUER_URL,
        })
    ],
})

