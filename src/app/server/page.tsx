import UserInfo from "@/components/profile/user-info"
import { currentUser } from "@/lib/auth-user"

const ServerPage = async () => {
const user = await currentUser()

  return (
    <div className="flex flex-col gap-4 justify-center items-center h-full flex-1">
      <UserInfo label="💻 SSR component" user={user}/>
      <small>This component shows how to get the current user from the server side using the currentUser function.</small>
    </div>
  )
}

export default ServerPage