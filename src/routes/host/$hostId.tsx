import { Button } from '@/components/ui/button'
import events from '@/data/dummy-data.json'
import hosts from '@/data/host-dummy.json'
import { createFileRoute, Link } from '@tanstack/react-router'
import { format } from 'date-fns'
import { BadgeCheck, Calendar, Coins, Pin } from 'lucide-react'

export const Route = createFileRoute('/host/$hostId')({
  component: HostIdComponent,
})

function HostIdComponent() {
  const { hostId } = Route.useParams()
  const host = hosts.find((h) => h.userId === hostId)

  const hostEvents = events.filter((e) => e.hostUserId === hostId)

  return (
    <div className="min-h-screen px-12 py-6 bg-slate-700 text-white">
      <div className="flex items-center gap-3">
        <h1 className="text-4xl font-bold">{host?.businessName}</h1>
        {host?.approved ? <BadgeCheck className="text-[#FF3E2B]" /> : null}
      </div>

      <div className="mt-3">
        <p>
          <span className="font-black">{host?.members}</span> members ·{' '}
          <span className="font-black">{host?.events} </span> events ·{' '}
          <span className="font-black">{host?.location}</span>
        </p>
      </div>

      <div>{host?.description} </div>

      <div className="mt-12">
        <h3 className="font-bold text-2xl">Events</h3>
        {hostEvents.map((e) => (
          <Link to={`/event/$eventId`} params={{ eventId: e.slug }}>
            <div className="p-4 bg-slate-600 rounded flex items-center md:gap-6 lg:gap-12">
              <img
                src={e.coverImageUrl}
                className="size-1/4 rounded-2xl"
                alt=""
              />

              {/* event deets */}
              <div>
                <div className="font-bold text-xl mb-4">{e.title}</div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {format(e.startAt, 'EEE MMM do @ h:mma')}
                </div>

                <div className="flex items-center gap-2">
                  {' '}
                  <Pin className="size-4" />
                  {e.addressRaw}
                </div>
                <div className="flex items-center gap-2">
                  {' '}
                  <Coins className="size-4" />${e.priceCents / 100}
                </div>
              </div>

              <Button className="cursor-pointer border-2 py-6 px-8 rounded-full bg-transparent border-white text-white font-bold text-xl transition-colors hover:bg-slate-700">
                Get Ticket
              </Button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
