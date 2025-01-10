import path from "node:path"
import { env } from "$env/dynamic/private"
import { BunSqliteKeyValue } from "bun-sqlite-key-value"
import type { NextcloudUser } from "$lib/interfaces"


const dbPath = path.resolve(path.join(env.SQLITE_DIR, "nextcloudUsers.sqlite"))
const db = new BunSqliteKeyValue(dbPath)


export namespace NextcloudUsers {

    export function setUser(user: NextcloudUser) {
        console.debug(`NextcloudUsers.set(${user.username})`)
        db.set<NextcloudUser>(user.username, user)
        if (user.sub) {
            const subTag = `sub:${user.sub}`
            db.addTag(user.username, subTag)
        }
    }


    export function getUserByUsername(username: string): NextcloudUser | undefined {
        console.debug(`NextcloudUsers.getByUsername(${username})`)
        return db.get<NextcloudUser>(username)
    }


    export function getUserBySub(sub: string) {
        console.debug(`NextcloudUsers.getBySub(${sub})`)
        const subTag = `sub:${sub}`
        const taggedValues = db.getTaggedValues(subTag)
        if (taggedValues) {
            return taggedValues.at(0)
        }
    }


    export function getUsernameBySub(sub: string) {
        console.debug(`NextcloudUsers.getUsernameBySub(${sub})`)
        const subTag = `sub:${sub}`
        const usernames = db.getTaggedKeys(subTag)
        if (usernames) {
            return usernames.at(0)
        }
    }


    export function getAccessTokenByUsername(username: string): string | undefined {
        const nextcloudUser = getUserByUsername(username)
        if (!nextcloudUser) return
        return nextcloudUser.accessToken
    }

}



