import { redirect, type Load } from "@sveltejs/kit"
import { status } from "http-status"


export const load: Load = async ({parent}) => {
    const {activeAddressBooks} = await parent()
    if (activeAddressBooks?.length) {
        return redirect(status.FOUND, "/contacts/all")
    }
}
