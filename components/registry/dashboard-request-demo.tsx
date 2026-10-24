// components/registry/dashboard-request-demo.tsx

import DashboardRequestTable from "@/components/registry/dashboard-request-table";
import { RegistrationRequestSummary } from "@/lib/registry/workflow";

type Props = {
  lang: string;
};

export default function DashboardRequestDemo({ lang }: Props) {
  const requests: RegistrationRequestSummary[] = [
    {
      id: "req_1",
      reference: "ER-REQ-1001",
      assetName: "Opel Corsa 1.2",
      category: "Vehicles",
      subcategory: "Passenger Car",
      applicantType: "private",
      requestStatus: "payment_required",
      passportStatus: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      paymentCompleted: false,
      completeness: {
        isComplete: true,
        missingFields: [],
        missingDocuments: [],
        missingDynamicFields: [],
        score: 100,
      },
    },
    {
      id: "req_2",
      reference: "ER-REQ-1002",
      assetName: "Komatsu WA380",
      category: "Machines",
      subcategory: "Wheel Loader",
      applicantType: "insurer_partner",
      requestStatus: "under_review",
      passportStatus: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      paymentCompleted: true,
      completeness: {
        isComplete: true,
        missingFields: [],
        missingDocuments: [],
        missingDynamicFields: [],
        score: 100,
      },
    },
    {
      id: "req_3",
      reference: "ER-REQ-1003",
      assetName: "Atlas Copco Generator",
      category: "Industry",
      subcategory: "Generator",
      applicantType: "sme",
      requestStatus: "incomplete",
      passportStatus: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      paymentCompleted: false,
      completeness: {
        isComplete: false,
        missingFields: ["serialNumber"],
        missingDocuments: ["proofOfOwnershipStatus"],
        missingDynamicFields: [],
        score: 72,
      },
    },
  ];

  return <DashboardRequestTable lang={lang} requests={requests} />;
}