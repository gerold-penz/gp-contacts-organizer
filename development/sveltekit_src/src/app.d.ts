// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces


import type { User } from "@auth/core/types"


declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            user?: User
        }


        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }
}

export {}
