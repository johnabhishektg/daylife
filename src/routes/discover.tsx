import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { createFileRoute, Link } from '@tanstack/react-router'
import { SearchIcon } from 'lucide-react'

export const Route = createFileRoute('/discover')({
  component: DiscoverComponent,
})

function DiscoverComponent() {
  return (
    <div className="bg-[#0F2838] min-h-screen px-12 py-6">
      <div className="flex flex-col items-center justify-center space-y-3">
        <h1 className="text-6xl font-bold text-[#FF3E2B]">
          Fitness events happening around you!
        </h1>
        <p className="text-white">
          Explore hiking, yoga, rock climbing and more around you.
        </p>
        <InputGroup className="w-200 h-12 bg-white">
          <InputGroupInput
            className="text-black placeholder:text-gray-500"
            placeholder="Search..."
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div className="mt-12 text-[#FF3E2B] font-bold text-2xl">
        Editor's Pick ✨
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="rounded-lg">
          <Link to="/event/$eventId" params={{ eventId: 'sista-run' }}>
            <img
              src="https://www.sistersinsweat.com/images/home/20251008111951144.png"
              alt=""
              className="rounded size-[70%] object-cover"
            />
          </Link>
          <div className="flex mt-2">
            <div className="text-white border py-1 px-3 rounded-full border-white">
              Event
            </div>
          </div>
          <h2 className="text-2xl text-white font-bold">The SIStra Run</h2>
          <p className="text-gray-500">
            Supported by Nike, brought to you by Sisters in Sweat, co-promoted
            by Meraki Sport & Entertainment & in association with Brookefield
            Properties—The SIStra Run is all about creating a safe, empowering
            and joy-filled space for women to run free! Bole toh, Ladies Special
            hai! Book now!
          </p>
        </div>
      </div>
    </div>
  )
}
