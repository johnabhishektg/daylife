import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { motion, Variants } from 'framer-motion'

const fadeIn: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }, // ← move here
  },
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
      <section className="mx-auto h-[80vh] flex max-w-5xl flex-col items-center justify-center text-center">
        <motion.div {...fadeIn} className="glass rounded-3xl space-y-3 md:p-12">
          <h1 className="font-normal space-y-6 text-left text-6xl text-white">
            Find your <span className="font-bold"> move.</span> <br /> Meet your{' '}
            <span className="font-bold"> crowd.</span> <br />
            <div className="flex relative tracking-tight">
              Live your
              <Icons.logoTilt className="text-[#FF3E2B] w-14 h-14" />
              <span className="font-bold  z-10">Dawn</span>
              <Icons.underline className="absolute right-0 bottom-0 text-[#FF3E2B]" />
            </div>
          </h1>
          <p className="text-muted text-center">
            Connect with fitness lovers, explore events, <br /> and belong to a
            community that moves with you.
          </p>
          <div className="mt-8 flex justify-center mx-auto gap-4 sm:flex-row">
            <Button
              onClick={goToDiscoverPage}
              className="rounded-xl font-semibold px-6 py-4 text-white shadow-lg hover:shadow-indigo-500/50"
            >
              Discover Events
            </Button>
            <Button
              onClick={createCommunity}
              className="rounded-xl border border-white/20 px-6 py-4 font-semibold text-white backdrop-blur hover:bg-white/10"
            >
              Start a Community
            </Button>
          </div>

          <div>
            <div className="size-[430px] absolute -left-0.5 -bottom-3 rounded-full bg-[#3C4CE6] blur-3xl opacity-6" />
            <div className="size-[430px] absolute left-6 rounded-full bg-[#E53D67] blur-3xl opacity-5" />
            <div className="size-[430px] absolute left-0 -bottom-4 rounded-full bg-[#E763ED] blur-3xl opacity-4" />
          </div>
        </motion.div>
      </section>
    </div>
  )
}
