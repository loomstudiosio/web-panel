'use client'

import { ReactNode, useState } from 'react'
import Link from 'next/link'
import { AdminSidebar } from './AdminSidebar'
import { ProjectsIcon } from './ProjectsIcon'

interface AdminLayoutProps {
  children: ReactNode
  breadcrumb?: { label: string; href?: string }[]
  currentSection?: 'dashboard' | 'projects' | 'media'
}

export function AdminLayout({ children, breadcrumb = [], currentSection = 'dashboard' }: AdminLayoutProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const handleLogout = () => {
    // Logout logic would go here
    // For now, just close the menu
    setUserMenuOpen(false)
  }

  return (
    <div className="flex h-screen bg-[var(--theme-bg)]">
      {/* Sidebar */}
      <AdminSidebar currentSection={currentSection} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="border-b border-[var(--theme-elevation-200)] bg-[var(--admin-surface-1)] px-6 py-4 flex items-center justify-between">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[0.9rem]">
            <ProjectsIcon />
            {breadcrumb.length === 0 ? (
              <span className="text-[var(--theme-text)] font-semibold">Admin Dashboard</span>
            ) : (
              breadcrumb.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-[var(--theme-elevation-500)]">/</span>
                  {item.href ? (
                    <Link href={item.href} className="text-[var(--admin-brand-1)] hover:underline">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-[var(--theme-text)]">{item.label}</span>
                  )}
                </div>
              ))
            )}
          </div>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[color-mix(in_srgb,var(--theme-text)_8%,transparent)] transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-[var(--admin-brand-1)] flex items-center justify-center text-white font-semibold text-[0.85rem]">
                D
              </div>
              <span className="text-[var(--theme-text)] font-medium">Profile</span>
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg border border-[var(--theme-elevation-200)] bg-[var(--admin-surface-2)] shadow-lg z-50">
                <div className="p-3 border-b border-[var(--theme-elevation-200)]">
                  <p className="text-[0.85rem] font-semibold text-[var(--theme-text)]">Admin User</p>
                  <p className="text-[0.75rem] text-[var(--theme-elevation-700)]">admin@example.com</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-[0.9rem] text-red-600 hover:bg-[color-mix(in_srgb,var(--theme-text)_8%,transparent)] transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-[var(--theme-bg)]">{children}</main>
      </div>
    </div>
  )
}
