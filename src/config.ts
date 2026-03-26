type AdminComponents = {
  beforeNavLinks?: string[]
  views?: { dashboard?: { Component?: string } }
  graphics?: { Icon?: string; Logo?: string }
}

/**
 * Returns the admin.components config block for payload.config.ts.
 *
 * Pass overrides to replace individual components with local ones:
 *   getAdminComponents({ graphics: { Logo: './src/components/MyLogo#MyLogo' } })
 *
 * Or pass null to omit the package entirely and build fully local:
 *   admin: { components: { graphics: { Logo: './src/components/MyLogo#MyLogo' } } }
 */
export function getAdminComponents(overrides: AdminComponents = {}) {
  return {
    beforeNavLinks: overrides.beforeNavLinks ?? ['@loom/payload-admin#AdminNavPanel'],
    views: {
      dashboard: {
        Component: overrides.views?.dashboard?.Component ?? '@loom/payload-admin#AdminDashboardView',
      },
    },
    graphics: {
      Icon: overrides.graphics?.Icon ?? '@loom/payload-admin#ProjectsIcon',
      Logo: overrides.graphics?.Logo ?? '@loom/payload-admin#AdminLogo',
    },
  }
}
