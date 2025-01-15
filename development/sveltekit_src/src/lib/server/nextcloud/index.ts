import { getAccessToken } from "$lib/server/auth"
import { env } from "$env/dynamic/private"
import { DAVClient, type DAVVCard, fetchVCards } from "tsdav"
import type { NcAddressBook, Username } from "$lib/interfaces"


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
            headers: {"Authorization": `Bearer ${accessToken}`}
        }
    })
    _global_dav_client.accessToken = accessToken

    console.debug("DAV-Client is logging in...")
    await _global_dav_client.login()

    return _global_dav_client
}


export namespace Nextcloud {


    export async function getAddressBooks(username: Username): Promise<NcAddressBook[]> {
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


    export async function getAllVcards(username: Username, addressBookUrl: string): Promise<DAVVCard[]> {
        console.debug(`server.carddav.getAllContacts(${username}, ${addressBookUrl})`)

        const accessToken = await getAccessToken(username)
        if (!accessToken) {
            throw new Error(NO_ACCESS_TOKEN_ERROR)
        }

        const collection = await fetchVCards({
            addressBook: {url: addressBookUrl},
            headers: {"Authorization": `Bearer ${accessToken}`}
        })

        // https://next.gerold-penz.at/remote.php/dav/addressbooks/users/gerold/kontakte/
        // {
        //   url: "https://next.gerold-penz.at/remote.php/dav/addressbooks/users/gerold/kontakte/DA53F074-9383-42B6-86F3-38E38287DCC4.vcf",
        //   etag: "\"159ed52d2dd33c3fa1601f654a8495ed\"",
        //   data: "BEGIN:VCARD\r\n
        //   VERSION:3.0\r\n
        //   PRODID:-//Sabre//Sabre VObject 4.5.4//EN\r\n
        //   UID:c07bc863-dd67-47e0-a803-8a7d235e4765\r\n
        //   FN:Agnes Rimml\r\n
        //   N:Rimml;Agnes;;;\r\n
        //   TEL;TYPE=cell:+436504091122\r\n
        //   ADR;TYPE=home;LABEL=Telfs:;;;Telfs;;;\r\n
        //   REV;VALUE=DATE-AND-OR-TIME:20241212T142408Z\r\n
        //   END:VCARD",
        // }

        return collection
    }

}


