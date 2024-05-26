"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

import { Loader } from "lucide-react";
import { site } from "@/constants";
import { shortenAddress } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerSchema } from "@/validations";
import Image from "next/image";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import { useEffect, useState } from "react";
import { registerUser } from "@/auth";

export default function SignUpPage() {
  const router = useRouter();

  const { address, isConnected } = useWeb3ModalAccount();
  const { open } = useWeb3Modal();

  const [isLoading, setIsLoading] = useState(false);
  const [isAddress, setIsAddress] = useState("");

  useEffect(() => {
    if (isConnected) {
      setIsAddress(`${address}`);
    }
  }, [address, isConnected, router]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof registerSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    toast.loading("Registering...");
    setIsLoading(true);
    const requiredValues = {
      name: values.name,
      email: values.email,
      password: values.password,
      address: isAddress,
    };

    try {
      const { data, error }: any = await registerUser(requiredValues);
      if (error) {
        toast.error("Something went wrong", {
          description: error,
        });
        return;
      } else {
        toast.success("Confirm registration", {
          description: `A confirmation email has been sent to ${data?.user?.user_metadata?.email}.`,
        });

        router.replace(`/confirm?message=${data?.user?.user_metadata?.email}`);
      }
    } catch (error: any) {
      toast.error("Something went wrong", {
        description: error.message,
      });
      console.log(error);
    } finally {
      toast.dismiss();
    }
  }

  return (
    <div className="w-full max-w-md md:p-6 flex flex-col items-center">
      <div className="w-20 h-20">
        <Image
          src="/img/logo.png"
          alt="logo"
          width={512}
          height={512}
          priority
          className="w-full h-full object-cover"
        />
      </div>
      <h1 className="mt-5 text-[1.25rem] font-medium text-center">
        Create an Account
      </h1>
      <p className="text-sm mt-1 text-muted-foreground text-center px-4">
        Get started with {site.name}, just create an account and enjoy the
        experience.
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4 mt-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Web Sculptor"
                    type="text"
                    disabled={!isConnected || isLoading}
                    {...field}
                    className="h-11"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@gmail.com"
                    type="email"
                    autoComplete="username"
                    disabled={!isConnected || isLoading}
                    {...field}
                    className="h-11"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="xxxx xxxx xxxx xxxx"
                    type="password"
                    autoComplete="current-password"
                    disabled={!isConnected || isLoading}
                    {...field}
                    className="h-11"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="mt-3 h-11"
            size="lg"
            disabled={!isConnected || isLoading}>
            {isLoading ? (
              <>
                <Loader className="w-4 h-4 animate-spin mr-2" />
                Please wait...
              </>
            ) : (
              "Continue"
            )}
          </Button>

          <p className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
            <span className="flex-1 border" />
            {isConnected
              ? "You're good to go"
              : "You need to connect your wallet"}{" "}
            <span className="flex-1 border" />
          </p>

          <Button
            type="button"
            className="h-11"
            size="lg"
            variant="secondary"
            disabled={isLoading}
            onClick={() => open()}>
            {isConnected
              ? address && shortenAddress(address as string)
              : "Connect Wallet"}
          </Button>

          <p className="text-sm text-muted-foreground font-medium text-start mt-2">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-primary">
              Sign In
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}