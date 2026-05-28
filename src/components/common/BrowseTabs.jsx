import { Link, useLocation } from 'react-router-dom';
import { useTracking } from '../../hooks/useTracking';

const TABS = [
  { key: 'software', label: 'Software', to: '/' },
  { key: 'bundles', label: 'Bundles', to: '/bundles' },
  { key: 'repos', label: 'Repos', to: '/repos' },
  { key: 'classrooms', label: 'For Classrooms', to: '/for-classrooms' },
];

function activeKey(pathname) {
  if (pathname === '/' || pathname === '') return 'software';
  if (pathname.startsWith('/bundles') || pathname.startsWith('/bundle/')) return 'bundles';
  if (pathname.startsWith('/repos') || pathname.startsWith('/repo/')) return 'repos';
  if (pathname.startsWith('/for-classrooms')) return 'classrooms';
  // Anything else (e.g., /:slug software detail) is treated as software-context.
  return 'software';
}

export default function BrowseTabs() {
  const { pathname } = useLocation();
  const active = activeKey(pathname);
  const track = useTracking();

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {TABS.filter(t => t.key !== active).map(tab => (
        <Link
          key={tab.key}
          to={tab.to}
          onClick={() => track('tab_switch', { from: active, to: tab.key })}
          className="px-4 py-2 border-2 border-white text-white font-sans font-medium rounded-full hover:bg-white hover:text-appverse-black transition-colors"
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
