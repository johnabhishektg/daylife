import { Button } from '@/components/ui/button'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { motion, Variants } from 'framer-motion'
import { Dumbbell, Circle, Mountain } from 'lucide-react'

type Activity = {
  id: string
  name: string
  desc: string
  Icon: React.ElementType
  participants: number
  next: string
  gradient: string
}

type Community = {
  id: string
  name: string
  type: string
  members: number
  desc: string
  gradient: string
}

type Testimonial = {
  id: string
  quote: string
  author: string
  community: string
  avatar: string
}

const activities: Activity[] = [
  {
    id: 'hyrox',
    name: 'Hyrox',
    desc: 'High-intensity functional fitness competitions',
    Icon: Dumbbell,
    participants: 342,
    next: 'Tomorrow',
    gradient: 'from-red-500 to-orange-500',
  },
  {
    id: 'bjj',
    name: 'Jiu Jitsu',
    desc: 'Technical ground fighting and self-defense',
    Icon: Circle,
    participants: 128,
    next: 'Friday',
    gradient: 'from-blue-600 to-purple-600',
  },
  {
    id: 'climb',
    name: 'Rock Climbing',
    desc: 'Indoor and outdoor climbing adventures',
    Icon: Mountain,
    participants: 89,
    next: 'Saturday',
    gradient: 'from-green-500 to-teal-500',
  },
]

const communities: Community[] = [
  {
    id: 'hyfit',
    name: 'Hyfit',
    type: 'Hyrox',
    members: 342,
    desc: 'Functional fitness community',
    gradient: 'from-red-500 to-orange-500',
  },
  {
    id: 'flamingo',
    name: 'Flamingo Jiu Jitsu',
    type: 'BJJ',
    members: 128,
    desc: 'Brazilian Jiu Jitsu academy',
    gradient: 'from-blue-600 to-purple-600',
  },
  {
    id: 'equilibrium',
    name: 'Equilibrium',
    type: 'Rock Climbing',
    members: 89,
    desc: 'Climbing and bouldering community',
    gradient: 'from-green-500 to-teal-500',
  },
]

const testimonials: Testimonial[] = [
  {
    id: 'arjun',
    quote:
      "Daylife changed how I find workouts. It's not just events, it's my fitness family.",
    author: 'Arjun',
    community: 'Hyfit',
    avatar: 'A',
  },
  {
    id: 'priya',
    quote: 'Finally a platform that gets community. I found my BJJ crew here.',
    author: 'Priya',
    community: 'Flamingo Jiu Jitsu',
    avatar: 'P',
  },
  {
    id: 'rohan',
    quote: 'From solo workouts to group climbs. Best decision ever.',
    author: 'Rohan',
    community: 'Equilibrium',
    avatar: 'R',
  },
]

