"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

const regex_exp : RegExp = new RegExp("[a-zA-Z]", "g");

const formSchema = z.object({
    number: z.string().transform((num, ctx) => {
        num = num.replace(/[^a-zA-Z0-9 ]/g, '')
        if (num.length !== 10) {
            ctx.addIssue({
                message: "Number must be 10 characters long.",
                code: z.ZodIssueCode.custom
            })
        }
        if (num.match(regex_exp)) {
            ctx.addIssue({
                message: "Number cannot contain alpha characters.",
                code: z.ZodIssueCode.custom
            })
        }
        return num;
    })
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: {
            number: ''
        }
    });

    async function onSubmit(values: FormValues) {
        const response = await fetch('https://api.cmcc.ml/twilio/add_number', {
            method: 'POST',
            body: JSON.stringify({phone_number: values.number}),
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        });
        form.reset();
        location.reload();
    }


    return (
        <div className="flex justify-center items-center">
            <Form {...form}>
                <form
                action=""
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex-1 max-w-md space-y-5"
                >
                <div className="relative name">
                    <FormField
                    name="number"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="text-base">Enter Phone Number</FormLabel>
                        <FormControl>
                            <Input
                            placeholder="Enter your Phone Number"
                            type="text"
                            className="mt-3"
                            {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                <Button type="submit" className="!mt-0 w-full">
                    Submit
                </Button>
                </form>
            </Form>
        </div>
    );
}
