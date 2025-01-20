import path from "node:path"
import { env } from "$env/dynamic/private"
import { BunSqliteKeyValue } from "bun-sqlite-key-value"
import { parseVCards, type VCard4 } from "vcard4-tsm"
import type { Vcard, Hash, VcardParsed } from "$lib/interfaces"
import parseDataUrl, { type DataUrl } from "parse-data-url"
import sharp from "sharp"


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


    export function set(username: string, addressBookUrlHash: Hash, vcardUrlHash: Hash, vcardParsed: VCard4, thumbnailBuffer?: Buffer): void {
        console.debug(`server.vcardsParsed.set(${username}, ${vcardParsed.FN[0].value.slice(0, 10)}...)`)
        const key = `${PARSED_PREFIX}:${username}:${addressBookUrlHash}:${vcardUrlHash}`
        db.set<VcardParsed>(key, {
            addressBookUrlHash,
            vcardUrlHash,
            vcardParsed,
            thumbnailBuffer
        })
    }


    export async function parseVcardAndSet(username: string, addressBookUrlHash: Hash, vcardUrlHash: Hash, vcardData: string) {
        const keepDefective = true
        const cards = parseVCards(vcardData, keepDefective)
        if (cards?.vCards?.length) {
            const vcard = cards.vCards[0]

            // Get thumbnail
            const imageValue = vcard.PHOTO?.[0].value
            const imageParams = vcard?.PHOTO?.[0].parameters
            let thumbnailBuffer: Buffer | undefined = undefined

            if (imageValue && imageParams?.VALUE === "URI") {
                if (imageValue.startsWith("data:")) {
                    const parsed = parseDataUrl(imageValue) as DataUrl
                    if (parsed?.contentType?.toLowerCase().startsWith("image")) {
                        const imageBuffer = parsed.toBuffer()
                        if (imageBuffer) {
                            thumbnailBuffer = await sharp(imageBuffer)
                                .resize({width: 40, fit: "cover"})
                                .webp()
                                .toBuffer()
                        }
                    }
                }
            }

            // Save
            set(username, addressBookUrlHash, vcardUrlHash, vcard, thumbnailBuffer)
        }


        // BEGIN:VCARD
        // VERSION:3.0
        // PRODID:-//Sabre//Sabre VObject 4.5.4//EN
        // UID:c07bc863-dd67-47e0-a803-8a7d235e4765
        // FN:Agnes Rimml
        // N:Rimml;Agnes;;;
        // TEL;TYPE=cell:+436504091122
        // ADR;TYPE=home;LABEL=Telfs:;;;Telfs;;;
        // ITEM1.X-ABDATE;VALUE=DATE-AND-OR-TIME:20250117
        // ITEM1.X-ABLABEL:_$!<Anniversary>!$_
        // X-ANNIVERSARY;VALUE=DATE:20250117
        // REV;VALUE=DATE-AND-OR-TIME:20250117T211228Z
        // END:VCARD

        // {
        //   "nags": [
        //     {
        //       "key": "VALUE_INVALID",
        //       "description": "Invalid property value",
        //       "isError": true,
        //       "attributes": {
        //         "property": "VERSION",
        //         "line": "VERSION:3.0"
        //       }
        //     }
        //   ],
        //   "BEGIN": {
        //     "value": "VCARD"
        //   },
        //   "VERSION": {
        //     "value": "3.0"
        //   },
        //   "PRODID": {
        //     "value": "-//Sabre//Sabre VObject 4.5.4//EN"
        //   },
        //   "UID": {
        //     "value": "c07bc863-dd67-47e0-a803-8a7d235e4765"
        //   },
        //   "FN": [
        //     {
        //       "value": "Agnes Rimml"
        //     }
        //   ],
        //   "N": {
        //     "value": {
        //       "familyNames": [
        //         "Rimml"
        //       ],
        //       "givenNames": [
        //         "Agnes"
        //       ],
        //       "additionalNames": [
        //         ""
        //       ],
        //       "honorificPrefixes": [
        //         ""
        //       ],
        //       "honorificSuffixes": [
        //         ""
        //       ]
        //     }
        //   },
        //   "TEL": [
        //     {
        //       "parameters": {
        //         "TYPE": [
        //           "CELL"
        //         ]
        //       },
        //       "value": "+436504091122"
        //     }
        //   ],
        //   "ADR": [
        //     {
        //       "parameters": {
        //         "TYPE": [
        //           "HOME"
        //         ]
        //       },
        //       "value": {
        //         "postOfficeBox": [
        //           ""
        //         ],
        //         "extendedAddress": [
        //           ""
        //         ],
        //         "streetAddress": [
        //           ""
        //         ],
        //         "locality": [
        //           "Telfs"
        //         ],
        //         "region": [
        //           ""
        //         ],
        //         "postalCode": [
        //           ""
        //         ],
        //         "countryName": [
        //           ""
        //         ]
        //       }
        //     }
        //   ],
        //   "REV": {
        //     "parameters": {
        //       "VALUE": "DATE-AND-OR-TIME"
        //     },
        //     "value": "20250117T214415Z"
        //   },
        //   "END": {
        //     "value": "VCARD"
        //   },
        //   "hasErrors": true
        // }

    }


    export async function batchParseVcardsAndSet(username: string, vcards: Vcard[]): Promise<void> {
        console.debug(`server.vcards.batchParseVcardsAndSet(${username}, ${vcards.length})`)
        await db.db.transaction(() => {
            vcards.forEach(async (vcard) => {
                if (typeof vcard?.data === "string") {
                    await parseVcardAndSet(username, vcard.addressBookUrlHash, vcard.vcardUrlHash, vcard.data)
                }
            })
        })()
    }


    export function getAllAddressBookVcardsParsed(username: string, addressBookUrlHash: Hash): VcardParsed[] | undefined {
        const startsWith = `${PARSED_PREFIX}:${username}:${addressBookUrlHash}:`
        return db.getValues<VcardParsed>(startsWith) as VcardParsed[] | undefined
    }

}




