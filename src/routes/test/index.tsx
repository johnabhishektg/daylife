import { createFileRoute, Link } from '@tanstack/react-router'
import { useTRPC } from '@/integrations/trpc/react'
import { useQuery } from '@tanstack/react-query'
import { Spinner } from '@/components/ui/spinner'

export const Route = createFileRoute('/test/')({
  component: RouteComponent,
})

function RouteComponent() {
  const trpc = useTRPC()
  const { isPending, isError, data, error } = useQuery(
    trpc.community.get.queryOptions(),
  )

  if (isPending) {
    return (
      <Spinner className="text-black size-6 flex justify-center items-center" />
    )
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }
  return (
    <div className="bg-[#060708] min-h-screen p-4">
      <h1 className="text-3xl font-bold text-white">All Communites</h1>
      {data.map((c) => {
        return (
          <Link to={'/community/$communityId'} params={{ communityId: c.slug }}>
            <div className="flex gap-4 my-4 py-4 rounded text-white/50 transition-colors hover:text-white">
              <img
                src={c.coverImageUrl!}
                className="w-32 h-32 rounded-full border border-[#333846]"
                alt={c.name}
              />
              <div>
                <h3 className="text-xl font-bold text-white">{c.name}</h3>
                <p className="">{c.description}</p>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
