type AccessCountProps = {
  accessCount: number
}

export function LinkViews({ accessCount }: AccessCountProps) {
  return (
    <div className="mr-4 flex flex-row items-center gap-1">
      <span className="max-w-16 min-w-16 truncate text-sm text-gray-500">
        {accessCount} {accessCount > 1 ? 'acessos' : 'acesso'}
      </span>
    </div>
  )
}
