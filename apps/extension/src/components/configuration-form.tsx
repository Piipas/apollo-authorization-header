import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useFieldArray, useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { requestSchema } from "@/lib/schemas";
import { useStore } from "@/lib/store";
import { sendRequest } from "@/lib/helpers";

export function ConfigurationForm() {
  const [isPending, setIsPending] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { addRequest } = useStore();

  const form = useForm<z.infer<typeof requestSchema>>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      endpoint: "http://localhost:3000/auth/login",
      fields: [{ name: "", value: "" }],
      token_path: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "fields",
  });

  async function onSubmit(values: z.infer<typeof requestSchema>) {
    try {
      setIsPending(true);
      await sendRequest(values);
    } finally {
      setIsPending(false);
    }
  }

  function onSave(values: z.infer<typeof requestSchema>) {
    setIsSaving(true);

    const newRequest = { id: new Date().toString(), ...values, timestamp: new Date().toISOString() };
    addRequest(newRequest);

    form.resetField("fields");
    form.resetField("token_path");

    setIsSaving(false);
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

        <FormField
          control={form.control}
          name="token_path"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Token Path</FormLabel>
              <FormControl>
                <Input placeholder="eg: returned.auth.token.user.path" {...field} />
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

        <div className="grid grid-cols-2 gap-2">
          <Button type="submit" size={"lg"} disabled={isPending} className="w-full cursor-pointer">
            {isPending ? "Sending..." : "Send Request"}
          </Button>
          <Button type="button" size={"lg"} className="w-full cursor-pointer" onClick={form.handleSubmit(onSave)}>
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
