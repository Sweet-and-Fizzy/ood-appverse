import BrowseTabs from '../components/common/BrowseTabs';

export default function ClassroomsPlaceholder() {
  return (
    <div className="mb-4 bg-white">
      <div className="mx-6 mt-6 mb-4">
        <h2 className="text-3xl font-serif font-bold text-appverse-black mb-2">For Classrooms</h2>
      </div>

      <div className="mx-6 my-6 bg-appverse-black px-4 py-3 rounded-appverse">
        <div className="flex items-center justify-end">
          <BrowseTabs />
        </div>
      </div>

      <div className="mx-6 mb-12 mt-12 text-center">
        <p className="text-lg font-sans text-appverse-black mb-4">
          Curated app repos for teaching are coming soon.
        </p>
        <p className="text-base font-sans text-appverse-black">
          In the meantime, explore <a href="#/" className="text-appverse-red hover:underline">Software</a> or <a href="#/repos" className="text-appverse-red hover:underline">Repos</a>.
        </p>
      </div>
    </div>
  );
}
