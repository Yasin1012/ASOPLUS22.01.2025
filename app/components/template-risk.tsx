"use client";
import Image from "next/image";
import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { databases } from "@/app/lib/appwrite-config";

interface TemplateRiskProps {
  companyName: string;
  companyLogo: string;
  documentId: string;
}

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;

const styles = `
  .pdf-export li {
    display: flex !important;
  }
  
  .pdf-export li[class*="opacity-50"] {
    display: none !important;
  }
`;

const TemplateRisk = forwardRef<
  { incrementVersion: () => Promise<void> },
  TemplateRiskProps
>(({ companyName, companyLogo, documentId }, ref) => {
  const [version, setVersion] = useState<number>(1);

  useEffect(() => {
    const fetchCompanyVersion = async () => {
      try {
        const companyDocument = await databases.getDocument(
          DATABASE_ID!,
          COLLECTION_ID!,
          documentId
        );
        setVersion(companyDocument.version);
      } catch (error) {
        console.error(`Error fetching version:`, error);
      }
    };

    fetchCompanyVersion();
  }, [documentId]);

  useImperativeHandle(ref, () => ({
    incrementVersion: async () => {
      if (!documentId) return;
      try {
        const newVersion = version + 1;

        await databases.updateDocument(
          DATABASE_ID!,
          COLLECTION_ID!,
          documentId.trim(),
          { version: newVersion }
        );
        setVersion(newVersion);
      } catch (error) {
        console.error(
          `Error updating version for document ${documentId}:`,
          error
        );
      }
    },
  }));

  const [content, setContent] = useState({
    title: "315_BA_Lager_allgemein",
    scope:
      "Diese Betriebsanweisung gilt für allgemeine Arbeiten im Lager",
    dangers: [
      {
        text: "Gefahren bestehen bei Überlastung von Regalen, durch umstürzendes bzw. herabfallendes Lager− und Transportgut.",
        selected: true,
      },
      {
        text: "Es bestehen Quetschgefahren zwischen Flurförderfahrzeugen und Lagereinrichtungen sowie durch das Flurförderzeug bei gemeinsamer Nutzung von Verkehrswegen mit Fußgängern.",
        selected: true,
      },
    ],
    protectiveMeasures: [
      {
        text: "Lagereinrichtungen müssen so aufgestellt sein, dass sie nicht umstürzen können. Im beladenen Zustand darf die höchstzulässige Fach−, Feld− und Bodenbelastung am Aufstellungsort nicht überschritten werden. Zulässige Fach− und Feldbelastungen sind am Regal zu vermerken.",
        selected: true,
      },
      {
        text: "Regalanlage ist mindestens jährlich durch eine beauftragte Person auf Beschädigungen und Standsicherheit zu überprüfen.",
        selected: true,
      },
      {
        text: "Fußbodenunebenheiten und Stolperstellen sind sofort zu beseitigen.",
        selected: true,
      },
      {
        text: "Zwischen Lagereinrichtungen und Fahrzeugen müssen ausreichend bemessene Verkehrswege / Gänge vorhanden und ausreichend beleuchtet sein.",
        selected: true,
      },
      {
        text: "Die Beladung hat so zu erfolgen, dass das Ladegut nicht herausfallen kann und nicht in die Verkehrswege hineinragt.",
        selected: true,
      },
      {
        text: "Die Verkehrswege sind freizuhalten und dürfen nicht zur Lagerung benutzt werden.",
        selected: true,
      },
    ],
    disruptions: [
      {
        text: "Bei Unregelmäßigkeiten und Störungen Arbeitsmittel / Maschine abstellen",
        selected: true,
      },
      {
        text: "Gegen Wiedereinschalten sichern.",
        selected: true,
      },
      {
        text: "Störungen nur im Stillstand beseitigen.",
        selected: true,
      },
      {
        text: "Vorgesetzten informieren.",
        selected: true,
      },
      {
        text: "Reparaturen nur durch Fachpersonal durchführen lassen.",
        selected: true,
      },
    ],
    accident: [
      {
        text: "Ruhe bewahren und Selbstschutz beachten.",
        selected: true,
      },
      {
        text: "Maschine abschalten, Unfallstelle absichern.",
        selected: true,
      },
      {
        text: "Ersthelfer informieren, Rettungskette beachten.",
        selected: true,
      },
      {
        text: "Vorgesetzten informieren.",
        selected: true,
      },
    ],
  });

  const handleContentChange = (
    section: string,
    index: number,
    value: string | boolean,
    isCheckbox: boolean = false
  ) => {
    setContent((prev) => ({
      ...prev,
      [section]:
        section === "scope"
          ? value
          : (
              prev[section as keyof typeof prev] as Array<{
                text: string;
                selected: boolean;
              }>
            ).map((item, i) => {
              if (i === index) {
                return isCheckbox
                  ? { ...item, selected: value as boolean }
                  : { ...item, text: value as string };
              }
              return item;
            }),
    }));
  };

  const currentDate = new Date()
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .split("/")
    .join(".");

  const formattedVersion = (version || 1).toString().padStart(3, "0");

  return (
    <>
      <style>{styles}</style>
      <div className="w-full max-w-5xl mx-auto p-4 bg-[#0000FF] font-poppins">
        <div className="bg-white p-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex flex-col items-center justify-center">
              <Image
                src={companyLogo}
                alt={companyName}
                width={60}
                height={60}
                className="p-1"
              />
              <h1>{companyName}</h1>
            </div>

            <div className="text-center flex-grow">
              <h1 className="text-2xl font-bold">BETRIEBSANWEISUNG</h1>
              <p className="mt-2 font-bold text-xl">{content.title}</p>
            </div>
            <div className="text-right">
              <p>
                Version <span className="font-bold">{formattedVersion}</span>
              </p>
              <p>{currentDate}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="">
              <div className="bg-[#0000FF] text-white p-2 mb-2 text-center">
              Betrieb / Gebäudeteil:
              </div>
              <div className="border border-black h-16 mb-4"></div>
            </div>
            <div>
              <div className="bg-[#0000FF] text-white text-center p-2 mb-2 ">
              Anwendungsbereich:
              </div>
              <div
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) =>
                  handleContentChange(
                    "scope",
                    0,
                    e.currentTarget.textContent || ""
                  )
                }
                className="border p-2 h-16 mb-4  outline-none focus:ring-2 focus:ring-blue-500 rounded"
              >
                {content.scope}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="bg-[#0000FF] text-white text-center p-2 mb-2">
            Gefahren für Mensch und Umwelt
            </div>
            <div className="flex gap-6">
              <div className="flex flex-col gap-4 mb-2">
                <div className="flex gap-2">
                  <div className="w-[50px] h-[50px]">
                    <Image
                      src="/Warning.svg"
                      alt="Warning"
                      width={50}
                      height={50}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="w-[50px] h-[50px]">
                    <Image
                      src="/forklift.svg"
                      alt="Forklift"
                      width={45}
                      height={45}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-[50px] h-[50px]">
                    <Image
                      src="/Warning.svg"
                      alt="Pedestrian"
                      width={50}
                      height={50}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="w-[50px] h-[50px]">
                    <Image
                      src="/falling.jpg"
                      alt="Falling"
                      width={50}
                      height={50}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-justify">
                {content.dangers.map((danger, index) => (
                  <li
                    key={index}
                    className={`flex items-start gap-2 ${
                      !danger.selected ? "opacity-50" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={danger.selected}
                      onChange={(e) =>
                        handleContentChange(
                          "dangers",
                          index,
                          e.target.checked,
                          true
                        )
                      }
                      className="mt-1"
                    />
                    <div
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) =>
                        handleContentChange(
                          "dangers",
                          index,
                          e.currentTarget.textContent || ""
                        )
                      }
                      className="outline-none focus:ring-2 focus:ring-blue-500 rounded px-1 flex-1"
                    >
                      {danger.text}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-4">
            <div className="bg-[#0000FF] text-white text-center p-2 mb-2">
            Schutzmaßnahmen und Verhaltensregeln
            </div>
            <div className="flex gap-6">
              <div className="flex flex-col gap-4 mb-2">
                <div className="flex gap-2">
                  <div className="w-[50px] h-[50px]">
                    <Image
                      src="/info.svg"
                      alt="Info"
                      width={50}
                      height={50}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="w-[50px] h-[50px]">
                    <Image
                      src="/manual.svg"
                      alt="Manual"
                      width={50}
                      height={50}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-[50px] h-[50px]">
                    <Image
                      src="/boots.svg"
                      alt="Boots"
                      width={50}
                      height={50}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="w-[50px] h-[50px]">
                    <Image
                      src="/noentry.svg"
                      alt="No Entry"
                      width={50}
                      height={50}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-justify">
                {content.protectiveMeasures.map((measure, index) => (
                  <li
                    key={index}
                    className={`flex items-start gap-2 ${
                      !measure.selected ? "opacity-50" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={measure.selected}
                      onChange={(e) =>
                        handleContentChange(
                          "protectiveMeasures",
                          index,
                          e.target.checked,
                          true
                        )
                      }
                      className="mt-1"
                    />
                    <div
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) =>
                        handleContentChange(
                          "protectiveMeasures",
                          index,
                          e.currentTarget.textContent || ""
                        )
                      }
                      className="outline-none focus:ring-2 focus:ring-blue-500 rounded px-1 flex-1"
                    >
                      {measure.text}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-4">
            <div className="bg-[#0000FF] text-white text-center p-2 mb-2">
            Verhalten bei Störungen und im Gefahrenfall
            </div>
            <div className="flex justify-between">
              <div className="flex gap-6">
                <div className="flex gap-2 mb-2">
                  <div className="w-[50px] h-[50px]">
                    <Image
                      src="/person.png"
                      alt="Person"
                      width={50}
                      height={50}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="w-[50px] h-[50px]">
                    <Image
                      src="/phone.svg"
                      alt="Phone"
                      width={50}
                      height={50}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <ul className="list-disc pl-5 space-y-2">
                  {content.disruptions.map((disruption, index) => (
                    <li
                      key={index}
                      className={`flex items-start gap-2 ${
                        !disruption.selected ? "opacity-50" : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={disruption.selected}
                        onChange={(e) =>
                          handleContentChange(
                            "disruptions",
                            index,
                            e.target.checked,
                            true
                          )
                        }
                        className="mt-1"
                      />
                      <div
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) =>
                          handleContentChange(
                            "disruptions",
                            index,
                            e.currentTarget.textContent || ""
                          )
                        }
                        className="outline-none focus:ring-2 focus:ring-blue-500 rounded px-1 flex-1"
                      >
                        {disruption.text}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-32 h-32 border-2 border-red-500"></div>
            </div>
          </div>

          <div className="mb-4">
            <div className="bg-[#0000FF] text-white text-center p-2 mb-2">
            Verhalten bei Unfällen / Erste Hilfe
            </div>
            <div className="flex justify-between">
              <div className="flex gap-[5.5rem]">
                <div className=" flex items-center justify-center">
                  <Image
                    src="/aid.svg"
                    alt="First Aid"
                    width={50}
                    height={50}
                    className=" object-contain"
                  />
                </div>
                <div>
                  <ul className="list-disc pl-5 space-y-2">
                    {content.accident.map((step, index) => (
                      <li
                        key={index}
                        className={`flex items-start gap-2 ${
                          !step.selected ? "opacity-50" : ""
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={step.selected}
                          onChange={(e) =>
                            handleContentChange(
                              "accident",
                              index,
                              e.target.checked,
                              true
                            )
                          }
                          className="mt-1"
                        />
                        <div
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) =>
                            handleContentChange(
                              "accident",
                              index,
                              e.currentTarget.textContent || ""
                            )
                          }
                          className="outline-none focus:ring-2 focus:ring-blue-500 rounded px-1 flex-1"
                        >
                          {step.text}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="w-32 h-32 border-2 border-green-500"></div>
            </div>
          </div>

          <div>
            <div className="bg-[#0000FF] text-white text-center p-2">
            Instandhaltung und sachgerechte Entsorgung
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default TemplateRisk;
