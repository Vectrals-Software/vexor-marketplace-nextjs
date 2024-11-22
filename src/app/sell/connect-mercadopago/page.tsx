'use client'

import { connectAccount, getMercadoPagoCredentials } from '@/actions/seller/connect-account'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'

const MercadoPagoAuthorizationPage = () => {


  const [connectionState, setConnectionState] = useState("We're finishing the MercadoPago vendor account setup...");
  const [showConnectButton, setShowConnectButton] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  // Connect with mercadopago
  const handleConnect = () => {
    startTransition(async () => {
        const response = await connectAccount('mercadopago')
        console.log(response);
        if (response.success && response.data?.connect_url) {
            window.location.href = response.data.connect_url
        }
    })
}

  useEffect(() => {
    startTransition(async () => {
      const response = await getMercadoPagoCredentials(window.location.href)
      console.log(response);
      if (response.success) {
        setIsConnected(true)
        setConnectionState(response.message)
      }
    })
  }, [])

  return (
    <div className='flex flex-col flex-1 justify-center text-center items-center min-h-screen -mt-16 pt-16'>

      <p>{connectionState}</p>

      {showConnectButton && (
        <div className="my-5">
          <Button onClick={() => handleConnect()}>
            {isPending ? 'Redirecting...' : 'Connect MercadoPago'}
          </Button>
        </div>
      )}

      {isConnected && (
        <Link href={'/sell'} className="my-5">
          <Button>
            Start selling
          </Button>
        </Link>
      )}
    </div>
  )
}

export default MercadoPagoAuthorizationPage;