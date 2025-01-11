import { getAccessToken } from "$lib/server/auth"
import { env } from "$env/dynamic/private"
import { DAVClient } from "tsdav"
import type { AddressBook } from "$lib/interfaces"


const NO_ACCESS_TOKEN_ERROR = "[NO ACCESS TOKEN ERROR]"

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


export async function getAddressBooks(username: string) {
    console.debug(`server.carddav.getAddressBooks(${username})`)

    const client = await getDavClient(username)

    const collection = await client.fetchAddressBooks()
    const addressBooks: AddressBook[] = collection.map((addressBook) => {
        return {
            url: addressBook.url,
            displayName: addressBook.displayName as string,
            ctag: addressBook.ctag as string,
            syncToken: addressBook.syncToken as string,
        }
    })

    return addressBooks
}

