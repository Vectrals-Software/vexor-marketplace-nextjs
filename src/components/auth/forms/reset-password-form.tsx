'use client'

import { createNewPassword } from "@/actions/auth/reset-password"
import { zodResolver } from "@hookform/resolvers/zod"
import { RxDotsHorizontal } from "react-icons/rx"
import { useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { ResetPasswordSchema } from "../../../schemas"
import FormError from "../../shared/indicators/form-error"
import FormSuccess from "../../shared/indicators/form-success"
import { Button } from "../../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
import { Input } from "../../ui/input"
import AuthCardWrapper from "../cards/auth-card-wrapper"

const ResetPasswordForm = () => {

  const searchParams = useSearchParams()
  const resetPasswordToken = searchParams.get('token')
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: ''
    }
  })

  const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {

    // Everytime we submit we should clear the previous errors
    setError(''); setSuccess('')


    startTransition(() => {
      createNewPassword(values, resetPasswordToken).then((data: any) => {
        if (data) {
          setError(data.error)
          setSuccess(data.success)
        }
      })
    })
  }

  return (
    <AuthCardWrapper
      headerLabel="Reset your password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login">
      <Form {...form}>
        <form
          className="space-y-6"
          onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {/* New Password input */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>

          {/* Messages */}
          <FormError message={error} />
          <FormSuccess message={success} />

          <Button disabled={isPending} type="submit" className="w-full">
            {isPending ? <RxDotsHorizontal /> : 'Confirm new password'}
          </Button>

        </form>
      </Form>
    </AuthCardWrapper>
  )
}

export default ResetPasswordForm