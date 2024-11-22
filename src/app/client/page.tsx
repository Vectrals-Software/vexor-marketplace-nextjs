'use client'
import UserInfo from "@/components/profile/user-info"
import { useCurrentUser } from "@/hooks/useCurrentUser"

const ClientPage =  () => {
const user = useCurrentUser()

  return (
    <div className="flex flex-col gap-4 justify-center items-center h-full flex-1">
      <UserInfo label="💻 CSR component" user={user}/>
      <small>This component shows how to get the current user from the client side using the useSession hook.</small>
    </div> 
  )
}

export default ClientPage