import { useLinks } from '@/contexts/short-link-context'
import { Link } from 'react-router'
import { twMerge } from 'tailwind-merge'

type LinkDetailsProps = {
  data: {
    shortUrl: string
    originalUrl: string
  }
}

export function LinkDetails({
  data: { shortUrl, originalUrl },
}: LinkDetailsProps) {
  const url = new URL(shortUrl, document.location.origin)
  const isProduction = import.meta.env.PROD

  const { handleFetchLinks } = useLinks()

  return (
    <div className="flex flex-col lg:w-full">
      <Link
        to={`/${shortUrl}`}
        className={twMerge(
          'text-md text-blue-base w-[9.8125rem] truncate',
          'min-[23.4375rem]:w-[12rem]',
          'min-md:w-[15rem]'
        )}
        target="_blank"
        aria-label="Open link in new tab"
        title={`Clique para abrir o link em uma nova aba`}
        onClick={handleFetchLinks}
      >
        {isProduction ? url.href : `brevy.ly/${shortUrl}`}
      </Link>

      <p
        className={twMerge(
          'w-[9.8125rem] truncate text-sm text-gray-500',
          'min-[23.4375rem]:w-[12rem]',
          'min-md:w-[15rem]'
        )}
      >
        {originalUrl}
      </p>
    </div>
  )
}