//  Motion helpers
const fadeIn: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }, // ← move here
  },
}
const stagger: Variants = {
  animate: { transition: { staggerChildren: 0.1, ease: 'easeOut' } },
}

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const navigate = useNavigate()

  const goToDiscoverPage = () => {
    navigate({ to: '/discover' }) // Navigate to the '/about' route
  }
  const createCommunity = () => {
    navigate({ to: '/create/community' }) // Navigate to the '/about' route
  }
  return (
    <div className="relative min-h-screen bg-[#111417] text-slate-100 overflow-x-hidden">
      {/* Aurora background */}
      <div className="pointer-events-none fixed inset-0 z-[-1] bg-linear-to-r from-purple-600 via-indigo-600 to-cyan-500 opacity-30 animate-[aurora_8s_ease-in-out_infinite]" />

      {/* 1. HERO */}
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center  justify-center px-6 text-center">
        <motion.div
          {...fadeIn}
          className="glass rounded-3xl p-8 space-y-3 md:p-12"
        >
          <h1 className="font-normal text-6xl text-white">
            Find your move. <br /> Meet your crowd. <br />
            Live your <span className="text-[#FF3E2B]">Daylife</span>
          </h1>
          <p className="text-white text-center">
            Connect with fitness lovers, explore events, <br /> and belong to a
            community that moves with you.
          </p>
          <div className="mt-8 flex justify-center mx-auto gap-4 sm:flex-row">
            <Button
              onClick={goToDiscoverPage}
              className="btn-primary rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg hover:shadow-indigo-500/40"
            >
              Discover Events
            </Button>
            <Button
              onClick={createCommunity}
              className="btn-secondary rounded-xl border border-white/20 px-6 py-3 font-semibold text-white backdrop-blur hover:bg-white/10"
            >
              Start a Community
            </Button>
          </div>
        </motion.div>
      </section>

      {/* 2. ACTIVITIES */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <motion.h2
          {...fadeIn}
          className="text-center text-3xl font-bold md:text-4xl"
        >
          Move How You Want
        </motion.h2>
        <motion.div {...stagger} className="mt-10 grid gap-6 md:grid-cols-3">
          {activities.map((a) => (
            <motion.div
              key={a.id}
              {...fadeIn}
              whileHover={{ scale: 1.05 }}
              className={`glass rounded-2xl p-6 ${a.gradient} bg-linear-to-r text-white`}
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
                <a.Icon className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">{a.name}</h3>
              <p className="mt-2 text-sm opacity-90">{a.desc}</p>
              <div className="mt-4 flex justify-between text-xs">
                <span>{a.participants} participants</span>
                <span>Next: {a.next}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 3. COMMUNITIES */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <motion.h2
          {...fadeIn}
          className="text-center text-3xl font-bold md:text-4xl"
        >
          Your Crew Awaits
        </motion.h2>
        <div className="mt-10 space-y-6">
          {communities.map((c) => (
            <motion.div
              key={c.id}
              {...fadeIn}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-6 md:flex md:items-center md:gap-6"
            >
              <div
                className={`mb-4 h-32 w-full shrink-0 rounded-xl md:mb-0 md:h-24 md:w-48 ${c.gradient} bg-linear-to-r`}
              />
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-bold">{c.name}</h3>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${c.gradient} bg-linear-to-r`}
                  >
                    {c.type}
                  </span>
                </div>
                <p className="mt-1 text-slate-300">
                  {c.members} members • {c.desc}
                </p>
                <button className="btn-primary mt-3 rounded-lg bg-linear-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white">
                  Join Community
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. TESTIMONIALS */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <motion.h2
          {...fadeIn}
          className="text-center text-3xl font-bold md:text-4xl"
        >
          What Movers Say
        </motion.h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <motion.blockquote
              key={t.id}
              {...fadeIn}
              className="glass rounded-2xl p-6 text-center"
            >
              <p className="italic text-slate-200">“{t.quote}”</p>
              <footer className="mt-4 flex items-center justify-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-purple-600 to-cyan-500 text-sm font-bold">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold">{t.author}</div>
                  <div className="text-xs text-slate-400">{t.community}</div>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </section>

      {/* 5. NEWSLETTER */}
      <section className="mx-auto max-w-2xl px-6 py-20 text-center">
        <motion.h2 {...fadeIn} className="text-3xl font-bold md:text-4xl">
          Stay in the Loop
        </motion.h2>
        <p className="mt-2 text-slate-300">
          Get weekly event drops, fitness tips, and community spotlights.
        </p>
        <form
          className="glass mt-8 rounded-2xl p-4"
          onSubmit={(e) => {
            e.preventDefault()
            // wire to your API
            console.log(
              'subscribed:',
              new FormData(e.currentTarget).get('email'),
            )
          }}
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="form-input w-full flex-1 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none"
            />
            <button
              type="submit"
              className="btn-primary rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 px-6 py-3 font-semibold text-white"
            >
              Subscribe
            </button>
          </div>
        </form>
      </section>

      {/* 6. FOOTER */}
      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold gradient-text">Daylife</h3>
              <p className="text-sm text-slate-400">
                © 2024 Daylife. All rights reserved.
              </p>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#discover" className="text-slate-300 hover:text-white">
                Discover
              </a>
              <a href="#host" className="text-slate-300 hover:text-white">
                Host
              </a>
              <a
                href="#communities"
                className="text-slate-300 hover:text-white"
              >
                Communities
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
