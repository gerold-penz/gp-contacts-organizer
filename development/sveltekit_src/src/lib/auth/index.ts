import { SvelteKitAuth } from "@auth/sveltekit"
import Nextcloud from "@auth/sveltekit/providers/nextcloud"
import { env } from "$env/dynamic/private"


export const { handle, signIn, signOut } = SvelteKitAuth({
  providers: [
      Nextcloud({
        clientId: env.AUTH_NEXTCLOUD_CLIENT_ID,
        clientSecret: env.AUTH_NEXTCLOUD_CLIENT_SECRET,
        issuer: env.AUTH_NEXTCLOUD_ISSUER_URL
      })
  ],
})

