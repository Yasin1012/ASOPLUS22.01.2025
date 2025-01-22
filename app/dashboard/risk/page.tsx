"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function risk() {
  const router = useRouter();

  const handleTemplate1Click = () => {
    router.push("/dashboard/risk/template1");
  };

  const handleTemplate2Click = () => {
    router.push("/dashboard/risk/template2");
  };

  return (
    <div className="flex gap-6 max-w-full">
    
      <div className=" w-[23rem] rounded-lg overflow-hidden shadow-lg bg-[#001529] border-2 border-gray-800">
        <div className="px-6 py-4">
          <h2 className="text-xl font-bold mb-2 text-white font-poppins text-center">
            Risk Assessment
          </h2>
        </div>
        <hr className="border-t border-gray-200" />
        <div className="relative w-full h-48">
          <Image
            src="/temp1.jpg"
            alt="risk-template"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <hr className="border-t border-gray-200" />
        <div className="px-6 py-4">
          <Button
            className="w-full font-poppins"
            variant="outline"
            onClick={handleTemplate1Click}
          >
            Template-1
          </Button>
        </div>
      </div>

   
      <div className="w-[23rem] rounded-lg overflow-hidden shadow-lg bg-[#001529] border-2 border-gray-800">
        <div className="px-6 py-4">
          <h2 className="text-xl font-bold mb-2 text-white font-poppins text-center">
            Operating Instructions
          </h2>
        </div>
        <hr className="border-t border-gray-200" />
        <div className="relative w-full h-48">
          <Image
            src="/temp2.jpg"
            alt="operating-template"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <hr className="border-t border-gray-200" />
        <div className="px-6 py-4">
          <Button
            className="w-full font-poppins"
            variant="outline"
            onClick={handleTemplate2Click}
          >
            Template-2
          </Button>
        </div>
      </div>
    </div>
  );
}
