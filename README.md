# @loom/payload-admin

Shared Payload CMS admin UI for LOOM Studios client projects.

## Installation

```json
"@loom/payload-admin": "git+https://github.com/loomstudiosio/web-panel.git"
```

Then in `next.config.ts`:
```ts
transpilePackages: ['@loom/payload-admin']
```

## Usage

In `payload.config.ts`:
```ts
import { getAdminComponents } from '@loom/payload-admin/config'

export default buildConfig({
  admin: {
    components: getAdminComponents(),
  },
})
```

Add the four entries to `importMap.js` (or let Payload auto-generate them on `npm run dev`):
```js
import { AdminNavPanel } from '@loom/payload-admin'
import { AdminDashboardView } from '@loom/payload-admin'
import { AdminLogo } from '@loom/payload-admin'
import { ProjectsIcon } from '@loom/payload-admin'

export const importMap = {
  '@loom/payload-admin#AdminNavPanel': AdminNavPanel,
  '@loom/payload-admin#AdminDashboardView': AdminDashboardView,
  '@loom/payload-admin#AdminLogo': AdminLogo,
  '@loom/payload-admin#ProjectsIcon': ProjectsIcon,
}
```

## LOOM_PANEL env var

Set in Coolify (or `.env.local`) to control which admin components are loaded:

| Value | Behaviour |
|---|---|
| `github` (default) | Source components from this package |
| `local` | Use local `./src/components/payload/*` — copied once, then frozen |
| `none` | Vanilla Payload admin, no custom components |

## Per-component overrides

Replace individual components while keeping the rest from the package:
```ts
getAdminComponents({
  graphics: { Logo: './src/components/MyLogo#MyLogo' }
})
```

## Branding env vars

| Var | Default |
|---|---|
| `NEXT_PUBLIC_ADMIN_LOGO_SRC` | `/assets/logo.svg` |
| `NEXT_PUBLIC_ADMIN_ICON_SRC` | `/assets/projects-icon.png` |

## Updating

After pushing changes to this repo, run in the client project:
```sh
npm install git+https://github.com/loomstudiosio/web-panel.git
git add package-lock.json
git commit -m "chore: update @loom/payload-admin"
git push
```

The lock file pins a specific commit SHA — changes are never pulled automatically.
