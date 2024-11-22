import { styles } from '@/lib/styles'
import { cn } from '@/lib/utils'
import React from 'react'
import LoginButton from '../auth/buttons/login-button'
import { Button } from '../ui/button'
import Link from 'next/link'
import { FaGithub } from "react-icons/fa";
import { currentUser } from '@/lib/auth-user'
import { Separator } from '@radix-ui/react-dropdown-menu'

const Hero = async () => {

    const user = await currentUser()

    return (
        <div className={cn(styles.container, 'py-20 mx-auto text-center flex flex-col items-center mt-20')}>
            <h1 className={cn(styles.title, 'max-w-2xl')}>Next.js <span className={cn(styles.gradients.text_highlight)}>multi-vendor marketplace</span> free example with <span className={cn(styles.gradients.text_highlight)}>Vexor</span>.</h1>
            <div className='grid grid-cols-2 gap-4 my-10'>    
                <p className={cn(styles.subtitle)}>A feature-rich marketplace template powered by modern technologies: Next.js, Vexor, Prisma, Shadcn, Tailwind, Next-auth, Resend, and Zod - everything you need to launch fast.</p>
                <p className={cn(styles.subtitle)}>Launch your marketplace in minutes, not months. Seamlessly integrate popular payment processors like Stripe and Mercadopago to start accepting payments from day one.</p>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center mt-4 gap-4">
                {!user && <LoginButton asChild mode='modal' className='w-full'>
                    <Button className='w-full' variant={'default'} size={'lg'}>Try it out</Button>
                </LoginButton>}

                <Link href={'https://github.com/Enzo-21/next-auth'} target='_blank'>
                    <Button variant={'secondary'} size={'lg'}>View code on github
                        <FaGithub className='ml-2' />
                    </Button>
                </Link>

            </div>


        </div>
    )
}

export default Hero