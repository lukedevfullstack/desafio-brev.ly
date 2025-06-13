import { Link } from '@phosphor-icons/react'

export function EmptyMyLinks() {
  return (
    <div className="mt-8 mb-6 flex flex-col items-center justify-center gap-3">
      <Link className="text-gray-400" size={32} />

      <p className="text-xs text-gray-500 uppercase">
        Ainda não existem links cadastrados
      </p>
    </div>
  )
}
