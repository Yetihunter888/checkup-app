/** `top-header` from DESIGN-checkup.md — solid brand-green bar, mobile-only chrome. */
export function TopHeader({ title }: { title: string }) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-center bg-primary">
      <h1 className="type-heading-lg text-on-primary">{title}</h1>
    </header>
  )
}
