import path from "node:path"
import { env } from "$env/dynamic/private"
import { BunSqliteKeyValue } from "bun-sqlite-key-value"
import { parseVCards, type VCard4 } from "vcard4-tsm"


const VCARD_PREFIX = "parsed"

const dbPath = path.resolve(path.join(env.SQLITE_DIR, "vcardsParsed.sqlite"))
const db = new BunSqliteKeyValue(dbPath)


export namespace VcardsParsed {

    export function parseVcard(vcardData: string): VCard4 | undefined {
        const keepDefective = true
        const cards = parseVCards(vcardData, keepDefective)
        if (cards?.vCards?.length) {
            const card: VCard4 = cards.vCards[0]
            return card
        }
    }

}




