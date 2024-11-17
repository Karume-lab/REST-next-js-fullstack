"use client";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { filterSchema, T_FilterSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

const FiltersForm = () => {
  const form = useForm<T_FilterSchema>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      title: "",
      email: "",
    },
  });

  const handleOnSubmit = (values: T_FilterSchema) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleOnSubmit)} id="filter-form">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter your title ..." {...field} />
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
                <Input
                  type="email"
                  placeholder="Enter your Email ..."
                  {...field}
                  onChange={(e) => {
                    e.target.value = e.target.value.trim();
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default FiltersForm;
