"use client";

import { useEffect, useState } from "react";
import { Company } from "@/app/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {  X } from "lucide-react";
import { Loader2 } from "lucide-react";
interface EditCompanyModalProps {
  company: Company | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: string, data: Partial<Company>) => Promise<void>;
}

export function EditCompanyModal({
  company,
  isOpen,
  onClose,
  onUpdate,
}: EditCompanyModalProps) {
  const [formData, setFormData] = useState<Partial<Company>>({});
  const [loading, setLoading] = useState(false);
  const [changedFields, setChangedFields] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (company) {
      setFormData(company);
      setChangedFields(new Set());
    }
  }, [company]);

  const handleChange = (field: keyof Company, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setChangedFields((prev) => new Set(prev).add(field));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company?.$id) return;

    const updates = Object.fromEntries(
      Array.from(changedFields).map((field) => [
        field,
        formData[field as keyof Company],
      ])
    );

    if (Object.keys(updates).length === 0) {
      onClose();
      return;
    }

    setLoading(true);
    try {
      await onUpdate(company.$id, updates);
      onClose();
    } catch (error) {
      console.error("Error updating company:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#000a14]">
        <DialogHeader >
          <DialogTitle className="font-poppins font-bold text-2xl text-[#f0f1f2] text-center mb-6">Edit Company Details</DialogTitle>
          <X
            className="absolute right-4 top-4 h-4 w-4 cursor-pointer text-white hover:text-gray-300"
            onClick={onClose}
          />
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2 font-poppins">
            <Label htmlFor="name" className="font-semibold text-[#ffffff]">Company Name</Label>
            <Input
              id="name"
              className="bg-gray-700 text-white"
              value={formData.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div className="space-y-2 font-poppins">
            <Label htmlFor="logo" className="font-semibold text-[#ffffff]">Logo URL</Label>
            <Input
              id="logo"
              className="bg-gray-700 text-white"
              value={formData.logo || ""}
              onChange={(e) => handleChange("logo", e.target.value)}
            />
          </div>
          <div className="space-y-2 font-poppins">
            <Label htmlFor="description" className="font-semibold text-[#ffffff]">Description</Label>
            <Textarea
              id="description"
              className="bg-gray-700 text-white"
              value={formData.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>
          <div className="space-y-2 font-poppins">
            <Label htmlFor="dealValue" className="font-semibold text-[#ffffff]">Deal Value</Label>
            <Input
              id="dealValue"
              className="bg-gray-700 text-white"
              type="number"
              value={formData.dealValue || ""}
              onChange={(e) =>
                handleChange("dealValue", parseFloat(e.target.value))
              }
            />
          </div>
          <div className="flex justify-end gap-3">
          <Button
              type="button"
              onClick={onClose}
              className="bg-red-800 hover:bg-red-700 font-poppins font-medium"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || changedFields.size === 0}
              className="bg-green-800 hover:bg-green-700 font-poppins font-semibold"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Updating...
                </div>
              ) : (
                "Update Company"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
