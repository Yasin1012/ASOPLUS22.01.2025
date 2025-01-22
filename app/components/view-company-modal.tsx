"use client";

import { Company } from "@/app/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Address } from "@/app/types";
import { databases } from "../lib/appwrite-config";
import { User } from "@/app/types";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const ADDRESSES_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_ADDRESSES_COLLECTION_ID;
const USERS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID;

interface ViewCompanyModalProps {
  company: Company | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ViewCompanyModal({
  company,
  isOpen,
  onClose,
}: ViewCompanyModalProps) {
  if (!company) return null;

  const [addressesData, setAddressesData] = useState<Address[]>([]);
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    if (company?.addresses) {
      const fetchAddresses = async () => {
        try {
          if (!company?.addresses || company.addresses.length === 0) return;

          const address = company.addresses[0];

          // If we already have the full address object, use it directly
          if (typeof address === "object" && address.$id) {
            setAddressesData([address as Address]);
            return;
          }

          // Otherwise, fetch it using the ID string
          const addressDoc = await databases.getDocument(
            DATABASE_ID!,
            ADDRESSES_COLLECTION_ID!,
            address as string
          );

          setAddressesData([
            {
              $id: addressDoc.$id,
              street: addressDoc.street,
              city: addressDoc.city,
              postalCode: addressDoc.postalCode,
              country: addressDoc.country,
            },
          ]);
        } catch (error) {
          console.error("Error fetching address:", error);
        }
      };
      fetchAddresses();
    }
  }, [company]);

  useEffect(() => {
    if (company?.users) {
      const fetchUser = async () => {
        try {
          if (!company?.users) {
            console.log("No user data found");
            return;
          }

          if (Array.isArray(company.users)) {
            const userId = company.users[0];
            const userDoc = await databases.getDocument(
              DATABASE_ID!,
              USERS_COLLECTION_ID!,
              userId
            );
            setUserData({
              $id: userDoc.$id,
              username: userDoc.username,
              email: userDoc.email,
            });
          } else {
            
            const user = company.users as unknown as User;
            setUserData({
              $id: user.$id,
              username: user.username,
              email: user.email,
            });
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
      fetchUser();
    }
  }, [company]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className=" sm:max-w-[600px] bg-[#FDF7F4]">
        <DialogHeader>
          <DialogTitle className="font-poppins font-bold text-2xl text-[#000a14]">Company Details</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center mb-6">
          <div className="relative w-24 h-24 mb-2">
            <Image
              src={company.logo}
              alt={company.name}
              fill
              className="rounded-lg object-contain"
            />
          </div>
          <h2 className="text-xl font-semibold font-poppins">{company.name}</h2>
        </div>

        <div className="flex gap-6">
          <div className="flex-1">
            <h3 className="text-lg font-semibold font-poppins mb-3 text-center">Address</h3>
            <div className="space-y-4">
              {addressesData.map((address, index) => (
                <div key={index} className="p-3 border-2 border-[#000a14]/10 rounded-lg">
                  <div className="grid gap-1">
                    <div className="font-poppins">
                      <span className="text-[#000a14] text-lg font-semibold font-poppins">Street:</span>{" "}
                      {address.street}
                    </div>
                    <div className="font-poppins">
                      <span className="text-[#000a14] text-lg font-semibold font-poppins">City:</span> {address.city}
                    </div>
                    <div className="font-poppins">
                      <span className="text-[#000a14] text-lg font-semibold font-poppins">Postal Code:</span>{" "}
                      {address.postalCode}
                    </div>
                    {address.country && (
                      <div className="font-poppins">
                        <span className="text-[#000a14] text-lg font-semibold font-poppins">Country:</span>{" "}
                        {address.country}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-semibold font-poppins mb-3 text-center">Contact Info</h3>
            <div className="p-3 border-2 border-[#000a14]/10 rounded-lg text-justify">
              <div className="space-y-2 ">
                <div>
                  <span className="text-[#000a14] text-lg font-semibold font-poppins">Username:</span>
                  <p className="font-poppins">{userData?.username}</p>
                </div>
                <div>
                  <span className="text-[#000a14] text-lg font-semibold font-poppins">Email:</span>
                  <p className="font-poppins">{userData?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}