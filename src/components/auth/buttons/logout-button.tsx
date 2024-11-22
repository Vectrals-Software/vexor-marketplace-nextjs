'use client'
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { ReactNode } from "react"

interface LogoutButtonProps {
    children?: ReactNode,
}


const LogoutButton = ({ children }: LogoutButtonProps) => {


    const onClick = () => {
        signOut()
    }

    return (
        <span onClick={onClick} className="cursor-pointer">{children}</span>
    )
}

export default LogoutButton