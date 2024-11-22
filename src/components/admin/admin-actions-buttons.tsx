'use client'
import React from 'react'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import { adminExampleAction } from '@/actions/admin/admin-action-example'

const AdminServerButtons = () => {

    const onApiClick = () => {
        fetch('/api/admin').then((res)=> {
            if (res.ok) {
                toast.success('You are allowed to make api requests to this route')
            } else {
                toast.error('You are not allowed to make api requests to this route')

            }
        })
    }

    const onServerActionClick = () => {
        adminExampleAction().then(data => {
            if (data?.error) {
                toast.error(data.error)
            }
            if (data?.success) {
                toast.success(data.success)
            }
        })
    }

    return (
        <>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className='text-sm font-medium'>Admin only API route</p>
          <Button onClick={onApiClick}>
            Click to test
          </Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className='text-sm font-medium'>Admin only server action</p>
          <Button onClick={onServerActionClick}>
            Click to test
          </Button>
        </div>
        </>
    
    )
}

export default AdminServerButtons