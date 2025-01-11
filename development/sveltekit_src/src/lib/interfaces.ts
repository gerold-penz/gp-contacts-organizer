export interface User {
    username: string
    accessToken?: string
    refreshToken?: string
    expiresAt?: number
    sub?: string
}

export interface RefreshTokenResult {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token: string
  user_id: string
}


// export interface Session {
//     token: string
//     userUuid: string
//     expiresAt: Date
// }
//
//
// export interface AddressBook {
//     label: string
//     url: string  // https://next.gerold-penz.at/remote.php/dav/addressbooks/users/gerold/kontakte/
// }


