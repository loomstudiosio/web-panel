import Link from 'next/link'
import type { AdminViewServerProps } from 'payload'

const dateFormatter = new Intl.DateTimeFormat('en', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

export async function AdminDashboardView({ initPageResult }: AdminViewServerProps) {
  const req = initPageResult.req
  const payload = req.payload

  const [projectsTotal, mediaTotal, recentProjects] = await Promise.all([
    payload.count({ collection: 'projects', req }),
    payload.count({ collection: 'media', req }),
    payload.find({
      collection: 'projects',
      limit: 5,
      req,
      sort: '-updatedAt',
    }),
  ])

  return (
    <section className="mx-auto grid w-full max-w-[1060px] gap-4 max-[700px]:gap-3">
      <header className="relative overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--admin-brand-1)_24%,var(--theme-elevation-200))] bg-[radial-gradient(circle_at_100%_0,color-mix(in_srgb,var(--admin-brand-2)_28%,transparent),transparent_48%),radial-gradient(circle_at_0%_100%,color-mix(in_srgb,var(--admin-brand-1)_20%,transparent),transparent_45%),var(--admin-surface-1)] px-6 py-5 max-[700px]:p-3.5">
        <p className="m-0 text-[0.72rem] uppercase tracking-[0.11em] text-[var(--theme-elevation-700)]">Projects CMS</p>
        <h1 className="m-0 mt-0.5 text-[clamp(1.4rem,1.8vw+0.9rem,2rem)] leading-[1.1]">Control Room</h1>
        <p className="m-0 mt-2 max-w-[70ch] text-[var(--theme-elevation-700)]">
          Publish project updates, manage media assets, and keep your portfolio content synchronized.
        </p>
        <div className="mt-3.5 flex flex-wrap gap-3">
          <Link
            className="inline-flex items-center justify-center rounded-full border border-transparent bg-[linear-gradient(120deg,var(--admin-brand-1),color-mix(in_srgb,var(--admin-brand-2)_82%,#ff8c61))] px-4 py-1.5 font-semibold text-white no-underline"
            href="/admin/collections/projects/create"
          >
            Create Project
          </Link>
          <Link
            className="inline-flex items-center justify-center rounded-full border border-[var(--theme-elevation-250)] bg-[color-mix(in_srgb,var(--theme-bg)_76%,transparent)] px-4 py-1.5 font-semibold text-[var(--theme-text)] no-underline"
            href="/admin/collections/media"
          >
            Upload Media
          </Link>
        </div>
      </header>

      <section className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3.5" aria-label="Collection stats">
        <article className="rounded-[14px] border border-[var(--theme-elevation-200)] bg-[var(--admin-surface-2)] p-4 max-[700px]:p-3.5">
          <p className="m-0 text-[0.82rem] text-[var(--theme-elevation-700)]">Projects</p>
          <p className="m-0 mt-0.5 text-[clamp(1.45rem,2vw+0.85rem,2.2rem)] font-bold leading-[1.1]">{projectsTotal.totalDocs}</p>
          <Link className="mt-1.5 inline-block font-semibold text-[var(--admin-brand-1)] no-underline" href="/admin/collections/projects">
            Open collection
          </Link>
        </article>

        <article className="rounded-[14px] border border-[var(--theme-elevation-200)] bg-[var(--admin-surface-2)] p-4 max-[700px]:p-3.5">
          <p className="m-0 text-[0.82rem] text-[var(--theme-elevation-700)]">Media Assets</p>
          <p className="m-0 mt-0.5 text-[clamp(1.45rem,2vw+0.85rem,2.2rem)] font-bold leading-[1.1]">{mediaTotal.totalDocs}</p>
          <Link className="mt-1.5 inline-block font-semibold text-[var(--admin-brand-1)] no-underline" href="/admin/collections/media">
            Open library
          </Link>
        </article>
      </section>

      <section className="rounded-[14px] border border-[var(--theme-elevation-200)] bg-[var(--admin-surface-2)] p-4 max-[700px]:p-3.5" aria-label="Recent projects">
        <div className="flex items-center justify-between gap-3">
          <h2 className="m-0 text-base">Recently Updated Projects</h2>
          <Link className="text-[var(--theme-elevation-800)] no-underline" href="/admin/collections/projects">
            View all
          </Link>
        </div>

        {recentProjects.docs.length === 0 ? (
          <p className="m-0 mt-3 text-[var(--theme-elevation-700)]">No projects yet. Create your first project to get started.</p>
        ) : (
          <ul className="grid gap-2 p-0 m-0 mt-3 list-none">
            {recentProjects.docs.map((project: (typeof recentProjects.docs)[number]) => {
              const title = typeof project.title === 'string' && project.title.length > 0 ? project.title : 'Untitled'
              const updated = project.updatedAt ? dateFormatter.format(new Date(project.updatedAt)) : 'Unknown date'

              return (
                <li
                  className="flex items-center justify-between gap-4 rounded-[10px] border border-[var(--theme-elevation-150)] bg-[color-mix(in_srgb,var(--theme-bg)_65%,transparent)] px-3 py-2.5 max-[700px]:p-2"
                  key={project.id}
                >
                  <div>
                    <p className="m-0 font-semibold">{title}</p>
                    <p className="m-0 mt-0.5 text-[0.82rem] text-[var(--theme-elevation-700)]">Updated {updated}</p>
                  </div>
                  <Link className="font-semibold text-[var(--admin-brand-1)] no-underline" href={`/admin/collections/projects/${project.id}`}>
                    Edit
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </section>
  )
}
