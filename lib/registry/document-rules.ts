// lib/registry/document-rules.ts

import { ApplicantType, RegistrationFileStatus } from "@/lib/registry/workflow";

export type RegistrationDocumentKey =
  | "proof_of_ownership"
  | "applicant_id"
  | "invoice_purchase_proof"
  | "asset_overview_photo"
  | "serial_plate_photo"
  | "vin_chassis_photo"
  | "registration_document"
  | "hull_id_photo"
  | "engine_serial_photo"
  | "proof_of_address"
  | "additional_supporting_document";

export type RegistrationDocumentDefinition = {
  key: RegistrationDocumentKey;
  label: string;
  description?: string;
  required: boolean;
};

export type RegistrationDocumentState = {
  status: RegistrationFileStatus;
  fileName?: string;
};

export type RegistrationDocumentMap = Partial<
  Record<RegistrationDocumentKey, RegistrationDocumentState>
>;

const BASE_PRIVATE_DOCUMENTS: RegistrationDocumentDefinition[] = [
  {
    key: "proof_of_ownership",
    label: "Proof of Ownership",
    description: "Ownership certificate, title, or equivalent legal proof.",
    required: true,
  },
  {
    key: "applicant_id",
    label: "Applicant ID",
    description: "Passport, ID card, or legal identity document.",
    required: true,
  },
  {
    key: "invoice_purchase_proof",
    label: "Invoice / Purchase Proof",
    description: "Invoice, sales contract, or purchase receipt.",
    required: true,
  },
];

const BASE_PARTNER_DOCUMENTS: RegistrationDocumentDefinition[] = [
  {
    key: "proof_of_ownership",
    label: "Proof of Ownership",
    description: "Ownership or partner-authorized registration basis.",
    required: true,
  },
];

const CATEGORY_DOCUMENTS: Record<string, RegistrationDocumentDefinition[]> = {
  vehicles: [
    {
      key: "vin_chassis_photo",
      label: "VIN / Chassis Photo",
      description: "Clear photo of VIN or chassis identifier.",
      required: true,
    },
    {
      key: "registration_document",
      label: "Registration Document",
      description: "Vehicle registration paper if available.",
      required: false,
    },
    {
      key: "asset_overview_photo",
      label: "Asset Overview Photo",
      description: "General photo showing the vehicle.",
      required: false,
    },
  ],
  machines: [
    {
      key: "serial_plate_photo",
      label: "Serial Plate Photo",
      description: "Photo of machine serial plate or ID plate.",
      required: true,
    },
    {
      key: "asset_overview_photo",
      label: "Machine Overview Photo",
      description: "General photo of the machine.",
      required: false,
    },
  ],
  industry: [
    {
      key: "serial_plate_photo",
      label: "Type Plate / Serial Plate Photo",
      description: "Photo of the industrial type plate or serial plate.",
      required: true,
    },
    {
      key: "asset_overview_photo",
      label: "Unit Overview Photo",
      description: "Photo showing the full unit.",
      required: false,
    },
  ],
  agriculture: [
    {
      key: "serial_plate_photo",
      label: "Serial Plate Photo",
      description: "Photo of serial or type plate.",
      required: true,
    },
    {
      key: "asset_overview_photo",
      label: "Equipment Overview Photo",
      description: "Photo showing the full agricultural unit.",
      required: false,
    },
  ],
  construction: [
    {
      key: "serial_plate_photo",
      label: "Serial Plate Photo",
      description: "Photo of serial or identification plate.",
      required: true,
    },
    {
      key: "asset_overview_photo",
      label: "Equipment Overview Photo",
      description: "Photo showing the full construction asset.",
      required: false,
    },
  ],
  marine: [
    {
      key: "hull_id_photo",
      label: "Hull ID / HIN Photo",
      description: "Photo of hull ID or HIN marking.",
      required: true,
    },
    {
      key: "engine_serial_photo",
      label: "Engine Serial Photo",
      description: "Photo of engine serial number if applicable.",
      required: false,
    },
    {
      key: "registration_document",
      label: "Registration Document",
      description: "Boat registration paper if available.",
      required: false,
    },
  ],
  energy: [
    {
      key: "serial_plate_photo",
      label: "Unit Plate Photo",
      description: "Photo of plate showing unit identification.",
      required: true,
    },
    {
      key: "asset_overview_photo",
      label: "Installation / Unit Overview Photo",
      description: "Photo showing the complete unit or installation.",
      required: false,
    },
  ],
  other: [
    {
      key: "asset_overview_photo",
      label: "Asset Overview Photo",
      description: "Photo showing the asset clearly.",
      required: true,
    },
    {
      key: "additional_supporting_document",
      label: "Additional Supporting Document",
      description: "Any supporting file needed for verification.",
      required: false,
    },
  ],
};

export function getBaseDocumentsForApplicantType(
  applicantType: ApplicantType
): RegistrationDocumentDefinition[] {
  if (
    applicantType === "private" ||
    applicantType === "sme"
  ) {
    return BASE_PRIVATE_DOCUMENTS;
  }

  return BASE_PARTNER_DOCUMENTS;
}

export function getCategoryDocuments(
  category?: string | null
): RegistrationDocumentDefinition[] {
  if (!category) return [];
  return CATEGORY_DOCUMENTS[category] ?? [];
}

export function getRequiredDocumentsForContext(
  applicantType: ApplicantType,
  category?: string | null
): RegistrationDocumentDefinition[] {
  const merged = [
    ...getBaseDocumentsForApplicantType(applicantType),
    ...getCategoryDocuments(category),
  ];

  const unique = new Map<RegistrationDocumentKey, RegistrationDocumentDefinition>();

  for (const doc of merged) {
    const existing = unique.get(doc.key);

    if (!existing) {
      unique.set(doc.key, doc);
      continue;
    }

    unique.set(doc.key, {
      ...existing,
      required: existing.required || doc.required,
      description: existing.description ?? doc.description,
    });
  }

  return Array.from(unique.values());
}

export function createEmptyDocumentMap(): RegistrationDocumentMap {
  return {};
}