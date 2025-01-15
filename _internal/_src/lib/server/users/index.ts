import path from "node:path"
import { env } from "$env/dynamic/private"
import { BunSqliteKeyValue } from "bun-sqlite-key-value"
import type { User } from "$lib/interfaces"


const dbPath = path.resolve(path.join(env.SQLITE_DIR, "users.sqlite"))
const db = new BunSqliteKeyValue(dbPath)


export namespace Users {

    export function exists(username: string): boolean {
        console.debug(`server.users.Users.exists(${username})`)
        const usernameTag = "username:" + username
        return !!db.getTaggedKeys(usernameTag)?.length
    }





    export function changeUsername(userUuid: string, newUsername: string) {
        console.debug(`server.users.Users.changeUsername(${userUuid}, ${newUsername})`)


    }

}
