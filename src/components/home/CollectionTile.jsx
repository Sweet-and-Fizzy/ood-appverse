/**
 * CollectionTile Component
 * Individual card displaying a Collection summary
 *
 * Props:
 * @param {Object} collection - Collection object from cache contract
 *   - id: string
 *   - title: string
 *   - slug: string (derived from pathauto pattern /collection/[node:title])
 *   - apps: Array (list of app references; used for count)
 */
import { Link } from 'react-router-dom';
import { useTracking } from '../../hooks/useTracking';
import CollectionIcon from '../common/CollectionIcon';

export default function CollectionTile({ collection }) {
  const track = useTracking();
  const appCount = (collection.apps || []).length;
  const slug = collection.slug;
  return (
    <Link
      to={`/collection/${slug}`}
      onClick={() => track('collection_click', {
        collection_title: collection.title,
        collection_slug: collection.slug,
        collection_id: collection.id,
      })}
      className="block bg-white border border-appverse-gray rounded-appverse p-6 hover:shadow-lg transition-shadow"
    >
      <div className="flex flex-col items-center text-center">
        {/* Stacked-tree icon: horizontal bars connected by a vertical trunk. */}
        <div className="mb-4 flex justify-center">
          <CollectionIcon size={60} />
        </div>
        <h3 className="font-serif font-bold text-lg text-appverse-black mb-2">
          {collection.title}
        </h3>
        <div className="flex items-center gap-1 text-sm font-sans text-appverse-black">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-appverse-blue text-white font-semibold text-xs">
            {appCount}
          </span>
          <span>apps</span>
        </div>
      </div>
    </Link>
  );
}
