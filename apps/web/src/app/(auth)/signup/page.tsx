"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { signUpSchema, SignUpFormValues } from "@/schemas/signup";
import { signUpAction } from "@/supabase/actions/auth";
import { ROLES } from "@/constants";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
const Signup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: ROLES.BUYER,
      terms: false,
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    setIsSubmitting(true);
    try {
      await signUpAction(data);
      setIsSubmitting(false);
      toast.success(
        searchParams.get("success") ||
          "Thanks for signing up! Please check your email for a verification link."
      );
    } catch (error) {
      setIsSubmitting(false);
      toast.error(`Failed to create account - ${(error as Error).message}`);
    }
  };

  return (
    <div className="container flex min-h-[calc(100vh-16rem)] items-center justify-center py-10">
      <div className="w-full max-w-md border-1">
        <Card className="border-border/40 shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
            <CardDescription>
              Create an account to get started with API Hub
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="johndoe" {...field} />
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} />
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
                          type="password"
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>I want to...</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={ROLES.BUYER}>
                            Consume APIs (Buyer)
                          </SelectItem>
                          <SelectItem value={ROLES.SELLER}>
                            Publish APIs (Seller)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-y-0 space-x-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I agree to the{" "}
                          <Link
                            href="/terms"
                            className="text-primary hover:underline"
                          >
                            terms and conditions
                          </Link>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating account..." : "Create account"}
                </Button>
                {searchParams.get("error") && (
                  <div className="text-red-500">
                    {searchParams.get("error")}
                  </div>
                )}

                {searchParams.get("success") && (
                  <div className="text-green-500 bg-green-500/10 p-2 rounded-md">
                    {searchParams.get("success")}
                  </div>
                )}
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-wrap items-center justify-between">
            <div className="text-muted-foreground text-sm">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="text-primary underline-offset-4 hover:underline"
              >
                Log in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
