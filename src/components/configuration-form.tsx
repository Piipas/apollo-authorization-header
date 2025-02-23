import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useFieldArray, useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus, X } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  endpoint: z.string().url(),
  fields: z.array(
    z.object({
      name: z.string(),
      value: z.string(),
    }),
  ),
});

export function ConfigurationForm() {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      endpoint: "http://localhost:3000/auth/login",
      fields: [{ name: "", value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "fields",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsPending(true);

    const transformedData = values.fields.reduce<Record<string, string>>((acc, { name, value }) => {
      acc[name] = value;
      return acc;
    }, {});

    chrome.runtime.sendMessage({ type: "makeRequest", url: values.endpoint, payload: transformedData }, (response) => {
      if (response?.success) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs?.[0]?.id) chrome.tabs.sendMessage(tabs[0].id, { type: "inject_token", payload: response.data });
        });
      } else if (chrome.runtime.lastError) console.error(chrome.runtime.lastError.message);
      else console.error(response.error);
    });

    setIsPending(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="endpoint"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endpoint</FormLabel>
              <FormControl>
                <Input placeholder="http://localhost:3000/auth/login" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2 items-end">
            <FormField
              control={form.control}
              name={`fields.${index}.name`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Field name</FormLabel>
                  <FormControl>
                    <Input placeholder="username" className="w-full" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`fields.${index}.value`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Field value</FormLabel>
                  <FormControl>
                    <Input placeholder="pipas_dev" className="w-full" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {fields.length > 1 && (
              <Button
                type="button"
                size={"icon"}
                variant={"link"}
                className="mt-2 col-span-1 px-1 text-destructive cursor-pointer"
                onClick={() => remove(index)}
              >
                <X />
              </Button>
            )}
          </div>
        ))}

        <Button
          type="button"
          size={"lg"}
          className="w-full mt-2 cursor-pointer"
          variant={"outline"}
          onClick={() => append({ name: "", value: "" })}
        >
          <Plus />
          Add Field
        </Button>

        <Button type="submit" size={"lg"} disabled={isPending} className="w-full cursor-pointer">
          {isPending ? "Sending..." : "Send Request"}
        </Button>
      </form>
    </Form>
  );
}
