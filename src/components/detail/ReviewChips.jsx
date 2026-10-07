/**
 * ReviewChips Component
 * The public review signals for an app: one icon chip per axis, plus a link
 * to the full review. Each chip shows its label on hover or keyboard focus
 * and links to that axis's section of the review page.
 *
 * Props:
 * @param {Object} review - The app's `review` object from the catalog cache
 *
 * Upkeep shows on every app card, monorepo members included: apps in one
 * repo can be maintained by different people at different paces.
 */
import { useConfig } from '../../contexts/ConfigContext';
import { axisChip, securityChip, reviewLink } from '../../utils/reviewSignals';
import upkeepIcon from '../../assets/icons/review/upkeep.svg';
import documentationIcon from '../../assets/icons/review/documentation.svg';
import portabilityIcon from '../../assets/icons/review/portability.svg';
import securityIcon from '../../assets/icons/review/security.svg';
import infoIcon from '../../assets/icons/review/info.svg';

const ICONS = {
  upkeep: upkeepIcon,
  documentation: documentationIcon,
  portability: portabilityIcon,
  security: securityIcon,
  info: infoIcon,
};

const DOT_COLOURS = {
  full: 'text-appverse-green',
  half: 'text-appverse-amber',
  empty: 'text-appverse-red',
};

// Filled, half-filled or hollow: the fill carries the state as well as the
// colour does.
function StateDot({ fill }) {
  return (
    <svg viewBox="0 0 10 10" className={`w-2.5 h-2.5 ${DOT_COLOURS[fill]}`} aria-hidden="true">
      <circle cx="5" cy="5" r="4" fill={fill === 'full' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" />
      {fill === 'half' && <path d="M5 1 A4 4 0 0 0 5 9 Z" fill="currentColor" />}
    </svg>
  );
}

function ReviewChip({ icon, name, label, summary, fill, href }) {
  const text = `${name}: ${label}`;
  const body = (
    <>
      <img src={icon} alt="" className="h-4 w-auto" />
      {fill && <StateDot fill={fill} />}
      {/* Screen readers get the label and summary as the link's text; the
          visual tooltip repeats it and is hidden from them. */}
      <span className="sr-only">{summary ? `${text}. ${summary}` : text}</span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-full right-0 mb-1.5 z-10 hidden group-hover:block group-focus-visible:block w-max max-w-[16rem] rounded bg-appverse-black px-2 py-1 text-xs font-sans text-white text-left"
      >
        <span className="font-semibold">{text}</span>
        {summary && <span className="block font-normal">{summary}</span>}
      </span>
    </>
  );
  const className = 'group relative inline-flex items-center gap-1 rounded px-1.5 py-1 bg-appverse-gray/40 hover:bg-appverse-gray transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-appverse-blue';
  return href ? (
    <a href={href} className={className}>{body}</a>
  ) : (
    <span className={className}>{body}</span>
  );
}

function reviewedLine(review) {
  const date = review.reviewedAt
    ? new Date(review.reviewedAt * 1000).toLocaleDateString('en-US', { year: '2-digit', month: 'numeric', day: 'numeric' })
    : null;
  const when = date ? `Reviewed ${date}${review.sha7 ? ` at ${review.sha7}` : ''}` : 'Reviewed';
  return review.outOfDate ? `${when}. The repo has changed since.` : `${when}.`;
}

export default function ReviewChips({ review }) {
  const { siteBaseUrl } = useConfig();
  if (!review) return null;

  const chips = [
    axisChip('upkeep', review.upkeep),
    axisChip('documentation', review.documentation),
    axisChip('portability', review.portability),
    securityChip(review.security),
  ].filter(Boolean);

  return (
    <div role="group" aria-label="Review signals" className="flex items-center gap-1">
      {chips.map((chip) => (
        <ReviewChip
          key={chip.axis}
          icon={ICONS[chip.axis]}
          name={chip.name}
          label={chip.label}
          summary={chip.summary}
          fill={chip.fill}
          href={reviewLink(chip.href, siteBaseUrl)}
        />
      ))}
      {review.url && (
        <ReviewChip
          icon={ICONS.info}
          name="Full review"
          label={reviewedLine(review)}
          href={reviewLink(review.url, siteBaseUrl)}
        />
      )}
    </div>
  );
}
