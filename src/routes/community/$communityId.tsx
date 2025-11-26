import { Spinner } from '@/components/ui/spinner'
import { useTRPC } from '@/integrations/trpc/react'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { BadgeCheck } from 'lucide-react'

export const Route = createFileRoute('/community/$communityId')({
  component: RouteComponent,
})

function RouteComponent() {
  const trpc = useTRPC()
  const { communityId } = Route.useParams()

  const { data: community, isPending } = useQuery(
    trpc.community.getbyId.queryOptions({ id: communityId }),
  )

  if (isPending) {
    return (
      <div className="bg-[#060708] min-h-screen p-4 text-white">
        <Spinner className="text-white size-6 flex justify-center items-center" />
      </div>
    )
  }
  return (
    <div className="bg-[#060708] min-h-screen p-4 text-white">
      <div className="flex items-center gap-3">
        <h1 className="text-4xl font-bold">{community?.name}</h1>
        <BadgeCheck className="text-[#FF3E2B]" />
      </div>

      <div className="mt-3">
        <p>
          <span className="font-black">12</span> members ·{' '}
          <span className="font-black">90 </span> events ·{' '}
          <span className="font-black">Bengaluru, KA</span>
        </p>
      </div>

      <div>{community?.description}</div>

      <div className="mt-12">
        <h3 className="font-bold text-2xl">Events</h3>
      </div>
    </div>
  )
}
