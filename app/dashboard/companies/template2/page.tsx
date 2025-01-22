"use client";

import TemplateForm from "@/app/components/template-form";
import { useSearchParams } from "next/navigation";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PDFDocument } from "pdf-lib";

export default function CompanyTemplateFormPage() {
  const searchParams = useSearchParams();
  const companyName = searchParams.get("name");
  const companyLogo = searchParams.get("logo");

  const handleDownloadPDF = async () => {
    const element = document.getElementById("template-form");
    if (!element) return;

    
    const canvas = await html2canvas(element, {
      scale: 2, 
      useCORS: true,
      logging: false,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    const imgData = canvas.toDataURL("image/png", 1.0); 
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    const formPdfBytes = pdf.output("arraybuffer");

    
    try {
     
      const mergedPdf = await PDFDocument.create();

      
      const formPdfDoc = await PDFDocument.load(formPdfBytes);
      const formPages = await mergedPdf.copyPages(formPdfDoc, [0]);
      formPages.forEach((page) => mergedPdf.addPage(page));

      
      const existingPdfBytes = await fetch("/form.pdf").then((res) =>
        res.arrayBuffer()
      );
      const existingPdfDoc = await PDFDocument.load(existingPdfBytes);
      const existingPages = await mergedPdf.copyPages(
        existingPdfDoc,
        existingPdfDoc.getPageIndices()
      );
      existingPages.forEach((page) => mergedPdf.addPage(page));

     
      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      
      const link = document.createElement("a");
      link.href = url;
      link.download = `${companyName}-complete-form.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error merging PDFs:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-end p-4 gap-2 font-poppins">
        <Button onClick={handleDownloadPDF} className="flex items-center gap-2">
          Export PDF
          <Image src="/pdf.svg" alt="PDF" width={18} height={18} />
        </Button>
      </div>
      <div id="template-form">
        <TemplateForm
          companyName={companyName || ""}
          companyLogo={companyLogo || ""}
        />
      </div>
    </div>
  );
}
