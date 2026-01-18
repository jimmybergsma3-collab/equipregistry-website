// lib/passport/getPublicPassport.ts

import { PublicPassport } from './passportTypes';

export function getPublicPassport(
  registryId: string
): PublicPassport {
  // DEMO / MOCK LOGIC — later vervangen door DB
  switch (registryId) {
    case 'ER-REG-001':
      return {
        registryId,
        status: 'REGISTERED_VERIFIED',
        machine: {
          type: 'Excavator',
          brand: 'Caterpillar',
          model: '320',
          yearOfManufacture: 2021,
          serialMasked: '***1234',
        },
        validation: {
          lastValidated: '12/2025',
          source: 'Registry partner',
        },
      };

    case 'ER-HIS-404':
      return {
        registryId,
        status: 'HISTORY_UNKNOWN',
        machine: {
          type: 'Wheel Loader',
          brand: 'Volvo',
          model: 'L90H',
          yearOfManufacture: 2018,
          serialMasked: '***5678',
        },
        validation: {
          lastValidated: '11/2025',
          source: 'Registry partner',
        },
      };

    case 'ER-STOL-777':
      return {
        registryId,
        status: 'STOLEN',
        machine: {
          type: 'Telehandler',
          brand: 'Manitou',
          model: 'MT 1840',
          yearOfManufacture: 2020,
          serialMasked: '***9012',
        },
        validation: {
          lastValidated: '01/2026',
          source: 'Registry record',
        },
      };

    default:
      return {
        registryId,
        status: 'NOT_REGISTERED',
        machine: {
          type: '-',
          brand: '-',
          model: '-',
          serialMasked: '***',
        },
        validation: {
          lastValidated: '-',
          source: 'N/A',
        },
      };
  }
}
