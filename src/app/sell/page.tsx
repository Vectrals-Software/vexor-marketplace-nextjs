import ConnectAccount from '@/components/seller/connect-account'
import CreateProductForm from '@/components/seller/create-product-form'
import ManageAccountButton from '@/components/seller/manage-account-button'
import { currentUser } from '@/lib/auth-user'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'

const SellPage = async () => {

  const user = await currentUser()

  if (!user) {
    redirect('/auth/login')
  }

  const connectedAccounts = await db.connectedGatewayAccount.findMany({
    where: {
      userId: user.id,
      isActive: true
    }
  })
  

  if (connectedAccounts.length === 0) {
    return (
      <section className="flex flex-col gap-4 justify-center items-center h-full flex-1 my-20">
        <ConnectAccount />
      </section>
    )
  }

  return (
    <section className="flex flex-col gap-4 justify-center items-center h-full flex-1 my-20">
       
       {connectedAccounts[0].platform === 'stripe' && (
        <ManageAccountButton account_identifier={connectedAccounts[0].identifier} />
       )}
        <CreateProductForm />
    </section>
  )
}

export default SellPage