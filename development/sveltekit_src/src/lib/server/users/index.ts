import path from "node:path"
import { env } from "$env/dynamic/private"
import { BunSqliteKeyValue } from "bun-sqlite-key-value"
import type { User, Username, UserSub } from "$lib/interfaces"


const USER_PREFIX = "user:"
const USER_SUB_PREFIX = "sub:"
const USER_SUB_TTLMS = 120 * 24 * 60 * 1000

const dbPath = path.resolve(path.join(env.SQLITE_DIR, "users.sqlite"))
const db = new BunSqliteKeyValue(dbPath)


export namespace Users {

    /**
     * Save user into sqlite database.
     * @param {User} user
     */
    export function set(user: User) {
        console.debug(`server.users.set(${user.username})`)
        const key = USER_PREFIX + user.username

        // Add/edit user
        db.set<User>(key, user)

        // Add new SUB with 120 days TTL
        if (user.sub) {
            const subKey = USER_SUB_PREFIX + user.sub
            db.set<UserSub>(subKey, {username: user.username}, USER_SUB_TTLMS)
        }
    }


    /**
     * Load user from sqlite database.
     * @param {string} username
     * @returns {User | undefined}
     */
    export function get(username: Username): User | undefined {
        const key = USER_PREFIX + username
        return db.get<User>(key)
    }


    /**
     * Return the username for the `token.sub`.
     * @description
     * The `token.sub` changes on every log in.
     * But it is the only one connection between the tokens and the user.
     * So we saved it with a TTL of 120 days.
     * @param {string} sub
     * @returns {Username | undefined}
     */
    export function getUsernameBySub(sub: string): Username | undefined {
        const subKey = USER_SUB_PREFIX + sub
        return db.getValue<UserSub>(subKey)?.username || undefined
    }

}
