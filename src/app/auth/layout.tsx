import { ReactNode } from "react"

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex flex-1 justify-center items-center bg-gray-50 max-w-full mih-screen">
            {children}
        </div>
    )
}

export default AuthLayout