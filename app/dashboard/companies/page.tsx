"use client";
import { useState, useEffect } from "react";
import { CompaniesTable } from "@/app/components/companies-table";
import { QuickAccessLinks } from "@/app/components/quick-access";
import { databases } from "@/app/lib/appwrite-config";
import { ID } from "appwrite";
import { useToast } from "@/app/hooks/use-toast";
// biome-ignore lint/style/useImportType: <explanation>
import { Company } from "@/app/types";
import { AddCompanyModal } from "@/app/components/add-company-modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { LoadingSpinner } from "../../components/loading-spinner";
import { useRouter } from "next/navigation";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(
    null
  );
  const router = useRouter();

  const loadCompanies = async () => {
    setLoading(true);
    try {
      const response = await databases.listDocuments(
        DATABASE_ID!,
        COLLECTION_ID!
      );
      setCompanies(response.documents as unknown as Company[]);
    } catch (error) {
      console.error("Fehler beim Laden der Unternehmen:", error);
      toast({
        title: "Fehler",
        description: "Unternehmen konnten nicht geladen werden",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setCompanyToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!companyToDelete) return;

    try {
      await databases.deleteDocument(
        DATABASE_ID!,
        COLLECTION_ID!,
        companyToDelete
      );
      toast({
        title: "Erfolg",
        description: "Unternehmen wurde erfolgreich gelöscht",
      });
      loadCompanies();
    } catch (error) {
      console.error("Fehler beim Löschen des Unternehmens:", error);
      toast({
        title: "Fehler",
        description: "Unternehmen konnte nicht gelöscht werden",
        variant: "destructive",
      });
    } finally {
      setShowDeleteModal(false);
      setCompanyToDelete(null);
    }
  };

  const handleUpdate = async (id: string, data: Partial<Company>) => {
    try {
      await databases.updateDocument(DATABASE_ID!, COLLECTION_ID!, id, data);
      toast({
        title: "Erfolg",
        description: "Unternehmen wurde erfolgreich aktualisiert",
      });
      loadCompanies();
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Unternehmens:", error);
      toast({
        title: "Fehler",
        description: "Unternehmen konnte nicht aktualisiert werden",
        variant: "destructive",
      });
    }
  };

  const handleTemplateSelect = async (template: "template1" | "template2") => {
    if (selectedCompanyId) {
      const selectedCompany = companies.find(
        (company) => company.$id === selectedCompanyId
      );

      if (selectedCompany) {
        const params = {
          name: selectedCompany.name,
          logo: selectedCompany.logo || "",
          docId: selectedCompanyId,
          version: "1",
        } as Record<string, string>;

        const queryParams = new URLSearchParams(params).toString();
        router.push(`/dashboard/companies/${template}?${queryParams}`);
      }
    }
    setIsDialogOpen(false);
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="font-poppins text-3xl font-semibold leading-[50.4px] text-[#151D48]">
          Unternehmen
        </h1>
        <Button
          onClick={() => setShowAddModal(true)}
          className="bg-[#001529] hover:bg-[#05294d] font-poppins font-medium"
        >
          <Plus className="h-4 w-4 mr-2" />
          Unternehmen hinzufügen
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <QuickAccessLinks />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <CompaniesTable
            companies={companies}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            loading={loading}
            onSelectCompany={(id) => { 
              setSelectedCompanyId(id);
              setIsDialogOpen(true);
            }}
          />
        </CardContent>
      </Card>

      <AddCompanyModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={loadCompanies}
      />

      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="sm:max-w-[425px] bg-[#000a14]">
          <DialogHeader>
            <DialogTitle className="text-center font-poppins text-white">
              Löschung bestätigen
            </DialogTitle>
          </DialogHeader>

          <div className="py-6">
            <p className="text-center text-white font-poppins">
              Sind Sie sicher, dass Sie dieses Unternehmen löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.
            </p>
          </div>

          <DialogFooter className="sm:justify-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowDeleteModal(false)}
              className="font-poppins"
            >
              Abbrechen
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={confirmDelete}
              className="font-poppins bg-red-600 hover:bg-red-700"
            >
              Löschen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
              Vorlage Formular
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
