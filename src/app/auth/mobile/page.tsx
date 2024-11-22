'use client'

import React, { useCallback, useEffect, useState } from 'react'
import AuthCardWrapper from '@/components/auth/cards/auth-card-wrapper'
import { BeatLoader } from "react-spinners";
import { useRouter, useSearchParams } from 'next/navigation';
import { verifyEmail } from '@/actions/auth/email-verification';
import FormError from '@/components/shared/indicators/form-error';
import FormSuccess from '@/components/shared/indicators/form-success';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { signOut } from 'next-auth/react';
import { TokensService } from '@/services/tokens-service';

const MobileAuth = () => {

  const searchParams = useSearchParams()
const router = useRouter()
  const user = useCurrentUser()
  const token = searchParams.get('accessToken')
  const newVisit = searchParams.get('newVisit')
  const [errorMsg, setErrorMsg] = useState<string | undefined>()
  const [successMsg, setSuccessMsg] = useState<string | undefined>()


  // useCallback is needed to use the function inside useEffect
  const onSubmit = useCallback(async () => {

    if (newVisit) {
        signOut()
        return
    }

    if (successMsg || errorMsg) {
      return
    }

    if (!user) {
        setErrorMsg('The user could not be read or it is invalid')
        return
      }

      if (!token) {
        //Dummy token generation
        const token = await TokensService.getAuthToken(user.id as string)
        router.push(`${window.location.href}?accessToken=${token}`)
        return
      }

    /* verifyEmail(token).then((data) => {

      if (data) {
        setSuccessMsg(data.success)
        setErrorMsg(data.error)
      }
    }).catch(() => {
      setErrorMsg('Oops, something went wrong!')
    }) */
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, successMsg, errorMsg])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])


  return (
    <AuthCardWrapper
      headerLabel='Logging in...'
    >
      <div className="flex items center w-full justify-center">
        {!successMsg && !errorMsg && (
          <BeatLoader />
        )}
        {!successMsg && (
          <FormError message={errorMsg} />
        )}
        <FormSuccess message={successMsg} />
      </div>
    </AuthCardWrapper>
  )
}

export default MobileAuth