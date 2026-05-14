/**
 * CollectionIcon — the official monorepo icon supplied by design.
 * Top bar (blue, narrower) sits flush left; three wider bars below
 * (magenta, green, purple) extend further right; a single vertical
 * trunk on the left descends through the lower three bars.
 *
 * SVG source: docs (Adobe Illustrator export). Hex colors are inline
 * since #a90066 and #686ea7 are not in the appverse Tailwind palette.
 *
 * Sized by the `size` prop (default 60). The native aspect ratio is
 * roughly square (59x55); rendering at equal width/height matches the
 * design mockup.
 */
export default function CollectionIcon({ size = 60, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 59 55"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <line x1="13.5" y1="7.2" x2="13.5" y2="53.6" stroke="#2c2a29" strokeWidth="3" fill="none" />
      <rect x="6" y="45" width="53" height="10" rx="3" ry="3" fill="#686ea7" />
      <rect x="6" y="30" width="53" height="10" rx="3" ry="3" fill="#00857a" />
      <rect x="6" y="15" width="53" height="10" rx="3" ry="3" fill="#a90066" />
      <rect x="0" y="0" width="41" height="10" rx="3" ry="3" fill="#0076af" />
    </svg>
  );
}
