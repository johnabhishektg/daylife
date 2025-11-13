// EvenScroll.tsx
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, type FC, type WheelEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from '@tanstack/react-router'
import events from '@/lib/dummy-data.json'

const PAGE = 4

/* ------------------------------------ */
export default function EvenScroll() {
  const [[page, direction], setPage] = useState([0, 0])

  const maxPage = Math.ceil(events.length / PAGE) - 1

  const slide = (dir: -1 | 1) => {
    const next = Math.max(0, Math.min(maxPage, page + dir))
    if (next !== page) setPage([next, dir])
  }

  const canGoBack = page > 0
  const canGoForward = page < maxPage

  /* ---- touch-pad / track-pad wheel handler ---- */
  const onWheel = (e: WheelEvent<HTMLDivElement>) => {
    const isTouchpad = Math.abs(e.deltaX) !== 0 || Math.abs(e.deltaY) < 15
    if (isTouchpad) {
      e.stopPropagation()
      return
    }
    // normal mouse-wheel → vertical scroll
    if (e.deltaY < 0) slide(1)
    else slide(-1)
  }

  const visible = events.slice(page * PAGE, (page + 1) * PAGE)

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 1000 : -1000, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir < 0 ? 1000 : -1000, opacity: 0 }),
  }

  return (
    <div className="relative w-full select-none">
      {/* Left arrow */}
      <button
        onClick={() => slide(-1)}
        disabled={!canGoBack}
        className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md transition disabled:opacity-40"
        aria-label="Previous"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* Cards container with wheel listener */}
      <div className="flex gap-4 overflow-hidden px-10 py-4" onWheel={onWheel}>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-full flex gap-4"
          >
            {visible.map((e) => (
              <Card key={e.id} {...e} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right arrow */}
      <button
        onClick={() => slide(1)}
        disabled={!canGoForward}
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md transition disabled:opacity-40"
        aria-label="Next"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  )
}

/* ---------- card ---------- */
type CardProps = {
  id: string
  slug: string
  coverImageUrl: string
  title: string
  type: string
  description: string
}

const Card: FC<CardProps> = ({
  id,
  slug,
  coverImageUrl,
  title,
  type,
  description,
}) => (
  <div className="w-full" key={id}>
    <Link to="/event/$eventId" params={{ eventId: slug }}>
      <motion.div
        whileHover={{
          scale: [null, 1.1],
          transition: {
            duration: 0.5,
            times: [0, 0.6],
            ease: ['easeInOut'],
          },
        }}
        transition={{
          duration: 0.6,
          ease: 'easeOut',
        }}
      >
        <img
          src={coverImageUrl}
          className="rounded w-[303px] h-[383px] object-cover hover:w-[333px]"
          alt={title}
        />
      </motion.div>
    </Link>

    <div className="flex mt-2">
      <div className="text-white border capitalize py-1 px-3 rounded-full border-white">
        {type}
      </div>
    </div>

    <h2 className="text-2xl text-white font-bold">{title}</h2>
    <p className="text-gray-500">{description.substring(0, 16)}...</p>
  </div>
)
