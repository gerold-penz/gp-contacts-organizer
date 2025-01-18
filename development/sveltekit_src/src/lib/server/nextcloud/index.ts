import { getAccessToken } from "$lib/server/auth"
import { env } from "$env/dynamic/private"
import { addressBookQuery, DAVClient, DAVNamespaceShort, type DAVResponse, fetchVCards } from "tsdav"
import type { NcAddressBook, Username, Vcard } from "$lib/interfaces"


export const NO_ACCESS_TOKEN_ERROR = "[NO ACCESS TOKEN ERROR]"

let _global_dav_client: DAVClientExt


class DAVClientExt extends DAVClient {
    public accessToken?: string
}


async function getDavClient(username: Username) {

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
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        }
    })
    _global_dav_client.accessToken = accessToken

    console.debug("DAV-Client is logging in...")
    await _global_dav_client.login()

    return _global_dav_client
}


export namespace Nextcloud {


    export async function getAddressBooks(username: Username): Promise<NcAddressBook[]> {

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


    export async function getAllVcards(username: Username, addressBookUrl: string): Promise<Vcard[] | undefined> {

        const client = await getDavClient(username)

        // Get vCard urls
        const urlsResponse: DAVResponse[] = await client.propfind({
            url: addressBookUrl,
            props: {[`${DAVNamespaceShort.DAV}:getetag`]: {}},
        })
        if (!urlsResponse) return
        const objectUrls = urlsResponse.map((item) => {
            return env.NEXTCLOUD_URL + item.href
        })

        // Get vCards
        const vcardsResponse = await client.addressBookMultiGet({
            url: addressBookUrl,
            props: {
                [`${DAVNamespaceShort.DAV}:getetag`]: {},
                // See: https://github.com/nextcloud/contacts/issues/4038#issuecomment-2235176085
                [`${DAVNamespaceShort.CARDDAV}:address-data content-type="text/vcard" version="4.0"`]: {},
            },
            objectUrls,
            depth: "1"
        })
        if (!vcardsResponse) return

        const addressBookUrlHash = Bun.hash(addressBookUrl)
        return vcardsResponse.map((vcardResponse) => {
            return {
                addressBookUrlHash,
                vcardUrlHash: Bun.hash(vcardResponse.href!),
                url: vcardResponse.href,
                etag: vcardResponse.props?.getetag || undefined,
                data: vcardResponse.props?.addressData || undefined
            }
        }) as Vcard[]

    }


    // export async function loadAddressBookExportVcf(username: string, addressBookUrl: string): Promise<string | undefined> {
    //     const accessToken = await getAccessToken(username)
    //     if (!accessToken) {
    //         throw new Error(NO_ACCESS_TOKEN_ERROR)
    //     }
    //     const url = new URL(addressBookUrl + "?export")
    //     const response = await fetch(url, {
    //         headers: {
    //             "Authorization": `Bearer ${accessToken}`,
    //         }
    //     })
    //     if (response.ok) {
    //         return await response.text()
    //     }
    // }


}


