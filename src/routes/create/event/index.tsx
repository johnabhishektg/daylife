// src/routes/create/event/index.tsx
import { SignIn } from '@/components/SignIn'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { getSession } from '@/lib/auth-client'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

/* ---------- loader ---------- */
export const Route = createFileRoute('/create/event/')({
  component: RouteComponent,
  loader: async () => {
    const { data: session } = await getSession()
    return session?.user.id ?? null
  },
})

/* ---------- schema ---------- */
const formSchema = z.object({
  title: z.string().min(1, 'Title is required').max(120),
  description: z.string().optional(),
  coverImageUrl: z.string().url('Must be a valid URL').optional(),
  type: z.enum(['hiking', 'yoga', 'running', 'climbing', 'other']),
  location: z.string().min(1, 'Location is required'),
  startAt: z.string().datetime(), // ISO string from datetime-local input
  endAt: z.string().datetime(),
  price: z.coerce.number().min(0).default(0), // 0 = free
})

type FormValues = z.infer<typeof formSchema>

function RouteComponent() {
  // const trpc = useTRPC()
  const navigate = useNavigate()
  const userId = Route.useLoaderData()

  const [authOpen, setAuthOpen] = useState(!userId) // pop if null

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setAuthOpen(false)
      navigate({ to: '/' })
    } else {
      setAuthOpen(true)
    }
  }

  /* auth modal */
  if (!userId) {
    return (
      <Dialog open={authOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md bg-linear-to-tl to-[#1F1F1F] from-[#0A0A0A] text-white outline-0 border-none">
          <SignIn />
        </DialogContent>
      </Dialog>
    )
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      coverImageUrl:
        'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
      type: 'hiking',
      location: '',
      startAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 16), // tomorrow
      endAt: new Date(Date.now() + 26 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 16),
      price: 0,
    },
  })

  // const { mutate: createEvent, isPending } = useMutation({
  //   ...trpc.event.create.mutationOptions(),
  //   onSuccess: () => {
  //     toast.success('Event created!')
  //     form.reset()
  //   },
  //   onError: (err) => toast.error(err.message),
  // })

  function onSubmit(values: FormValues) {
    // createEvent(values)
    console.log(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 px-12 py-6 bg-[#030302] min-h-screen text-white"
      >
        <h1 className="text-3xl font-bold">Create Event</h1>

        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event title</FormLabel>
              <FormControl>
                <Input placeholder="Sunrise Yoga at the Park" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell people what to expect..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Cover Image */}
        <FormField
          control={form.control}
          name="coverImageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} />
              </FormControl>
              <FormDescription>Optional – must be a valid URL.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Type */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event type</FormLabel>
              <FormControl>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  {...field}
                >
                  <option value="hiking">Hiking</option>
                  <option value="yoga">Yoga</option>
                  <option value="running">Running</option>
                  <option value="climbing">Climbing</option>
                  <option value="other">Other</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Location */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Central Park, NY" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Price */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price (USD)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  step={0.01}
                  placeholder="0.00"
                  {...field}
                />
              </FormControl>
              <FormDescription>Leave 0 for free events.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? 'Creating…' : 'Create Event'}
        </Button> */}
        <Button type="submit" className="w-full">
          Create Event
        </Button>
      </form>
    </Form>
  )
}
