import type { Lang } from "@/lib/i18n/config";

export type TermsSection = {
  title: string;
  body: string[];
};

export type TermsContent = {
  pageTitle: string;
  intro: string;
  companyTitle: string;
  companyLines: string[];
  sections: TermsSection[];
  lastUpdated: string;
};

const companyLines = [
  "EquipRegistry",
  "Jimmy Bergsma",
  "Calle Murcia 111",
  "03420 Castalla, Alicante",
  "Spain",
  "ID / NIE: Y8875740P",
  "Email: info@equipregistry.com",
];

export const TERMS_CONTENT: Record<Lang, TermsContent> = {
  en: {
    pageTitle: "Terms & Conditions",
    intro:
      "These Terms and Conditions govern the use of the EquipRegistry platform, website, public verification tools, registration services, digital asset passports, and related future services.",
    companyTitle: "Service Provider",
    companyLines,
    sections: [
      {
        title: "1. General Information",
        body: [
          "EquipRegistry is a digital registry platform for identifiable assets such as vehicles, machinery, equipment, bicycles, e-bikes, electric scooters, trailers, industrial assets, batteries, solar-related assets, and other identifiable property.",
          "The platform may include public verification, digital passports, owner dashboards, registration workflows, partner tools, and future integrations.",
        ],
      },
      {
        title: "2. Nature of the Service",
        body: [
          "EquipRegistry acts as a registry and verification layer and does not automatically guarantee legal ownership, lawful origin, marketability, or absence of encumbrances unless explicitly confirmed after review.",
          "Statuses and records are based on the information, documents, declarations, and validations available at the time of review.",
        ],
      },
      {
        title: "3. User Responsibility",
        body: [
          "Users, applicants, owners, and partners must provide complete, accurate, current, and truthful information.",
          "Submitting false, manipulated, misleading, stolen, or unauthorized documents, claims, serial numbers, invoices, or identity details is strictly prohibited.",
        ],
      },
      {
        title: "4. Registration and Review",
        body: [
          "Submitting a registration request does not guarantee approval, verification, or passport issuance.",
          "EquipRegistry may request additional evidence, reject or suspend applications, modify statuses, or place a record under review when necessary.",
        ],
      },
      {
        title: "5. Asset Statuses",
        body: [
          "Assets on the platform may show statuses such as Registered & Verified, History Unknown, Stolen / Red Flag, Verification Expired, or Not Registered.",
          "These statuses are informational within the platform context and may change when new information becomes available.",
        ],
      },
      {
        title: "6. Theft Reports and Conflicting Claims",
        body: [
          "EquipRegistry may require a police report or comparable official evidence before assigning or maintaining a stolen or red-flag-related status.",
          "In the event of conflicting ownership or theft claims, EquipRegistry may restrict visibility, suspend a record, or request further verification.",
        ],
      },
      {
        title: "7. Public Verification and Limited Access",
        body: [
          "Public search results and public passport views are intended to improve transparency and recognition of an asset, but they do not replace legal due diligence, police checks, title verification, or financial checks.",
          "Some information may remain limited, masked, or accessible only to authorized users, owners, or approved partners.",
        ],
      },
      {
        title: "8. Ownership Changes and Data Freshness",
        body: [
          "Users are responsible for updating ownership changes, recovery after theft, sale, export, or other relevant status changes.",
          "EquipRegistry may introduce reminders, renewal requirements, ownership transfer flows, or automatic status updates such as Verification Expired.",
        ],
      },
      {
        title: "9. Payments and Fees",
        body: [
          "Certain services may be subject to registration fees, validation fees, renewal fees, partner access fees, or other transaction-related charges.",
          "A submitted registration reference may become the permanent passport or registry reference linked to the asset in the EquipRegistry system.",
        ],
      },
      {
        title: "10. Fraud, Abuse, and Misuse",
        body: [
          "The platform may not be used for fraud, identity misuse, document manipulation, theft-related abuse, unlawful conduct, or unauthorized access attempts.",
          "EquipRegistry reserves the right to suspend access, remove records, and cooperate with relevant authorities where misuse is suspected.",
        ],
      },
      {
        title: "11. Intellectual Property",
        body: [
          "The EquipRegistry name, branding, platform concept, passport layout, database structure, texts, and website content are protected by applicable intellectual property laws.",
          "No part of the platform may be copied, reproduced, reverse engineered, resold, or commercially exploited without prior written permission.",
        ],
      },
      {
        title: "12. Limitation of Liability",
        body: [
          "EquipRegistry is not liable for indirect loss, lost profits, missed transactions, reputational damage, theft, fraud, ownership disputes, financing disputes, or reliance on incomplete, outdated, user-submitted, or third-party information.",
          "Use of the platform is at the user's own risk. Users remain responsible for their own checks, decisions, and legal due diligence.",
        ],
      },
      {
        title: "13. Third-Party Services",
        body: [
          "EquipRegistry may rely on third-party services for hosting, payments, analytics, communication, infrastructure, or other technical functions.",
          "EquipRegistry is not responsible for interruptions, delays, or failures caused by third-party providers.",
        ],
      },
      {
        title: "14. Future Services",
        body: [
          "EquipRegistry may expand with API access, insurer tools, bank or finance checks, rental dashboards, QR verification, export and logistics tools, notifications, analytics, stickers, labels, and other verification layers.",
          "New services may be subject to additional terms or commercial agreements.",
        ],
      },
      {
        title: "15. Changes to These Terms",
        body: [
          "EquipRegistry may update these Terms and Conditions from time to time to reflect legal, technical, operational, or commercial developments.",
          "The latest version published on the website applies from the date of publication unless stated otherwise.",
        ],
      },
      {
        title: "16. Governing Law and Jurisdiction",
        body: [
          "These Terms and Conditions are governed by Spanish law.",
          "Any disputes relating to the use of EquipRegistry shall be submitted to the competent courts in Spain, unless mandatory law requires otherwise.",
        ],
      },
    ],
    lastUpdated: "Last updated: 4 April 2026",
  },

  nl: {
    pageTitle: "Algemene Voorwaarden",
    intro:
      "Deze Algemene Voorwaarden regelen het gebruik van het EquipRegistry-platform, de website, de openbare verificatietools, registratiediensten, digitale asset passports en toekomstige aanverwante diensten.",
    companyTitle: "Dienstverlener",
    companyLines,
    sections: [
      {
        title: "1. Algemene informatie",
        body: [
          "EquipRegistry is een digitaal registerplatform voor identificeerbare assets zoals voertuigen, machines, equipment, fietsen, e-bikes, elektrische steps, aanhangwagens, industriële assets, batterijen, solar-gerelateerde assets en andere identificeerbare eigendommen.",
          "Het platform kan openbare verificatie, digitale paspoorten, dashboards voor eigenaren, registratieflows, partnertools en toekomstige integraties bevatten.",
        ],
      },
      {
        title: "2. Aard van de dienst",
        body: [
          "EquipRegistry werkt als een registratie- en verificatielaag en garandeert niet automatisch juridisch eigendom, legale herkomst, verhandelbaarheid of afwezigheid van lasten, tenzij dit na beoordeling uitdrukkelijk wordt bevestigd.",
          "Statussen en registraties zijn gebaseerd op de informatie, documenten, verklaringen en validaties die op het moment van beoordeling beschikbaar zijn.",
        ],
      },
      {
        title: "3. Verantwoordelijkheid van de gebruiker",
        body: [
          "Gebruikers, aanvragers, eigenaren en partners moeten volledige, correcte, actuele en waarheidsgetrouwe informatie aanleveren.",
          "Het indienen van valse, gemanipuleerde, misleidende, gestolen of onbevoegde documenten, claims, serienummers, facturen of identiteitsgegevens is strikt verboden.",
        ],
      },
      {
        title: "4. Registratie en beoordeling",
        body: [
          "Het indienen van een registratieverzoek garandeert geen goedkeuring, verificatie of afgifte van een paspoort.",
          "EquipRegistry mag aanvullende bewijsstukken opvragen, aanvragen afwijzen of opschorten, statussen wijzigen of een registratie in review zetten wanneer dat nodig is.",
        ],
      },
      {
        title: "5. Asset-statussen",
        body: [
          "Assets op het platform kunnen statussen tonen zoals Registered & Verified, History Unknown, Stolen / Red Flag, Verification Expired of Not Registered.",
          "Deze statussen zijn informatief binnen de context van het platform en kunnen wijzigen wanneer nieuwe informatie beschikbaar komt.",
        ],
      },
      {
        title: "6. Diefstalmeldingen en conflicterende claims",
        body: [
          "EquipRegistry kan een politierapport of vergelijkbaar officieel bewijs verlangen voordat een gestolen- of red-flag-status wordt toegekend of gehandhaafd.",
          "Bij conflicterende eigendoms- of diefstalclaims kan EquipRegistry de zichtbaarheid beperken, een registratie opschorten of aanvullende verificatie vragen.",
        ],
      },
      {
        title: "7. Openbare verificatie en beperkte toegang",
        body: [
          "Openbare zoekresultaten en openbare paspoortweergaven zijn bedoeld om transparantie en herkenning van een asset te verbeteren, maar vervangen geen juridische due diligence, politiecontroles, eigendomscontrole of financiële checks.",
          "Sommige informatie kan beperkt of gemaskeerd blijven en alleen toegankelijk zijn voor geautoriseerde gebruikers, eigenaren of goedgekeurde partners.",
        ],
      },
      {
        title: "8. Eigendomswijzigingen en actualiteit van data",
        body: [
          "Gebruikers zijn verantwoordelijk voor het bijwerken van eigendomswijzigingen, teruggevonden diefstal, verkoop, export of andere relevante statuswijzigingen.",
          "EquipRegistry kan herinneringen, verlengvereisten, eigendomsoverdrachtflows of automatische statusupdates zoals Verification Expired invoeren.",
        ],
      },
      {
        title: "9. Betalingen en vergoedingen",
        body: [
          "Voor bepaalde diensten kunnen registratiekosten, validatiekosten, verlengkosten, partnertoegangskosten of andere transactiegerelateerde kosten gelden.",
          "Een ingediende registratiereferentie kan het permanente paspoort- of registratienummer worden dat aan de asset in het EquipRegistry-systeem gekoppeld blijft.",
        ],
      },
      {
        title: "10. Fraude, misbruik en oneigenlijk gebruik",
        body: [
          "Het platform mag niet worden gebruikt voor fraude, identiteitsmisbruik, documentmanipulatie, diefstalgerelateerd misbruik, onrechtmatig handelen of ongeautoriseerde toegangspogingen.",
          "EquipRegistry behoudt zich het recht voor toegang te schorsen, registraties te verwijderen en samen te werken met bevoegde autoriteiten bij vermoed misbruik.",
        ],
      },
      {
        title: "11. Intellectueel eigendom",
        body: [
          "De naam EquipRegistry, branding, het platformconcept, de paspoortlayout, databasestructuur, teksten en websitecontent zijn beschermd onder toepasselijke intellectuele-eigendomswetgeving.",
          "Geen enkel onderdeel van het platform mag zonder voorafgaande schriftelijke toestemming worden gekopieerd, gereproduceerd, gereverse-engineerd, doorverkocht of commercieel geëxploiteerd.",
        ],
      },
      {
        title: "12. Beperking van aansprakelijkheid",
        body: [
          "EquipRegistry is niet aansprakelijk voor indirecte schade, winstderving, gemiste transacties, reputatieschade, diefstal, fraude, eigendomsgeschillen, financieringsgeschillen of vertrouwen op onvolledige, verouderde, door gebruikers aangeleverde of door derden verstrekte informatie.",
          "Gebruik van het platform is volledig voor eigen risico. Gebruikers blijven zelf verantwoordelijk voor hun controles, beslissingen en juridische due diligence.",
        ],
      },
      {
        title: "13. Diensten van derden",
        body: [
          "EquipRegistry kan afhankelijk zijn van derde partijen voor hosting, betalingen, analytics, communicatie, infrastructuur of andere technische functies.",
          "EquipRegistry is niet verantwoordelijk voor onderbrekingen, vertragingen of storingen veroorzaakt door derde partijen.",
        ],
      },
      {
        title: "14. Toekomstige diensten",
        body: [
          "EquipRegistry kan uitbreiden met API-toegang, tools voor verzekeraars, bank- of financieringschecks, verhuurdashboards, QR-verificatie, export- en logistieke tools, notificaties, analytics, stickers, labels en andere verificatielagen.",
          "Nieuwe diensten kunnen onder aanvullende voorwaarden of commerciële afspraken vallen.",
        ],
      },
      {
        title: "15. Wijzigingen van deze voorwaarden",
        body: [
          "EquipRegistry kan deze Algemene Voorwaarden van tijd tot tijd aanpassen om juridische, technische, operationele of commerciële ontwikkelingen te verwerken.",
          "De meest recente versie die op de website is gepubliceerd geldt vanaf de publicatiedatum, tenzij anders vermeld.",
        ],
      },
      {
        title: "16. Toepasselijk recht en bevoegde rechter",
        body: [
          "Op deze Algemene Voorwaarden is Spaans recht van toepassing.",
          "Geschillen met betrekking tot het gebruik van EquipRegistry worden voorgelegd aan de bevoegde rechter in Spanje, tenzij dwingend recht anders voorschrijft.",
        ],
      },
    ],
    lastUpdated: "Laatst bijgewerkt: 4 april 2026",
  },

  es: {
    pageTitle: "Términos y Condiciones",
    intro:
      "Estos Términos y Condiciones regulan el uso de la plataforma EquipRegistry, el sitio web, las herramientas de verificación pública, los servicios de registro, los pasaportes digitales de activos y los futuros servicios relacionados.",
    companyTitle: "Proveedor del servicio",
    companyLines,
    sections: [
      {
        title: "1. Información general",
        body: [
          "EquipRegistry es una plataforma de registro digital para activos identificables como vehículos, maquinaria, equipos, bicicletas, bicicletas eléctricas, patinetes eléctricos, remolques, activos industriales, baterías, activos relacionados con energía solar y otras propiedades identificables.",
          "La plataforma puede incluir verificación pública, pasaportes digitales, paneles para propietarios, flujos de registro, herramientas para socios e integraciones futuras.",
        ],
      },
      {
        title: "2. Naturaleza del servicio",
        body: [
          "EquipRegistry actúa como una capa de registro y verificación y no garantiza automáticamente la propiedad legal, el origen lícito, la comerciabilidad o la ausencia de cargas, salvo confirmación expresa tras revisión.",
          "Los estados y registros se basan en la información, documentación, declaraciones y validaciones disponibles en el momento de la revisión.",
        ],
      },
      {
        title: "3. Responsabilidad del usuario",
        body: [
          "Los usuarios, solicitantes, propietarios y socios deben proporcionar información completa, correcta, actualizada y veraz.",
          "Está estrictamente prohibido presentar documentos, reclamaciones, números de serie, facturas o datos de identidad falsos, manipulados, engañosos, robados o no autorizados.",
        ],
      },
      {
        title: "4. Registro y revisión",
        body: [
          "La presentación de una solicitud de registro no garantiza su aprobación, verificación ni la emisión de un pasaporte.",
          "EquipRegistry puede solicitar pruebas adicionales, rechazar o suspender solicitudes, modificar estados o poner un registro en revisión cuando sea necesario.",
        ],
      },
      {
        title: "5. Estados del activo",
        body: [
          "Los activos en la plataforma pueden mostrar estados como Registered & Verified, History Unknown, Stolen / Red Flag, Verification Expired o Not Registered.",
          "Estos estados son informativos dentro del contexto de la plataforma y pueden cambiar cuando haya nueva información disponible.",
        ],
      },
      {
        title: "6. Denuncias de robo y reclamaciones conflictivas",
        body: [
          "EquipRegistry puede exigir una denuncia policial o prueba oficial equivalente antes de asignar o mantener un estado de robo o red flag.",
          "En caso de reclamaciones conflictivas de propiedad o robo, EquipRegistry puede limitar la visibilidad, suspender un registro o solicitar verificación adicional.",
        ],
      },
      {
        title: "7. Verificación pública y acceso limitado",
        body: [
          "Los resultados de búsqueda pública y las vistas públicas del pasaporte están pensados para mejorar la transparencia y el reconocimiento del activo, pero no sustituyen la diligencia legal, las comprobaciones policiales, la verificación de titularidad o los controles financieros.",
          "Parte de la información puede permanecer limitada o enmascarada y ser accesible solo para usuarios autorizados, propietarios o socios aprobados.",
        ],
      },
      {
        title: "8. Cambios de titularidad y actualización de datos",
        body: [
          "Los usuarios son responsables de actualizar los cambios de titularidad, recuperación tras robo, venta, exportación u otros cambios de estado relevantes.",
          "EquipRegistry puede introducir recordatorios, requisitos de renovación, flujos de transferencia de propiedad o actualizaciones automáticas de estado como Verification Expired.",
        ],
      },
      {
        title: "9. Pagos y tarifas",
        body: [
          "Determinados servicios pueden estar sujetos a tarifas de registro, validación, renovación, acceso para socios u otros cargos relacionados con transacciones.",
          "Una referencia de registro enviada puede convertirse en el identificador permanente del pasaporte o del registro vinculado al activo en el sistema EquipRegistry.",
        ],
      },
      {
        title: "10. Fraude, abuso y uso indebido",
        body: [
          "La plataforma no puede utilizarse para fraude, usurpación de identidad, manipulación de documentos, abuso relacionado con robo, conductas ilícitas o intentos de acceso no autorizados.",
          "EquipRegistry se reserva el derecho de suspender el acceso, eliminar registros y cooperar con las autoridades competentes cuando se sospeche un uso indebido.",
        ],
      },
      {
        title: "11. Propiedad intelectual",
        body: [
          "El nombre EquipRegistry, la marca, el concepto de la plataforma, el diseño del pasaporte, la estructura de la base de datos, los textos y el contenido del sitio web están protegidos por las leyes aplicables de propiedad intelectual.",
          "Ninguna parte de la plataforma puede copiarse, reproducirse, descompilarse, revenderse ni explotarse comercialmente sin autorización previa por escrito.",
        ],
      },
      {
        title: "12. Limitación de responsabilidad",
        body: [
          "EquipRegistry no es responsable por daños indirectos, lucro cesante, transacciones perdidas, daño reputacional, robo, fraude, disputas de propiedad, disputas de financiación o confianza depositada en información incompleta, desactualizada, aportada por usuarios o por terceros.",
          "El uso de la plataforma es por cuenta y riesgo del usuario. Los usuarios siguen siendo responsables de sus propias comprobaciones, decisiones y diligencia legal.",
        ],
      },
      {
        title: "13. Servicios de terceros",
        body: [
          "EquipRegistry puede depender de terceros para alojamiento, pagos, analítica, comunicación, infraestructura u otras funciones técnicas.",
          "EquipRegistry no es responsable de interrupciones, retrasos o fallos causados por terceros.",
        ],
      },
      {
        title: "14. Servicios futuros",
        body: [
          "EquipRegistry puede ampliarse con acceso API, herramientas para aseguradoras, comprobaciones bancarias o financieras, paneles de alquiler, verificación QR, herramientas de exportación y logística, notificaciones, analítica, pegatinas, etiquetas y otras capas de verificación.",
          "Los nuevos servicios pueden estar sujetos a condiciones adicionales o acuerdos comerciales.",
        ],
      },
      {
        title: "15. Cambios en estas condiciones",
        body: [
          "EquipRegistry puede actualizar estos Términos y Condiciones periódicamente para reflejar desarrollos legales, técnicos, operativos o comerciales.",
          "La versión más reciente publicada en el sitio web será aplicable desde la fecha de publicación, salvo indicación en contrario.",
        ],
      },
      {
        title: "16. Ley aplicable y jurisdicción",
        body: [
          "Estos Términos y Condiciones se rigen por la legislación española.",
          "Cualquier disputa relacionada con el uso de EquipRegistry se someterá a los tribunales competentes en España, salvo que la ley imperativa disponga otra cosa.",
        ],
      },
    ],
    lastUpdated: "Última actualización: 4 de abril de 2026",
  },

  de: {
    pageTitle: "Allgemeine Geschäftsbedingungen",
    intro: "Noch zu übersetzen.",
    companyTitle: "Dienstleister",
    companyLines,
    sections: [],
    lastUpdated: "Letzte Aktualisierung: 4. April 2026",
  },

  fr: {
    pageTitle: "Conditions Générales",
    intro: "Traduction complète à ajouter.",
    companyTitle: "Prestataire de service",
    companyLines,
    sections: [],
    lastUpdated: "Dernière mise à jour : 4 avril 2026",
  },

  it: {
    pageTitle: "Termini e Condizioni",
    intro: "Traduzione completa da aggiungere.",
    companyTitle: "Fornitore del servizio",
    companyLines,
    sections: [],
    lastUpdated: "Ultimo aggiornamento: 4 aprile 2026",
  },

  pt: {
    pageTitle: "Termos e Condições",
    intro: "Tradução completa a adicionar.",
    companyTitle: "Prestador do serviço",
    companyLines,
    sections: [],
    lastUpdated: "Última atualização: 4 de abril de 2026",
  },

  ru: {
    pageTitle: "Условия и положения",
    intro: "Полный перевод будет добавлен.",
    companyTitle: "Поставщик услуги",
    companyLines,
    sections: [],
    lastUpdated: "Последнее обновление: 4 апреля 2026 г.",
  },

  zh: {
    pageTitle: "条款与条件",
    intro: "完整翻译待添加。",
    companyTitle: "服务提供方",
    companyLines,
    sections: [],
    lastUpdated: "最后更新：2026年4月4日",
  },

  hi: {
    pageTitle: "नियम और शर्तें",
    intro: "पूरा अनुवाद अभी जोड़ना है।",
    companyTitle: "सेवा प्रदाता",
    companyLines,
    sections: [],
    lastUpdated: "अंतिम अपडेट: 4 अप्रैल 2026",
  },

  ar: {
    pageTitle: "الشروط والأحكام",
    intro: "ستتم إضافة الترجمة الكاملة.",
    companyTitle: "مقدم الخدمة",
    companyLines,
    sections: [],
    lastUpdated: "آخر تحديث: 4 أبريل 2026",
  },
};