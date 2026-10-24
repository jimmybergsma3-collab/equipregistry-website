import type { Lang } from "./config";

const copy = {
  en: ["Asset information", "Verification summary", "Important information", "Private documents and personal owner details are not displayed. This passport does not provide a legal guarantee of ownership. Check the physical asset and its identification numbers before purchase, rental or transfer."],
  nl: ["Assetgegevens", "Verificatieoverzicht", "Belangrijke informatie", "Privédocumenten en persoonsgegevens van de eigenaar worden niet getoond. Dit paspoort biedt geen juridische eigendomsgarantie. Controleer de fysieke asset en de identificatienummers vóór aankoop, huur of overdracht."],
  es: ["Información del activo", "Resumen de verificación", "Información importante", "No se muestran documentos privados ni datos personales del propietario. Este pasaporte no garantiza legalmente la propiedad. Compruebe el activo físico y sus números de identificación antes de comprar, alquilar o transferir."],
  de: ["Asset-Informationen", "Verifizierungsübersicht", "Wichtige Informationen", "Private Dokumente und persönliche Eigentümerdaten werden nicht angezeigt. Dieser Pass bietet keine rechtliche Eigentumsgarantie. Prüfen Sie das physische Asset und seine Identifikationsnummern vor Kauf, Miete oder Übertragung."],
  fr: ["Informations sur le bien", "Résumé de vérification", "Informations importantes", "Les documents privés et les données personnelles du propriétaire ne sont pas affichés. Ce passeport ne garantit pas juridiquement la propriété. Vérifiez le bien physique et ses numéros d’identification avant tout achat, location ou transfert."],
  it: ["Informazioni sul bene", "Riepilogo della verifica", "Informazioni importanti", "I documenti privati e i dati personali del proprietario non sono mostrati. Questo passaporto non offre una garanzia legale di proprietà. Controllare il bene fisico e i suoi numeri identificativi prima di acquisto, noleggio o trasferimento."],
  pt: ["Informações do ativo", "Resumo da verificação", "Informações importantes", "Os documentos privados e os dados pessoais do proprietário não são apresentados. Este passaporte não oferece uma garantia legal de propriedade. Verifique o ativo físico e os seus números de identificação antes da compra, aluguer ou transferência."],
} satisfies Partial<Record<Lang, readonly string[]>>;

export function getPassportLayoutCopy(lang: Lang) {
  const [assetInformation, verificationSummary, importantInformation, limitations] =
    copy[lang as keyof typeof copy] ?? copy.en;
  return { assetInformation, verificationSummary, importantInformation, limitations };
}
