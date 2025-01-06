import path from "node:path"
import { env } from "$env/dynamic/private"
import { BunSqliteKeyValue } from "bun-sqlite-key-value"
import type { User } from "$lib/interfaces"


const BSKV_USERS_PATH = path.resolve(path.join(env.SQLITE_DIR, "users.sqlite"))
const db = new BunSqliteKeyValue(BSKV_USERS_PATH)


export namespace Users {

    export function get(userUuid?: string, username?: string): User | undefined {
        console.debug(`server.users.Users.get(${userUuid}, ${username})`)

        if (userUuid) {
            return db.get<User>(userUuid)
        } else if (username) {
            const usernameTag = "username:" + username
            const values = db.getTaggedValues<User>(usernameTag)
            if (values) return values[0]
        }
    }


    export function set(user: User) {
        console.debug(`server.users.Users.set(${user.username})`)

        db.set<User>(user.userUuid, user)
        const usernameTag = "username:" + user.username
        db.addTag(user.userUuid, usernameTag)
    }

}
