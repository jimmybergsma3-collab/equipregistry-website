// lib/passport/passportTypes.ts

export type PassportStatus =
  | 'REGISTERED_VERIFIED'
  | 'HISTORY_UNKNOWN'
  | 'NOT_REGISTERED'
  | 'STOLEN';

/* ---------- Layer 1 (Public) ---------- */

export interface PublicMachineInfo {
  type: string;
  brand: string;
  model: string;
  yearOfManufacture?: number;
  serialMasked: string;
}

export interface PublicValidation {
  lastValidated: string;
  source: string;
}

export interface PublicPassport {
  registryId: string;
  status: PassportStatus;
  machine: PublicMachineInfo;
  validation: PublicValidation;
}

/* ---------- Layer 2 (Private) ---------- */

export interface PrivateMachineInfo extends PublicMachineInfo {
  serialNumber: string;          // full serial
  internalRegistryId: string;    // internal reference
  yearVerified: boolean;
}

export interface ValidationEvent {
  date: string;
  actor: string;                 // insurer / dealer / registry
  note: string;
}

export interface PrivatePassport extends PublicPassport {
  machine: PrivateMachineInfo;

  validation: PublicValidation & {
    verifiedBy: string;
    auditTrail: ValidationEvent[];
  };

  notes?: string;
}
