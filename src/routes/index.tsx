import { Button } from '@/components/ui/button'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const navigate = useNavigate()

  const goToDiscoverPage = () => {
    navigate({ to: '/discover' }) // Navigate to the '/about' route
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0F2838]">
      <div className="space-y-3 mb-16 mx-auto max-w-2xl">
        <h1 className="font-bold text-6xl text-white">
          Find your move. <br /> Meet your crowd. <br />
          Live your <span className="text-[#FF3E2B]">Daylife</span>
        </h1>
        <p className="text-white text-center">
          Connect with fitness lovers, explore events, <br /> and belong to a
          community that moves with you.
        </p>
        <Button
          onClick={goToDiscoverPage}
          className="bg-[#FF3E2B] text-white flex justify-center mx-auto"
        >
          Discover
        </Button>
      </div>
    </div>
  )
}
