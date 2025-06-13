import { api } from '@/lib/axios'
import { createLinkSchema } from '@/schemas/create-link-schema'
import { linkSchema } from '@/schemas/link-schema'
import { downloadUrl } from '@/utils/download-url'
import { AxiosError } from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'
import { UseFormReset } from 'react-hook-form'
import { toast } from 'sonner'

import { z } from 'zod'

type ShortLinkData = z.infer<typeof linkSchema>

type ShortLinkContextType = {
  links: ShortLinkData[]
  isCreatingLink: boolean
  isFetchingLinks: boolean
  isDeletingLink: boolean
  isExportingLinks: boolean
  handleFetchLinks: () => Promise<void>
  handleCreateLink: (
    data: z.infer<typeof createLinkSchema>,
    reset: UseFormReset<z.infer<typeof createLinkSchema>>
  ) => Promise<void>
  handleGetLinkByShortUrl: (
    shortUrl: string
  ) => Promise<ShortLinkData | undefined>
  handleAccessLink: (shortUrl: string) => Promise<void>
  handleDeleteLink: (shortUrl: string) => Promise<void>
  handleExportLinksToCSV: () => Promise<void>
}

const ShortLinkContext = createContext<ShortLinkContextType>(
  {} as ShortLinkContextType
)

type ShortLinkProviderProps = {
  children: React.ReactNode
}

export function ShortLinkProvider({ children }: ShortLinkProviderProps) {
  const [links, setLinks] = useState<ShortLinkData[]>([])

  const [isFetchingLinks, setIsFetchingLinks] = useState(false)
  const [isCreatingLink, setIsCreatingLink] = useState(false)
  const [isDeletingLink, setIsDeletingLink] = useState(false)
  const [isExportingLinks, setIsExportingLinks] = useState(false)

  const handleCreateLink = async (
    data: z.infer<typeof createLinkSchema>,
    reset: UseFormReset<z.infer<typeof createLinkSchema>>
  ) => {
    try {
      setIsCreatingLink(true)

      await api.post('/links', data)

      toast.success('Link encurtado criado com sucesso!')

      await handleFetchLinks()
      reset()
    } catch (error) {
      console.error('Error creating link:', error)
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          toast.error('Erro ao criar o link encurtado.', {
            description: 'Esse link encurtado já existe!',
          })
        } else {
          toast.error('Erro ao criar o link encurtado.', {
            description: 'Tente novamente mais tarde...',
          })
        }
      }
    } finally {
      setIsCreatingLink(false)
    }
  }

  const handleFetchLinks = async () => {
    try {
      setIsFetchingLinks(true)

      const response = await api.get('/links')

      setLinks(Array.isArray(response.data) ? response.data : [])
    } catch (error) {
      console.error('Error fetching links:', error)
      toast.error('Erro ao buscar os links', {
        description: 'Tente novamente mais tarde...',
      })
    } finally {
      setIsFetchingLinks(false)
    }
  }

  const handleAccessLink = async (shortUrl: string) => {
    try {
      await api.patch(`/links/${shortUrl}`)
      await handleFetchLinks()
    } catch (error) {
      console.error('Error accessing link:', error)
    }
  }

  const handleDeleteLink = async (shortUrl: string) => {
    try {
      setIsDeletingLink(true)

      await api.delete(`/links/${shortUrl}`)
      await handleFetchLinks()

      toast.success('Link encurtado excluído com sucesso!')
    } catch (error) {
      console.error('Error deleting link:', error)
      toast.error('Erro ao excluir o link encurtado.', {
        description: 'Tente novamente mais tarde...',
      })
    } finally {
      setIsDeletingLink(false)
    }
  }

  const handleGetLinkByShortUrl = async (shortUrl: string) => {
    try {
      const response = await api.get(`/links/${shortUrl}`)
      return response.data
    } catch (error) {
      console.error('Error getting link:', error)
    }
  }

  const handleExportLinksToCSV = async () => {
    try {
      setIsExportingLinks(true)
      const response = await api.get('/links/export-csv')
      const { reportUrl } = response.data

      if (reportUrl) {
        await downloadUrl(reportUrl)
        toast.success('Links exportados com sucesso!')
      }
    } catch (error) {
      console.error('Error exporting links to CSV:', error)
      toast.error('Erro ao exportar os links para CSV.', {
        description: 'Tente novamente mais tarde...',
      })
    } finally {
      setIsExportingLinks(false)
    }
  }

  useEffect(() => {
    handleFetchLinks()
  }, [])

  return (
    <ShortLinkContext.Provider
      value={{
        links,
        isCreatingLink,
        isFetchingLinks,
        isDeletingLink,
        isExportingLinks,
        handleAccessLink,
        handleCreateLink,
        handleFetchLinks,
        handleGetLinkByShortUrl,
        handleDeleteLink,
        handleExportLinksToCSV,
      }}
    >
      {children}
    </ShortLinkContext.Provider>
  )
}

export function useLinks() {
  const context = useContext(ShortLinkContext)

  if (!context) {
    throw new Error('useLinkContext must be used within a FormProvider')
  }

  return context
}
