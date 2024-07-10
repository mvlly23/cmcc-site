"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const FormSchema = z.object({
    email: z.string().min(1, {
        message: "This field has to be filled."
    }).email("This is not a valid email."),
    username: z.string().min(3, {
        message: "Username must be at least 3 characters.",
    }),
    password: z.string().min(3, {
        message: "Password must be at least 3 characters.",
    }),
    confirmPassword: z.string().min(3, {
        message: "Password must be at least 3 characters.",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export function RegisterForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const request = await fetch('https://blog.cmcc.ml/api/auth/local/register', {
      method: 'POST',
      body: JSON.stringify({username: data.username, email: data.email, password: data.password}),
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    });
    const response = await request.json();
    if (response.hasOwnProperty('jwt')) {
      //STORE ME
      console.log(response.jwt);
      window.location = '/blog/grid';
    } else {
      form.setValue("password", "");
      form.setValue("confirmPassword", "");
      // TODO display error message somewhere
    }
  }

  return (
      <div className="w-full max-w-sm rounded-md border-2 bg-white">
        <div className="m-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input className="w-full" placeholder="m@example.com" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input className="w-full" placeholder="" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <div className="flex justify-between">
                    <FormLabel>Password</FormLabel>
                  </div>
                  <FormControl>
                    <Input className="w-full" type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <div className="flex justify-between">
                    <FormLabel>Verify Password</FormLabel>
                  </div>
                  <FormControl>
                    <Input className="w-full" type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full mt-4">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
