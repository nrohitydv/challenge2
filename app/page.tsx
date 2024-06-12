"use client";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { items } from "@/constants";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import DialogForContent from "@/components/ContentForDialog";

const FormSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: "Email is required.",
    })
    .email("Valid email required"),
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

const Home = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      items: [""],
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setIsDialogOpen(true);
  };

  return (
    <main className="flex justify-around items-center mt-10 sm:flex-col-reverse">
      <div className="flex flex-col space-y-6">
        <h1 className="text-5xl font-extrabold">Stay updated!</h1>
        <p className="text-md text-slate-800">
          Joined 60,000+ product managers receiving monthly
          <br />
          updates on:
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="items"
              render={() => (
                <FormItem>
                  {items.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="items"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                className="border-slate-600 rounded-lg"
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal text-slate-600">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@company.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Dialog>
              <DialogTrigger asChild>
                <Button type="submit" className="hover:bg-red-700">
                  Subscribe to monthly newsletter
                </Button>
              </DialogTrigger>
            </Dialog>
          </form>
        </Form>
      </div>
      <div>
        <Image src="/image1.svg" alt="side image" height={400} width={400} />
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogForContent />
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default Home;
