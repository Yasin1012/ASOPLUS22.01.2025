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
      "This operating instruction applies to general work in the warehouse",
    dangers: [
      {
        text: "Dangers arise when shelves are overloaded or when stored or transported goods fall over or fall down.",
        selected: true,
      },
      {
        text: "There is a risk of crushing between industrial trucks and storage facilities as well as from the industrial truck when sharing traffic routes with pedestrians.",
        selected: true,
      },
    ],
    protectiveMeasures: [
      {
        text: "Storage equipment must be set up in such a way that it cannot tip over. When loaded, the maximum permissible shelf, bay and floor load at the installation location must not be exceeded. Permissible shelf and bay loads must be noted on the rack.",
        selected: true,
      },
      {
        text: "The shelving system must be checked for damage and stability at least once a year by a designated person.",
        selected: true,
      },
      {
        text: "Uneven floors and tripping hazards must be removed immediately.",
        selected: true,
      },
      {
        text: "There must be adequately dimensioned traffic routes/aisles between storage facilities and vehicles and they must be adequately lit.",
        selected: true,
      },
      {
        text: "The loading must be carried out in such a way that the load cannot fall out and does not protrude into the traffic routes.",
        selected: true,
      },
      {
        text: "The traffic routes must be kept clear and must not be used for storage.",
        selected: true,
      },
    ],
    disruptions: [
      {
        text: "In case of irregularities or malfunctions, switch off work equipment/machine.",
        selected: true,
      },
      {
        text: "Secure against being switched on again.",
        selected: true,
      },
      {
        text: "Touch buttons/tools only to be moved when the machine is at a standstill.",
        selected: true,
      },
      {
        text: "Inform superiors.",
        selected: true,
      },
      {
        text: "Repairs should only be carried out by qualified personnel.",
        selected: true,
      },
    ],
    accident: [
      {
        text: "Keep calm and protect yourself.",
        selected: true,
      },
      {
        text: "Switch off the machine and secure the accident site.",
        selected: true,
      },
      {
        text: "Inform first responders, observe rescue chain.",
        selected: true,
      },
      {
        text: "Inform superiors.",
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
              <h1 className="text-2xl font-bold">OPERATING INSTRUCTIONS</h1>
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
                Operation / part of the building:
              </div>
              <div className="border border-black h-16 mb-4"></div>
            </div>
            <div>
              <div className="bg-[#0000FF] text-white text-center p-2 mb-2 ">
                Scope:
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
              Dangers for people and the environment
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
              Protective measures and rules of conduct
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
              Behavior in the event of disruptions and danger
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
              Behavior in the event of an accident / First Aid
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
              maintenance and proper disposal
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default TemplateRisk;
