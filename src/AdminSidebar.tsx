'use client'

import Link from 'next/link'
import { AdminLogo } from './AdminLogo'

interface AdminSidebarProps {
  currentSection?: 'dashboard' | 'projects' | 'media'
}

export function AdminSidebar({ currentSection = 'dashboard' }: AdminSidebarProps) {
  const schemas = [
    { name: 'Projects', href: '/admin/collections/projects', icon: '📁' },
    { name: 'Media', href: '/admin/collections/media', icon: '🖼️' },
  ]

  return (
    <aside className="w-64 border-r border-[var(--theme-elevation-200)] bg-[var(--admin-surface-1)] flex flex-col overflow-y-auto">
      {/* Logo */}
      <div className="p-6 border-b border-[var(--theme-elevation-200)]">
        <AdminLogo />
      </div>

      {/* Schemas Navigation */}
      <div className="flex-1 p-4">
        <h3 className="px-2 py-3 text-[0.72rem] uppercase tracking-[0.1em] text-[var(--theme-elevation-700)] font-semibold">
          Collections
        </h3>
        <nav className="space-y-2">
          {schemas.map((schema) => (
            <Link
              key={schema.name}
              href={schema.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                currentSection === schema.name.toLowerCase()
                  ? 'bg-[color-mix(in_srgb,var(--admin-brand-1)_14%,transparent)] text-[var(--admin-brand-1)]'
                  : 'text-[var(--theme-text)] hover:bg-[color-mix(in_srgb,var(--theme-text)_8%,transparent)]'
              }`}
            >
              <span className="text-lg">{schema.icon}</span>
              <span className="font-medium">{schema.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Media Upload Section */}
      <div className="p-4 border-t border-[var(--theme-elevation-200)]">
        <Link
          href="/admin/collections/media"
          className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg bg-[linear-gradient(120deg,var(--admin-brand-1),color-mix(in_srgb,var(--admin-brand-2)_82%,#ff8c61))] text-white font-semibold hover:opacity-90 transition-opacity"
        >
          <span>⬆️</span>
          Upload Media
        </Link>
      </div>
    </aside>
  )
}
