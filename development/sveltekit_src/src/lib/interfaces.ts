export interface Session {
    token: string
    userUuid: string
    expiresAt: Date
}


export interface AddressBook {
    label: string
    url: string  // https://next.gerold-penz.at/remote.php/dav/addressbooks/users/gerold/kontakte/
    basicAuthUsername?: string
    basicAuthPassword?: string
}


export interface User {
    uuid: string
    username: string
    passwordHash?: string
    addressBooks?: AddressBook[]
}

