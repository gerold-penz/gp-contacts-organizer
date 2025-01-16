export type Username = string


export interface NcAddressBook {
    url: string
    displayName: string
    ctag: unknown
    syncToken: string
}


export interface UserAddressBook {
    url: string
    displayName: string
    active: boolean
    ctag?: unknown
    syncToken?: string
}


export interface SynchronizationSettings {
    /**
     * Activates the synchronization
     */
    active: boolean
}


export interface User {
    username: Username
    accessToken?: string
    refreshToken?: string
    expiresAt?: number
    sub?: string
    addressBooks?: UserAddressBook[]
    synchronization?: SynchronizationSettings
}


export interface RefreshTokenResult {
    access_token: string
    token_type: string
    expires_in: number
    refresh_token: string
    user_id: string
}


export interface Vcard {
    addressBookUrl: string
    url: string
    etag?: unknown
    data?: string
}


export interface ContactGroup {
    displayName: string
}
