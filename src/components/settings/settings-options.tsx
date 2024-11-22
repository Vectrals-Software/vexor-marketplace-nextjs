'use client'
import { updateSettings } from '@/actions/settings/update-settings'
import { Button } from '../ui/button'
import { useState, useTransition } from 'react'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { SettingsSchema } from '@/schemas'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import FormSuccess from '../shared/indicators/form-success'
import FormError from '../shared/indicators/form-error'
import { BeatLoader } from 'react-spinners'
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select'
import { SelectValue } from '@radix-ui/react-select'
import { UserRoles } from '@/lib/constants'
import { Switch } from '../ui/switch'
import { cn } from '@/lib/utils'

const SettingsOptions = () => {

    const user = useCurrentUser()
    const [isChangingPassword, setIsChangingPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string>()
    const [successMessage, setSuccessMessage] = useState<string>()
    const [isPending, startTransition] = useTransition()
    const { update } = useSession()
    const [isSubmitted, setIsSubmitted] = useState(false); // State variable to track submission status


    const triggerUpdate = (values: z.infer<typeof SettingsSchema>) => {
        startTransition(() => {
            console.clear()
            if (!isChangingPassword) {
                values.password = undefined
                values.newPassword = undefined
            }
            updateSettings(values).then((data) => {
                // Client side session update
                if (data.error) {
                    setErrorMessage(data.error)
                }
                if (data.success) {
                    setSuccessMessage(data.success)
                    update()
                    setIsSubmitted(true); 
                }
            }).catch(() => setErrorMessage('Something went wrong'))
            setTimeout(() => {
                setErrorMessage(undefined)
                setSuccessMessage(undefined)
            }, 3000);

        })
    }

    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            name: user?.name as string | undefined,
            email: user?.email as string | undefined,
            password: undefined,
            newPassword: undefined,
            role: user?.role as string | undefined,
            is2FAenabled: user?.is2FAenabled as boolean,
            hasCredentials: user?.hasCredentials as boolean
        }
    })



    return (
        <Form {...form}>
            <form className='space-y-6' onSubmit={form.handleSubmit(triggerUpdate)}>
                <div className="space-y-4">
                    {/* Name input */}
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder='Your name' disabled={isPending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Email input */}
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder='Your email' disabled={isPending || user?.isOAuth} />
                                </FormControl>
                                <p
                                    className={cn("text-[0.8rem] font-medium text-popover-foreground")}
                                >
                                </p>
                                <FormMessage />
                            </FormItem>
                        )}
                    />



                    {/* Role input */}
                    <FormField
                        control={form.control}
                        name='role'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Role</FormLabel>
                                <Select
                                    disabled={isPending}
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Select a role' />
                                        </SelectTrigger>
                                    </FormControl>
                                    <FormMessage />

                                    <SelectContent>
                                        <SelectItem value={UserRoles.ADMIN}>
                                            Admin
                                        </SelectItem>
                                        <SelectItem value={UserRoles.USER}>
                                            User
                                        </SelectItem>
                                    </SelectContent>

                                </Select>
                            </FormItem>
                        )}
                    />

                    {/* 2FA switch */}
                    <FormField
                        control={form.control}
                        name='is2FAenabled'
                        render={({ field }) => (
                            <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'
                            >
                                <div className="space-y-0.5">
                                    <FormLabel>
                                        2FA
                                    </FormLabel>
                                    <FormDescription>Enable two factor authentication for your account</FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                        disabled={isPending}
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />


                    <div className='flex flex-col rounded-lg border p-3 shadow-sm'>

                        <p onClick={() => setIsChangingPassword(true)} className='text-sm font-medium cursor-pointer'>{
                            user?.hasCredentials ? 'Change my password' : 'Set up a password for login (optional)'
                        }</p>

                        {
                            isChangingPassword && (
                                <div className='mt-5'>
                                    {/* Current password input */}
                                    {user?.hasCredentials && (
                                        <FormField
                                            control={form.control}
                                            name='password'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Current password</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder='******' disabled={isPending} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )}


                                    {/* New password input */}
                                    <FormField
                                        control={form.control}
                                        name='newPassword'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>New password</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder='******' disabled={isPending} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex justify-end mt-4">
                                        <p onClick={() => setIsChangingPassword(false)} className='text-sm p-2 font-medium cursor-pointer text-end border rounded-md bg-slate-100'>Cancel</p>
                                    </div>
                                </div>
                            )
                        }



                    </div>


                </div>
                <FormSuccess message={successMessage} />
                <FormError message={errorMessage} />
                <Button type='submit'>
                    {!isPending ? 'Save changes' : <BeatLoader color="#ffffff" size={8} />}
                </Button>
            </form>
        </Form>
    )
}

export default SettingsOptions