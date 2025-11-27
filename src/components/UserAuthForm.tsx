import { signIn } from '@/lib/auth-client'
import React, { FC } from 'react'
import { toast } from 'sonner'
import { Button } from './ui/button'
import { Icons } from './Icons'
import { cn } from '@/lib/utils'
import { Spinner } from './ui/spinner'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const loginWithGoogle = async () => {
    setIsLoading(true)

    try {
      await signIn.social({ provider: 'google' })
    } catch (error) {
      toast('bruh', {
        description: 'There was an error logging in with Google',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex justify-center', className)} {...props}>
      <Button
        type="button"
        size="sm"
        className="w-full bg-white text-black p-5 cursor-pointer hover:bg-zinc-200"
        onClick={loginWithGoogle}
        disabled={isLoading}
      >
        {isLoading ? <Spinner /> : <Icons.google className="h-4 w-4 mr-2" />}
        Sign in with Google
      </Button>
    </div>
  )
}

export default UserAuthForm
