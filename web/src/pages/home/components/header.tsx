import { DownloadSimple, Spinner } from '@phosphor-icons/react'
import { Button } from '@/components/button'
import { useLinks } from '@/contexts/short-link-context'

export function Header() {
  const {
    isCreatingLink,
    isFetchingLinks,
    isDeletingLink,
    isExportingLinks,
    links,
    handleExportLinksToCSV,
  } = useLinks()

  const isDisabled =
    isCreatingLink ||
    isFetchingLinks ||
    isDeletingLink ||
    isExportingLinks ||
    links.length === 0

  return (
    <div className="flex flex-row items-center justify-between">
      <h2 className="text-lg text-gray-600">Meus links</h2>
      <Button.Root disabled={isDisabled} onClick={handleExportLinksToCSV}>
        {isExportingLinks ? (
          <Spinner
            className="animate-spin"
            width={16}
            height={16}
            weight="bold"
          />
        ) : (
          <Button.Icon icon={DownloadSimple} width={16} height={16} />
        )}

        <Button.Label>Baixar CSV</Button.Label>
      </Button.Root>
    </div>
  )
}
