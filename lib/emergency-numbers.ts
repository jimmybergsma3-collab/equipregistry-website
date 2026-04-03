export type EmergencyStatus =
  | "ok"
  | "local_only"
  | "unknown"
  | "no_phone_system";

export type EmergencyEntry = {
  label: string;
  numbers: string[];
  status: EmergencyStatus;
};

export const EMERGENCY_NUMBERS: Record<string, EmergencyEntry> = {
  DEFAULT: { label: "Default", numbers: ["112"], status: "ok" },

  // A
  AF: { label: "Afghanistan", numbers: [], status: "local_only" },
  AL: { label: "Albania", numbers: ["19"], status: "ok" },
  DZ: { label: "Algeria", numbers: ["17"], status: "ok" },
  AS: { label: "American Samoa", numbers: ["911"], status: "ok" },
  AD: { label: "Andorra", numbers: ["110"], status: "ok" },
  AO: { label: "Angola", numbers: ["110"], status: "ok" },
  AG: { label: "Antigua & Barbuda", numbers: ["911"], status: "ok" },
  AR: { label: "Argentina", numbers: ["101"], status: "ok" },
  AM: { label: "Armenia", numbers: ["103"], status: "ok" },
  AW: { label: "Aruba", numbers: ["911"], status: "ok" },
  AU: { label: "Australia", numbers: ["000", "112"], status: "ok" },
  AT: { label: "Austria", numbers: ["112"], status: "ok" },
  AZ: { label: "Azerbaijan", numbers: ["02"], status: "ok" },

  // B
  BS: { label: "Bahamas", numbers: ["911"], status: "ok" },
  BH: { label: "Bahrain", numbers: ["999"], status: "ok" },
  BD: { label: "Bangladesh", numbers: ["8665513"], status: "ok" },
  BB: { label: "Barbados", numbers: ["112"], status: "ok" },
  BE: { label: "Belgium", numbers: ["112"], status: "ok" },
  BY: { label: "Belarus", numbers: ["02"], status: "ok" },
  BZ: { label: "Belize", numbers: ["911"], status: "ok" },
  BM: { label: "Bermuda", numbers: ["911"], status: "ok" },
  BT: { label: "Bhutan", numbers: ["113"], status: "ok" },
  BO: { label: "Bolivia", numbers: ["911"], status: "ok" },
  BA: { label: "Bosnia-Herzegovina", numbers: ["122"], status: "ok" },
  BW: { label: "Botswana", numbers: ["911"], status: "ok" },
  BR: { label: "Brazil", numbers: ["911"], status: "ok" },
  VG: { label: "British Virgin Islands", numbers: ["999"], status: "ok" },
  BN: { label: "Brunei", numbers: ["993"], status: "ok" },
  BG: { label: "Bulgaria", numbers: ["166"], status: "ok" },
  BF: { label: "Burkina Faso", numbers: [], status: "local_only" },
  MM: { label: "Myanmar", numbers: ["999"], status: "ok" },
  BI: { label: "Burundi", numbers: [], status: "local_only" },

  // C
  KH: { label: "Cambodia", numbers: ["117"], status: "ok" },
  CM: { label: "Cameroon", numbers: [], status: "local_only" },
  CA: { label: "Canada", numbers: ["911"], status: "ok" },
  CV: { label: "Cape Verde", numbers: ["132"], status: "ok" },
  KY: { label: "Cayman Islands", numbers: ["911"], status: "ok" },
  CF: { label: "Central African Republic", numbers: [], status: "local_only" },
  TD: { label: "Chad", numbers: ["17"], status: "ok" },
  CL: { label: "Chile", numbers: ["133"], status: "ok" },
  CN: { label: "China", numbers: ["110"], status: "ok" },
  CO: { label: "Colombia", numbers: ["119"], status: "ok" },
  KM: { label: "Comoros", numbers: [], status: "local_only" },
  CG: { label: "Congo", numbers: [], status: "local_only" },
  CR: { label: "Costa Rica", numbers: ["911"], status: "ok" },
  HR: { label: "Croatia", numbers: ["112"], status: "ok" },
  CU: { label: "Cuba", numbers: ["26811"], status: "ok" },
  CY: { label: "Cyprus", numbers: ["112"], status: "ok" },
  CZ: { label: "Czech Republic", numbers: ["158"], status: "ok" },

  // D
  DK: { label: "Denmark", numbers: ["112"], status: "ok" },
  DJ: { label: "Djibouti", numbers: ["17"], status: "ok" },
  DO: { label: "Dominican Republic", numbers: ["911"], status: "ok" },

  // E
  EC: { label: "Ecuador", numbers: ["101"], status: "ok" },
  EG: { label: "Egypt", numbers: ["122"], status: "ok" },
  SV: { label: "El Salvador", numbers: ["911"], status: "ok" },
  EE: { label: "Estonia", numbers: ["110"], status: "ok" },
  ET: { label: "Ethiopia", numbers: ["91"], status: "ok" },

  // F
  FI: { label: "Finland", numbers: ["112"], status: "ok" },
  FR: { label: "France", numbers: ["112"], status: "ok" },

  // G
  GE: { label: "Georgia", numbers: ["022"], status: "ok" },
  DE: { label: "Germany", numbers: ["110"], status: "ok" },
  GH: { label: "Ghana", numbers: ["999", "171"], status: "ok" },
  GR: { label: "Greece", numbers: ["112"], status: "ok" },

  // H
  HT: { label: "Haiti", numbers: ["114"], status: "ok" },
  HN: { label: "Honduras", numbers: ["119"], status: "ok" },
  HK: { label: "Hong Kong", numbers: ["999"], status: "ok" },
  HU: { label: "Hungary", numbers: ["112"], status: "ok" },

  // I
  IS: { label: "Iceland", numbers: ["112"], status: "ok" },
  IN: { label: "India", numbers: ["100"], status: "ok" },
  ID: { label: "Indonesia", numbers: ["110"], status: "ok" },
  IR: { label: "Iran", numbers: ["110"], status: "ok" },
  IE: { label: "Ireland", numbers: ["112"], status: "ok" },
  IL: { label: "Israel", numbers: ["100"], status: "ok" },
  IT: { label: "Italy", numbers: ["112"], status: "ok" },

  // J
  JM: { label: "Jamaica", numbers: ["119"], status: "ok" },
  JP: { label: "Japan", numbers: ["110"], status: "ok" },

  // K
  KE: { label: "Kenya", numbers: ["999"], status: "ok" },
  KR: { label: "South Korea", numbers: ["112"], status: "ok" },
  KW: { label: "Kuwait", numbers: ["777"], status: "ok" },

  // L
  LV: { label: "Latvia", numbers: ["112"], status: "ok" },
  LB: { label: "Lebanon", numbers: ["112"], status: "ok" },
  LY: { label: "Libya", numbers: ["193"], status: "ok" },
  LT: { label: "Lithuania", numbers: ["112"], status: "ok" },

  // M
  MY: { label: "Malaysia", numbers: ["999"], status: "ok" },
  MT: { label: "Malta", numbers: ["112"], status: "ok" },
  MX: { label: "Mexico", numbers: ["060"], status: "ok" },
  MA: { label: "Morocco", numbers: ["19"], status: "ok" },

  // N
  NA: { label: "Namibia", numbers: ["1011"], status: "ok" },
  NP: { label: "Nepal", numbers: ["100"], status: "ok" },
  NL: { label: "Netherlands", numbers: ["112"], status: "ok" },
  NZ: { label: "New Zealand", numbers: ["111"], status: "ok" },
  NG: { label: "Nigeria", numbers: ["199"], status: "ok" },
  NO: { label: "Norway", numbers: ["112"], status: "ok" },

  // O
  OM: { label: "Oman", numbers: ["999"], status: "ok" },

  // P
  PK: { label: "Pakistan", numbers: ["15"], status: "ok" },
  PA: { label: "Panama", numbers: ["104"], status: "ok" },
  PE: { label: "Peru", numbers: ["5114"], status: "ok" },
  PH: { label: "Philippines", numbers: ["117"], status: "ok" },
  PL: { label: "Poland", numbers: ["112", "999"], status: "ok" },
  PT: { label: "Portugal", numbers: ["112"], status: "ok" },

  // Q
  QA: { label: "Qatar", numbers: ["999"], status: "ok" },

  // R
  RO: { label: "Romania", numbers: ["112"], status: "ok" },
  RU: { label: "Russia", numbers: ["112"], status: "ok" },

  // S
  SA: { label: "Saudi Arabia", numbers: ["999"], status: "ok" },
  RS: { label: "Serbia", numbers: ["94"], status: "ok" },
  SG: { label: "Singapore", numbers: ["999"], status: "ok" },
  SK: { label: "Slovakia", numbers: ["158"], status: "ok" },
  SI: { label: "Slovenia", numbers: ["112"], status: "ok" },
  ZA: { label: "South Africa", numbers: ["10111"], status: "ok" },
  ES: { label: "Spain", numbers: ["112"], status: "ok" },
  SE: { label: "Sweden", numbers: ["112"], status: "ok" },
  CH: { label: "Switzerland", numbers: ["117"], status: "ok" },

  // T
  TH: { label: "Thailand", numbers: ["191"], status: "ok" },
  TR: { label: "Turkey", numbers: ["100"], status: "ok" },

  // U
  AE: { label: "United Arab Emirates", numbers: ["999"], status: "ok" },
  GB: { label: "United Kingdom", numbers: ["112", "999"], status: "ok" },
  US: { label: "United States", numbers: ["911"], status: "ok" },
  UA: { label: "Ukraine", numbers: ["02"], status: "ok" },

  // V
  VE: { label: "Venezuela", numbers: ["171"], status: "ok" },
  VN: { label: "Vietnam", numbers: ["03"], status: "ok" },

  // Z
  ZM: { label: "Zambia", numbers: ["999"], status: "ok" },
  ZW: { label: "Zimbabwe", numbers: ["995", "999"], status: "ok" },
};