import path from "node:path"
import { env } from "$env/dynamic/private"
import { BunSqliteKeyValue } from "bun-sqlite-key-value"
import type { User, Username } from "$lib/interfaces"


const USER_PREFIX = "user:"
const TAG_SUB_PREFIX = "sub:"

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

        const oldUserSub = get(user.username)?.sub
        db.set<User>(key, user)

        // Remove old SUB tag
        if (oldUserSub) {
            const oldSubTag = TAG_SUB_PREFIX + oldUserSub
            db.deleteTag(key, oldSubTag)
        }
        // Add new SUB tag
        if (user.sub) {
            const subTag = TAG_SUB_PREFIX + user.sub
            db.addTag(key, subTag)
        }
    }


    /**
     * Load user from sqlite database.
     * @param {string} username
     * @returns {User | undefined}
     */
    export function get(username: Username): User | undefined {
        console.debug(`server.users.getByUsername(${username})`)
        const key = USER_PREFIX + username
        return db.get<User>(key)
    }


    /**
     * Return the username for the `token.sub`.
     * @description
     * The `token.sub` changes on every log in.
     * But it is the only one connection between the tokens and the user.
     * So we saved it as *tag*.
     * @param {string} sub
     * @returns {Username | undefined}
     */
    export function getUsernameBySub(sub: string): Username | undefined {
        console.debug(`server.users.getUsernameBySub(${sub})`)
        const subTag = TAG_SUB_PREFIX + sub
        const keys = db.getTaggedKeys(subTag)
        if (keys) {
            return keys[0].substring("user:".length)
        }
    }

}




