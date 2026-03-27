import type { AdminViewServerProps } from 'payload'
import { AdminLayout } from './AdminLayout'
import { DashboardContent, type ProjectDoc } from './DashboardContent'

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
    <AdminLayout
      currentSection="dashboard"
      breadcrumb={[{ label: 'Dashboard' }]}
    >
      <DashboardContent
        projectsTotal={projectsTotal.totalDocs}
        mediaTotal={mediaTotal.totalDocs}
        recentProjects={recentProjects.docs as ProjectDoc[]}
      />
    </AdminLayout>
  )
}

