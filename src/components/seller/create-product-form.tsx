'use client'

import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import FormError from "../shared/indicators/form-error"
import FormSuccess from "../shared/indicators/form-success"
import { useState, useTransition } from "react"
import { RxDotsHorizontal } from "react-icons/rx"
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card"
import { ProductSchema } from "@/schemas"
import { createProduct } from "@/actions/seller/create-product"
import { BeatLoader } from "react-spinners"
import Link from "next/link"

const CreateProductForm = () => {

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      title: '',
      description: '',
      image: '',
      price: 0,
      quantity: 0
    }
  })

  const onSubmit = (values: z.infer<typeof ProductSchema>) => {

    // Everytime we submit we should clear the previous errors
    setError(''); setSuccess('')

    startTransition(async () => {
      const { error, success, message } = await createProduct(values)
      if (error) setError(message)
      if (success) {
        setSuccess(message)
        form.reset()
      }
    })
  }

  return (
    <div className="border-none shadow-none px-2">
      <h1 className="text-4xl font-bold text-center mb-8">Publish your product</h1>
      <Form {...form}>
        <form
          className="space-y-6"
          onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {/* Title input */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Title</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} {...field} placeholder="Enter product title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description input */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} {...field} placeholder="Describe your product" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price input */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      onFocus={(e) => e.target.select()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Quantity input */}
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      type="number"
                      min="0"
                      placeholder="0"
                      onFocus={(e) => e.target.select()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image upload not implemented */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Image</FormLabel>
                  <div className="rounded-lg border border-dashed border-gray-300 p-4">
                    <p className="text-sm text-gray-500 text-center">
                      Image upload functionality needs to be implemented using your preferred solution (Cloudinary, UploadThing, AWS S3, etc.)
                    </p>
                  </div>
                </FormItem>
              )}
            />
          </div>

          {/* Messages */}
          <FormError message={error} />
          <FormSuccess message={success} />


          <div className="flex flex-col md:flex-row gap-4">
            <Link href="/my-products">
              <Button variant="outline" disabled={isPending} type="submit" className="w-full md:flex-1">
                {isPending ?  <BeatLoader color="#ffffff" size={8} /> : 'See my products'}
              </Button>
            </Link>

            <Button disabled={isPending} type="submit" className="w-full">
            {isPending ?  <BeatLoader color="#ffffff" size={8} /> : 'Publish'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default CreateProductForm