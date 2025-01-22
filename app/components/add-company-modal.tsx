"use client";

import { useState } from "react";
// biome-ignore lint/style/useImportType: <explanation>
import { Company, Address } from "@/app/types";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { databases, ID } from "@/app/lib/appwrite-config";
import { toast } from "@/app/hooks/use-toast";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const COMPANIES_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;
const ADDRESSES_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_ADDRESSES_COLLECTION_ID;
const USERS_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID;

interface AddCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddCompanyModal({
  isOpen,
  onClose,
  onSuccess,
}: AddCompanyModalProps) {
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState<Omit<Address, "$id">[]>([
    {
      street: "",
      postalCode: "",
      city: "",
      country: "",
    },
  ]);
  const [companyData, setCompanyData] = useState({
    logo: "",
    name: "",
    description: "",
    dealValue: 0,
    username: "",
    email: "",
  });

  const addAddressField = () => {
    setAddresses([
      ...addresses,
      { street: "", postalCode: "", city: "", country: "" },
    ]);
  };

  const removeAddressField = (index: number) => {
    setAddresses(addresses.filter((_, i) => i !== index));
  };

  const updateAddress = (
    index: number,
    field: keyof Address,
    value: string
  ) => {
    const newAddresses = [...addresses];
    newAddresses[index] = { ...newAddresses[index], [field]: value };
    setAddresses(newAddresses);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const addressPromises = addresses.map((address) =>
        databases.createDocument(
          DATABASE_ID!,
          ADDRESSES_COLLECTION_ID!,
          ID.unique(),
          address
        )
      );
      const createdAddresses = await Promise.all(addressPromises);

      const user = await databases.createDocument(
        DATABASE_ID!,
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        USERS_COLLECTION_ID!,
        ID.unique(),
        {
          username: companyData.username,
          email: companyData.email,
        }
      );

      await databases.createDocument(
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        DATABASE_ID!,
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        COMPANIES_COLLECTION_ID!,
        ID.unique(),
        {
          logo: companyData.logo,
          name: companyData.name,
          description: companyData.description,
          dealValue: companyData.dealValue,
          addresses: createdAddresses.map((addr) => addr.$id),
          users: user.$id,
          version: 1,
        }
      );

      toast({
        title: "Success",
        description: "Company added successfully",
      });
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error details:", error);
      toast({
        title: "Error",
        description: "Failed to add company",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] flex flex-col p-0 bg-[#000a14]">
        <DialogHeader className="p-6 pb-2 stroke-white ">
          <DialogTitle className="font-poppins text-center text-white">
            Neues Unternehmen hinzufügen
          </DialogTitle>
          <X
            className="absolute right-4 top-4 h-4 w-4 cursor-pointer text-white hover:text-gray-300"
            onClick={onClose}
          />
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col min-h-0 flex-1">
          <div
            className="flex-1 overflow-y-auto px-6 py-4 space-y-6 [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:rounded-full
            [&::-webkit-scrollbar-track]:bg-gray-100
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-gray-300
            dark:[&::-webkit-scrollbar-track]:bg-neutral-700
            dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
          >
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div>
                <Label htmlFor="logo" className="font-poppins text-white">
                  Logo URL
                </Label>
                <Input
                  id="logo"
                  value={companyData.logo}
                  className="bg-gray-700 text-white font-poppins"
                  onChange={(e) =>
                    setCompanyData({ ...companyData, logo: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="name" className="font-poppins text-white">
                  Unternehmensname
                </Label>
                <Input
                  id="name"
                  required
                  className="bg-gray-700 text-white font-poppins"
                  value={companyData.name}
                  onChange={(e) =>
                    setCompanyData({ ...companyData, name: e.target.value })
                  }
                />
              </div>
              <div className="col-span-2">
                <Label
                  htmlFor="description"
                  className="font-poppins text-white"
                >
                  Beschreibung
                </Label>
                <Textarea
                  id="description"
                  required
                  className="bg-gray-700 text-white font-poppins"
                  value={companyData.description}
                  onChange={(e) =>
                    setCompanyData({
                      ...companyData,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="dealValue" className="font-poppins text-white">
                  Mitarbeiter Anzahl
                </Label>
                <Input
                  id="dealValue"
                  type="number"
                  required
                  className="bg-gray-700 text-white font-poppins"
                  value={companyData.dealValue}
                  onChange={(e) =>
                    setCompanyData({
                      ...companyData,
                      dealValue: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="username" className="font-poppins text-white">
                  Geschäftsführer
                </Label>
                <Input
                  id="username"
                  required
                  className="bg-gray-700 text-white font-poppins"
                  value={companyData.username}
                  onChange={(e) =>
                    setCompanyData({ ...companyData, username: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="email" className="font-poppins text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  className="bg-gray-700 text-white font-poppins"
                  value={companyData.email}
                  onChange={(e) =>
                    setCompanyData({ ...companyData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="font-poppins text-white">Addressen</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addAddressField}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Addresse hinzufügen
                </Button>
              </div>
              {addresses.map((address, index) => (
                <div key={index} className="p-4 border rounded-lg relative">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2 hover:bg-red-600"
                    onClick={() => removeAddressField(index)}
                  >
                    <X className="h-4 w-4 text-white hover:text-black" />
                  </Button>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="font-poppins text-white">Straße</Label>
                      <Input
                        required
                        className="bg-gray-700 text-white font-poppins"
                        value={address.street}
                        onChange={(e) =>
                          updateAddress(index, "street", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label className="font-poppins text-white">
                        Postzeitzahl
                      </Label>
                      <Input
                        required
                        className="bg-gray-700 text-white font-poppins"
                        value={address.postalCode}
                        onChange={(e) =>
                          updateAddress(index, "postalCode", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label className="font-poppins text-white">Stadt</Label>
                      <Input
                        required
                        className="bg-gray-700 text-white font-poppins"
                        value={address.city}
                        onChange={(e) =>
                          updateAddress(index, "city", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label className="font-poppins text-white">Land</Label>
                      <Input
                        className="bg-gray-700 text-white font-poppins"
                        value={address.country}
                        onChange={(e) =>
                          updateAddress(index, "country", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter className="p-6 flex gap-3">
            <Button
              type="button"
              onClick={onClose}
              className="bg-red-800 hover:bg-red-700 font-poppins font-medium"
            >
              Abbrechen 
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-green-800 hover:bg-green-700 font-poppins font-semibold"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating...
                </div>
              ) : (
                "Unternhemen Erstellen"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
