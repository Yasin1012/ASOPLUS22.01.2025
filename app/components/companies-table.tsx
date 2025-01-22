"use client";

import { Eye, Pencil, Trash2, Download } from "lucide-react";
import Image from "next/image";
// biome-ignore lint/style/useImportType: <explanation>
import { Company } from "@/app/types";
import { EditCompanyModal } from "./edit-company-modal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ViewCompanyModal } from "./view-company-modal";

interface CompaniesTableProps {
  companies: Company[];
  loading: boolean;
  onDelete: (id: string) => Promise<void>;
  onUpdate: (id: string, data: Partial<Company>) => Promise<void>;
  onSelectCompany: (id: string) => void;
}

export function CompaniesTable({
  companies,
  loading,
  onDelete,
  onUpdate,
  onSelectCompany,
}: CompaniesTableProps) {
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(
    null
  );
  const [viewingCompany, setViewingCompany] = useState<Company | null>(null);
  const router = useRouter();

  const handleTemplateSelect = (template: "template1" | "template2") => {
    const selectedCompany = companies.find(
      (company) => company.$id === selectedCompanyId
    );

    if (selectedCompany) {
      router.push(
        `/dashboard/companies/${template}?name=${encodeURIComponent(
          selectedCompany.name
        )}&logo=${encodeURIComponent(selectedCompany.logo)}`
      );
    }
    setIsDialogOpen(false);
  };

  const handleViewTemplate = (company: Company) => {
    if (company.$id) {
      onSelectCompany(company.$id);
    }
  };

  if (loading) {
    return <div>Lädt...</div>;
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-center">
            <thead className="text-center">
              <tr className="border-b-2 border-gray-800/20">
                <th className="p-4 font-medium font-poppins text-gray-500">
                  Logo
                </th>
                <th className="p-4 font-medium font-poppins text-gray-500">
                  Unternehmensname
                </th>
                <th className="p-4 font-medium font-poppins text-gray-500">
                  Beschreibung
                </th>
                <th className="p-4 font-medium font-poppins text-gray-500">
                  Mitarbeiter Anzahl
                </th>
                <th className="p-4 font-medium font-poppins text-gray-500">
                  Aktionen
                </th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.$id} className="border-b">
                  <td className="p-4">
                    <div className="w-8 h-8">
                      <Image
                        src={company.logo}
                        alt={`Logo von ${company.name}`}
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    </div>
                  </td>
                  <td className="p-4 font-semibold font-poppins text-gray-700">
                    {company.name}
                  </td>
                  <td className="p-4 font-medium font-poppins text-gray-700">
                    {company.description}
                  </td>
                  <td className="p-4 font-poppins">
                    {company.dealValue.toLocaleString()}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => setViewingCompany(company)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <Eye size={20} />
                      </button>
                      <button
                        onClick={() => setEditingCompany(company)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                      >
                        <Pencil size={20} />
                      </button>
                      <button
                        onClick={() => company.$id && onDelete(company.$id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={20} />
                      </button>
                      <button
                        onClick={() => handleViewTemplate(company)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <Download size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ViewCompanyModal
        company={viewingCompany}
        isOpen={!!viewingCompany}
        onClose={() => setViewingCompany(null)}
      />

      <EditCompanyModal
        company={editingCompany}
        isOpen={!!editingCompany}
        onClose={() => setEditingCompany(null)}
        onUpdate={onUpdate}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Vorlage auswählen</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button
              className="w-full"
              onClick={() => handleTemplateSelect("template1")}
            >
              Vorlage Risiko
            </Button>
            <Button
              className="w-full"
              onClick={() => handleTemplateSelect("template2")}
            >
              Gefährdungsbeurteilung
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
