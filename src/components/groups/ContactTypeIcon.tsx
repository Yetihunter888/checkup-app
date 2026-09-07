import type { ContactType } from '../../types/groups'

function InboundCallIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M3 2.4h2.2l1 2.8-1.4 1.1a7.8 7.8 0 0 0 3.6 3.6l1.1-1.4 2.8 1V12a1.4 1.4 0 0 1-1.4 1.4C6 13.4 .6 8 .6 3.8A1.4 1.4 0 0 1 2 2.4Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M9 1v3.5M9 1h3.5M9 1l3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function OutboundCallIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M3 2.4h2.2l1 2.8-1.4 1.1a7.8 7.8 0 0 0 3.6 3.6l1.1-1.4 2.8 1V12a1.4 1.4 0 0 1-1.4 1.4C6 13.4 .6 8 .6 3.8A1.4 1.4 0 0 1 2 2.4Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M12.5 1v3.5M12.5 1H9M12.5 1 9 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="1" y="2.5" width="12" height="9" rx="1.4" stroke="currentColor" strokeWidth="1.4" />
      <path d="M1.5 3.2 7 7.5l5.5-4.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SocialIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="3" cy="7" r="1.7" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="11" cy="2.8" r="1.7" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="11" cy="11.2" r="1.7" stroke="currentColor" strokeWidth="1.3" />
      <path d="M4.5 6.2 9.5 3.6M4.5 7.8l5 2.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M1 2.6h12v6.8H5.2L2.4 12V9.4H1V2.6Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function WorkItemIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="2" y="1.5" width="10" height="11" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4.5 5h5M4.5 7.4h5M4.5 9.8h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

const CONTACT_TYPE_CONFIG: Record<ContactType, { label: string; Icon: () => React.JSX.Element }> = {
  'inbound-call': { label: 'Inbound Call', Icon: InboundCallIcon },
  'outbound-call': { label: 'Outbound Call', Icon: OutboundCallIcon },
  email: { label: 'Email', Icon: EmailIcon },
  social: { label: 'Social', Icon: SocialIcon },
  chat: { label: 'Chat', Icon: ChatIcon },
  'work-item': { label: 'Work Item', Icon: WorkItemIcon },
}

/**
 * Distinguished by shape, not color — deliberately monochrome (inherits
 * text-mute from its container) so it reads the same way it would in a
 * glare/CarPlay context, where a subtle hue difference alone wouldn't be
 * reliable (same lesson as the CarPlay sidebar's active-state fix).
 */
export function ContactTypeIcon({ type }: { type: ContactType }) {
  const config = CONTACT_TYPE_CONFIG[type]
  return (
    <span title={config.label} aria-label={config.label} className="inline-flex shrink-0 items-center">
      <config.Icon />
    </span>
  )
}
