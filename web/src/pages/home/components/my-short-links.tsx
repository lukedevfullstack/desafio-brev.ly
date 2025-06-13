import { twMerge } from 'tailwind-merge'
import { ProgressBarIndicator } from './progress-bar-indicator'
import { Header } from './header'
import { Separator } from '@/components/separator'
import { ScrollableList } from './scrollable-list'
import { LinkItem } from './link/item'
import { useLinks } from '@/contexts/short-link-context'
import { SkeletonList } from './skeleton-list'
import { EmptyMyLinks } from './empty-my-links'

export function MyShortLinks() {
  const { links, isFetchingLinks } = useLinks()

  const shouldShowEmptyState = links.length === 0 && !isFetchingLinks
  const shouldShowLinks = links.length > 0 && !isFetchingLinks
  const shouldShowProgressBar = isFetchingLinks
  const shouldShowSkeleton = isFetchingLinks

  return (
    <div
      className={twMerge(
        'relative mt-3 w-full overflow-hidden rounded-lg bg-gray-100 p-6 md:mb-40 lg:mt-0 lg:h-fit lg:w-[36.25rem] lg:max-w-[36.25rem]'
      )}
    >
      {shouldShowProgressBar && <ProgressBarIndicator />}
      <Header />
      <Separator />

      <ScrollableList>
        {shouldShowSkeleton && <SkeletonList count={5} />}

        {shouldShowEmptyState && <EmptyMyLinks />}

        {shouldShowLinks &&
          links.map((link) => <LinkItem key={link.id} data={link} />)}
      </ScrollableList>
    </div>
  )
}
