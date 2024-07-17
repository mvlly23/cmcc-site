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
import _ from 'lodash';

const regex_exp : RegExp = new RegExp("[a-zA-Z]", "g");

const formSchema = z.object({
    search: z.string()
});

type FormValues = z.infer<typeof formSchema>;

export default function SearchBar() {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: {
            search: ''
        }
    });

    function onSubmit(values: FormValues) {
        const slug = _.kebabCase(values.search.replace(/[\W_]+/g, '-'));
        // TODO Fix before publishing
        // window.location.href = 'https://cmcc.ml/blog/search/?search=' + slug;
        window.location.href = 'http://localhost:4321/blog/search/results/?search=' + slug; 
    }


    return (
        <div className="flex justify-center items-center">
            <Form {...form}>
                <form
                action=""
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex-1 max-w-md space-y-5"
                >
                <div className="relative name flex justify-center items-center space-x-2">
                    <FormField
                    name="search"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Input
                            placeholder="Search..."
                            type="text"
                            className="px-3 py-2 w-80"
                            {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit" className="px-3 py-2">
                        Search
                    </Button>
                </div>
                </form>
            </Form>
        </div>
    );
}
