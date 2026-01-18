// lib/passport/statusText.ts

export type RegistryStatus =
  | "REGISTERED_VERIFIED"
  | "HISTORY_UNKNOWN"
  | "NOT_REGISTERED"
  | "STOLEN";

export const STATUS_TEXT: Record<
  RegistryStatus,
  {
    headline: string;
    primary: string;
    why: string;
    disclaimer?: string;
  }
> = {
  REGISTERED_VERIFIED: {
    headline: 'Registered & Verified',
    primary:
      'This machine is registered in the EquipRegistry and its legal origin has been verified.',
    why:
      'This reduces the risk of theft or fraud and increases trust for insurers, buyers, and professional operators.',
    disclaimer: 'This record is not proof of ownership.',
  },

  HISTORY_UNKNOWN: {
    headline: 'History Unknown',
    primary:
      'This machine is registered, but its historical origin could not be fully verified.',
    why:
      'Additional due diligence may be required, as some insurers or buyers apply restrictions to equipment with incomplete history.',
    disclaimer:
      'Registration does not imply confirmed ownership or origin.',
  },

  STOLEN: {
    headline: 'Reported Stolen',
    primary:
      'This machine has been reported stolen under an active case.',
    why:
      'Possession, transport, or trade of this machine may be illegal. Authorities should be contacted immediately.',
  },

  NOT_REGISTERED: {
    headline: 'Not Registered',
    primary:
      'This serial number is not found in the EquipRegistry.',
    why:
      'No independent verification of legal origin or status exists for this machine.',
  },
};
