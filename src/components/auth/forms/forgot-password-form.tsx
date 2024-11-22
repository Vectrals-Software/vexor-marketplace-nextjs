'use client'

import { useForm } from "react-hook-form"
import AuthCardWrapper from "../cards/auth-card-wrapper"
import * as z from "zod"
import { ForgotPasswordSchema } from "../../../schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
import { Input } from "../../ui/input"
import { Button } from "../../ui/button"
import FormError from "../../shared/indicators/form-error"
import FormSuccess from "../../shared/indicators/form-success"
import { login } from "../../../actions/auth/login"
import { useState, useTransition } from "react"
import { sendResetPasswordEmail } from "@/actions/auth/reset-password"
import { RxDotsHorizontal } from "react-icons/rx"

const ForgotPasswordForm = () => {

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: ''
    }
  })

  const onSubmit = (values: z.infer<typeof ForgotPasswordSchema>) => {

    // Everytime we submit we should clear the previous errors
    setError(''); setSuccess('')


    startTransition(() => {
      sendResetPasswordEmail(values).then((data: any) => {
        if (data) {
          setError(data.error)
          setSuccess(data.success)
        }
      })
    })
  }

  return (
    <AuthCardWrapper
      headerLabel="Forgot your password?"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login">
      <Form {...form}>
        <form
          className="space-y-6"
          onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {/* Email input */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} {...field} type="email" placeholder="youremail@example.com" />
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
            {isPending ? <RxDotsHorizontal /> : 'Send reset email'}
          </Button>

        </form>
      </Form>
    </AuthCardWrapper>
  )
}

export default ForgotPasswordForm