'use client'

import { useForm } from "react-hook-form"
import AuthCardWrapper from "../cards/auth-card-wrapper"
import * as z from "zod"
import { RegisterSchema } from "../../../schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
import { Input } from "../../ui/input"
import { Button } from "../../ui/button"
import FormError from "../../shared/indicators/form-error"
import FormSuccess from "../../shared/indicators/form-success"
import { register } from "../../../actions/auth/register"
import { useState, useTransition } from "react"
import { RxDotsHorizontal } from "react-icons/rx"

const RegisterForm = () => {

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      name: ''
    }
  })

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {

    // Everytime we submit we should clear the previous errors
    setError(''); setSuccess('')

    startTransition(() => {
      register(values).then((data)=> {
        setError(data.error)
        setSuccess(data.success)
      })
    })
  }

  return (
    <AuthCardWrapper
    headerTitle="Register"
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
      showSocial>
      <Form {...form}>
        <form
          className="space-y-6"
          onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {/* Name input */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} {...field} type="name" placeholder="Your Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Messages */}
          <FormError message={error} />
          <FormSuccess message={success} />

          <Button disabled={isPending} type="submit" className="w-full">
           { isPending ? <RxDotsHorizontal/> : 'Sign up'}
          </Button>

        </form>
      </Form>
    </AuthCardWrapper>
  )
}

export default RegisterForm