// src/routes/discover.tsx
import { useState, useMemo } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { SearchIcon, X } from 'lucide-react'
import EventScroll from '@/components/EventScroll'
import events from '@/data/dummy-data.json' // <- your full list

export const Route = createFileRoute('/discover')({
  component: DiscoverComponent,
})

function DiscoverComponent() {
  const [search, setSearch] = useState('')

  /* ---------- real-time filter ---------- */
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return [] // empty → show EventScroll
    return events.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.type.toLowerCase().includes(q),
    )
  }, [search])

  // const showScroll = search.trim() === ''

  return (
    <div className="relative z-10 bg-[#111417] min-h-screen px-12 py-6">
      <div className="flex flex-col items-center justify-center space-y-3">
        <h1 className="text-6xl font-bold text-white">
          Fitness events happening around you!
        </h1>
        <p className="text-muted-foreground">
          Explore hiking, yoga, rock climbing and more around you.
        </p>

        {/* ---------- search bar ---------- */}
        <div className="relative w-[60%] h-12 text-[#333846] bg-[#161B27] border border-[#333846] rounded-lg flex items-center px-3">
          <SearchIcon className="w-5 h-5 text-[#B2B7C7]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events..."
            className="flex-1 bg-transparent outline-none px-2 text-[#B2B7C7] placeholder:text-[#B2B7C7]"
          />
          {search && (
            <button onClick={() => setSearch('')} aria-label="Clear">
              <X className="w-4 h-4 text-[#B2B7C7]" />
            </button>
          )}
        </div>
      </div>

      {/* ---------- results ---------- */}
      {search.trim() ? (
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-10">
          {filtered.map((e) => (
            <Card key={e.id} {...e} />
          ))}
          {filtered.length === 0 && (
            <p className="text-white col-span-full text-center">
              No events found.
            </p>
          )}
        </div>
      ) : (
        <EventScroll /> // original paginated carousel
      )}

      <img
        className="absolute z-0 left-0 bottom-0 opacity-60"
        src="/hero-gradient.png"
        alt=""
      />
    </div>
  )
}

type CardProps = {
  id: string
  slug: string
  coverImageUrl: string
  title: string
  type: string
  description: string
}

function Card({
  id,
  slug,
  coverImageUrl,
  title,
  type,
  description,
}: CardProps) {
  return (
    <div key={id}>
      <Link to="/event/$eventId" params={{ eventId: slug }}>
        <img
          src={coverImageUrl}
          className="rounded w-full h-[383px] object-cover"
          alt={title}
        />
      </Link>
      <div className="flex mt-2">
        <span className="text-white border capitalize py-1 px-3 rounded-full border-white text-sm">
          {type}
        </span>
      </div>
      <h3 className="text-xl text-white font-bold mt-1">{title}</h3>
      <p className="text-gray-500 text-sm">{description.slice(0, 24)}…</p>
    </div>
  )
}
