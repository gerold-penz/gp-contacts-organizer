import path from "node:path"
import { env } from "$env/dynamic/private"
import { BunSqliteKeyValue } from "bun-sqlite-key-value"
import { parseVCards, type VCard4 } from "vcard4-tsm"
import type { Vcard, Hash, VcardParsed } from "$lib/interfaces"


const PARSED_PREFIX = "parsed"

const dbPath = path.resolve(path.join(env.SQLITE_DIR, "vcardsParsed.sqlite"))
const db = new BunSqliteKeyValue(dbPath)


export namespace VcardsParsed {

    export function deleteAllUserVcardsParsed(username: string) {
        console.debug(`server.vcardsParsed.deleteAllUserVcardsParsed(${username})`)
        const startsWith = `${PARSED_PREFIX}:${username}:`
        const keys = db.getKeys(startsWith)
        db.delete(keys)
    }


    export function set(username: string, addressBookUrlHash: Hash, vcardUrlHash: Hash, vcardParsed: VCard4): void {
        console.debug(`server.vcardsParsed.set(${username}, ${vcardParsed.FN[0].value.slice(0, 40)})`)
        const key = `${PARSED_PREFIX}:${username}:${addressBookUrlHash}:${vcardUrlHash}`
        db.set<VcardParsed>(key, {
            addressBookUrlHash,
            vcardUrlHash,
            vcardParsed,
        })
    }


    export function parseVcardAndSet(username: string, addressBookUrlHash: Hash, vcardUrlHash: Hash, vcardData: string) {
        const keepDefective = true
        const cards = parseVCards(vcardData, keepDefective)
        if (cards?.vCards?.length) {
            set(username, addressBookUrlHash, vcardUrlHash, cards.vCards[0])

        }
    }


    export function batchParseVcardsAndSet(username: string, vcards: Vcard[]): void {
        console.debug(`server.vcards.batchParseVcardsAndSet(${username}, ${vcards.length})`)
        db.db.transaction(() => {
            vcards.forEach((vcard) => {
                if (vcard?.data) {
                    parseVcardAndSet(username, vcard.addressBookUrlHash, vcard.vcardUrlHash, vcard.data)
                }
            })
        })()
    }

}




