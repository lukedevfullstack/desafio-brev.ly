import { CreateLinkForm } from '@/pages/home/components/create-link-form'
import { MyShortLinks } from '@/pages/home/components/my-short-links'

import { LogoBrev } from '@/pages/home/components/logo-brev'

export function Home() {
  return (
    <div className="flex h-dvh w-full flex-col bg-gray-200 px-3 py-8 md:h-screen lg:items-center">
      <div>
        <LogoBrev />

        <div className="lg:flex lg:flex-row lg:gap-5">
          <CreateLinkForm />
          <MyShortLinks />
        </div>
      </div>
    </div>
  )
}
