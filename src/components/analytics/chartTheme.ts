/**
 * recharts renders raw SVG and needs literal color strings — it can't
 * consume Tailwind classes or CSS custom properties in most of its props.
 * These values must stay in sync with the matching tokens in
 * src/index.css's @theme block by hand; there is no automatic link.
 */
export const CHART_COLORS = {
  primary: '#34c759',
  primaryPale: '#1f3a28',
  ink: '#f5f7fa',
  mute: '#8b93a3',
  hairline: '#323847',
  surfaceElevated: '#242938',
  statusEscalation: '#ff453a',
}
