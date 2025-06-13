import { BrowserRouter, Route, Routes } from 'react-router'

import { Home } from '@/pages/home'
import { RedirectPage } from '@/pages/redirect'
import { NotFound } from '@/pages/not-found'

import { Toaster } from 'sonner'
import { ShortLinkProvider } from './contexts/short-link-context'

export function App() {
  return (
    <BrowserRouter>
      <ShortLinkProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:shortUrl" element={<RedirectPage />} />
          <Route path="/url-not-found" element={<NotFound />} />
        </Routes>

        <Toaster duration={2000} richColors />
      </ShortLinkProvider>
    </BrowserRouter>
  )
}
