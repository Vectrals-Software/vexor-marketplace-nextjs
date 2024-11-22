'use client'
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { ReactNode } from "react"
import LoginForm from "../forms/login-form"

interface LoginButtonProps {
    children: ReactNode,
    mode?: 'modal' | 'redirect',
    asChild?: boolean,
    className?: string
}


const LoginButton = ({ children, mode = 'redirect', asChild, className }: LoginButtonProps) => {

    const router = useRouter()

    const onClick = () => {
        router.push('/auth/login')
    }

    if (mode === 'modal') {
        return <Dialog>
            <DialogTrigger asChild={asChild}>
                {children}
            </DialogTrigger>
            <DialogContent className="p-0 w-auto bg-transparent border-none">
                <DialogTitle className="sr-only">Login</DialogTitle>
                <LoginForm />
            </DialogContent>
        </Dialog>
    }

    return (
        <span onClick={onClick} className={cn(className, 'cursor-pointer')}>{children}</span>
    )
}

export default LoginButton