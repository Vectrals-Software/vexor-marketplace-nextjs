import AdminServerButtons from '@/components/admin/admin-actions-buttons'
import { RoleProtectedAccess } from '@/components/auth/access/role-protected-access'
import FormSuccess from '@/components/shared/indicators/form-success'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { currentUser } from '@/lib/auth-user'
import { UserRoles } from '@/lib/constants'
import React from 'react'

const AdminPage = async () => {

  const user = await currentUser()

  return (
    <Card className='w-[600px] max-w-full'>
      <CardHeader>
        <p className='text-2xl font-semibold text-center'>Admin</p>
      </CardHeader>
      <CardContent className='space-y-4'>
        <RoleProtectedAccess allowedRole={UserRoles.ADMIN}>
          <FormSuccess message='You are allowed to see this content' />
        </RoleProtectedAccess>
       <AdminServerButtons/>
      </CardContent>
    </Card>
  )
}

export default AdminPage