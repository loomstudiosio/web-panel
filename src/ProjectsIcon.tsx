/* eslint-disable @next/next/no-img-element */

// Icon src can be overridden per-client via NEXT_PUBLIC_ADMIN_ICON_SRC env var.
// Default: /assets/projects-icon.png
const iconSrc = process.env.NEXT_PUBLIC_ADMIN_ICON_SRC ?? '/assets/projects-icon.png'

export function ProjectsIcon() {
  return (
    <img
      src={iconSrc}
      alt="Projects"
      style={{ width: 20, height: 20, objectFit: 'contain', display: 'block' }}
    />
  )
}
