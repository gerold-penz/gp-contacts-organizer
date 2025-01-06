// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { Session, User } from "$lib/interfaces"


declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User | undefined
			session: Session | undefined
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
