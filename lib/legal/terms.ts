import type { Lang } from "@/lib/i18n/config";
import { COMPANY_LEGAL_LINES } from "@/lib/company-details";

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

const companyLines = COMPANY_LEGAL_LINES;

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

  pl: {
    pageTitle: "Warunki i postanowienia",
    intro:
      "Niniejsze Warunki i postanowienia reguluja korzystanie z platformy EquipRegistry, strony internetowej, publicznych narzedzi weryfikacyjnych, uslug rejestracyjnych, cyfrowych paszportow assetow oraz powiazanych przyszlych uslug.",
    companyTitle: "Uslugodawca",
    companyLines,
    sections: [
      {
        title: "1. Informacje ogolne",
        body: [
          "EquipRegistry to cyfrowa platforma rejestrowa dla identyfikowalnych assetow, takich jak pojazdy, maszyny, sprzet, rowery, e-bike'i, hulajnogi elektryczne, przyczepy, assety przemyslowe, baterie, assety zwiazane z energia sloneczna oraz inne identyfikowalne mienie.",
          "Platforma moze obejmowac publiczna weryfikacje, cyfrowe paszporty, panele wlascicieli, workflow rejestracyjne, narzedzia partnerskie i przyszle integracje.",
        ],
      },
      {
        title: "2. Charakter uslugi",
        body: [
          "EquipRegistry dziala jako warstwa rejestracji i weryfikacji i nie gwarantuje automatycznie prawa wlasnosci, legalnego pochodzenia, zbywalnosci ani braku obciazen, chyba ze zostanie to wyraznie potwierdzone po przegladzie.",
          "Statusy i rekordy opieraja sie na informacjach, dokumentach, oswiadczeniach i walidacjach dostepnych w chwili przegladu.",
        ],
      },
      {
        title: "3. Odpowiedzialnosc uzytkownika",
        body: [
          "Uzytkownicy, wnioskodawcy, wlasciciele i partnerzy musza dostarczac kompletne, dokladne, aktualne i prawdziwe informacje.",
          "Przesylanie falszywych, zmanipulowanych, wprowadzajacych w blad, skradzionych lub nieautoryzowanych dokumentow, roszczen, numerow seryjnych, faktur lub danych tozsamosci jest surowo zabronione.",
        ],
      },
      {
        title: "4. Rejestracja i przeglad",
        body: [
          "Zlozenie wniosku rejestracyjnego nie gwarantuje zatwierdzenia, weryfikacji ani wydania paszportu.",
          "EquipRegistry moze zadac dodatkowych dowodow, odrzucic lub zawiesic wnioski, zmienic statusy albo objac rekord przegladem, gdy jest to konieczne.",
        ],
      },
      {
        title: "5. Statusy assetow",
        body: [
          "Assety na platformie moga wyswietlac statusy takie jak Registered & Verified, History Unknown, Stolen / Red Flag, Verification Expired lub Not Registered.",
          "Statusy te maja charakter informacyjny w kontekscie platformy i moga sie zmieniac wraz z pojawieniem sie nowych informacji.",
        ],
      },
      {
        title: "6. Zgloszenia kradziezy i sprzeczne roszczenia",
        body: [
          "EquipRegistry moze wymagac zgloszenia policyjnego lub porownywalnego oficjalnego dowodu przed nadaniem lub utrzymaniem statusu zwiazanego z kradzieza lub red flag.",
          "W przypadku sprzecznych roszczen dotyczacych wlasnosci lub kradziezy EquipRegistry moze ograniczyc widocznosc, zawiesic rekord lub zazadac dalszej weryfikacji.",
        ],
      },
      {
        title: "7. Publiczna weryfikacja i ograniczony dostep",
        body: [
          "Publiczne wyniki wyszukiwania i publiczne widoki paszportu maja zwiekszac przejrzystosc i rozpoznawalnosc assetu, ale nie zastepuja prawnego due diligence, kontroli policyjnych, weryfikacji tytulu wlasnosci ani kontroli finansowych.",
          "Niektore informacje moga pozostac ograniczone, zamaskowane lub dostepne wylacznie dla upowaznionych uzytkownikow, wlascicieli lub zatwierdzonych partnerow.",
        ],
      },
      {
        title: "8. Zmiany wlasnosci i aktualnosc danych",
        body: [
          "Uzytkownicy odpowiadaja za aktualizowanie zmian wlasnosci, odzyskania po kradziezy, sprzedazy, eksportu lub innych istotnych zmian statusu.",
          "EquipRegistry moze wprowadzic przypomnienia, wymogi odnowienia, workflow przeniesienia wlasnosci lub automatyczne aktualizacje statusu, takie jak Verification Expired.",
        ],
      },
      {
        title: "9. Platnosci i oplaty",
        body: [
          "Niektore uslugi moga podlegac oplatom rejestracyjnym, walidacyjnym, odnowieniowym, oplatom za dostep partnerski lub innym oplatom zwiazanym z transakcja.",
          "Przeslana referencja rejestracyjna moze stac sie stalym numerem paszportu lub rejestru powiazanym z assetem w systemie EquipRegistry.",
        ],
      },
      {
        title: "10. Oszustwa, naduzycia i niewlasciwe uzycie",
        body: [
          "Platforma nie moze byc wykorzystywana do oszustw, naduzyc tozsamosci, manipulacji dokumentami, naduzyc zwiazanych z kradzieza, dzialan niezgodnych z prawem ani prob nieautoryzowanego dostepu.",
          "EquipRegistry zastrzega sobie prawo do zawieszenia dostepu, usuniecia rekordow i wspolpracy z odpowiednimi organami, gdy podejrzewa sie naduzycie.",
        ],
      },
      {
        title: "11. Wlasnosc intelektualna",
        body: [
          "Nazwa EquipRegistry, branding, koncepcja platformy, uklad paszportu, struktura bazy danych, teksty i zawartosc strony sa chronione przez odpowiednie przepisy prawa wlasnosci intelektualnej.",
          "Zadna czesc platformy nie moze byc kopiowana, reprodukowana, poddawana reverse engineeringowi, odsprzedawana ani komercyjnie wykorzystywana bez uprzedniej pisemnej zgody.",
        ],
      },
      {
        title: "12. Ograniczenie odpowiedzialnosci",
        body: [
          "EquipRegistry nie ponosi odpowiedzialnosci za szkody posrednie, utracone zyski, utracone transakcje, szkody reputacyjne, kradziez, oszustwo, spory o wlasnosc, spory finansowe ani poleganie na niepelnych, nieaktualnych, przeslanych przez uzytkownikow lub pochodzacych od stron trzecich informacjach.",
          "Korzystanie z platformy odbywa sie na wlasne ryzyko uzytkownika. Uzytkownicy nadal odpowiadaja za wlasne kontrole, decyzje i prawne due diligence.",
        ],
      },
      {
        title: "13. Uslugi stron trzecich",
        body: [
          "EquipRegistry moze korzystac z uslug stron trzecich w zakresie hostingu, platnosci, analityki, komunikacji, infrastruktury lub innych funkcji technicznych.",
          "EquipRegistry nie ponosi odpowiedzialnosci za przerwy, opoznienia ani awarie spowodowane przez dostawcow zewnetrznych.",
        ],
      },
      {
        title: "14. Przyszle uslugi",
        body: [
          "EquipRegistry moze rozszerzyc sie o dostep API, narzedzia dla ubezpieczycieli, kontrole bankowe lub finansowe, panele wynajmu, weryfikacje QR, narzedzia eksportowe i logistyczne, powiadomienia, analityke, naklejki, etykiety i inne warstwy weryfikacji.",
          "Nowe uslugi moga podlegac dodatkowym warunkom lub umowom handlowym.",
        ],
      },
      {
        title: "15. Zmiany niniejszych warunkow",
        body: [
          "EquipRegistry moze od czasu do czasu aktualizowac niniejsze Warunki i postanowienia, aby odzwierciedlic zmiany prawne, techniczne, operacyjne lub handlowe.",
          "Najnowsza wersja opublikowana na stronie internetowej obowiazuje od daty publikacji, chyba ze wskazano inaczej.",
        ],
      },
      {
        title: "16. Prawo wlasciwe i jurysdykcja",
        body: [
          "Niniejsze Warunki i postanowienia podlegaja prawu hiszpanskiemu.",
          "Wszelkie spory zwiazane z korzystaniem z EquipRegistry beda rozstrzygane przez wlasciwe sady w Hiszpanii, chyba ze bezwzglednie obowiazujace prawo stanowi inaczej.",
        ],
      },
    ],
    lastUpdated: "Ostatnia aktualizacja: 4 kwietnia 2026",
  },
  sv: {
    pageTitle: "Villkor",
    intro:
      "Dessa villkor reglerar anvandningen av plattformen EquipRegistry, webbplatsen, publika verifieringsverktyg, registreringstjanster, digitala assetpass och relaterade framtida tjanster.",
    companyTitle: "Tjansteleverantor",
    companyLines,
    sections: [
      {
        title: "1. Allman information",
        body: [
          "EquipRegistry ar en digital registerplattform for identifierbara assets som fordon, maskiner, utrustning, cyklar, e-bikes, elsparkcyklar, slap, industriella assets, batterier, solrelaterade assets och annan identifierbar egendom.",
          "Plattformen kan omfatta publik verifiering, digitala pass, agarpaneler, registreringsworkflows, partnerverktyg och framtida integrationer.",
        ],
      },
      {
        title: "2. Tjanstens natur",
        body: [
          "EquipRegistry fungerar som ett register- och verifieringslager och garanterar inte automatiskt lagligt agande, lagligt ursprung, saljbarhet eller franvaro av belastningar om detta inte uttryckligen bekraftas efter granskning.",
          "Statusar och poster bygger pa den information, de dokument, deklarationer och valideringar som finns tillgangliga vid tidpunkten for granskningen.",
        ],
      },
      {
        title: "3. Anvandaransvar",
        body: [
          "Anvandare, sokande, agare och partner maste tillhandahalla fullstandig, korrekt, aktuell och sanningsenlig information.",
          "Det ar strangt forbjudet att skicka in falska, manipulerade, vilseledande, stulna eller obehoriga dokument, ansprak, serienummer, fakturor eller identitetsuppgifter.",
        ],
      },
      {
        title: "4. Registrering och granskning",
        body: [
          "Att skicka in en registreringsansokan garanterar inte godkannande, verifiering eller utfardande av pass.",
          "EquipRegistry kan begara ytterligare bevisning, avsla eller pausa ansokningar, andra statusar eller satta en post under granskning nar det behovs.",
        ],
      },
      {
        title: "5. Assetstatusar",
        body: [
          "Assets pa plattformen kan visa statusar som Registered & Verified, History Unknown, Stolen / Red Flag, Verification Expired eller Not Registered.",
          "Dessa statusar ar informativa inom plattformens sammanhang och kan andras nar ny information blir tillganglig.",
        ],
      },
      {
        title: "6. Stoldanmalningar och motstridiga ansprak",
        body: [
          "EquipRegistry kan krava en polisanmalan eller jamforbar officiell bevisning innan en status kopplad till stold eller red flag tilldelas eller behalls.",
          "Vid motstridiga ansprak om agande eller stold kan EquipRegistry begransa synlighet, pausa en post eller begara ytterligare verifiering.",
        ],
      },
      {
        title: "7. Publik verifiering och begransad tillgang",
        body: [
          "Publika sokresultat och publika passvyer ar avsedda att oka transparensen och igenkanningen av en asset, men de ersatter inte juridisk due diligence, poliskontroller, titelverifiering eller finansiella kontroller.",
          "Viss information kan forbli begransad, maskerad eller endast tillganglig for behoriga anvandare, agare eller godkanda partner.",
        ],
      },
      {
        title: "8. Agarandringar och datans aktualitet",
        body: [
          "Anvandare ansvarar for att uppdatera agarandringar, aterhamtning efter stold, salj, export eller andra relevanta statusandringar.",
          "EquipRegistry kan infora paminnelser, fornyelsekrav, overlatelsefloden eller automatiska statusuppdateringar som Verification Expired.",
        ],
      },
      {
        title: "9. Betalningar och avgifter",
        body: [
          "Vissa tjanster kan omfattas av registreringsavgifter, valideringsavgifter, fornyelseavgifter, partneravgifter eller andra transaktionsrelaterade kostnader.",
          "En inskickad registreringsreferens kan bli den permanenta pass- eller registerreferensen som ar kopplad till asseten i EquipRegistry-systemet.",
        ],
      },
      {
        title: "10. Bedrageri, missbruk och felaktig anvandning",
        body: [
          "Plattformen far inte anvandas for bedrageri, identitetsmissbruk, dokumentmanipulation, stoldrelaterat missbruk, olagligt beteende eller forsok till obehorig atkomst.",
          "EquipRegistry forbehaller sig ratten att stanga av tillgang, ta bort poster och samarbeta med relevanta myndigheter nar missbruk misstanks.",
        ],
      },
      {
        title: "11. Immateriella rattigheter",
        body: [
          "Namnet EquipRegistry, branding, plattformskonceptet, passlayouten, databasstrukturen, texterna och webbplatsens innehall skyddas av tillamplig immaterialrattslig lagstiftning.",
          "Ingen del av plattformen far kopieras, reproduceras, reverse-engineeras, saljas vidare eller kommersiellt utnyttjas utan forhands skriftligt tillstand.",
        ],
      },
      {
        title: "12. Ansvarsbegransning",
        body: [
          "EquipRegistry ansvarar inte for indirekta forluster, utebliven vinst, missade transaktioner, renommeskada, stold, bedrageri, agarstvister, finansieringstvister eller tillit till ofullstandig, foraldad, anvandarinsand eller tredjepartsinformation.",
          "Anvandning av plattformen sker pa anvandarens egen risk. Anvandare ansvarar fortfarande for egna kontroller, beslut och juridisk due diligence.",
        ],
      },
      {
        title: "13. Tredjepartstjanster",
        body: [
          "EquipRegistry kan forlita sig pa tredjepartstjanster for hosting, betalningar, analys, kommunikation, infrastruktur eller andra tekniska funktioner.",
          "EquipRegistry ansvarar inte for avbrott, forseningar eller fel som orsakas av tredjepartsleverantorer.",
        ],
      },
      {
        title: "14. Framtida tjanster",
        body: [
          "EquipRegistry kan utokas med API-atkomst, verktyg for forsakrare, bank- eller finanskontroller, uthyrningsdashboards, QR-verifiering, export- och logistikverktyg, notiser, analys, dekaler, etiketter och andra verifieringslager.",
          "Nya tjanster kan omfattas av ytterligare villkor eller kommersiella avtal.",
        ],
      },
      {
        title: "15. Andringar av dessa villkor",
        body: [
          "EquipRegistry kan uppdatera dessa villkor fran tid till annan for att spegla juridiska, tekniska, operativa eller kommersiella utvecklingar.",
          "Den senaste versionen som publiceras pa webbplatsen galler fran publiceringsdatumet om inget annat anges.",
        ],
      },
      {
        title: "16. Tillamplig lag och jurisdiktion",
        body: [
          "Dessa villkor regleras av spansk lag.",
          "Eventuella tvister som ror anvandningen av EquipRegistry ska overlamnas till behoriga domstolar i Spanien, om inte tvingande lag foreskriver annat.",
        ],
      },
    ],
    lastUpdated: "Senast uppdaterad: 4 april 2026",
  },
  da: {
    pageTitle: "Vilkar og betingelser",
    intro:
      "Disse vilkar og betingelser regulerer brugen af EquipRegistry-platformen, hjemmesiden, offentlige verificeringsvaerktojer, registreringstjenester, digitale assetpas og relaterede fremtidige tjenester.",
    companyTitle: "Tjenesteudbyder",
    companyLines,
    sections: [
      {
        title: "1. Generel information",
        body: [
          "EquipRegistry er en digital registerplatform for identificerbare assets som koretojer, maskiner, udstyr, cykler, e-bikes, elektriske lobehjul, trailere, industrielle assets, batterier, solrelaterede assets og anden identificerbar ejendom.",
          "Platformen kan omfatte offentlig verificering, digitale pas, ejerdashboards, registreringsworkflows, partnervaerktojer og fremtidige integrationer.",
        ],
      },
      {
        title: "2. Tjenestens karakter",
        body: [
          "EquipRegistry fungerer som et register- og verificeringslag og garanterer ikke automatisk lovligt ejerskab, lovlig oprindelse, omsaettelighed eller fravaer af haeftelser, medmindre det udtrykkeligt bekraeftes efter gennemgang.",
          "Statusser og poster bygger pa de oplysninger, dokumenter, erklaeringer og valideringer, der er tilgaengelige pa tidspunktet for gennemgangen.",
        ],
      },
      {
        title: "3. Brugeransvar",
        body: [
          "Brugere, ansogere, ejere og partnere skal levere fuldstaendige, korrekte, aktuelle og sandfaerdige oplysninger.",
          "Indsendelse af falske, manipulerede, vildledende, stjalne eller uautoriserede dokumenter, krav, serienumre, fakturaer eller identitetsoplysninger er strengt forbudt.",
        ],
      },
      {
        title: "4. Registrering og gennemgang",
        body: [
          "Indsendelse af en registreringsanmodning garanterer ikke godkendelse, verificering eller udstedelse af pas.",
          "EquipRegistry kan anmode om yderligere dokumentation, afvise eller suspendere ansogninger, aendre statusser eller saette en post under gennemgang, nar det er nodvendigt.",
        ],
      },
      {
        title: "5. Assetstatusser",
        body: [
          "Assets pa platformen kan vise statusser som Registered & Verified, History Unknown, Stolen / Red Flag, Verification Expired eller Not Registered.",
          "Disse statusser er informative inden for platformens kontekst og kan aendres, nar ny information bliver tilgaengelig.",
        ],
      },
      {
        title: "6. Tyverianmeldelser og modstridende krav",
        body: [
          "EquipRegistry kan kraeve en politirapport eller sammenlignelig officiel dokumentation, for en status relateret til tyveri eller red flag tildeles eller opretholdes.",
          "Ved modstridende krav om ejerskab eller tyveri kan EquipRegistry begraense synlighed, suspendere en post eller anmode om yderligere verificering.",
        ],
      },
      {
        title: "7. Offentlig verificering og begraenset adgang",
        body: [
          "Offentlige sogeresultater og offentlige pasvisninger er beregnet til at forbedre gennemsigtighed og genkendelse af et asset, men de erstatter ikke juridisk due diligence, politikontrol, titelverificering eller finansielle kontroller.",
          "Nogle oplysninger kan forblive begraensede, maskerede eller kun tilgaengelige for autoriserede brugere, ejere eller godkendte partnere.",
        ],
      },
      {
        title: "8. Ejerskabsandringer og dataaktualitet",
        body: [
          "Brugere er ansvarlige for at opdatere ejerskabsandringer, genfinding efter tyveri, salg, eksport eller andre relevante statusandringer.",
          "EquipRegistry kan indfore pamindelser, fornyelseskrav, flows for ejerskabsoverdragelse eller automatiske statusopdateringer som Verification Expired.",
        ],
      },
      {
        title: "9. Betalinger og gebyrer",
        body: [
          "Visse tjenester kan vaere underlagt registreringsgebyrer, valideringsgebyrer, fornyelsesgebyrer, partneradgangsgebyrer eller andre transaktionsrelaterede omkostninger.",
          "En indsendt registreringsreference kan blive den permanente pas- eller registerreference, der er knyttet til assetet i EquipRegistry-systemet.",
        ],
      },
      {
        title: "10. Svig, misbrug og forkert anvendelse",
        body: [
          "Platformen ma ikke bruges til svig, misbrug af identitet, dokumentmanipulation, tyverirelateret misbrug, ulovlig adfaerd eller forsog pa uautoriseret adgang.",
          "EquipRegistry forbeholder sig retten til at suspendere adgang, fjerne poster og samarbejde med relevante myndigheder, hvor misbrug mistankes.",
        ],
      },
      {
        title: "11. Intellektuel ejendomsret",
        body: [
          "Navnet EquipRegistry, branding, platformkonceptet, passets layout, databasestrukturen, teksterne og indholdet pa hjemmesiden er beskyttet af gaeldende lovgivning om intellektuel ejendomsret.",
          "Ingen del af platformen ma kopieres, reproduceres, reverse-engineeres, videresaelges eller udnyttes kommercielt uden forudgaende skriftlig tilladelse.",
        ],
      },
      {
        title: "12. Ansvarsbegransning",
        body: [
          "EquipRegistry er ikke ansvarlig for indirekte tab, tabt fortjeneste, mistede transaktioner, omdommeskade, tyveri, svig, ejerskabstvister, finansieringstvister eller tillid til ufuldstaendige, foraeldede, brugerindsendte eller tredjepartsoplysninger.",
          "Brug af platformen sker pa brugerens egen risiko. Brugere forbliver ansvarlige for egne kontroller, beslutninger og juridisk due diligence.",
        ],
      },
      {
        title: "13. Tredjepartstjenester",
        body: [
          "EquipRegistry kan vaere afhngig af tredjepartstjenester til hosting, betalinger, analyse, kommunikation, infrastruktur eller andre tekniske funktioner.",
          "EquipRegistry er ikke ansvarlig for afbrydelser, forsinkelser eller fejl forarsaget af tredjepartsleverandorer.",
        ],
      },
      {
        title: "14. Fremtidige tjenester",
        body: [
          "EquipRegistry kan udvides med API-adgang, vaerktojer til forsikringsselskaber, bank- eller finanskontroller, udlejningsdashboards, QR-verificering, eksport- og logistikvaerktojer, notifikationer, analyse, klistermaerker, etiketter og andre verificeringslag.",
          "Nye tjenester kan vaere underlagt yderligere vilkar eller kommercielle aftaler.",
        ],
      },
      {
        title: "15. Andringer af disse vilkar",
        body: [
          "EquipRegistry kan fra tid til anden opdatere disse vilkar og betingelser for at afspejle juridiske, tekniske, operationelle eller kommercielle udviklinger.",
          "Den seneste version, der offentliggores pa hjemmesiden, gaelder fra offentliggorelsesdatoen, medmindre andet er angivet.",
        ],
      },
      {
        title: "16. Galdende lov og jurisdiktion",
        body: [
          "Disse vilkar og betingelser er underlagt spansk lov.",
          "Enhver tvist vedrorende brugen af EquipRegistry skal indbringes for de kompetente domstole i Spanien, medmindre ufravigelig lovgivning kraever andet.",
        ],
      },
    ],
    lastUpdated: "Sidst opdateret: 4. april 2026",
  },
  no: {
    pageTitle: "Vilkar og betingelser",
    intro:
      "Disse vilkar og betingelser regulerer bruken av EquipRegistry-plattformen, nettstedet, offentlige verifiseringsverktoy, registreringstjenester, digitale assetpass og relaterte fremtidige tjenester.",
    companyTitle: "Tjenesteleverandor",
    companyLines,
    sections: [
      {
        title: "1. Generell informasjon",
        body: [
          "EquipRegistry er en digital registerplattform for identifiserbare assets som kjoretoy, maskiner, utstyr, sykler, e-bikes, elektriske sparkesykler, tilhengere, industrielle assets, batterier, solrelaterte assets og annen identifiserbar eiendom.",
          "Plattformen kan omfatte offentlig verifisering, digitale pass, eierdashbord, registreringsworkflows, partnerverktoy og fremtidige integrasjoner.",
        ],
      },
      {
        title: "2. Tjenestens natur",
        body: [
          "EquipRegistry fungerer som et register- og verifiseringslag og garanterer ikke automatisk lovlig eierskap, lovlig opprinnelse, omsettelighet eller fravaer av heftelser med mindre dette uttrykkelig bekreftes etter gjennomgang.",
          "Statuser og poster bygger pa informasjonen, dokumentene, erklaeringene og valideringene som er tilgjengelige pa tidspunktet for gjennomgangen.",
        ],
      },
      {
        title: "3. Brukeransvar",
        body: [
          "Brukere, sokere, eiere og partnere ma oppgi fullstendig, korrekt, oppdatert og sannferdig informasjon.",
          "Det er strengt forbudt a sende inn falske, manipulerte, villedende, stjalne eller uautoriserte dokumenter, krav, serienumre, fakturaer eller identitetsopplysninger.",
        ],
      },
      {
        title: "4. Registrering og gjennomgang",
        body: [
          "Innsending av en registreringsforesporsel garanterer ikke godkjenning, verifisering eller utstedelse av pass.",
          "EquipRegistry kan be om ytterligere dokumentasjon, avvise eller suspendere soknader, endre statuser eller sette en post under gjennomgang nar det er nodvendig.",
        ],
      },
      {
        title: "5. Assetstatuser",
        body: [
          "Assets pa plattformen kan vise statuser som Registered & Verified, History Unknown, Stolen / Red Flag, Verification Expired eller Not Registered.",
          "Disse statusene er informative innenfor plattformens kontekst og kan endres nar ny informasjon blir tilgjengelig.",
        ],
      },
      {
        title: "6. Tyverirapporter og motstridende krav",
        body: [
          "EquipRegistry kan kreve en politirapport eller sammenlignbar offisiell dokumentasjon for en status knyttet til tyveri eller red flag tildeles eller opprettholdes.",
          "Ved motstridende krav om eierskap eller tyveri kan EquipRegistry begrense synlighet, suspendere en post eller be om ytterligere verifisering.",
        ],
      },
      {
        title: "7. Offentlig verifisering og begrenset tilgang",
        body: [
          "Offentlige sokeresultater og offentlige passvisninger er ment a forbedre transparens og gjenkjennelse av et asset, men de erstatter ikke juridisk due diligence, politikontroller, tittelverifisering eller finansielle kontroller.",
          "Noe informasjon kan forbli begrenset, maskert eller bare tilgjengelig for autoriserte brukere, eiere eller godkjente partnere.",
        ],
      },
      {
        title: "8. Endringer i eierskap og dataenes aktualitet",
        body: [
          "Brukere er ansvarlige for a oppdatere endringer i eierskap, gjenfinning etter tyveri, salg, eksport eller andre relevante statusendringer.",
          "EquipRegistry kan innfore paminnelser, fornyelseskrav, flyter for eierskapsoverforing eller automatiske statusoppdateringer som Verification Expired.",
        ],
      },
      {
        title: "9. Betalinger og gebyrer",
        body: [
          "Visse tjenester kan vaere underlagt registreringsgebyrer, valideringsgebyrer, fornyelsesgebyrer, gebyrer for partnertilgang eller andre transaksjonsrelaterte kostnader.",
          "En innsendt registreringsreferanse kan bli den permanente pass- eller registerreferansen som er knyttet til assetet i EquipRegistry-systemet.",
        ],
      },
      {
        title: "10. Svindel, misbruk og feil bruk",
        body: [
          "Plattformen ma ikke brukes til svindel, misbruk av identitet, dokumentmanipulasjon, tyverirelatert misbruk, ulovlig atferd eller forsok pa uautorisert tilgang.",
          "EquipRegistry forbeholder seg retten til a suspendere tilgang, fjerne poster og samarbeide med relevante myndigheter der misbruk mistenkes.",
        ],
      },
      {
        title: "11. Immaterielle rettigheter",
        body: [
          "Navnet EquipRegistry, branding, plattformkonseptet, passlayouten, databasestrukturen, tekstene og innholdet pa nettstedet er beskyttet av gjeldende lovgivning om immaterielle rettigheter.",
          "Ingen del av plattformen ma kopieres, reproduseres, reverse-engineeres, videreselges eller kommersielt utnyttes uten skriftlig forhandstillatelse.",
        ],
      },
      {
        title: "12. Ansvarsbegrensning",
        body: [
          "EquipRegistry er ikke ansvarlig for indirekte tap, tapt fortjeneste, tapte transaksjoner, omdommeskade, tyveri, svindel, eierskapstvister, finansieringstvister eller tillit til ufullstendig, utdatert, brukerinnsendt eller tredjepartsinformasjon.",
          "Bruk av plattformen skjer pa brukerens egen risiko. Brukere er fortsatt ansvarlige for egne kontroller, beslutninger og juridisk due diligence.",
        ],
      },
      {
        title: "13. Tredjepartstjenester",
        body: [
          "EquipRegistry kan vaere avhengig av tredjepartstjenester for hosting, betalinger, analyse, kommunikasjon, infrastruktur eller andre tekniske funksjoner.",
          "EquipRegistry er ikke ansvarlig for avbrudd, forsinkelser eller feil som skyldes tredjepartsleverandorer.",
        ],
      },
      {
        title: "14. Fremtidige tjenester",
        body: [
          "EquipRegistry kan utvides med API-tilgang, verktoy for forsikrere, bank- eller finanskontroller, utleiedashbord, QR-verifisering, eksport- og logistikkverktoy, varsler, analyse, klistremerker, etiketter og andre verifiseringslag.",
          "Nye tjenester kan vaere underlagt ytterligere vilkar eller kommersielle avtaler.",
        ],
      },
      {
        title: "15. Endringer i disse vilkarene",
        body: [
          "EquipRegistry kan oppdatere disse vilkarene og betingelsene fra tid til annen for a gjenspeile juridiske, tekniske, operative eller kommersielle utviklinger.",
          "Den nyeste versjonen som publiseres pa nettstedet gjelder fra publiseringsdatoen med mindre noe annet er oppgitt.",
        ],
      },
      {
        title: "16. Gjeldende lov og jurisdiksjon",
        body: [
          "Disse vilkarene og betingelsene er underlagt spansk lov.",
          "Eventuelle tvister knyttet til bruken av EquipRegistry skal bringes inn for kompetente domstoler i Spania, med mindre ufravikelig lov krever noe annet.",
        ],
      },
    ],
    lastUpdated: "Sist oppdatert: 4. april 2026",
  },
};
