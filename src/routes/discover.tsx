import EventScroll from '@/components/EventScroll'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { createFileRoute } from '@tanstack/react-router'
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

      <EventScroll />
    </div>
  )
}
