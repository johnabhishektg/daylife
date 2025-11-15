import { signIn, signOut, useSession } from '@/lib/auth-client'
import { Link, useNavigate } from '@tanstack/react-router'
import { Ticket } from 'lucide-react'
import { Icons } from './Icons'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export default function Navbar() {
  const { data } = useSession()
  const session = data?.session
  const user = data?.user

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
          {session ? (
            <div className="flex items-center gap-3">
              <Link to="/create/event">
                <div className="cursor-pointer bg-slate-700 rounded p-2 transition-colors ease-in hover:bg-slate-500">
                  <Ticket className="text-white rotate-90" />
                </div>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="size-10">
                    <AvatarImage src={user?.image!} />
                    <AvatarFallback>{user?.name}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start">
                  <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      Profile
                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Billing
                      <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Settings
                      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div>
              <Button
                variant="ghost"
                onClick={goToDiscoverPage}
                className="cursor-pointer border border-white text-white"
              >
                Discover
              </Button>
              <Button
                onClick={() => signIn.social({ provider: 'google' })}
                className="cursor-pointer"
              >
                Login
              </Button>
            </div>
          )}

          {/* Profile dropdown */}
        </div>
      </div>
    </div>
  )
}
