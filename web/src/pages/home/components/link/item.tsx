import { LinkDetails } from '@/pages/home/components/link/details'
import { LinkViews } from '@/pages/home/components/link/views'
import { CopyUrlButton } from '@/pages/home/components/link/copy-url-button'
import { DeleteUrlButton } from '@/pages/home/components/link/delete-url-button'

type LinkItemProps = {
  data: {
    id: string
    shortUrl: string
    originalUrl: string
    accessCount: number
  }
}

export function LinkItem({ data }: LinkItemProps) {
  const { id, shortUrl, accessCount } = data

  return (
    <div className="flex flex-row justify-between border-t border-t-gray-200 py-3 first-of-type:mt-1 first-of-type:border-t-0">
      <LinkDetails data={data} />

      <div className="ml-4 flex flex-row items-center">
        <LinkViews accessCount={accessCount} />
        <CopyUrlButton shortUrl={shortUrl} />
        <DeleteUrlButton shortUrl={shortUrl} />
      </div>
    </div>
  )
}
