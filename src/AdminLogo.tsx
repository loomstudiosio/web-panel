/* eslint-disable @next/next/no-img-element */

// Logo src can be overridden per-client via NEXT_PUBLIC_ADMIN_LOGO_SRC env var.
// Default: /assets/logo.svg  (place your logo at public/assets/logo.svg)
const logoSrc = process.env.NEXT_PUBLIC_ADMIN_LOGO_SRC ?? '/assets/logo.svg'

export function AdminLogo() {
  return (
    <img
      src={logoSrc}
      alt="Studio Logo"
      style={{ height: 48, width: 'auto', objectFit: 'contain', display: 'block' }}
    />
  )
}
