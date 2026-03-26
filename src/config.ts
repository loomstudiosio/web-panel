/**
 * Returns the admin.components config block for payload.config.ts.
 *
 * Usage in each client's payload.config.ts:
 *   import { getAdminComponents } from '@loom/payload-admin/config'
 *   // ...
 *   admin: { components: getAdminComponents() }
 */
export function getAdminComponents() {
  return {
    beforeNavLinks: ['@loom/payload-admin#AdminNavPanel'],
    views: {
      dashboard: {
        Component: '@loom/payload-admin#AdminDashboardView',
      },
    },
    graphics: {
      Icon: '@loom/payload-admin#ProjectsIcon',
      Logo: '@loom/payload-admin#AdminLogo',
    },
  }
}
