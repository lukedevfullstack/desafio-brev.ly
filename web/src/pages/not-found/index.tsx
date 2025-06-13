import { Title } from './components/title'
import { Description } from './components/description'
import { LogoNotFound } from './components/logo-not-found'

export function NotFound() {
  return (
    <div className="flex h-dvh items-center justify-center bg-gray-200">
      <div className="flex flex-col items-center justify-center rounded-lg bg-gray-100 px-5 py-12 lg:max-w-[36.25rem] lg:px-12 lg:py-16">
        <LogoNotFound />
        <Title />
        <Description />
      </div>
    </div>
  )
}
