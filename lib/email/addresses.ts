export const MAILBOXES = {
  transactionalFromEmail: "no_reply@equipregistry.com",
  transactionalFrom: "EquipRegistry <no_reply@equipregistry.com>",
  contactFrom: "EquipRegistry Contact <contact@equipregistry.com>",
  internalRequests: "request@equipregistry.com",
  generalContact: "contact@equipregistry.com",
  support: "support@equipregistry.com",
  business: "business@equipregistry.com",
  publicInfo: "info@equipregistry.com",
} as const;

export type ContactMailboxType = "general" | "business" | "support";

export function getContactRecipient(contactType: ContactMailboxType) {
  switch (contactType) {
    case "business":
      return MAILBOXES.business;
    case "support":
      return MAILBOXES.support;
    default:
      return MAILBOXES.generalContact;
  }
}
