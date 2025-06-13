import { Copy } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { Button } from '@/components/button'
import { useLinks } from '@/contexts/short-link-context'
import { CopyUrl } from '@/utils/copy-url'

type LinkCopyUrlButtonProps = {
  shortUrl: string
}

export function CopyUrlButton({ shortUrl }: LinkCopyUrlButtonProps) {
  const { isCreatingLink, isFetchingLinks, isDeletingLink, isExportingLinks } =
    useLinks()

  const isDisabled =
    isCreatingLink || isFetchingLinks || isDeletingLink || isExportingLinks

  const handleCopyUrl = async () => {
    try {
      await CopyUrl(shortUrl)

      toast.info('Link copiado', {
        description: `O link foi copiado para a área de transferência.`,
      })
    } catch (error) {
      toast.error('Erro ao copiar link', {
        description: `Não foi possível copiar o link. Tente novamente mais tarde.`,
      })
    }
  }

  return (
    <Button.Root disabled={isDisabled} onClick={handleCopyUrl}>
      <Button.Icon icon={Copy} width={16} height={16} />
    </Button.Root>
  )
}
