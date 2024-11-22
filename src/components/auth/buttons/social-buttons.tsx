'use client'

import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa";
import { Button } from "../../ui/button"
import { signIn } from "next-auth/react"
import { defaultLoginRedirect } from "@/routes"
import { useSearchParams } from "next/navigation"

const AuthSocialButtons = () => {

    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl')

    const handleLogin =  (provider: string) => {
        signIn(provider, {
            callbackUrl: callbackUrl || defaultLoginRedirect,
        })
    }

    return (
        <div className="flex items-center w-full gap-x-2">
            <Button 
            size={'lg'}
            variant={'outline'}
            className="w-full"
            onClick={()=> handleLogin('google')}
            >
                <FcGoogle className="h-5 w-5"/>
            </Button>
            <Button 
            size={'lg'}
            variant={'outline'}
            className="w-full"
            onClick={()=> handleLogin('github')}
            >
                <FaGithub className="h-5 w-5"/>
            </Button>
        </div>
    )
}

export default AuthSocialButtons