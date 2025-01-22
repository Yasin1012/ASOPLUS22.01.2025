"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Customer, customerService } from "@/app/lib/customer-service";
import { useToast } from "@/app/hooks/use-toast";

const customerSchema = z.object({
  customerName: z.string().min(1, "Company name is required"),
  customerNumber: z.number().min(1, "Customer number is required"),
  logo: z.string().optional(),
  management: z.array(
    z.object({
      name: z.string().min(1, "Name is required"),
      email: z.string().email().optional(),
      phone: z.string().optional(),
      location: z.string().optional(),
    })
  ),
  primaryContact: z.array(
    z.object({
      name: z.string().min(1, "Name is required"),
      email: z.string().email().optional(),
      phone: z.string().optional(),
      location: z.string().optional(),
    })
  ),
  address: z.array(
    z.object({
      street: z.string().min(1, "Street is required"),
      postalCode: z.string().min(1, "Postal code is required"),
      city: z.string().min(1, "City is required"),
      country: z.string().optional(),
    })
  ),
});

type CustomerFormData = z.infer<typeof customerSchema>;

interface CustomerFormProps {
  customer?: Customer;
  onSuccess?: () => void;
}

export function CustomerForm({ customer, onSuccess }: CustomerFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: customer || {
      management: [{ name: "", email: "", phone: "", location: "" }],
      primaryContact: [{ name: "", email: "", phone: "", location: "" }],
      address: [{ street: "", postalCode: "", city: "", country: "" }],
    },
  });

  const onSubmit = async (data: CustomerFormData) => {
    try {
      setIsLoading(true);
      if (customer?.$id) {
        await customerService.updateCustomer(customer.$id, data);
      } else {
        await customerService.createCustomer(data);
      }
      toast({
        title: "Success",
        description: `Customer ${
          customer ? "updated" : "created"
        } successfully`,
      });
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{customer ? "Edit" : "Add"} Customer</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              {...form.register("customerName")}
              placeholder="Company Name"
            />
            {form.formState.errors.customerName && (
              <p className="text-sm text-red-500">
                {form.formState.errors.customerName.message}
              </p>
            )}
          </div>

          <div>
            <Input
              {...form.register("customerNumber", { valueAsNumber: true })}
              type="number"
              placeholder="Customer Number"
            />
            {form.formState.errors.customerNumber && (
              <p className="text-sm text-red-500">
                {form.formState.errors.customerNumber.message}
              </p>
            )}
          </div>

          <div>
            <Input {...form.register("logo")} placeholder="Logo URL" />
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : customer ? "Update" : "Create"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
