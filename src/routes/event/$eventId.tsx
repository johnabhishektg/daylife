import { createFileRoute, Link } from '@tanstack/react-router'
import events from '@/lib/dummy-data.json'
import { format, parseISO } from 'date-fns'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/event/$eventId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { eventId } = Route.useParams()

  const currEvent = events.filter((e) => e.slug === eventId)
  const event = currEvent[0]

  const rawDate = parseISO(event.startAt)
  const date = format(rawDate, 'EEE MMM do @ h:mma')

  return (
    <div className="flex items-center justify-between min-h-screen px-12 py-6 bg-slate-800">
      <div className="space-y-3 text-white">
        <div className="border w-fit capitalize py-1 px-3 rounded-full border-white">
          {event.type}
        </div>

        <h1 className="text-4xl text-white font-bold">{event.title}</h1>

        <Link to={'/'}>
          <div className=" flex items-center space-x-2">
            <div className="bg-white border border-black size-6 rounded-full" />
            <p>{event.hostUserId}</p>
          </div>
        </Link>

        <div>{date}</div>
        <div>{event.addressRaw}</div>

        {/* price */}
        <div className="flex items-center justify-between w-full border border-amber-50 rounded-3xl p-4">
          <div className="font-bold ">${event.priceCents / 100}</div>
          <Button className="bg-white text-black hover:bg-gray-200">
            Buy Ticket
          </Button>
        </div>

        <div className="max-w-[300px] mt-5">
          <h3 className="font-bold text-gray-400">About this event</h3>
          <p>{event.description}</p>
        </div>
      </div>

      {/* Img section */}
      <div>
        <div className="">
          <img
            className="w-[380px] h-[400px] object-cover rounded-2xl"
            src={event.coverImageUrl}
            alt={event.title}
          />
        </div>
      </div>
    </div>
  )
}
