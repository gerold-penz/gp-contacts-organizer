#!/usr/bin/env bun
import { $ } from "bun"
import { join } from "node:path"
import { version } from "../sveltekit_src/package.json"


const [major, minor, patch] = version.split(".")

$.cwd(join(__dirname, "..", "sveltekit_src"))
let exitCode = 1
try {
    exitCode = (await $`
        docker buildx build \
        --pull \
        --platform linux/amd64,linux/arm64 \
        -t ghcr.io/gerold-penz/gp-contacts-organizer:${major}.${minor}.${patch} \
        -t ghcr.io/gerold-penz/gp-contacts-organizer:${major}.${minor} \
        -t ghcr.io/gerold-penz/gp-contacts-organizer:${major} \
        -t ghcr.io/gerold-penz/gp-contacts-organizer:latest \
        --push \
        .
    `).exitCode
} finally {
    if (exitCode !== 0) {
        prompt("\nPress ENTER to exit.")
    }
}
