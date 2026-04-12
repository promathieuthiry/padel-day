'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & {digest?: string}
  reset: () => void
}) {
  console.error('Global error:', error)

  return (
    <html lang="fr">
      <body className="min-h-screen flex items-center justify-center bg-white px-6">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            Une erreur est survenue
          </h1>
          <p className="text-gray-500 mb-8">
            Nous sommes desoles, quelque chose s&apos;est mal passe. Veuillez reessayer.
          </p>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center rounded-full bg-gray-900 text-white font-semibold text-sm px-6 py-3 transition-colors hover:bg-gray-800"
          >
            Reessayer
          </button>
          <div className="mt-4">
            <a href="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
              Retour a l&apos;accueil
            </a>
          </div>
        </div>
      </body>
    </html>
  )
}
