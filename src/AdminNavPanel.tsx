import Link from 'next/link'

export function AdminNavPanel() {
  return (
    <section className="admin-nav-panel" data-testid="custom-nav-panel">
      <p className="admin-nav-panel__label">📦 Workspace</p>
      <div className="admin-nav-panel__links">
        <Link className="admin-nav-panel__link" href="/admin/collections/projects">
          🎨 Projects
        </Link>
        <Link className="admin-nav-panel__link" href="/admin/collections/media">
          📷 Media Library
        </Link>
      </div>
    </section>
  )
}
