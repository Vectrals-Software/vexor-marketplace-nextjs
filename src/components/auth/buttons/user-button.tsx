'use client'

import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { FaUser } from "react-icons/fa";
import { MdLogout, MdSettings } from "react-icons/md";
import LogoutButton from "./logout-button";
import LoginButton from "./login-button";
import { Button } from "@/components/ui/button";
import { CiLogin } from "react-icons/ci";
import { usePathname } from "next/navigation";
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { LuUser, LuUser2 } from 'react-icons/lu';

const UserButton = ({userFromProps}: {userFromProps: User | null}) => {
    const user = useCurrentUser() || userFromProps
    const pathname = usePathname()
    const [isLoading, setIsLoading] = useState(true)

    const {update} = useSession()

    useEffect(() => {
        update()
    }, [])

    if (!user) {
        return (
            <LoginButton>
                <Button
                    variant={"transparent"} size={'sm'}>Login
                    <CiLogin className="ml-2" size={16}/>
                    </Button>
            </LoginButton>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image || ''} />
                    <AvatarFallback className="bg-slate-300 text-slate-500">
                        <FaUser />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end">
                <DropdownMenuItem className="cursor-pointer">
                    <Link href="/settings" className="flex items-center">
                        Account <MdSettings className="h-4 w-4 ml-2" />
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                    <Link href="/client" className="flex items-center">
                       Client <LuUser className="h-4 w-4 ml-2" />
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                    <Link href="/server" className="flex items-center">
                       SSR <LuUser2 className="h-4 w-4 ml-2" />
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <LogoutButton>
                    <DropdownMenuItem className="cursor-pointer">
                        Logout  <MdLogout className="h-4 w-4 ml-2" />
                    </DropdownMenuItem>
                </LogoutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserButton