"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PricingPlan {
  title: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

const plans: PricingPlan[] = [
  {
    title: "Landing page",
    price: "€29",
    features: [
      "Individual page without subpages",
      "Setting up Google Analytics",
      "Changes once a quarter*",
      "data protection compliant",
      "Legal Content",
      "search engine optimization",
      "Responsive Design",
      "Basic Support",
    ],
  },
  {
    title: "Starter",
    price: "€39",
    features: [
      "3 Individual Pages",
      "Setting up Google Analytics",
      "Changes twice a quarter*",
      "data protection compliant",
      "Legal Content",
      "search engine optimization",
      "Responsive Design",
      "domain + 3 email mailboxes",
      "Basic Support",
      "data backup",
    ],
    isPopular: true,
  },
  {
    title: "Business",
    price: "€59",
    features: [
      "6 Individual Pages",
      "Setting up Google Analytics",
      "Changes 3x per quarter*",
      "data protection compliant",
      "Legal Content",
      "search engine optimization",
      "Responsive Design",
      "domain + 10 email mailboxes",
      "Individual SEO consulting once a year",
      "appointment booking system",
      "Prioritized Support",
      "data backup",
      "website analysis report",
    ],
  },
];

function PricingCard({
  title,
  price,
  features,
  isPopular = false,
}: PricingPlan) {
  return (
    <Card
      className={`w-full max-w-sm flex flex-col ${
        isPopular ? "border-white bg-[#0C0C0C] text-white" : ""
      }`}
    >
      <CardHeader className="flex items-center">
        <CardTitle className="text-2xl text-center">{title}</CardTitle>
        {isPopular && (
          <span className=" px-4 py-1 w-[6rem] text-xs text-center font-semibold text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full">
            Most used
          </span>
        )}
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-4xl font-bold mb-4">
          {price}
          <span className="text-xl font-normal">/Month</span>
        </div>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className={`mr-2 h-4 w-4 ${isPopular ? "text-white": "text-primary"}`} />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button className={`w-full ${isPopular ? "bg-white text-primary font-medium hover:bg-white hover:text-primary":""}`}>Subscribe</Button>
      </CardFooter>
    </Card>
  );
}

export default function Pricing() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 font-poppins">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Choose the right plan for you
        </h2>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
          Simple, transparent pricing that grows with you
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-3 lg:gap-12 justify-center">
        {plans.map((plan, index) => (
          <PricingCard
            key={index}
            title={plan.title}
            price={plan.price}
            features={plan.features}
            isPopular={plan.isPopular}
          />
        ))}
      </div>
    </div>
  );
}
