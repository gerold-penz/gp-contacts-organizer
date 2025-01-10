import type { LayoutServerLoad } from "./$types"
import type { User } from "@auth/core/types"


export const load: LayoutServerLoad = ({locals}) => {

    const user: User | undefined = locals?.user || undefined


    return {
        user
    }
}
