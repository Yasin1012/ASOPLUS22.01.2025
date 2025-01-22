"use client";

import { Card } from "@/components/ui/card";


interface TemplateFormProps {
  companyName: string;
  companyLogo: string;
}

export default function TemplateForm({
  companyName,
  companyLogo,
}: TemplateFormProps) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="p-6 shadow-2xl rounded-lg">
        <h1 className="text-2xl font-bold font-poppins text-muted-foreground text-red-300 text-end">
          Rosenberger
        </h1>
        <h1 className="text-2xl font-bold text-muted-foreground font-poppins text-center">
          risk assessment
        </h1>
        <hr className="border-t-2 border-gray-400 mb-4" />
        <Card className="border-2 border-black/50 rounded-none">
          <form className="divide-y divide-black/50">
            <div className="grid grid-cols-1 divide-y-4 divide-gray-400 font-poppins font-semibold">
              
              <FormField
                label="Company:"
                defaultValue={companyName}
              />
              <FormField
                label="Address:"
                defaultValue="Hohlohstraße 2, 75305 Neuenbürg"
              />
              <FormField label="Phone:" defaultValue="07082 9388670" />
              <FormField label="Fax:" defaultValue="0 7082 93886717" />
              <FormField
                label="E-mail:"
                defaultValue="info-rsn@rosenberger.com"
              />
              <FormField
                label="Managing Director:"
                defaultValue="Mr. Rudolf Gropper"
              />
              <FormField label="Building:" defaultValue="main building" />
              <FormField label="Department:" defaultValue="toolmaking" />
              <FormField label="Work area:" defaultValue="Synchropress" />
              <FormField
                label="Responsible:"
                defaultValue="Mr. Rene Schäflel"
              />
              <FormField
                label="Occupational safety specialist:"
                defaultValue="External: Bernhard Decker / SmK Security with Concept"
              />
              <FormField label="company doctor:" defaultValue="Dr. Henssler" />
              <FormField
                label="Safety Officer:"
                defaultValue="D. Dettinger, B. Linnemann, R. Anderson, V. Kindsvater"
              />
              <FormField
                label="Fire protection assistant:"
                defaultValue="See notice"
              />
              <FormField label="First Aiders:" defaultValue="See notice" />
              <FormField
                label="Created by:"
                defaultValue="Mr. Rene Schäflel with external support from Mr. Bernhard Decker (SmK Sicherheit mit Konzept GmbH)"
              />
              <FormField
                label="Creation date:"
                defaultValue="September 5, 2024"
              />
              <FormField label="Revised:" />
              <FormField label="Individual identifier:" />
            </div>

            <div className="grid grid-cols-3 gap-4 p-4 font-poppins font-semibold ">
              <SignatureField label="Created by:" />
              <SignatureField label="Release by responsible person:" />
              <SignatureField label="Approval by management:" />
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

interface FormFieldProps {
  label: string;
  defaultValue?: string;
}

function FormField({ label, defaultValue = "" }: FormFieldProps) {
  return (
    <div className="flex">
      <div className="w-64 bg-[#2B4B8D] text-white p-2 flex justify-end">
        {label}
      </div>
      <input
        type="text"
        defaultValue={defaultValue}
        className="flex-1 p-2 border-0 focus:ring-0 focus:outline-none"
      />
    </div>
  );
}

interface SignatureFieldProps {
  label: string;
}

function SignatureField({ label }: SignatureFieldProps) {
  return (
    <div className="text-center">
      <div className="h-20 border-b border-gray-300 mb-2"></div>
      <div className="text-sm text-gray-600">{label}</div>
      <div className="text-xs text-gray-500">Name / Date / Signature</div>
    </div>
  );
}
