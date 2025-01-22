"use client";

import TemplateRisk from "@/app/components/template-risk";
import { useSearchParams } from "next/navigation";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import Image from "next/image";

export default function CompanyTemplateRiskPage() {
  const searchParams = useSearchParams();
  const companyName = searchParams.get("name");
  const companyLogo = searchParams.get("logo");
  const docId = searchParams.get("docId");
  const templateRef = useRef<{ incrementVersion: () => Promise<void> }>(null);

  const handleDownloadPDF = async () => {
    const element = document.getElementById("template-risk");
    if (!element) return;

    element.classList.add("pdf-export");

    templateRef.current?.incrementVersion();

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    element.classList.remove("pdf-export");

    const imgData = canvas.toDataURL("image/png", 1.0);
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${companyName}-risk-assessment.pdf`);
  };

  return (
    <div>
      <div className="flex justify-end p-4 gap-2 font-poppins">
        <Button onClick={handleDownloadPDF} className="flex items-center gap-2">
          Export PDF
          <Image src="/pdf.svg" alt="PDF" width={18} height={18} />
        </Button>
      </div>
      <div id="template-risk">
        <TemplateRisk
          ref={templateRef}
          companyName={companyName || ""}
          companyLogo={companyLogo || ""}
          documentId={docId || ""}
        />
      </div>
    </div>
  );
}
