import { SignIn } from './SignIn'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'

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
        <SignIn />
      </DialogContent>
    </Dialog>
  )
}
