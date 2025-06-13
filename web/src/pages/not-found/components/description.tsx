import { Link } from 'react-router'

export function Description() {
  return (
    <p className="text-md text-center text-gray-500">
      O link que você está tentando acessar não existe, foi removido ou é uma
      URL inválida. Saiba mais em{' '}
      <Link to={'/'} className="text-md text-blue-base underline">
        brev.ly/
      </Link>
    </p>
  )
}
