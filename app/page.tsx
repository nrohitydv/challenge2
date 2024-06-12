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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const FormSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: "Email is required.",
    })
    .email("Valid email required"),
});

const Home = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setIsDialogOpen(true);
  };

  return (
    <main className="flex justify-around items-center mt-10 sm:flex-col-reverse">
      <div className="flex flex-col space-y-7">
        <h1 className="text-5xl font-extrabold">Stay updated!</h1>
        <p className="text-md text-slate-800">
          Joined 60,000+ product managers receiving monthly
          <br />
          updates on:
        </p>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="delivery"
              className="border-slate-600 rounded-lg ring-0"
            />
            <label
              htmlFor="delivery"
              className="text-sm font-medium leading-none text-slate-800"
            >
              Product delivery and building what matters
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="measurement"
              className="border-slate-600 rounded-lg"
            />
            <label
              htmlFor="measurement"
              className="text-sm font-medium leading-none text-slate-800"
            >
              Measuring to ensure updates are a success
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="more" className="border-slate-600 rounded-lg" />
            <label
              htmlFor="more"
              className="text-sm font-medium leading-none text-slate-800"
            >
              And much more
            </label>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
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
          <div className="flex flex-col items-start">
            <div>
              <Image
                src="/icon-success.svg"
                alt="success icon"
                width={50}
                height={50}
              />
            </div>
            <h1 className="text-3xl font-extrabold">Thanks for subscribing!</h1>
            <p className="text-sm text-gray-700">
              A confirmation mail has been sent to your email. Please open it
              and click the button inside to confirm the subscription.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default Home;
