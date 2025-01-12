import { SvelteKitAuth } from "@auth/sveltekit"
import Nextcloud from "@auth/sveltekit/providers/nextcloud"
import { env } from "$env/dynamic/private"
import { Users } from "$lib/server/users"
import type { RefreshTokenResult, User } from "$lib/interfaces"


const nextcloudProvider = Nextcloud({
    clientId: env.AUTH_NEXTCLOUD_CLIENT_ID,
    clientSecret: env.AUTH_NEXTCLOUD_CLIENT_SECRET,
    issuer: env.NEXTCLOUD_URL,
})


export const {handle, signIn, signOut} = SvelteKitAuth({
    callbacks: {
        jwt: async ({token, account}) => {

            // Save tokens
            if (account?.user_id && token?.sub) {
                const username = account.user_id as string
                const accessToken = account.access_token as string
                const refreshToken = account.refresh_token as string
                const sub = token.sub as string
                const expiresAt = account.expires_at as number

                const user: User = {username, accessToken, refreshToken, sub, expiresAt: expiresAt}
                Users.set(user)
            }

            return token
        },

        session: async ({session, token}) => {

            // Replace 512 px thumbnail by 64 px thumbnail
            if (session?.user?.image && session.user.image.endsWith("/512")) {
                session.user.image = session.user.image.substring(0, session.user.image.length - 4) + "/64"
            }

            // Load the username and make it available as ID
            if (!session?.user?.id && token?.sub) {
                const username = Users.getUsernameBySub(token.sub)
                if (username) {
                    session.user.id = username
                }
            }

            return session
        },
    },

    providers: [
        nextcloudProvider
    ],
})


/**
 * Refresh Nextcloud access token.
 * @description
 * Updates the tokens of the user and saves it to the sqlite database.
 * @param {User} user
 * @returns {Promise<User | undefined>}
 * Returns the updated user.
 */
async function refreshAccessToken(user: User): Promise<User | undefined> {
    console.debug(`server.auth.refreshAccessToken(${user.username})`)

    const url = nextcloudProvider.token
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            client_id: env.AUTH_NEXTCLOUD_CLIENT_ID,
            client_secret: env.AUTH_NEXTCLOUD_CLIENT_SECRET,
            grant_type: "refresh_token",
            refresh_token: user.refreshToken!
        })
    })
    if (!response.ok) return

    // Update user data
    const result: RefreshTokenResult = await response.json()
    user.refreshToken = result.refresh_token
    user.accessToken = result.access_token
    user.expiresAt = Math.floor(Date.now() / 1000 + result.expires_in - 10)

    // Save user
    Users.set(user)

    return user
}


/**
 * Return the Nextcloud access token of the user.
 * @description
 * If the token is too old, it is renewed and saved.
 * @param {string} username
 * @returns {Promise<string | undefined>}
 * Returns the (updated) access token.
 * If this is not possible, `undefined` is returned.
 */
export async function getAccessToken(username: string): Promise<string | undefined> {
    console.debug(`server.auth.getAccessToken(${username})`)

    let user = Users.get(username)
    if (!user) return

    if (user?.refreshToken) {
        const nowMs = Date.now()
        const expiresMs = (user.expiresAt ?? 0) * 1000
        // 5 minutes reserve
        if (expiresMs < (nowMs + 300_000)) {
            const updatedUser = await refreshAccessToken(user)
            if (updatedUser) {
                user = updatedUser
            }
        }
    }

    return user?.accessToken || undefined

}


