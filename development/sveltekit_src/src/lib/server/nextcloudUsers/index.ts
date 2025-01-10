import path from "node:path"
import { env } from "$env/dynamic/private"
import { BunSqliteKeyValue } from "bun-sqlite-key-value"
import type { NextcloudUser } from "$lib/interfaces"


const dbPath = path.resolve(path.join(env.SQLITE_DIR, "nextcloudUsers.sqlite"))
const db = new BunSqliteKeyValue(dbPath)


export namespace NextcloudUsers {

    export function set(user: NextcloudUser) {
        console.debug(`NextcloudUsers.set(${user.userId})`)
        db.set<NextcloudUser>(user.userId, user)
        if (user.sub) {
            const subTag = `sub:${user.sub}`
            db.addTag(user.userId, subTag)
        }
    }


    export function getById(userId: string): NextcloudUser | undefined {
        console.debug(`NextcloudUsers.getById(${userId})`)
        return db.get<NextcloudUser>(userId)
    }


    export function getBySub(sub: string) {
        console.debug(`NextcloudUsers.getBySub(${sub})`)
        const subTag = `sub:${sub}`
        const taggedValues = db.getTaggedValues(subTag)
        if (taggedValues) {
            return taggedValues.at(0)
        }
    }

}



