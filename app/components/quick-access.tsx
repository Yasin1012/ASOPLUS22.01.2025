import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function QuickAccessLinks() {
  const [showModal, setShowModal] = useState(false);
  const [selectedLink, setSelectedLink] = useState<{
    name: string;
    color: string;
    content?: string;
  } | null>(null);

  const links = [
    {
      name: "Finanzübersicht",
      color: "blue",
      content:
        "Umfassende Analyse der Unternehmensfinanzen, einschließlich Einnahmequellen, Gewinnmargen, Cashflow-Statements und wichtiger Leistungskennzahlen. Verfolgen Sie das Quartalswachstum und die finanziellen Gesundheitskennzahlen.",
    },
    {
      name: "Marktanalyse",
      color: "teal",
      content:
        "Detaillierte Marktforschungsdaten, Wettbewerbsanalysen, Branchentrends und Marktanteilsinformationen. Identifizieren Sie Chancen und Risiken im aktuellen Marktumfeld.",
    },
    {
      name: "Risikobewertung",
      color: "blue",
      content:
        "Bewertung potenzieller Risiken und Herausforderungen für die Organisation. Analysieren Sie interne und externe Faktoren und entwickeln Sie Strategien zur Risikominderung.",
    },
    {
      name: "Wachstumsstrategie",
      color: "teal",
      content:
        "Strategische Planung zur Förderung des Geschäftswachstums. Analysieren Sie neue Marktchancen, Produktentwicklungspläne und Skalierungspotenziale zur Steigerung von Umsatz und Marktanteilen.",
    },
    {
      name: "Kundeninformationen",
      color: "blue",
      content:
        "Detaillierte Analyse des Kundenverhaltens, der Präferenzen und des Feedbacks. Nutzen Sie datenbasierte Erkenntnisse zur Verbesserung von Produktangeboten, Servicebereitstellung und Kundenbindung.",
    },
    {
      name: "Produktportfolio",
      color: "teal",
      content:
        "Umfassender Überblick über die Produktangebote des Unternehmens, kategorisiert nach Leistung, Kundenfeedback und Marktnachfrage. Identifizieren Sie Bereiche für Produktinnovationen.",
    },
    {
      name: "Teamstruktur",
      color: "blue",
      content:
        "Untersuchen Sie die Organisationsstruktur, Rollen und Verantwortlichkeiten im Team. Bewerten Sie die Teamleistung, den Kommunikationsfluss und die Zusammenarbeitseffizienz.",
    },
    {
      name: "Technologie-Stack",
      color: "teal",
      content:
        "Überblick über die technologische Infrastruktur des Unternehmens. Analysieren Sie die eingesetzte Software, Hardware und Plattformen, um sicherzustellen, dass sie den Unternehmenszielen und der Skalierbarkeit entsprechen.",
    },
    {
      name: "Compliance-Status",
      color: "blue",
      content:
        "Überwachung der Einhaltung von Branchenvorschriften, Standards und rechtlichen Anforderungen. Bewerten Sie die Einhaltung ethischer Praktiken und das Risiko von Regelverstößen.",
    },
    {
      name: "Investitionspläne",
      color: "teal",
      content:
        "Detaillierte Übersicht über zukünftige Investitionsmöglichkeiten, einschließlich Investitionsausgaben, strategischer Investitionen und Finanzierungsquellen für Wachstumsinitiativen.",
    },
    {
      name: "Partnernetzwerk",
      color: "blue",
      content:
        "Analyse wichtiger Partnerschaften, Joint Ventures und Allianzen. Erkunden Sie den strategischen Wert jeder Partnerschaft und die Möglichkeiten zur Erweiterung des Geschäftsnetzwerks.",
    },
    {
      name: "Marketingstrategie",
      color: "teal",
      content:
        "Umfassender Marketingplan mit digitalen, sozialen und traditionellen Marketingansätzen. Verfolgen Sie Kundenbindung, Markenbekanntheit und die Effektivität von Kampagnen.",
    },
    {
      name: "Betriebsbericht",
      color: "blue",
      content:
        "Detaillierter Bericht über die Betriebseffizienz, Produktionszeiten, Logistik und Ressourcenmanagement. Identifizieren Sie Engpässe und optimieren Sie Prozesse zur Kostensenkung und Effizienzsteigerung.",
    },
    {
      name: "Nachhaltigkeitsziele",
      color: "teal",
      content:
        "Strategische Initiativen zur Erreichung ökologischer Nachhaltigkeit. Verfolgen Sie den CO₂-Fußabdruck, die Abfallbewirtschaftung und die Nutzung erneuerbarer Energien, um mit den Unternehmensverantwortlichkeiten in Einklang zu stehen.",
    },
    {
      name: "Innovationspipeline",
      color: "blue",
      content:
        "Überblick über Forschungs- und Entwicklungsbemühungen, die darauf abzielen, innovative Produkte und Dienstleistungen auf den Markt zu bringen. Verfolgen Sie Projektphasen und erwartete Zeitpläne für neue Produkteinführungen.",
    },
    {
      name: "Qualitätsmetriken",
      color: "teal",
      content:
        "Leistungskennzahlen im Zusammenhang mit Produkt- oder Dienstleistungsqualität. Verfolgen Sie die Kundenzufriedenheit, Fehlerquoten und die Einhaltung von Qualitätsstandards, um eine überlegene Lieferung zu gewährleisten.",
    },
    {
      name: "Kundensupport",
      color: "blue",
      content:
        "Bewerten Sie die Kundenservice-Aktivitäten, einschließlich Reaktionszeit, Lösungsquoten und Kundenzufriedenheit. Identifizieren Sie Möglichkeiten zur Verbesserung der Kundenservice-Prozesse.",
    },
    {
      name: "Vertriebspipeline",
      color: "teal",
      content:
        "Verfolgen Sie Verkaufsleads, Konversionsraten und Verkaufszyklen. Überwachen Sie Leistungskennzahlen, prognostizieren Sie Einnahmen und identifizieren Sie Bereiche zur Optimierung von Verkaufsstrategien.",
    },
    {
      name: "Schulungsprogramme",
      color: "blue",
      content:
        "Überblick über Schulungsinitiativen für Mitarbeiter, berufliche Entwicklungsmöglichkeiten und Kompetenzaufbauprogramme. Messen Sie die Mitarbeiterbindung und die Verbesserung von Fähigkeiten.",
    },
    {
      name: "Globale Präsenz",
      color: "teal",
      content:
        "Überblick über internationale Aktivitäten, regionale Marktdurchdringung und globale Expansionsstrategien. Verfolgen Sie die Präsenz in verschiedenen Ländern und Regionen.",
    },
  ];

  const handleLinkClick = (link: (typeof links)[0]) => {
    setSelectedLink({
      ...link,
      content: link.content || "Inhalt folgt in Kürze...",
    });
    setShowModal(true);
  };

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-lg font-poppins font-semibold mb-4 text-[#05004E]">
          Schnelle Zugriffslinks
        </h2>
        <div className="flex flex-wrap gap-2">
          {links.map((link) => (
            <button
              key={link.name}
              onClick={() => handleLinkClick(link)}
              className={`px-4 py-1 rounded-full font-poppins text-sm border transition-colors
                  ${
                    link.color === "blue"
                      ? "border-blue-200 text-blue-600 bg-blue-50 hover:bg-blue-100"
                      : "border-teal-200 text-teal-600 bg-teal-50 hover:bg-teal-100"
                  }`}
            >
              {link.name}
            </button>
          ))}
        </div>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[600px] text-white bg-[#000a14] px-8 text-justify">
          <DialogHeader>
            <DialogTitle className="font-poppins text-center text-white">
              {selectedLink?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-white font-poppins leading-relaxed">
              {selectedLink?.content}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
