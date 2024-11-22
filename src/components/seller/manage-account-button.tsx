'use client'
import React, { useTransition } from 'react'
import { Button } from '../ui/button'
import { manageConnectedAccount } from '@/actions/seller/manage-connected-account'

const ManageAccountButton = ({account_identifier}: {account_identifier: string}) => {

    const [isPending, startTransition] = useTransition()

    const handleManage = async () => {
        startTransition(async () => {
            const response = await manageConnectedAccount(account_identifier)
            if (response.success) {
                window.location.href = response.data.dashboard_url
            }
        })
    }

    return (
        <div className="absolute bottom-0 right-0 p-4">
            <Button variant="secondary" onClick={handleManage} disabled={isPending}>{isPending ? 'Managing...' : 'Manage connected account'}</Button>
        </div>
    )
}

export default ManageAccountButton