import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Users, PieChart } from "lucide-react";
import Image from "next/image";


const activities = [
  {
    id: 1,
    logo: "https://logo.clearbit.com/microsoft.com",
    date: "Oct 08, 2023 - 08:23",
    user: "Admin User",
    action: "created",
    deal: "Enterprise Software License",
    status: "NEW",
  },
  {
    id: 2,
    logo: "https://logo.clearbit.com/apple.com",
    date: "Oct 07, 2023 - 15:45",
    user: "Admin User",
    action: "created",
    deal: "iPhone Supply Chain",
    status: "NEW",
  },
  {
    id: 3,
    logo: "https://logo.clearbit.com/uber.com",
    date: "Oct 06, 2023 - 12:30",
    user: "Admin User",
    action: "created",
    deal: "Fleet Management System",
    status: "NEW",
  },
  {
    id: 4,
    logo: "https://logo.clearbit.com/google.com",
    date: "Oct 05, 2023 - 09:15",
    user: "Admin User",
    action: "created",
    deal: "Cloud Services Partnership",
    status: "NEW",
  },
  {
    id: 5,
    logo: "https://logo.clearbit.com/amazon.com",
    date: "Oct 04, 2023 - 14:20",
    user: "Admin User",
    action: "created",
    deal: "AWS Infrastructure Expansion",
    status: "NEW",
  },
  {
    id: 6,
    logo: "https://logo.clearbit.com/tesla.com",
    date: "Oct 03, 2023 - 11:45",
    user: "Admin User",
    action: "created",
    deal: "EV Charging Network",
    status: "NEW",
  },
  {
    id: 7,
    logo: "https://logo.clearbit.com/netflix.com",
    date: "Oct 02, 2023 - 10:10",
    user: "Admin User",
    action: "created",
    deal: "Content Distribution Agreement",
    status: "NEW",
  },
  {
    id: 8,
    logo: "https://logo.clearbit.com/salesforce.com",
    date: "Oct 01, 2023 - 17:00",
    user: "Admin User",
    action: "created",
    deal: "CRM Integration Project",
    status: "NEW",
  },
  {
    id: 9,
    logo: "https://logo.clearbit.com/adobe.com",
    date: "Sep 30, 2023 - 16:25",
    user: "Admin User",
    action: "created",
    deal: "Creative Cloud Licensing",
    status: "NEW",
  },
  {
    id: 10,
    logo: "https://logo.clearbit.com/snapchat.com",
    date: "Sep 29, 2023 - 13:40",
    user: "Admin User",
    action: "created",
    deal: "Social Media Marketing Partnership",
    status: "NEW",
  },
  {
    id: 11,
    logo: "https://logo.clearbit.com/pinterest.com",
    date: "Sep 28, 2023 - 10:50",
    user: "Admin User",
    action: "created",
    deal: "Visual Advertising Campaign",
    status: "NEW",
  },
  {
    id: 12,
    logo: "https://logo.clearbit.com/spotify.com",
    date: "Sep 27, 2023 - 14:15",
    user: "Admin User",
    action: "created",
    deal: "Music Streaming Integration",
    status: "NEW",
  },
];

export default function DashboardPage() {
  return (
    <>
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 pt-6 ">
            <Building2 className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium font-poppins text-muted-foreground">
                Number of companies
              </p>
              <h2 className="text-3xl font-semibold font-poppins">30</h2>
            </div>
            <div className="ml-auto h-8">
              <svg className="h-full w-20" viewBox="0 0 100 30">
                <path
                  d="M 0,15 Q 25,5 50,15 T 100,15"
                  fill="none"
                  stroke="rgb(59, 130, 246)"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <Users className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium font-poppins text-muted-foreground">
                Number of contacts
              </p>
              <h2 className="text-3xl font-semibold font-poppins">87</h2>
            </div>
            <div className="ml-auto h-8">
              <svg className="h-full w-20" viewBox="0 0 100 30">
                <path
                  d="M 0,15 Q 25,5 50,15 T 100,15"
                  fill="none"
                  stroke="rgb(34, 197, 94)"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <PieChart className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium font-poppins text-muted-foreground">
                Total deals in pipeline
              </p>
              <h2 className="text-3xl font-semibold font-poppins">288</h2>
            </div>
            <div className="ml-auto h-8">
              <svg className="h-full w-20" viewBox="0 0 100 30">
                <path
                  d="M 0,15 Q 25,5 50,15 T 100,15"
                  fill="none"
                  stroke="rgb(239, 68, 68)"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-4 text-[#000a14] font-poppins">
            Latest Activities
          </h3>
          <div className="space-y-4 font-arial">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-4 p-2 hover:bg-muted/50 rounded-lg"
              >
                <div className="w-10 h-10 relative rounded-lg overflow-hidden">
                  <Image
                    src={activity.logo}
                    alt="Company logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    {activity.date}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span>{" "}
                    {activity.action}{" "}
                    <span className="font-medium">{activity.deal}</span> deal in{" "}
                    <span className="text-blue-500 font-medium">
                      {activity.status}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
    </>
  );
}
