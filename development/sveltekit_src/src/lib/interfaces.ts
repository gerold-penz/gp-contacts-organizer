export interface AddressBook {
    url: string
    ctag: string | number
    displayName: string
    syncToken: string
    active?: boolean
}


export interface User {
    username: string
    accessToken?: string
    refreshToken?: string
    expiresAt?: number
    sub?: string
    addressBooks?: AddressBook[]
}


export interface RefreshTokenResult {
    access_token: string
    token_type: string
    expires_in: number
    refresh_token: string
    user_id: string
}


