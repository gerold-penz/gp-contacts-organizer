import type { User } from "$lib/interfaces"
import { Users } from "$lib/server/users"
import { env } from "$env/dynamic/private"


export namespace Auth {

    export const INVALID_USERNAME_ERROR = "[INVALID USERNAME ERROR]"
    export const INVALID_PASSWORD_ERROR = "[INVALID PASSWORD ERROR]"

    export const USERNAME_NOT_EXISTS_ERROR = "[USERNAME NOT EXISTS ERROR]"
    export const USERNAME_EXISTS_ERROR = "[USERNAME EXISTS ERROR]"


    export function register(username: string, password: string): User {

        // Check username
        username = username.trim()
        if (
            !username ||
            username.length < Number(env.USERNAME_MIN_LENGHT) ||
            username.length > Number(env.USERNAME_MAX_LENGTH)
        ) {
            throw new Error(INVALID_USERNAME_ERROR)
        }

        // Check password
        password = password.trim()
        if (
            !password ||
            password.length < Number(env.PASSWORD_MIN_LENGTH) ||
            password.length > Number(env.PASSWORD_MAX_LENGTH)
        ) {
            throw new Error(INVALID_PASSWORD_ERROR)
        }

        // Check if username exists
        if (Users.get(undefined, username)) {
            throw new Error(USERNAME_EXISTS_ERROR)
        }

        // Create user
        const newUser: User = {
            userUuid: crypto.randomUUID(),
            username,
            passwordHash: Bun.password.hashSync(password)
        }
        Users.set(newUser)

        // Finished
        return newUser

    }


    export function login(username: string, password: string): User {
        const user = Users.get(undefined, username)
        if (!user) {
            throw new Error(USERNAME_NOT_EXISTS_ERROR)
        }
        // Check password
        if (!Bun.password.verifySync(password, user.passwordHash)) {
            throw new Error(INVALID_PASSWORD_ERROR)
        }
        // Finished
        return user
    }

}
