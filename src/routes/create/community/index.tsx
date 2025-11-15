import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/create/community/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/create/community/"!</div>
}
