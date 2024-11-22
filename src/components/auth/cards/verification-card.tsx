'use client'

import React, { useCallback, useEffect, useState } from 'react'
import AuthCardWrapper from './auth-card-wrapper'
import { BeatLoader } from "react-spinners";
import { useSearchParams } from 'next/navigation';
import { verifyEmail } from '@/actions/auth/email-verification';
import FormError from '../../shared/indicators/form-error';
import FormSuccess from '../../shared/indicators/form-success';

const VerificationCard = () => {

  const searchParams = useSearchParams()

  const token = searchParams.get('token')
  const [errorMsg, setErrorMsg] = useState<string | undefined>()
  const [successMsg, setSuccessMsg] = useState<string | undefined>()


  // useCallback is needed to use the function inside useEffect
  const onSubmit = useCallback(() => {

    if (successMsg || errorMsg) {
      return
    }

    if (!token) {
      setErrorMsg('The token could not be read or it is invalid')
      return
    }
    verifyEmail(token).then((data) => {

      if (data) {
        setSuccessMsg(data.success)
        setErrorMsg(data.error)
      }
    }).catch(() => {
      setErrorMsg('Oops, something went wrong!')
    })
  }, [token, successMsg, errorMsg])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])


  return (
    <AuthCardWrapper
      headerLabel='Confirming your email...'
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

export default VerificationCard