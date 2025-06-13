import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/input'
import { Button } from '@/components/button'

import { createLinkSchema } from '@/schemas/create-link-schema'
import { useLinks } from '@/contexts/short-link-context'

export function CreateLinkForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(createLinkSchema),
  })

  const { handleCreateLink, isCreatingLink } = useLinks()

  return (
    <form
      className="rounded-lg bg-gray-100 p-6 lg:h-fit lg:max-w-[23.75rem] lg:min-w-[23.75rem] lg:flex-1 lg:p-8"
      onSubmit={handleSubmit((data) => handleCreateLink(data, reset))}
    >
      <h2 className="mb-5 text-lg text-gray-600">Novo link</h2>

      <Input.Root>
        <Input.Label hasError={!!errors.originalUrl}>Link original</Input.Label>
        <Input.InputField
          hasError={!!errors.originalUrl}
          type="text"
          id="originalLink"
          placeholder="https://exemplo.com.br"
          {...register('originalUrl')}
        />

        {errors.originalUrl && (
          <Input.ErrorMessage>{errors.originalUrl.message}</Input.ErrorMessage>
        )}
      </Input.Root>

      <Input.Root>
        <Input.Label hasError={!!errors.shortUrl}>Link encurtado</Input.Label>

        <Input.InputField
          hasError={!!errors.shortUrl}
          type="text"
          id="shortUrl"
          placeholder="link-encurtado"
          {...register('shortUrl')}
        >
          <Input.Placeholder className="text-gray-400">
            brev.ly/
          </Input.Placeholder>
        </Input.InputField>

        {errors.shortUrl && (
          <Input.ErrorMessage>{errors.shortUrl.message}</Input.ErrorMessage>
        )}
      </Input.Root>

      <Button.Root
        type="submit"
        className="bg-blue-base hover:bg-blue-dark mt-5 w-full cursor-pointer items-center justify-center rounded-lg py-4 transition-colors duration-300"
        disabled={isCreatingLink}
      >
        <Button.Label className="text-md text-white">
          {isCreatingLink ? 'Salvando...' : 'Salvar link'}
        </Button.Label>
      </Button.Root>
    </form>
  )
}
