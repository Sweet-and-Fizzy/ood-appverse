import { useParams } from 'react-router-dom'

export default function SoftwareDetail() {
  const { id } = useParams()

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-appverse-black mb-4">
        Software Detail
      </h1>
      <p className="text-gray-600">
        Route: <code className="bg-appverse-gray px-2 py-1 rounded">/appverse/software/{id}</code>
      </p>
      <p className="mt-4">
        <span className="font-semibold">Software ID:</span>{' '}
        <span className="text-appverse-blue">{id}</span>
      </p>
      <p className="mt-4 text-sm text-gray-500">
        Software detail with all implementations will go here.
      </p>
    </div>
  )
}
