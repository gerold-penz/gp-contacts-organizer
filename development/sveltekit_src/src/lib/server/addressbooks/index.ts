import { getAccessToken } from "$lib/server/auth"
import { parseStringPromise } from "xml2js"
import {env} from "$env/dynamic/private"


export async function getAddressbooks(username: string) {

    const accessToken = await getAccessToken(username)

    const response = await fetch(`${env.NEXTCLOUD_URL}/remote.php/dav/addressbooks/users/${username}/`, {
        method: "PROPFIND",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Accept": "application/json",
            "Content-Type": "application/xml; charset=utf-8",
            "Depth": "1",
        }
    })
    if (!response.ok) return

    const result = await parseStringPromise(await response.text())
    const urls = result["d:multistatus"]["d:response"].map((item: any) => item["d:href"][0])

    console.log(urls)

    return urls
}
