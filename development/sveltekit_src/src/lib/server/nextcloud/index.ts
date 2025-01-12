import { getAccessToken } from "$lib/server/auth"
import { env } from "$env/dynamic/private"
import { DAVClient } from "tsdav"
import type { NcAddressBook } from "$lib/interfaces"


export const NO_ACCESS_TOKEN_ERROR = "[NO ACCESS TOKEN ERROR]"

let _global_dav_client: DAVClientExt


class DAVClientExt extends DAVClient {
    public accessToken?: string
}


async function getDavClient(username: string) {

    const accessToken = await getAccessToken(username)
    if (!accessToken) {
        throw new Error(NO_ACCESS_TOKEN_ERROR)
    }

    if (_global_dav_client && _global_dav_client.accessToken === accessToken) {
        return _global_dav_client
    }

    _global_dav_client = new DAVClient({
        serverUrl: `${env.NEXTCLOUD_URL}/remote.php/dav`,
        defaultAccountType: "carddav",
        authMethod: "Custom",
        credentials: {},
        fetchOptions: {
            headers: {"Authorization": `Bearer ${accessToken}`}
        }
    })
    _global_dav_client.accessToken = accessToken

    console.debug("DAV-Client is logging in...")
    await _global_dav_client.login()

    return _global_dav_client
}


export namespace Nextcloud {


    export async function getAddressBooks(username: string):Promise<NcAddressBook[]> {
        console.debug(`server.carddav.getAddressBooks(${username})`)

        const client = await getDavClient(username)
        const collection = await client.fetchAddressBooks()
        const addressBooks: NcAddressBook[] = collection.map((addressBook) => {
            return {
                url: addressBook.url,
                displayName: addressBook.displayName as string,
                ctag: addressBook.ctag,
                syncToken: addressBook.syncToken as string,
            }
        })

        return addressBooks
    }

}


// export namespace UserAddressBooks {
//     export async function update
// }
