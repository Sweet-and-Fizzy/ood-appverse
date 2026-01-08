/**
 * PrettyHashRouter - Wrapper that shows prettier URLs without the leading slash
 *
 * Transforms URLs:
 *   #/gimp → #gimp (in URL bar)
 *   #/?q=foo → #?q=foo (in URL bar)
 *
 * React Router still works with #/ internally, we just clean up the display.
 */
import { useEffect } from 'react';
import { HashRouter, useLocation } from 'react-router-dom';

/**
 * Component that rewrites the URL after React Router navigation
 */
function HashRewriter() {
  const location = useLocation();

  useEffect(() => {
    // Get the current hash (includes the #)
    const hash = window.location.hash;

    // If hash starts with #/, rewrite to # (remove the slash)
    // #/ → # (home)
    // #/gimp → #gimp
    // #/?q=foo → #?q=foo
    // #/gimp?app=x → #gimp?app=x
    if (hash.startsWith('#/')) {
      const pretty = '#' + hash.slice(2); // Remove the / after #
      window.history.replaceState(null, '', pretty || '#');
    }
  }, [location]);

  return null;
}

/**
 * On initial load, normalize incoming URLs to what React Router expects
 * #gimp → #/gimp
 * #?q=foo → #/?q=foo
 * # → #/
 */
function normalizeHashOnLoad() {
  const hash = window.location.hash;

  // Empty or just # → set to #/
  if (!hash || hash === '#') {
    window.history.replaceState(null, '', '#/');
    return;
  }

  // Already has #/ → nothing to do
  if (hash.startsWith('#/')) {
    return;
  }

  // #gimp → #/gimp
  // #?q=foo → #/?q=foo
  const normalized = '#/' + hash.slice(1);
  window.history.replaceState(null, '', normalized);
}

/**
 * PrettyHashRouter - drop-in replacement for HashRouter
 * Shows URLs like #gimp instead of #/gimp
 */
export default function PrettyHashRouter({ children }) {
  // Normalize on load (before React Router initializes)
  normalizeHashOnLoad();

  return (
    <HashRouter>
      <HashRewriter />
      {children}
    </HashRouter>
  );
}
