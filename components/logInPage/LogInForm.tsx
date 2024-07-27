"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { LoginFormSchema, LoginFormType } from "@/utils/validations";
import { logIn } from "@/actions/authActions";
import { unknown } from "zod";
function LogInForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const form = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormType) {
    startTransition(async () => {
      const res: string | undefined = await logIn(data);
      if (res) {
        toast({
          title: "Error",
          description: JSON.stringify(res),
        });
      }
    });
  }
  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    type="email"
                    required
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
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    {...field}
                    type="password"
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full"
            disabled={isPending}
            type="submit"
            variant={"secondary"}
          >
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default LogInForm;
