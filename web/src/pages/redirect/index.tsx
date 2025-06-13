import { useEffect, useState } from 'react'
import { useParams, useNavigate, Navigate, Link } from 'react-router'

import { Logo } from '@/pages/redirect/components/logo'
import { Title } from '@/pages/redirect/components/title'

import { useLinks } from '@/contexts/short-link-context'
import { RedirectFallback } from './components/redirect-fallback'

export function RedirectPage() {
  const params = useParams()
  const navigate = useNavigate()
  const { shortUrl } = params
  const [urlToRedirect, setUrlToRedirect] = useState<string>('')

  const { handleAccessLink, handleGetLinkByShortUrl, handleFetchLinks } =
    useLinks()

  if (!shortUrl) {
    return <Navigate to="/" replace />
  }

  const delay = new Promise((resolve) => setTimeout(resolve, 5000)) // 5 seconds

  const handleRedirect = async () => {
    try {
      const linkToRedirect = await handleGetLinkByShortUrl(shortUrl)

      if (!linkToRedirect) {
        return navigate('/url-not-found', { replace: true })
      }

      await handleAccessLink(linkToRedirect.shortUrl)

      setUrlToRedirect(linkToRedirect.originalUrl)

      await delay // Wait for 5 seconds

      window.location.href = linkToRedirect.originalUrl
    } catch (error) {
      return navigate('/url-not-found', { replace: true })
    }
  }

  useEffect(() => {
    handleRedirect()

    return () => {
      handleFetchLinks()
    }
  }, [])

  return (
    <div className="flex h-dvh items-center justify-center bg-gray-200">
      <div className="mx-3 flex flex-col items-center rounded-lg bg-gray-100 px-5 py-12 sm:w-[36.25rem] sm:max-w-[36.25rem] sm:py-16">
        <Logo />
        <Title />
        <RedirectFallback urlToRedirect={urlToRedirect} />
      </div>
    </div>
  )
}
