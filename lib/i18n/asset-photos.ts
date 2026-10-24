import type { PhotoLabelCode } from "@/lib/asset-photos/policy";
const codes: PhotoLabelCode[] = ["overview", "front", "rear", "left", "right", "interior", "serial_plate", "vin_chassis", "hull_id", "engine_serial", "detail", "damage", "attachment", "other"];
const translations: Record<string, string[]> = {
  en: ["Overview photo", "Front view", "Rear view", "Left side", "Right side", "Interior", "Serial plate", "VIN / Chassis", "Hull identification", "Engine serial", "Detail", "Damage", "Attachment", "Other asset photo"],
  nl: ["Overzichtsfoto", "Vooraanzicht", "Achteraanzicht", "Linkerzijde", "Rechterzijde", "Interieur", "Typeplaatje", "VIN / Chassis", "Rompidentificatie", "Motorserienummer", "Detail", "Schade", "Aanbouwdeel", "Overige assetfoto"],
  es: ["Foto general", "Vista frontal", "Vista trasera", "Lado izquierdo", "Lado derecho", "Interior", "Placa de serie", "VIN / Chasis", "Identificación del casco", "Número de motor", "Detalle", "Daños", "Accesorio", "Otra foto del activo"],
  de: ["Übersichtsfoto", "Vorderansicht", "Rückansicht", "Linke Seite", "Rechte Seite", "Innenraum", "Typenschild", "FIN / Fahrgestell", "Rumpfkennung", "Motorseriennummer", "Detail", "Schaden", "Anbaugerät", "Weiteres Objektfoto"],
  fr: ["Photo générale", "Vue avant", "Vue arrière", "Côté gauche", "Côté droit", "Intérieur", "Plaque de série", "VIN / Châssis", "Identification de coque", "Numéro de moteur", "Détail", "Dommages", "Accessoire", "Autre photo du bien"],
  it: ["Foto panoramica", "Vista anteriore", "Vista posteriore", "Lato sinistro", "Lato destro", "Interni", "Targhetta seriale", "VIN / Telaio", "Identificazione scafo", "Numero motore", "Dettaglio", "Danni", "Accessorio", "Altra foto del bene"],
  pt: ["Fotografia geral", "Vista frontal", "Vista traseira", "Lado esquerdo", "Lado direito", "Interior", "Placa de série", "VIN / Chassis", "Identificação do casco", "Número do motor", "Detalhe", "Danos", "Acessório", "Outra fotografia do bem"],
};
export function photoLabels(lang: string): Record<PhotoLabelCode, string> {
  return Object.fromEntries(codes.map((code, i) => [code, (translations[lang] ?? translations.en)[i]])) as Record<PhotoLabelCode, string>;
}
export function photoHeading(lang: string) {
  return ({ en: "Asset photos", nl: "Assetfoto’s", es: "Fotos del activo", de: "Objektfotos", fr: "Photos du bien", it: "Foto del bene", pt: "Fotografias do bem" } as Record<string, string>)[lang] ?? "Asset photos";
}
