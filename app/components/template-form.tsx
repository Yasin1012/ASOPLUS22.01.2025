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
          Gefährdungsbeurteilung
        </h1>
        <hr className="border-t-2 border-gray-400 mb-4" />
        <Card className="border-2 border-black/50 rounded-none">
          <form className="divide-y divide-black/50">
            <div className="grid grid-cols-1 divide-y-4 divide-gray-400 font-poppins font-semibold">
              
              <FormField
                label="Unternehmen:"
                defaultValue={companyName}
              />
              <FormField
                label="Addreses:"
                defaultValue=""
              />
              <FormField label="Telefon:" defaultValue="" />
              <FormField label="Telefax:" defaultValue="" />
              <FormField
                label="E-mail:"
                defaultValue=""
              />
              <FormField
                label="Geschäftsführer:"
                defaultValue=""
              />
              <FormField label="Gebäude:" defaultValue="" />
              <FormField label="Abteilung:" defaultValue="" />
              <FormField label="Arbeitsbereich:" defaultValue="" />
              <FormField
                label="Verantwortlicher:"
                defaultValue=""
              />
              <FormField
                label="Fachkraft für Betriebssicherheit:"
                defaultValue="External: Bernhard Decker / Sicherheit mit Konzept"
              />
              <FormField label="Betriebsarzt:" defaultValue="" />
              <FormField
                label="Sicherheitsbeauftragter:"
                defaultValue=""
              />
              <FormField
                label="Brandschutzhelfer:"
                defaultValue=""
              />
              <FormField label="Ersthelfer:" defaultValue="" />
              <FormField
                label="Erstellt durch:"
                defaultValue="statisch / dynamisch?"
              />
              <FormField
                label="Erstellungs-Datum:"
                defaultValue="September 5, 2024"
              />
              <FormField label="Überarbeitet:" />
              <FormField label="Individuelle Kennung:" />
            </div>

            <div className="grid grid-cols-3 gap-4 p-4 font-poppins font-semibold ">
              <SignatureField label="Erstellt durch:" />
              <SignatureField label="Freigabe durch Verantwortlichen:" />
              <SignatureField label="Freigabe durch Geschäftsführung:" />
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
      <div className="text-xs text-gray-500">Name / Datum / Unterschrift</div>
    </div>
  );
}
