# raycast-ssh-music-control

A Raycast extension that controls the Music app on a remote Mac over SSH (previous, play/pause, next).

## Distribution

There are no immediate plans to submit this extension to the Raycast Store.

## Raycast documentation

Before making any code change, consult the latest Raycast documentation: <https://developers.raycast.com> for extensions and <https://manual.raycast.com> for the app. Do not rely on training data for Raycast APIs, manifest fields, CLI commands or UI paths. It goes stale.

## Setup

- `bun install`
- `apm install --frozen` restores the agent skills listed in `apm.yml` and `apm.lock.yaml`.
- `bun run lint`, `bun run build`, `bun run dev`

Add or change skills with `apm`. Commit `apm.yml` and `apm.lock.yaml`, never the installed skill files.

## Tools

General tool preferences apply.

- uv over python3 or python
- bun over node
- bun over npm
- bunx over npx
- zx over shell scripts
- jsonc over json
- csv over tsv
- astro over next
- ts over js
- happy path until you do the thing; don't waste the users' time with testing and verification before outputs match intent

Use Bun as far as possible: bun and bunx, with `bun.lock` as the only lockfile. This extension is for personal use, so Raycast's Store-only requirements, such as npm and `package-lock.json`, do not apply. Where the Raycast tooling itself requires something (such as `package.json` as the manifest), follow the Raycast documentation. Command code runs in Raycast's Node runtime, so don't use Bun APIs in `src/`.

## TypeScript

Follow the `typescript-style-guide` skill. TypeScript stays on 6.0.x until `typescript-eslint` and `eslint-plugin-typefest` support a newer version.
