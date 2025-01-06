#!/usr/bin/env bun
import { $ } from "bun"
import { join } from "node:path"


$.cwd(join(__dirname, "..", "sveltekit_src"))

await $`bun run incr_version`
