import { SvelteKitAuth } from "@auth/sveltekit"
import Nextcloud from "@auth/sveltekit/providers/nextcloud"
import { env } from "$env/dynamic/private"


export const {handle, signIn, signOut} = SvelteKitAuth({
    callbacks: {
        jwt: async ({token, session, user, profile, account, trigger}) => {

            if (token) {
                console.log("token ------------")
                console.log(token)
                console.log("token ------------")
            }
            if (session) {
                console.log("session ------------")
                console.log(session)
                console.log("session ------------")
            }
            if (user) {
                console.log("user ------------")
                console.log(user)
                console.log("user ------------")
            }
            if (profile) {
                console.log("profile ------------")
                console.log(profile)
                console.log("profile ------------")
            }
            if (account) {
                console.log("account ------------")
                console.log(account)
                console.log("account ------------")
            }
            if (trigger) {
                console.log("trigger ------------")
                console.log(trigger)
                console.log("trigger ------------")
            }


            // ToDo: "user_id", "access_token" und "refresh_token" extrahieren und speichern


            // -----------------
            // {
            //   access_token: "Afblb5MqMMIDiCT3FlPpLfM4ZPjVn7IXbtT4xtAkIGZFyetcPsa7ZcB62CJRMlYP7ap7pePe",
            //   token_type: "bearer",
            //   expires_in: 3600,
            //   refresh_token: "00QgtdAfWaPheRx0l4dkNqo7gPRadAcsmkRbeUIszrO79Mg0yl2zs024PCoNg5rlCHroWSkn5XvYlysNIZbtymmQF9jkvXn1HVZOoVXnrIgrNYxhCYOAIyswMSXGC8L6",
            //   user_id: "gerold",
            //   expires_at: 1736518751,
            //   providerAccountId: "gerold",
            // }
            // -----------------
            // {
            //   enabled: true,
            //   id: "gerold",
            //   lastLogin: 1736512513000,
            //   email: "gerold@gp-softwaretechnik.at",
            //   groups: [ "admin", "Rezepte" ],
            //   language: "de",
            //   locale: "de_AT",
            // }
            // -----------------

            return token
        },
        session: async ({session, token}) => {

            // 512 px Thumbnail nach 64 px umschreiben
            if (session?.user?.image && session?.user?.image.endsWith("512")) {
                session.user.image = session.user.image.substring(0, session.user.image.length - 3) + "64"
            }


            // console.log("SESSION ----------")
            // console.log(session)
            // console.log("SESSION ----------")
            //
            // console.log("TOKEN ----------")
            // console.log(token)
            // console.log("TOKEN ----------")

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

