import type { LayoutServerLoad } from "./$types"
import type { Session } from "@auth/core/types"


export const load: LayoutServerLoad = ({locals}) => {

    const session: Session | undefined = locals?.session || undefined

    return {
        session
    }

}
