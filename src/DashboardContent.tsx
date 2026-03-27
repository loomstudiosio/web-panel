'use client'

import { useState } from 'react'
import Link from 'next/link'

const dateFormatter = new Intl.DateTimeFormat('en', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

export interface ProjectDoc {
  id: string
  title?: string
  updatedAt?: string
}

export function DashboardContent({
  projectsTotal,
  mediaTotal,
  recentProjects,
}: {
  projectsTotal: number
  mediaTotal: number
  recentProjects: ProjectDoc[]
}) {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'media'>('overview')

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Tab Navigation */}
      <div className="flex gap-1 mb-6 border-b border-[var(--theme-elevation-200)]">
        {(['overview', 'projects', 'media'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 font-medium text-[0.95rem] border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-[var(--admin-brand-1)] text-[var(--admin-brand-1)]'
                : 'border-transparent text-[var(--theme-elevation-700)] hover:text-[var(--theme-text)]'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--admin-brand-1)_24%,var(--theme-elevation-200))] bg-[radial-gradient(circle_at_100%_0,color-mix(in_srgb,var(--admin-brand-2)_28%,transparent),transparent_48%),radial-gradient(circle_at_0%_100%,color-mix(in_srgb,var(--admin-brand-1)_20%,transparent),transparent_45%),var(--admin-surface-1)] px-6 py-5">
            <p className="m-0 text-[0.72rem] uppercase tracking-[0.11em] text-[var(--theme-elevation-700)]">
              Welcome to
            </p>
            <h1 className="m-0 mt-0.5 text-[clamp(1.4rem,1.8vw+0.9rem,2rem)] leading-[1.1]">
              Control Room
            </h1>
            <p className="m-0 mt-2 max-w-[70ch] text-[var(--theme-elevation-700)]">
              Publish project updates, manage media assets, and keep your portfolio content synchronized.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3.5">
            <article className="rounded-[14px] border border-[var(--theme-elevation-200)] bg-[var(--admin-surface-2)] p-4">
              <p className="m-0 text-[0.82rem] text-[var(--theme-elevation-700)]">Total Projects</p>
              <p className="m-0 mt-0.5 text-[clamp(1.45rem,2vw+0.85rem,2.2rem)] font-bold leading-[1.1]">
                {projectsTotal}
              </p>
              <Link
                className="mt-1.5 inline-block font-semibold text-[var(--admin-brand-1)] no-underline"
                href="/admin/collections/projects"
              >
                View projects
              </Link>
            </article>

            <article className="rounded-[14px] border border-[var(--theme-elevation-200)] bg-[var(--admin-surface-2)] p-4">
              <p className="m-0 text-[0.82rem] text-[var(--theme-elevation-700)]">Media Assets</p>
              <p className="m-0 mt-0.5 text-[clamp(1.45rem,2vw+0.85rem,2.2rem)] font-bold leading-[1.1]">
                {mediaTotal}
              </p>
              <Link
                className="mt-1.5 inline-block font-semibold text-[var(--admin-brand-1)] no-underline"
                href="/admin/collections/media"
              >
                View media
              </Link>
            </article>
          </div>

          {/* Recent Projects */}
          <section
            className="rounded-[14px] border border-[var(--theme-elevation-200)] bg-[var(--admin-surface-2)] p-4"
            aria-label="Recent projects"
          >
            <div className="flex items-center justify-between gap-3 mb-4">
              <h2 className="m-0 text-base font-semibold">Recently Updated</h2>
              <Link
                className="text-[var(--admin-brand-1)] font-semibold no-underline"
                href="/admin/collections/projects"
              >
                View all
              </Link>
            </div>

            {recentProjects.length === 0 ? (
              <p className="m-0 text-[var(--theme-elevation-700)]">
                No projects yet. Create your first project to get started.
              </p>
            ) : (
              <ul className="space-y-2 p-0 m-0 list-none">
                {recentProjects.map((project) => {
                  const title =
                    typeof project.title === 'string' && project.title.length > 0
                      ? project.title
                      : 'Untitled'
                  const updated = project.updatedAt
                    ? dateFormatter.format(new Date(project.updatedAt))
                    : 'Unknown date'

                  return (
                    <li
                      className="flex items-center justify-between gap-4 rounded-[10px] border border-[var(--theme-elevation-150)] bg-[color-mix(in_srgb,var(--theme-bg)_65%,transparent)] px-3 py-2.5"
                      key={project.id}
                    >
                      <div>
                        <p className="m-0 font-semibold">{title}</p>
                        <p className="m-0 mt-0.5 text-[0.82rem] text-[var(--theme-elevation-700)]">
                          Updated {updated}
                        </p>
                      </div>
                      <Link
                        className="font-semibold text-[var(--admin-brand-1)] no-underline hover:underline"
                        href={`/admin/collections/projects/${project.id}`}
                      >
                        Edit
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </section>
        </div>
      )}

      {/* Projects Tab */}
      {activeTab === 'projects' && (
        <div className="rounded-[14px] border border-[var(--theme-elevation-200)] bg-[var(--admin-surface-2)] p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Projects</h2>
            <Link
              href="/admin/collections/projects/create"
              className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(120deg,var(--admin-brand-1),color-mix(in_srgb,var(--admin-brand-2)_82%,#ff8c61))] px-4 py-2 font-semibold text-white no-underline hover:opacity-90"
            >
              ➕ New Project
            </Link>
          </div>

          <div className="text-center py-12">
            <p className="text-[var(--theme-elevation-700)]">
              <Link
                href="/admin/collections/projects"
                className="text-[var(--admin-brand-1)] font-semibold no-underline"
              >
                Go to Projects Collection
              </Link>{' '}
              to manage your projects
            </p>
          </div>
        </div>
      )}

      {/* Media Tab */}
      {activeTab === 'media' && (
        <div className="rounded-[14px] border border-[var(--theme-elevation-200)] bg-[var(--admin-surface-2)] p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Media Gallery</h2>
            <Link
              href="/admin/collections/media"
              className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(120deg,var(--admin-brand-1),color-mix(in_srgb,var(--admin-brand-2)_82%,#ff8c61))] px-4 py-2 font-semibold text-white no-underline hover:opacity-90"
            >
              ⬆️ Upload Media
            </Link>
          </div>

          <div className="text-center py-12">
            <p className="text-[var(--theme-elevation-700)]">
              <Link
                href="/admin/collections/media"
                className="text-[var(--admin-brand-1)] font-semibold no-underline"
              >
                Go to Media Library
              </Link>{' '}
              to manage your assets
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
