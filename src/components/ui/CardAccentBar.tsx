/**
 * `card-accent-bar` from DESIGN-checkup.md. Always render this as a flex
 * sibling of the card's content, never as a `border-left` on the card
 * itself — a border inherits the card's own border-radius and clips into a
 * bracket shape around the top/bottom corners. This element carries its
 * own independent 5px radius on its outer (left) corners only; the card
 * content next to it should use `rounded-r-lg` (or `rounded-lg` when the
 * bar isn't present) so the two pieces read as one seamless rounded card.
 */
export function CardAccentBar({ colorClassName }: { colorClassName: string }) {
  return (
    <span
      className={`w-[5px] shrink-0 self-stretch rounded-l-[5px] ${colorClassName}`}
      aria-hidden="true"
    />
  )
}
