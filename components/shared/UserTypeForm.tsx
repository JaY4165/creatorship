"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { UserTypeSchema, UserTypeType } from "@/utils/validations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

function UserTypeForm() {
  const form = useForm<UserTypeType>({
    resolver: zodResolver(UserTypeSchema),
  });

  function onSubmit(data: UserTypeType) {
    toast({
      title: "You submitted the following values:",
      description: "submitted",
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="userType"
          render={({ field }) => (
            <FormItem className="space-y-5">
              {/* <FormLabel>Choose the user type</FormLabel> */}
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-gray-200 dark:bg-neutral-900">
                    <SelectValue
                      placeholder="Choose the user type"
                      className="bg-gray-200 dark:bg-neutral-900"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-gray-200 dark:bg-neutral-900">
                  <SelectItem value="creator">Creator</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button variant={"default"} className="mt-5 w-full" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default UserTypeForm;
