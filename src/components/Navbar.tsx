import { Link, useNavigate } from '@tanstack/react-router'
import { Icons } from './Icons'
import { Button } from './ui/button'

export default function Navbar() {
  const navigate = useNavigate()

  const goToDiscoverPage = () => {
    navigate({ to: '/discover' }) // Navigate to the '/about' route
  }
  return (
    <div className="sticky top-0 bg-slate-800 py-4 px-2">
      <div className="flex justify-between items-center px-2">
        <div className="flex items-center">
          <Link to="/">
            <div className="flex shrink-0 space-x-2 items-center">
              <Icons.logo className="h-8 w-auto" />
              <span className="text-white text-2xl font-bold">Daylife</span>
            </div>
          </Link>
        </div>
        <div className="flex justify-center space-x-3 items-center">
          <Button
            variant="ghost"
            onClick={goToDiscoverPage}
            className="cursor-pointer border border-white text-white"
          >
            Discover
          </Button>
          <Button className="cursor-pointer">Login</Button>

          {/* Profile dropdown */}
        </div>
      </div>
    </div>
  )
}
