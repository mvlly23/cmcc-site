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
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  password: z.string().min(3, {
    message: "Password must be at least 3 characters.",
  }),
})

export function LoginForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: ""
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const request = await fetch('https://blog.cmcc.ml/api/auth/local', {
      method: 'POST',
      body: JSON.stringify({identifier: data.username, password: data.password}),
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    });
    const response = await request.json();
    if (response.hasOwnProperty('jwt')) {
      document.cookie = 'jwt = ' + response.jwt;
      document.cookie = 'user = ' + response.user.username;
      window.location.href = 'https://cmcc.ml/blog/grid';
    } else {
      // Failed login
      form.setValue("password", "");
      const errorText = document.getElementById("failed-login");
      if (errorText !== null) {
        errorText.style.display = 'block';
      }
    }
  }

  return (
      <div className="w-full max-w-sm rounded-md border-2 bg-white">
        <div className="m-4">
        <p id="failed-login" className="hidden text-red-700 text-center">Login Failed! Please try again</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <FormControl>
                    <Input className="w-full" placeholder="m@example.com" {...field} />
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
                    <a href="#" className="ml-auto inline-block text-sm underline">Forgot Password?</a>
                  </div>
                  <FormControl>
                    <Input className="w-full" type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full mt-4">Login</Button>
          </form>
        </Form>
        <a href="/blog/register"><Button className="w-full mt-4">Register</Button></a>
      </div>
    </div>
  )
}
