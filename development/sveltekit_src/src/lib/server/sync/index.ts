import type { User, Username } from "$lib/interfaces"
import { Users } from "$lib/server/users"
import { Nextcloud } from "$lib/server/nextcloud"
import { Vcards } from "$lib/server/vcards"
import { VcardsParsed } from "$lib/server/vcardsParsed"


export const USER_NOT_FOUND_ERROR = "[USER NOT FOUND ERROR]"


/**
 * Update the user's address book definitions.
 * @param {Username} username
 */
export async function updateUserAddressBookDefinitions(username: Username) {
    console.debug(`sync.updateUserAddressBookDefinitions(${username})`)

    let user: User = Users.get(username)!
    if (!user) throw new Error(USER_NOT_FOUND_ERROR)

    let userAddressBooks = user?.addressBooks ?? []
    const ncAddressBooks = (await Nextcloud.getAddressBooks(username)) ?? []

    ncAddressBooks.forEach((ncAddressBook) => {

        // Push webAddressBook to userAddressBooks if not exists
        const found = Boolean(userAddressBooks.find((userAddressBook) => {
            return ncAddressBook.url === userAddressBook.url
        }))
        if (!found) {
            userAddressBooks.push({
                addressBookUrlHash: Bun.hash(ncAddressBook.url),
                url: ncAddressBook.url,
                displayName: ncAddressBook.displayName,
                active: true
            })
        }

        // Update display name
        const userAddressBook = userAddressBooks.find((userAddressBook) => {
            return userAddressBook.url === ncAddressBook.url
        })
        if (userAddressBook) {
            userAddressBook.displayName = ncAddressBook.displayName
        }

    })

    // Delete userAdressBook if not in ncAddressBooks
    if (userAddressBooks?.length) {
        userAddressBooks = userAddressBooks.filter((userAddressBook) => {
            return ncAddressBooks.find((ncAddressBook) => {
                return ncAddressBook.url === userAddressBook.url
            })
        })
    }

    // Speichern
    user = Users.get(username)!
    user.addressBooks = userAddressBooks
    Users.set(user)

}


export async function updateOrInsertVcards(username: Username, addressBookUrl: string) {
    console.debug(`sync.updateOrInsertVcards(${username}, ${addressBookUrl})`)

    const vcards = await Nextcloud.getAllVcards(username, addressBookUrl)
    if (!vcards) return

    // Insert or update all vCards into the database
    Vcards.batchSet(username, vcards)


    // TESTS

    const vcard = vcards.find((vcard) => vcard.data?.includes("c07bc863-dd67-47e0-a803-8a7d235e4765"))!
    if (vcard?.data) {
        console.log("vcard", vcard.data)

        const vcardParsed = VcardsParsed.parseVcard(vcard.data)
        console.log("vcardParsed", JSON.stringify(vcardParsed, undefined, 2))
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
