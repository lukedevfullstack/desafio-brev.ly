import { Link } from 'react-router'

type RedirectFallbackProps = {
  urlToRedirect: string
}

export function RedirectFallback({ urlToRedirect }: RedirectFallbackProps) {
  return (
    <p className="text-md text-center text-gray-500">
      O link será aberto automaticamente em alguns instantes. <br />
      {urlToRedirect && (
        <>
          Não foi redirecionado ainda?{' '}
          <Link
            to={urlToRedirect}
            target="_blank"
            rel="noopener noreferrer"
            className="text-md text-blue-base underline"
          >
            Acesse aqui
          </Link>
        </>
      )}
    </p>
  )
}
