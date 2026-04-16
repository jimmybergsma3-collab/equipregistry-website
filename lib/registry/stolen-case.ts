import {
  getRegistryAssetStatus,
  type RegistryAssetStatus,
  type StolenCaseRecord,
} from "@/lib/registry/request-meta";
import type { StoredUpload } from "@/lib/registry/upload-types";

type NonStolenRegistryAssetStatus =
  | "history_unknown"
  | "registered_verified";

export type StolenCaseInput = {
  policeReportNumber: string | null;
  policeReportDate: string | null;
  country: string | null;
  cityRegion: string | null;
  incidentDate: string | null;
  incidentDescription: string;
  supportingDocumentReferences: string[];
  caseNotes: string | null;
};

function normalizeText(value: FormDataEntryValue | string | null | undefined) {
  const stringValue =
    typeof value === "string"
      ? value
      : value instanceof File
      ? value.name
      : "";
  const normalized = stringValue.trim();
  return normalized ? normalized : null;
}

function normalizeDate(value: FormDataEntryValue | string | null | undefined) {
  const normalized = normalizeText(value);

  if (!normalized) {
    return null;
  }

  return /^\d{4}-\d{2}-\d{2}$/.test(normalized) ? normalized : null;
}

export function canManageStolenCase(
  requestStatus: string,
  hasExistingCase = false
) {
  return (
    hasExistingCase ||
    requestStatus === "approved" ||
    requestStatus === "passport_issued"
  );
}

export function parseSupportingDocumentReferences(
  value: FormDataEntryValue | string | null | undefined
) {
  const stringValue =
    typeof value === "string"
      ? value
      : value instanceof File
      ? value.name
      : "";

  return Array.from(
    new Set(
      stringValue
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean)
    )
  );
}

export function formatSupportingDocumentReferences(references: string[]) {
  return references.join("\n");
}

export function parseStolenCaseInput(formData: FormData): StolenCaseInput {
  return {
    policeReportNumber: normalizeText(formData.get("policeReportNumber")),
    policeReportDate: normalizeDate(formData.get("policeReportDate")),
    country: normalizeText(formData.get("country")),
    cityRegion: normalizeText(formData.get("cityRegion")),
    incidentDate: normalizeDate(formData.get("incidentDate")),
    incidentDescription:
      normalizeText(formData.get("incidentDescription")) ?? "",
    supportingDocumentReferences: parseSupportingDocumentReferences(
      formData.get("supportingDocumentReferences")
    ),
    caseNotes: normalizeText(formData.get("caseNotes")),
  };
}

function padDatePart(value: number) {
  return value.toString().padStart(2, "0");
}

export function buildStolenCaseReference(
  registrationReference: string,
  createdAt: Date
) {
  const compactDate = [
    createdAt.getUTCFullYear(),
    padDatePart(createdAt.getUTCMonth() + 1),
    padDatePart(createdAt.getUTCDate()),
  ].join("");
  const compactReference =
    registrationReference
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(-6) || "ASSET";

  return `ER-CASE-${compactDate}-${compactReference}`;
}

export function getPreviousRegistryStatus(
  dynamicFields: unknown,
  requestStatus?: string | null
): NonStolenRegistryAssetStatus {
  const current = getRegistryAssetStatus(dynamicFields, requestStatus);

  if (current === "history_unknown" || current === "stolen") {
    return "history_unknown";
  }

  return "registered_verified";
}

export function createOrUpdateStolenCaseRecord({
  existingCase,
  registrationReference,
  previousRegistryStatus,
  previousMachineStatus,
  actorUserId,
  input,
  nextStatus = "open",
  evidenceFiles,
  policeReportFiles,
  now = new Date(),
}: {
  existingCase: StolenCaseRecord | null;
  registrationReference: string;
  previousRegistryStatus: NonStolenRegistryAssetStatus;
  previousMachineStatus: string | null;
  actorUserId: string;
  input: StolenCaseInput;
  nextStatus?: StolenCaseRecord["status"];
  evidenceFiles?: StoredUpload[];
  policeReportFiles?: StoredUpload[];
  now?: Date;
}): StolenCaseRecord {
  const timestamp = now.toISOString();

  return {
    caseReference:
      existingCase?.caseReference ??
      buildStolenCaseReference(registrationReference, now),
    assetReference: existingCase?.assetReference ?? registrationReference,
    registrationReference,
    isStolen: nextStatus !== "resolved",
    status: nextStatus,
    previousRegistryStatus:
      existingCase?.previousRegistryStatus ?? previousRegistryStatus,
    previousMachineStatus:
      existingCase?.previousMachineStatus ?? previousMachineStatus,
    policeReportNumber: input.policeReportNumber,
    policeReportDate: input.policeReportDate,
    country: input.country,
    cityRegion: input.cityRegion,
    incidentDate: input.incidentDate,
    incidentDescription: input.incidentDescription,
    supportingDocumentReferences: input.supportingDocumentReferences,
    caseNotes: input.caseNotes,
    createdBy: existingCase?.createdBy ?? actorUserId,
    updatedBy: actorUserId,
    resolvedBy: null,
    resolvedAt: null,
    createdAt: existingCase?.createdAt ?? timestamp,
    updatedAt: timestamp,
    evidenceFiles: evidenceFiles ?? existingCase?.evidenceFiles ?? [],
    policeReportFiles:
      policeReportFiles ?? existingCase?.policeReportFiles ?? [],
  };
}

export function resolveStolenCaseRecord(
  existingCase: StolenCaseRecord,
  actorUserId: string,
  now = new Date()
): StolenCaseRecord {
  const timestamp = now.toISOString();

  return {
    ...existingCase,
    isStolen: false,
    status: "resolved",
    updatedBy: actorUserId,
    updatedAt: timestamp,
    resolvedBy: actorUserId,
    resolvedAt: timestamp,
  };
}

export function getResolvedRegistryStatus({
  existingCase,
  requestStatus,
  machineCreatedAt,
}: {
  existingCase: Pick<StolenCaseRecord, "createdAt" | "previousRegistryStatus">;
  requestStatus?: string | null;
  machineCreatedAt?: Date | null;
}): NonStolenRegistryAssetStatus {
  if (requestStatus !== "passport_issued") {
    return existingCase.previousRegistryStatus;
  }

  if (existingCase.previousRegistryStatus === "registered_verified") {
    return "registered_verified";
  }

  if (!machineCreatedAt) {
    return "registered_verified";
  }

  const caseCreatedAt = Date.parse(existingCase.createdAt);

  if (
    Number.isFinite(caseCreatedAt) &&
    machineCreatedAt.getTime() > caseCreatedAt
  ) {
    return "registered_verified";
  }

  return existingCase.previousRegistryStatus;
}

export function getPublicIncidentLocation(
  caseRecord: Pick<StolenCaseRecord, "cityRegion" | "country">,
  fallback: string
) {
  const parts = [caseRecord.cityRegion, caseRecord.country].filter(
    (value): value is string => Boolean(value && value.trim())
  );

  return parts.length > 0 ? parts.join(", ") : fallback;
}

export function getPublicDateValue(
  value: string | null | undefined,
  fallback: string
) {
  return value?.trim() ? value : fallback;
}

export function getStolenRegistryStatus(
  previousRegistryStatus: RegistryAssetStatus | null | undefined
): Extract<RegistryAssetStatus, "stolen" | "verified_stolen"> {
  return previousRegistryStatus === "history_unknown" ? "stolen" : "verified_stolen";
}
