import path from "node:path"
import { env } from "$env/dynamic/private"
import { BunSqliteKeyValue } from "bun-sqlite-key-value"
import type { User } from "$lib/interfaces"


const dbPath = path.resolve(path.join(env.SQLITE_DIR, "users.sqlite"))
const db = new BunSqliteKeyValue(dbPath)


export namespace Users {

    export function set(user: User) {
        console.debug(`NextcloudUsers.set(${user.username})`)
        db.set<User>(user.username, user)
        if (user.sub) {
            const subTag = `sub:${user.sub}`
            db.addTag(user.username, subTag)
        }
    }


    export function get(username: string): User | undefined {
        console.debug(`NextcloudUsers.getByUsername(${username})`)
        return db.get<User>(username)
    }


    // export function getUserBySub(sub: string) {
    //     console.debug(`NextcloudUsers.getBySub(${sub})`)
    //     const subTag = `sub:${sub}`
    //     const taggedValues = db.getTaggedValues(subTag)
    //     if (taggedValues) {
    //         return taggedValues.at(0)
    //     }
    // }


    export function getUsernameBySub(sub: string) {
        console.debug(`NextcloudUsers.getUsernameBySub(${sub})`)
        const subTag = `sub:${sub}`
        const usernames = db.getTaggedKeys(subTag)
        if (usernames) {
            return usernames.at(0)
        }
    }

}



