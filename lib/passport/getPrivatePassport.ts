// lib/passport/getPrivatePassport.ts

import { PrivatePassport } from './passportTypes';

export function getPrivatePassport(
  registryId: string
): PrivatePassport {
  return {
    registryId,
    status: 'REGISTERED_VERIFIED',

    machine: {
      type: 'Excavator',
      brand: 'Caterpillar',
      model: '320',
      yearOfManufacture: 2021,
      serialMasked: '***1234',
      serialNumber: 'CAT0320XABC1234',
      internalRegistryId: 'INT-778291',
      yearVerified: true,
    },

    validation: {
      lastValidated: '12/2025',
      source: 'Registry partner',
      verifiedBy: 'Insurance Partner A',
      auditTrail: [
        {
          date: '04/2024',
          actor: 'Dealer',
          note: 'Initial registration',
        },
        {
          date: '12/2025',
          actor: 'Insurer',
          note: 'Ownership and serial verified',
        },
      ],
    },

    notes:
      'This private passport view contains confidential verification data intended for authorized parties only.',
  };
}
