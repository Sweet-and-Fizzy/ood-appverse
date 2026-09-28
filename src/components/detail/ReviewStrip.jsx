/**
 * ReviewStrip Component
 * The published review's four-axis state as a full-width strip below the
 * app card (placement B in the state-card-variants mockup): fixed positions
 * so a column of amber is visible down a stack, room for the phrase that
 * makes a level meaningful, and the card's actions left alone.
 *
 * Props:
 * @param {Object|null} review - app.review from the catalog cache, or null
 */
import { stripCells, outOfDateText } from '../../utils/reviewSignals';

const DOT = {
  good: 'bg-appverse-green',
  note: 'bg-appverse-amber',
  attention: 'bg-appverse-red',
  none: 'bg-appverse-gray',
};

export default function ReviewStrip({ review }) {
  const cells = stripCells(review);
  if (cells.length === 0) {
    return null;
  }
  const stale = outOfDateText(review);

  return (
    <div
      className="border-t border-appverse-gray px-5 py-3 flex flex-wrap items-center gap-x-7 gap-y-2 text-sm font-sans text-appverse-black"
      data-testid="review-strip"
    >
      {cells.map((cell) => {
        const Cell = cell.anchor ? 'a' : 'span';
        const linkProps = cell.anchor
          ? { href: cell.anchor, target: '_blank', rel: 'noopener', className: 'flex items-center gap-2 no-underline hover:underline' }
          : { className: 'flex items-center gap-2' };
        return (
          <Cell key={cell.key} {...linkProps} title={cell.label ? `${cell.axis}: ${cell.label}` : `${cell.axis}: not rated`}>
            <span className={`inline-block w-2.5 h-2.5 rounded-full flex-none ${DOT[cell.tone]}`} aria-hidden="true" />
            <span className="text-appverse-black">{cell.axis}</span>
            {cell.label && <span className="sr-only">{cell.label}</span>}
            {cell.summary && <span className="text-gray-500 text-xs">{cell.summary}</span>}
          </Cell>
        );
      })}
      <span className="flex-1" />
      {stale && <span className="text-xs text-appverse-amber" title={stale}>{stale}</span>}
      {review.url && (
        <a href={review.url} className="text-sm font-semibold text-appverse-red no-underline hover:underline">
          Full review ›
        </a>
      )}
    </div>
  );
}
