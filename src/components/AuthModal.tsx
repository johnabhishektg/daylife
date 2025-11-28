import { Link } from '@tanstack/react-router'
import { Icons } from './Icons'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import UserAuthForm from './UserAuthForm'

export default function AuthModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" variant="outline">
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-linear-to-tl to-[#1F1F1F] from-[#0A0A0A] text-white outline-0 border-none">
        {/* #1F1F1F */}
        <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
          <div className="flex flex-col space-y-2 text-center">
            <Icons.logo className="mx-auto h-6 w-6" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              By continuing, you are setting up a Dawn account and agree to our
              User Agreement and Privacy Policy.
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            New to Dawn?{' '}
            <Link
              to="/discover"
              className="hover:text-brand text-sm underline underline-offset-4 hover:text-white/55"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
