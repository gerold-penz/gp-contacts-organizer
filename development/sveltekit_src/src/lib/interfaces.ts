export interface Session {
    token: string
    userUuid: string
    expiresAt: Date
}


export interface User {
    userUuid: string
    username: string
    passwordHash: string
}

