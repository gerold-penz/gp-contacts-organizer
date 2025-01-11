import path from "node:path"
import { env } from "$env/dynamic/private"
import { BunSqliteKeyValue } from "bun-sqlite-key-value"
import type { User } from "$lib/interfaces"


const dbPath = path.resolve(path.join(env.SQLITE_DIR, "users.sqlite"))
const db = new BunSqliteKeyValue(dbPath)


export namespace Users {

    export function set(user: User) {
        console.debug(`server.users.set(${user.username})`)
        const key = `user:${user.username}`
        db.set<User>(key, user)
        if (user.sub) {
            const subTag = `sub:${user.sub}`
            db.addTag(key, subTag)
        }
    }


    export function get(username: string): User | undefined {
        console.debug(`server.users.getByUsername(${username})`)
        const key = `user:${username}`
        return db.get<User>(key)
    }


    // export function getUserBySub(sub: string) {
    //     console.debug(`Users.getBySub(${sub})`)
    //     const subTag = `sub:${sub}`
    //     const taggedValues = db.getTaggedValues(subTag)
    //     if (taggedValues) {
    //         return taggedValues.at(0)
    //     }
    // }


    export function getUsernameBySub(sub: string) {
        console.debug(`server.users.getUsernameBySub(${sub})`)
        const subTag = `sub:${sub}`
        const keys = db.getTaggedKeys(subTag)
        if (keys) {
            return keys[0].substring("user:".length)
        }
    }

}




