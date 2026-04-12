import Button from '@/app/components/Button'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-heading text-5xl font-semibold text-dark">404</h1>
      <p className="mt-4 text-lg text-gray-600">Page non trouvee</p>
      <div className="mt-8">
        <Button label="Retour a l'accueil" href="/" variant="primary" />
      </div>
    </div>
  )
}
