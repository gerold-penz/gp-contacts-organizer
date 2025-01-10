import type { Handle } from "@sveltejs/kit"
import { sequence } from "@sveltejs/kit/hooks"
import { handle as handleAuth } from "$lib/auth"
import type { User, Session } from "@auth/core/types"



const handleCustom: Handle = async ({event, resolve}) => {
    const {locals} = event

    const session: Session | undefined = await locals.auth() || undefined
    const user: User | undefined = session?.user || undefined

    locals.user = user

    return resolve(event)
}


export const handle: Handle = sequence(
    handleAuth,
    handleCustom,
)

