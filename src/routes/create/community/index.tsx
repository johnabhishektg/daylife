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
import { useTRPC } from '@/integrations/trpc/react'
import { getSession } from '@/lib/auth-client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

export const Route = createFileRoute('/create/community/')({
  component: RouteComponent,
  loader: async ({}) => {
    const { data: session } = await getSession()
    const userId = session?.user.id

    return userId
  },
})

function RouteComponent() {
  const userId = Route.useLoaderData()
  const navigate = useNavigate()
  const [authOpen, setAuthOpen] = useState(!userId)

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setAuthOpen(false)
      navigate({ to: '/' })
    } else {
      setAuthOpen(true)
    }
  } // pop if null

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

  const trpc = useTRPC()

  const formSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().optional(),
    coverImageUrl: z.string().url('Must be a valid URL').optional(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      coverImageUrl:
        'https://gos3.ibcdn.com/d39b9e75-dbfb-4803-ba07-108df0b2eae2.jpg',
    },
  })

  const { mutate: addCommunity } = useMutation({
    ...trpc.community.create.mutationOptions(),
    onSuccess: () => {
      toast.success(`Community was created!`)
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    addCommunity({
      name: values.name,
      coverImageUrl: values.coverImageUrl,
      description: values.description,
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 px-12 py-6 bg-[#030302] min-h-screen text-white"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="My awesome project" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="A short description (optional)"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <Button
          variant="outline"
          className="text-black hover:bg-gray-200 cursor-pointer"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  )
}
