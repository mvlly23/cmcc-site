"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox"

const regex_exp : RegExp = new RegExp("[a-zA-Z]", "g");

const formSchema = z.object({
    title: z.string().min(1, {
        message: "You must include a title",
    }),
    content: z.string().min(1, {
        message: "You must include post content",
    }),
    visibility: z.boolean().default(false),
    image: z.any().optional(),
    // category
});

type FormValues = z.infer<typeof formSchema>;

export default function NewBlogPost() {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: {
            title: '',
            content: '',
            visibility: false,
        }
    });

    const fileRef = form.register('image');

    async function onSubmit(values: FormValues) {
      console.log(values);
      const cookies = (document.cookie).split(';');
      let user = '';
      let jwt = '';
      let imageId = '';
      for (let cookie of cookies) {
        const split = cookie.split('=');
        if (split[0] === 'user') {
          user = split[1];
        } else {
          jwt = split[1];
        }
      }
      const authStr = 'Bearer ' + jwt;
      if (values.image) {
        const imageFormData = new FormData();
        imageFormData.append('files', values.image[0]);
        const uploadImage = await fetch('https://blog.cmcc.ml/api/upload', {
          method: 'POST',
          body: imageFormData,
          headers: { 'Accept': 'application/json', 'Authorization': authStr },
        });
        const imageResponse = await uploadImage.json();
        imageId = imageResponse[0].id;
      }
    }

    return (
        <div className="w-full max-w-sm rounded-md border-2 bg-white">
        <div className="m-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input className="w-full" placeholder="Title" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <div className="flex justify-between">
                    <FormLabel>Post Content</FormLabel>
                  </div>
                  <FormControl>
                      <Textarea placeholder="Content" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormDescription>
                      Add an Image to your post (optional)
                    </FormDescription>
                  <FormControl>
                  <Input
                    type="file"
                    {...fileRef}
                  />
                  </FormControl>
                  <Button onClick={() => form.resetField('image')} type="reset">Clear</Button>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="visibility"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Post Visibility</FormLabel>
                  <div className="flex flex-row items-center justify-between">
                    <FormDescription>
                      Make your post visible after submitting?
                    </FormDescription>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full mt-4">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
    );
}
