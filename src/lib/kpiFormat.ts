import type { KpiUnit } from '../types/analytics'

export function formatKpiValue(unit: KpiUnit, value: number): string {
  switch (unit) {
    case 'percent':
      return `${Math.round(value)}%`
    case 'rate':
      return `${value.toFixed(1)}%`
    case 'score5':
      return value.toFixed(1)
    case 'time': {
      const total = Math.max(0, Math.round(value))
      const minutes = Math.floor(total / 60)
      const seconds = total % 60
      return `${minutes}m ${seconds.toString().padStart(2, '0')}s`
    }
  }
}

export function formatKpiDelta(unit: KpiUnit, delta: number): string {
  const sign = delta > 0 ? '+' : delta < 0 ? '−' : ''
  const abs = Math.abs(delta)

  switch (unit) {
    case 'percent':
      return `${sign}${Math.round(abs)}pt${Math.round(abs) === 1 ? '' : 's'}`
    case 'rate':
      return `${sign}${abs.toFixed(1)}pt`
    case 'score5':
      return `${sign}${abs.toFixed(1)}`
    case 'time':
      return `${sign}${Math.round(abs)}s`
  }
}
