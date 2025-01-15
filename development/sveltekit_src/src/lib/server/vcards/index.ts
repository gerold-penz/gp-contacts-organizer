import path from "node:path"
import { env } from "$env/dynamic/private"
import { BunSqliteKeyValue } from "bun-sqlite-key-value"
import type { Vcard } from "$lib/interfaces"


const VCARD_PREFIX = "vcard"

const dbPath = path.resolve(path.join(env.SQLITE_DIR, "vcards.sqlite"))
const db = new BunSqliteKeyValue(dbPath)


export namespace Vcards {

    export function deleteAllUserVcards(username: string) {
        console.debug(`server.vcards.deleteAll(${username})`)
        const startsWith = `${VCARD_PREFIX}:${username}:`
        const keys = db.getKeys(startsWith)
        db.delete(keys)
    }

    export function set(username: string, vcard: Vcard): void {
        console.debug(`server.vcards.set(${username}, ...${vcard.url.substring(vcard.url.length - 40)})`)
        const key = `${VCARD_PREFIX}:${username}:${vcard.url}`
        db.set<Vcard>(key, vcard)
    }


    export function batchSet(username: string, vcards: Vcard[]): void {
        console.debug(`server.vcards.setBatch(${username}, ${vcards.length})`)
        db.db.transaction(() => {
            vcards.forEach((vcard) => {
                set(username, vcard)
            })
        })()
    }


    export function get(username: string, vcardUrl: string): Vcard | undefined {
        console.debug(`server.vcards.get(${vcardUrl})`)
        const key = `${VCARD_PREFIX}:${username}:${vcardUrl}`
        return db.get<Vcard>(key)
    }

}




