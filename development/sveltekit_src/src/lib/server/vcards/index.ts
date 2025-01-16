import path from "node:path"
import { env } from "$env/dynamic/private"
import { BunSqliteKeyValue } from "bun-sqlite-key-value"
import type { Vcard } from "$lib/interfaces"


const VCARD_PREFIX = "vcard"

const dbPath = path.resolve(path.join(env.SQLITE_DIR, "vcards.sqlite"))
const db = new BunSqliteKeyValue(dbPath)


export namespace Vcards {

    export function deleteAllUserVcards(username: string) {
        console.debug(`server.vcards.deleteAllUserVcards(${username})`)
        const startsWith = `${VCARD_PREFIX}:${username}:`
        const keys = db.getKeys(startsWith)
        db.delete(keys)
    }


    export function set(username: string, vcard: Vcard): void {
        console.debug(`server.vcards.set(${username}, ...${vcard.url.substring(vcard.url.length - 40)})`)
        const addressBookHash = Bun.hash(vcard.addressBookUrl)
        const vcardHash = Bun.hash(vcard.url)
        const key = `${VCARD_PREFIX}:${username}:${addressBookHash}:${vcardHash}`
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


    export function get(username: string, addressBookUrl: string, vcardUrl: string): Vcard | undefined {
        console.debug(`server.vcards.get(${vcardUrl.substring(vcardUrl.length - 40)})`)
        const addressBookHash = Bun.hash(addressBookUrl)
        const vcardHash = Bun.hash(vcardUrl)
        const key = `${VCARD_PREFIX}:${username}:${addressBookHash}:${vcardHash}`
        return db.get<Vcard>(key)
    }


    export function getAllUserVcards(username: string): (Vcard | undefined)[] | undefined {
        console.debug(`server.vcards.getAllUserVcards(${username})`)
        const startsWith = `${VCARD_PREFIX}:${username}:`
        return db.getValues<Vcard>(startsWith)
    }


    export function getAllAddressBookVcards(username: string, addressBookUrl: string) {
        console.debug(`server.vcards.getAllAddressBookVcards(${username}, ${addressBookUrl.substring(addressBookUrl.length - 40)})`)
        const addressBookHash = Bun.hash(addressBookUrl)
        const startsWith = `${VCARD_PREFIX}:${username}:${addressBookHash}:`
        return db.getValues<Vcard>(startsWith)
    }

}




