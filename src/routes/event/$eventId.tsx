import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/event/$eventId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { eventId } = Route.useParams()
  return <div>Post ID: {eventId}</div>
}
