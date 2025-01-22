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
      name: "Financial Overview",
      color: "blue",
      content: "Comprehensive analysis of company financials including revenue streams, profit margins, cash flow statements, and key performance indicators. Track quarterly growth and financial health metrics."
    },
    {
      name: "Market Analysis",
      color: "teal",
      content: "Detailed market research data, competitor analysis, industry trends, and market share information. Identify opportunities and threats in the current market landscape."
    },
    {
      name: "Risk Assessment",
      color: "blue",
      content: "Evaluation of potential risks and challenges facing the organization. Analyze both internal and external factors, and develop mitigation strategies for risk management."
    },
    {
      name: "Growth Strategy",
      color: "teal",
      content: "Strategic planning aimed at driving growth in the business. Analyze new market opportunities, product development plans, and scalability potential to enhance revenue and market share."
    },
    {
      name: "Customer Insights",
      color: "blue",
      content: "In-depth analysis of customer behavior, preferences, and feedback. Use data-driven insights to improve product offerings, service delivery, and customer retention."
    },
    {
      name: "Product Portfolio",
      color: "teal",
      content: "Comprehensive overview of the company’s product offerings, categorizing each based on performance, customer feedback, and market demand. Identify areas for product innovation."
    },
    {
      name: "Team Structure",
      color: "blue",
      content: "Examine organizational structure, roles, and responsibilities within the team. Assess team performance, communication flow, and collaboration efficiency."
    },
    {
      name: "Technology Stack",
      color: "teal",
      content: "Overview of the technological infrastructure supporting the business. Analyze software, hardware, and platforms being used to ensure they align with company objectives and scalability."
    },
    {
      name: "Compliance Status",
      color: "blue",
      content: "Monitor compliance with industry regulations, standards, and legal requirements. Assess company’s adherence to ethical practices and risk of non-compliance."
    },
    {
      name: "Investment Plans",
      color: "teal",
      content: "Detailed review of future investment opportunities, including capital expenditure plans, strategic investments, and funding sources for growth initiatives."
    },
    {
      name: "Partnership Network",
      color: "blue",
      content: "Analysis of key partnerships, joint ventures, and alliances. Explore the strategic value of each partnership and the opportunities for expanding the business network."
    },
    {
      name: "Marketing Strategy",
      color: "teal",
      content: "Comprehensive marketing plan outlining digital, social, and traditional marketing approaches. Track customer engagement, brand awareness, and the effectiveness of campaigns."
    },
    {
      name: "Operations Report",
      color: "blue",
      content: "In-depth report on operational efficiency, production timelines, logistics, and resource management. Identify bottlenecks and optimize processes for cost reduction and efficiency."
    },
    {
      name: "Sustainability Goals",
      color: "teal",
      content: "Strategic initiatives aimed at achieving environmental sustainability. Track carbon footprint, waste management, and renewable energy usage to align with corporate responsibility goals."
    },
    {
      name: "Innovation Pipeline",
      color: "blue",
      content: "Overview of research and development efforts aimed at bringing innovative products and services to market. Track project stages and expected timelines for new launches."
    },
    {
      name: "Quality Metrics",
      color: "teal",
      content: "Key performance indicators related to product or service quality. Track customer satisfaction, defect rates, and adherence to quality standards to ensure superior delivery."
    },
    {
      name: "Customer Support",
      color: "blue",
      content: "Evaluate customer service operations, including response time, resolution rates, and customer satisfaction. Identify opportunities for improving customer service processes."
    },
    {
      name: "Sales Pipeline",
      color: "teal",
      content: "Monitor sales leads, conversion rates, and sales cycles. Track key performance metrics, forecast revenue, and identify areas for optimizing sales strategies."
    },
    {
      name: "Training Programs",
      color: "blue",
      content: "Overview of employee training initiatives, professional development opportunities, and skill-building programs. Measure employee engagement and skill improvement."
    },
    {
      name: "Global Presence",
      color: "teal",
      content: "Overview of international operations, regional market penetration, and global expansion strategies. Track presence across different countries and regions."
    },
  ];

  const handleLinkClick = (link: (typeof links)[0]) => {
    setSelectedLink({
      ...link,
      content: link.content || "Content coming soon...",
    });
    setShowModal(true);
  };

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-lg font-poppins font-semibold mb-4 text-[#05004E]">
          Quick Access Links
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
