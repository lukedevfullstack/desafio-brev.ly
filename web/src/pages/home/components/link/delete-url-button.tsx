import { useState } from 'react'
import { Trash } from '@phosphor-icons/react'
import { Button } from '@/components/button'
import { useLinks } from '@/contexts/short-link-context'
import * as Dialog from '@radix-ui/react-dialog'

type ButtonDeleteUrlProps = {
  shortUrl: string
}

export function DeleteUrlButton({ shortUrl }: ButtonDeleteUrlProps) {
  const [open, setOpen] = useState(false)
  const {
    handleDeleteLink,
    isCreatingLink,
    isFetchingLinks,
    isDeletingLink,
    isExportingLinks,
  } = useLinks()

  const isDisabled =
    isCreatingLink || isFetchingLinks || isDeletingLink || isExportingLinks

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button.Root disabled={isDisabled} aria-label="Excluir link">
          <Button.Icon icon={Trash} width={16} height={16} />
        </Button.Root>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 lg:max-w-lg">
          <Dialog.Title className="flex items-center gap-2 text-xl text-gray-600">
            Excluir link
          </Dialog.Title>

          <Dialog.Description className="text-md mt-2 text-gray-500">
            Tem certeza que deseja excluir este link encurtado:{' '}
            <span className="font-bold">{shortUrl}</span>?
          </Dialog.Description>

          <div className="mt-4 flex flex-col justify-end gap-2 lg:flex-row">
            <Dialog.Close asChild>
              <Button.Root
                className="justify-center border-0 bg-red-100 px-4 text-red-500 hover:border-none hover:bg-red-200 lg:justify-normal"
                onClick={() => handleDeleteLink(shortUrl)}
              >
                Excluir
              </Button.Root>
            </Dialog.Close>

            <Dialog.Close
              className="justify-center border-0 bg-gray-200 px-4 hover:border-none hover:bg-gray-300 lg:justify-normal"
              asChild
            >
              <Button.Root className="">Cancelar</Button.Root>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
