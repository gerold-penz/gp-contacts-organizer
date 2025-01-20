import type { VCard4 } from "vcard4-tsm"


export type Username = string
export type Hash = number | bigint


export interface NcAddressBook {
    url: string
    displayName: string
    ctag: unknown
    syncToken: string
}


export interface UserAddressBook {
    /** addressBookUrlHash: Bun.hash(ncUrl) */
    addressBookUrlHash:  Hash
    url: string
    displayName: string
    active: boolean
    ctag?: unknown
    syncToken?: string
}


export interface SynchronizationSettings {
    /** Activates the synchronization */
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


export interface UserSub {
    username: Username
}


export interface RefreshTokenResult {
    access_token: string
    token_type: string
    expires_in: number
    refresh_token: string
    user_id: string
}


export interface Vcard {
    /** addressBookUrlHash: Bun.hash(addressBook.url) */
    addressBookUrlHash:  Hash
    /** vcardUrlHash: Bun.hash(url) */
    vcardUrlHash:  Hash
    url: string
    etag?: unknown
    data?: string
}


export interface VcardParsed {
    /** addressBookUrlHash: Bun.hash(addressBook.url) */
    addressBookUrlHash:  Hash
    /** vcardUrlHash: Bun.hash(url) */
    vcardUrlHash:  Hash
    vcardParsed: VCard4
    thumbnailBuffer?: Buffer
    thumbnailUrl?: string
    initials?: string
}


export interface ContactGroup {
    displayName: string
}
