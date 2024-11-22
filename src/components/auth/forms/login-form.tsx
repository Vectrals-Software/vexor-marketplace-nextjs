'use client'

import { login } from "@/actions/auth/login"
import FormError from "@/components/shared/indicators/form-error"
import FormSuccess from "@/components/shared/indicators/form-success"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoginSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { BeatLoader } from "react-spinners"
import * as z from "zod"
import AuthCardWrapper from "../cards/auth-card-wrapper"

const LoginForm = () => {

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')
  const [isPending, startTransition] = useTransition()
  const [show2FA, setShow2FA] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  let urlError = ''

  if (searchParams.get('error') == 'OAuthAccountNotLinked') {
    urlError = 'Email already in use, try logging with Google'
  }

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
      twoFACode: ''
    }
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {

    // Everytime we submit we should clear the previous errors
    setError(''); setSuccess('')

    startTransition(() => {
      login(values, callbackUrl?.toString()).then((data) => {
        if (data) {
          setError(data.error)
          setSuccess(data.success)

          // 2FA
          if (data.twoFactorAuthentication) {
            setShow2FA(true)
          }
        }

      }).catch(() => {
        setError('Something went wrong')
      })
    })
  }

  return (
    <AuthCardWrapper
      headerTitle="Welcome back!"
      headerLabel="Glad to have you here"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial>
      <Form {...form}>
        <form
          className="space-y-6"
          onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {show2FA ? (
              <FormField
                control={form.control}
                name="twoFACode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>2FA code</FormLabel>
                    <FormControl>
                      <Input disabled={isPending} {...field} type="number" placeholder="123456" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <>
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

                {/* Password input */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input disabled={isPending} {...field} type="password" />
                      </FormControl>

                      <Button size={'sm'} variant={'link'} asChild className="px-0 font-normal">
                        <Link href={'/auth/password/forgot'}>
                          Forgot your password?
                        </Link>
                      </Button>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )

            }

          </div>

          {/* Messages */}
          <FormError message={error || urlError} />
          <FormSuccess message={success} />

          <Button disabled={isPending} type="submit" className="w-full">
            {isPending ? <BeatLoader color="#ffffff" size={8} /> : (
              show2FA ? 'Confirm' : 'Login'
            )}
          </Button>

        </form>
      </Form>
    </AuthCardWrapper>
  )
}

export default LoginForm