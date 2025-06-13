type SkeletonList = {
  count?: number
}

export function SkeletonList({ count = 3 }: SkeletonList) {
  return (
    <div
      role="status"
      className="mt-4 flex w-full animate-pulse flex-col gap-y-4"
    >
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex items-center justify-between">
          <div>
            <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300"></div>
            <div className="h-2 w-32 rounded-full bg-gray-200"></div>
          </div>

          <div className="flex flex-row items-center gap-x-2">
            <div className="h-2.5 w-12 rounded-full bg-gray-300"></div>
            <div className="h-4 w-4 rounded-sm bg-gray-300"></div>
            <div className="h-4 w-4 rounded-sm bg-gray-300"></div>
          </div>
        </div>
      ))}

      <span className="sr-only">Loading...</span>
    </div>
  )
}
