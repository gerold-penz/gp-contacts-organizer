import path from "node:path"
import { env } from "$env/dynamic/private"
import { BunSqliteKeyValue } from "bun-sqlite-key-value"
import type { Vcard } from "$lib/interfaces"


const VCARD_PREFIX = "vcard:"

const dbPath = path.resolve(path.join(env.SQLITE_DIR, "vcards.sqlite"))
const db = new BunSqliteKeyValue(dbPath)


export namespace Vcards {

    export function set(vcard: Vcard): void {
        console.debug(`server.vcards.set(${vcard.url})`)
        const key = VCARD_PREFIX + vcard.url
    }


    export function setBatch(vcards: Vcard[]): void {
        console.debug(`server.vcards.setBatch(${vcards.length})`)
        db.db.transaction(() => {
            vcards.forEach((vcard) => {
                set(vcard)
            })
        })()
    }


    export function get(vcardUrl: string): Vcard | undefined {
        console.debug(`server.vcards.get(${vcardUrl})`)
        const key = VCARD_PREFIX + vcardUrl
        return db.get<Vcard>(key)
    }

}




