import type { Lang } from "@/lib/i18n/config";

export type DisclaimerContent = {
  title: string;
  intro: string;
  operatorTitle: string;
  sections: {
    general: {
      title: string;
      body: string[];
    };
    noGuarantee: {
      title: string;
      body: string[];
    };
    userResponsibility: {
      title: string;
      body: string[];
    };
    thirdParties: {
      title: string;
      body: string[];
    };
    stolenReports: {
      title: string;
      body: string[];
    };
    availability: {
      title: string;
      body: string[];
    };
    futureServices: {
      title: string;
      body: string[];
    };
    liability: {
      title: string;
      body: string[];
    };
    contact: {
      title: string;
      body: string[];
    };
  };
  closing: string;
};

export const disclaimerContent: Record<Lang, DisclaimerContent> = {
  en: {
    title: "Disclaimer",
    intro:
      "This Disclaimer applies to the use of the EquipRegistry website, services, public verification pages, digital passports, registration requests, and related information made available through the platform.",
    operatorTitle: "Operated by",
    sections: {
      general: {
        title: "1. General information",
        body: [
          "EquipRegistry aims to provide a digital registration, verification, and status information platform for equipment, vehicles, trailers, bicycles, e-bikes, electric scooters, machinery, tools, industrial assets, energy-related assets, and other eligible property.",
          "All information on this website is provided for general informational purposes only.",
          "Although EquipRegistry aims to present information carefully and keep the platform as accurate and useful as possible, no guarantee is given that all information is complete, accurate, current, or free from errors.",
        ],
      },
      noGuarantee: {
        title: "2. No legal ownership guarantee",
        body: [
          "EquipRegistry is not a government authority, public registry, police authority, insurer, notary, or official title office.",
          "A registration, passport, search result, verification result, status label, case reference, uploaded document, or account entry on EquipRegistry does not in itself constitute definitive legal proof of ownership, possession, title, origin, or freedom from encumbrances.",
          "Users, buyers, sellers, insurers, rental companies, banks, authorities, and other third parties must always carry out their own legal, commercial, and factual checks.",
        ],
      },
      userResponsibility: {
        title: "3. User responsibility",
        body: [
          "The user is solely responsible for all information, documents, claims, and data submitted to EquipRegistry.",
          "By submitting information, the user represents that they are entitled to provide it and that it is not false, misleading, fraudulent, unlawful, or infringing on the rights of others.",
          "EquipRegistry may suspend, refuse, remove, or flag registrations, accounts, reports, or documents where misuse, inconsistencies, risk indicators, or suspected fraud are identified.",
        ],
      },
      thirdParties: {
        title: "4. Use by third parties",
        body: [
          "Third parties, including insurers, finance providers, rental companies, dealers, logistics parties, and authorities, may consult information made available through EquipRegistry.",
          "EquipRegistry does not guarantee that third parties will interpret, use, accept, reject, or rely on information in any particular way.",
          "Any decisions made by third parties remain their own responsibility.",
        ],
      },
      stolenReports: {
        title: "5. Stolen reports and red flags",
        body: [
          "Stolen status indicators, red flags, warning notices, case references, and similar alerts may be based on submitted reports, documentation, internal review, partner information, or future integrated reporting flows.",
          "Such indicators may be provisional, under review, disputed, updated, limited, or removed if new information becomes available.",
          "EquipRegistry does not replace police records, court decisions, insurance determinations, or official criminal or civil procedures.",
        ],
      },
      availability: {
        title: "6. Availability and continuity",
        body: [
          "EquipRegistry does not guarantee uninterrupted availability, continuous uptime, or error-free operation of the website or any part of the service.",
          "Pages, features, statuses, account access, and verification results may be modified, limited, suspended, or withdrawn at any time.",
        ],
      },
      futureServices: {
        title: "7. Future services and developments",
        body: [
          "EquipRegistry may in the future introduce additional services, including but not limited to payment integrations, partner access layers, insurer flows, ownership transfer flows, reminders, expiration logic, validation renewals, API connections, dashboard tools, and other verification or monitoring functions.",
          "Such future services may be subject to separate terms, technical limitations, jurisdictional restrictions, operational requirements, and additional review procedures.",
        ],
      },
      liability: {
        title: "8. Limitation of liability",
        body: [
          "To the maximum extent permitted by applicable law, EquipRegistry and its operator shall not be liable for direct, indirect, incidental, consequential, commercial, reputational, legal, or financial loss arising from use of, inability to use, reliance on, or interpretation of the platform or any information made available through it.",
          "Use of EquipRegistry is at the user's own risk.",
        ],
      },
      contact: {
        title: "9. Contact details",
        body: [
          "For questions regarding this Disclaimer or the platform, you may contact EquipRegistry using the details below.",
        ],
      },
    },
    closing:
      "This Disclaimer may be updated from time to time as EquipRegistry develops further, including future commercial, technical, and legal expansion of the platform.",
  },

  es: {
    title: "Aviso legal",
    intro:
      "Este Aviso legal se aplica al uso del sitio web de EquipRegistry, sus servicios, páginas públicas de verificación, pasaportes digitales, solicitudes de registro e información relacionada disponible a través de la plataforma.",
    operatorTitle: "Operado por",
    sections: {
      general: {
        title: "1. Información general",
        body: [
          "EquipRegistry tiene como objetivo ofrecer una plataforma digital de registro, verificación e información de estado para equipos, vehículos, remolques, bicicletas, bicicletas eléctricas, patinetes eléctricos, maquinaria, herramientas, activos industriales, activos relacionados con energía y otros bienes elegibles.",
          "Toda la información de este sitio web se proporciona únicamente con fines informativos generales.",
          "Aunque EquipRegistry procura presentar la información con cuidado y mantener la plataforma lo más exacta y útil posible, no se garantiza que toda la información sea completa, exacta, actual, o esté libre de errores.",
        ],
      },
      noGuarantee: {
        title: "2. Sin garantía legal de propiedad",
        body: [
          "EquipRegistry no es una autoridad gubernamental, registro público, autoridad policial, aseguradora, notario ni oficina oficial de titularidad.",
          "Un registro, pasaporte, resultado de búsqueda, resultado de verificación, etiqueta de estado, referencia de caso, documento cargado o entrada de cuenta en EquipRegistry no constituye por sí mismo una prueba legal definitiva de propiedad, posesión, titularidad, origen o ausencia de cargas.",
          "Los usuarios, compradores, vendedores, aseguradoras, empresas de alquiler, bancos, autoridades y otros terceros deben realizar siempre sus propias comprobaciones legales, comerciales y fácticas.",
        ],
      },
      userResponsibility: {
        title: "3. Responsabilidad del usuario",
        body: [
          "El usuario es el único responsable de toda la información, documentos, declaraciones y datos enviados a EquipRegistry.",
          "Al enviar información, el usuario declara que tiene derecho a facilitarla y que no es falsa, engañosa, fraudulenta, ilícita ni vulnera derechos de terceros.",
          "EquipRegistry podrá suspender, rechazar, eliminar o marcar registros, cuentas, reportes o documentos cuando se detecte uso indebido, inconsistencias, indicadores de riesgo o sospecha de fraude.",
        ],
      },
      thirdParties: {
        title: "4. Uso por terceros",
        body: [
          "Terceros, incluidas aseguradoras, entidades financieras, empresas de alquiler, distribuidores, operadores logísticos y autoridades, pueden consultar la información disponible a través de EquipRegistry.",
          "EquipRegistry no garantiza que terceros vayan a interpretar, utilizar, aceptar, rechazar o basarse en la información de una manera determinada.",
          "Cualquier decisión tomada por terceros sigue siendo responsabilidad exclusiva de dichos terceros.",
        ],
      },
      stolenReports: {
        title: "5. Reportes de robo y alertas",
        body: [
          "Los indicadores de robo, alertas rojas, avisos de advertencia, referencias de caso y alertas similares pueden basarse en reportes enviados, documentación, revisión interna, información de socios o futuros flujos de reporte integrados.",
          "Dichos indicadores pueden ser provisionales, estar en revisión, ser discutidos, actualizados, limitados o eliminados si aparece nueva información.",
          "EquipRegistry no sustituye registros policiales, resoluciones judiciales, decisiones de aseguradoras ni procedimientos penales o civiles oficiales.",
        ],
      },
      availability: {
        title: "6. Disponibilidad y continuidad",
        body: [
          "EquipRegistry no garantiza disponibilidad ininterrumpida, funcionamiento continuo ni ausencia de errores en el sitio web o en cualquier parte del servicio.",
          "Las páginas, funciones, estados, accesos de cuenta y resultados de verificación pueden modificarse, limitarse, suspenderse o retirarse en cualquier momento.",
        ],
      },
      futureServices: {
        title: "7. Servicios y desarrollos futuros",
        body: [
          "EquipRegistry podrá introducir en el futuro servicios adicionales, incluidos, entre otros, integraciones de pago, niveles de acceso para socios, flujos para aseguradoras, flujos de transferencia de propiedad, recordatorios, lógica de caducidad, renovaciones de validación, conexiones API, herramientas de panel y otras funciones de verificación o supervisión.",
          "Dichos servicios futuros podrán estar sujetos a condiciones separadas, limitaciones técnicas, restricciones jurisdiccionales, requisitos operativos y procedimientos adicionales de revisión.",
        ],
      },
      liability: {
        title: "8. Limitación de responsabilidad",
        body: [
          "En la máxima medida permitida por la ley aplicable, EquipRegistry y su operador no serán responsables de pérdidas directas, indirectas, incidentales, consecuenciales, comerciales, reputacionales, legales o financieras derivadas del uso, de la imposibilidad de uso, de la confianza depositada en la plataforma o de la interpretación de la misma o de cualquier información disponible a través de ella.",
          "El uso de EquipRegistry se realiza por cuenta y riesgo del usuario.",
        ],
      },
      contact: {
        title: "9. Datos de contacto",
        body: [
          "Para preguntas sobre este Aviso legal o sobre la plataforma, puede ponerse en contacto con EquipRegistry mediante los datos que figuran a continuación.",
        ],
      },
    },
    closing:
      "Este Aviso legal podrá actualizarse periódicamente a medida que EquipRegistry continúe desarrollándose, incluida la futura expansión comercial, técnica y legal de la plataforma.",
  },

  nl: {
    title: "Disclaimer",
    intro:
      "Deze disclaimer is van toepassing op het gebruik van de EquipRegistry-website, diensten, openbare verificatiepagina’s, digitale paspoorten, registratieaanvragen en alle gerelateerde informatie die via het platform beschikbaar wordt gesteld.",
    operatorTitle: "Beheerd door",
    sections: {
      general: {
        title: "1. Algemene informatie",
        body: [
          "EquipRegistry heeft als doel een digitaal registratie-, verificatie- en statusplatform te bieden voor materieel, voertuigen, aanhangwagens, fietsen, e-bikes, elektrische steps, machines, gereedschappen, industriële activa, energiegerelateerde activa en andere toegestane eigendommen.",
          "Alle informatie op deze website wordt uitsluitend verstrekt voor algemene informatiedoeleinden.",
          "Hoewel EquipRegistry zich inspant om informatie zorgvuldig te presenteren en het platform zo correct en bruikbaar mogelijk te houden, wordt niet gegarandeerd dat alle informatie volledig, juist, actueel of foutloos is.",
        ],
      },
      noGuarantee: {
        title: "2. Geen juridische eigendomsgarantie",
        body: [
          "EquipRegistry is geen overheidsinstantie, openbaar register, politieautoriteit, verzekeraar, notaris of officiële eigendomskantoor.",
          "Een registratie, paspoort, zoekresultaat, verificatieresultaat, statuslabel, dossierreferentie, geüpload document of accountvermelding op EquipRegistry vormt op zichzelf geen definitief juridisch bewijs van eigendom, bezit, titel, herkomst of lasten-vrijheid.",
          "Gebruikers, kopers, verkopers, verzekeraars, verhuurbedrijven, banken, autoriteiten en andere derden moeten altijd hun eigen juridische, commerciële en feitelijke controles uitvoeren.",
        ],
      },
      userResponsibility: {
        title: "3. Verantwoordelijkheid van de gebruiker",
        body: [
          "De gebruiker is als enige verantwoordelijk voor alle informatie, documenten, verklaringen en gegevens die aan EquipRegistry worden verstrekt.",
          "Door informatie in te dienen verklaart de gebruiker dat hij of zij gerechtigd is deze te verstrekken en dat deze niet vals, misleidend, frauduleus, onrechtmatig of in strijd met rechten van derden is.",
          "EquipRegistry kan registraties, accounts, meldingen of documenten opschorten, weigeren, verwijderen of markeren wanneer misbruik, inconsistenties, risico-indicatoren of vermoedens van fraude worden vastgesteld.",
        ],
      },
      thirdParties: {
        title: "4. Gebruik door derden",
        body: [
          "Derden, waaronder verzekeraars, financiers, verhuurbedrijven, dealers, logistieke partijen en autoriteiten, kunnen informatie raadplegen die via EquipRegistry beschikbaar wordt gesteld.",
          "EquipRegistry garandeert niet dat derden informatie op een bepaalde manier zullen interpreteren, gebruiken, accepteren, afwijzen of daarop zullen vertrouwen.",
          "Beslissingen van derden blijven volledig hun eigen verantwoordelijkheid.",
        ],
      },
      stolenReports: {
        title: "5. Diefstalmeldingen en rode vlaggen",
        body: [
          "Diefstalstatussen, red flags, waarschuwingen, dossierreferenties en vergelijkbare signalen kunnen gebaseerd zijn op ingediende meldingen, documentatie, interne beoordeling, partnerinformatie of toekomstige geïntegreerde meldstromen.",
          "Dergelijke signalen kunnen voorlopig zijn, in onderzoek staan, worden betwist, worden bijgewerkt, beperkt of verwijderd wanneer nieuwe informatie beschikbaar komt.",
          "EquipRegistry vervangt geen politiedossiers, rechterlijke uitspraken, verzekeringsbesluiten of officiële strafrechtelijke of civielrechtelijke procedures.",
        ],
      },
      availability: {
        title: "6. Beschikbaarheid en continuïteit",
        body: [
          "EquipRegistry garandeert geen ononderbroken beschikbaarheid, continue uptime of foutloze werking van de website of enig onderdeel van de dienst.",
          "Pagina’s, functies, statussen, accounttoegang en verificatieresultaten kunnen op elk moment worden gewijzigd, beperkt, opgeschort of ingetrokken.",
        ],
      },
      futureServices: {
        title: "7. Toekomstige diensten en ontwikkelingen",
        body: [
          "EquipRegistry kan in de toekomst aanvullende diensten introduceren, waaronder maar niet beperkt tot betaalintegraties, partnertoegangslagen, verzekeraarsflows, eigendomsoverdrachtsflows, herinneringen, vervallogica, validatieverlengingen, API-koppelingen, dashboardtools en andere verificatie- of monitoringsfuncties.",
          "Dergelijke toekomstige diensten kunnen onderworpen zijn aan afzonderlijke voorwaarden, technische beperkingen, jurisdictiebeperkingen, operationele vereisten en aanvullende beoordelingsprocedures.",
        ],
      },
      liability: {
        title: "8. Beperking van aansprakelijkheid",
        body: [
          "Voor zover maximaal toegestaan onder toepasselijk recht zijn EquipRegistry en de exploitant niet aansprakelijk voor directe, indirecte, incidentele, gevolg-, commerciële, reputatie-, juridische of financiële schade die voortvloeit uit het gebruik van, het niet kunnen gebruiken van, het vertrouwen op of de interpretatie van het platform of informatie die via het platform beschikbaar wordt gesteld.",
          "Gebruik van EquipRegistry is volledig op eigen risico.",
        ],
      },
      contact: {
        title: "9. Contactgegevens",
        body: [
          "Voor vragen over deze disclaimer of over het platform kunt u contact opnemen met EquipRegistry via onderstaande gegevens.",
        ],
      },
    },
    closing:
      "Deze disclaimer kan van tijd tot tijd worden bijgewerkt naarmate EquipRegistry zich verder ontwikkelt, inclusief toekomstige commerciële, technische en juridische uitbreiding van het platform.",
  },

  de: {
    title: "Haftungsausschluss",
    intro:
      "Dieser Haftungsausschluss gilt für die Nutzung der EquipRegistry-Website, der Dienste, der öffentlichen Verifizierungsseiten, der digitalen Pässe, der Registrierungsanfragen und aller damit verbundenen Informationen, die über die Plattform bereitgestellt werden.",
    operatorTitle: "Betrieben von",
    sections: {
      general: {
        title: "1. Allgemeine Informationen",
        body: [
          "EquipRegistry soll eine digitale Plattform für Registrierung, Verifizierung und Statusinformationen für Ausrüstung, Fahrzeuge, Anhänger, Fahrräder, E-Bikes, E-Scooter, Maschinen, Werkzeuge, industrielle Vermögenswerte, energiebezogene Vermögenswerte und andere zulässige Güter bereitstellen.",
          "Alle Informationen auf dieser Website dienen ausschließlich allgemeinen Informationszwecken.",
          "Obwohl EquipRegistry bemüht ist, Informationen sorgfältig darzustellen und die Plattform so genau und nützlich wie möglich zu halten, wird keine Gewähr dafür übernommen, dass alle Informationen vollständig, richtig, aktuell oder fehlerfrei sind.",
        ],
      },
      noGuarantee: {
        title: "2. Keine rechtliche Eigentumsgarantie",
        body: [
          "EquipRegistry ist keine Behörde, kein öffentliches Register, keine Polizeibehörde, kein Versicherer, kein Notar und keine amtliche Eigentumsstelle.",
          "Eine Registrierung, ein Pass, ein Suchergebnis, ein Verifizierungsergebnis, ein Statuskennzeichen, eine Fallreferenz, ein hochgeladenes Dokument oder ein Kontoeintrag bei EquipRegistry stellt für sich genommen keinen endgültigen rechtlichen Nachweis von Eigentum, Besitz, Titel, Herkunft oder Lastenfreiheit dar.",
          "Nutzer, Käufer, Verkäufer, Versicherer, Vermietungsunternehmen, Banken, Behörden und andere Dritte müssen stets eigene rechtliche, geschäftliche und tatsächliche Prüfungen durchführen.",
        ],
      },
      userResponsibility: {
        title: "3. Verantwortung des Nutzers",
        body: [
          "Der Nutzer ist allein verantwortlich für alle Informationen, Dokumente, Angaben und Daten, die an EquipRegistry übermittelt werden.",
          "Mit der Übermittlung von Informationen erklärt der Nutzer, dass er berechtigt ist, diese bereitzustellen, und dass sie nicht falsch, irreführend, betrügerisch, rechtswidrig oder rechtsverletzend sind.",
          "EquipRegistry kann Registrierungen, Konten, Meldungen oder Dokumente aussetzen, ablehnen, entfernen oder kennzeichnen, wenn Missbrauch, Unstimmigkeiten, Risikohinweise oder ein Betrugsverdacht festgestellt werden.",
        ],
      },
      thirdParties: {
        title: "4. Nutzung durch Dritte",
        body: [
          "Dritte, darunter Versicherer, Finanzierer, Vermietungsunternehmen, Händler, Logistikparteien und Behörden, können Informationen einsehen, die über EquipRegistry verfügbar gemacht werden.",
          "EquipRegistry garantiert nicht, dass Dritte Informationen in einer bestimmten Weise interpretieren, verwenden, akzeptieren, ablehnen oder darauf vertrauen werden.",
          "Alle Entscheidungen Dritter liegen in deren eigener Verantwortung.",
        ],
      },
      stolenReports: {
        title: "5. Diebstahlmeldungen und Warnhinweise",
        body: [
          "Diebstahlstatus, Red Flags, Warnhinweise, Fallreferenzen und ähnliche Hinweise können auf eingereichten Meldungen, Unterlagen, interner Prüfung, Partnerinformationen oder zukünftigen integrierten Meldeabläufen beruhen.",
          "Solche Hinweise können vorläufig sein, geprüft werden, angefochten, aktualisiert, eingeschränkt oder entfernt werden, wenn neue Informationen verfügbar werden.",
          "EquipRegistry ersetzt keine Polizeiregister, Gerichtsentscheidungen, Versicherungsentscheidungen oder offiziellen straf- oder zivilrechtlichen Verfahren.",
        ],
      },
      availability: {
        title: "6. Verfügbarkeit und Kontinuität",
        body: [
          "EquipRegistry garantiert keine ununterbrochene Verfügbarkeit, keine ständige Erreichbarkeit und keinen fehlerfreien Betrieb der Website oder eines Teils des Dienstes.",
          "Seiten, Funktionen, Statusangaben, Kontozugänge und Verifizierungsergebnisse können jederzeit geändert, eingeschränkt, ausgesetzt oder eingestellt werden.",
        ],
      },
      futureServices: {
        title: "7. Zukünftige Dienste und Entwicklungen",
        body: [
          "EquipRegistry kann künftig zusätzliche Dienste einführen, insbesondere Zahlungsintegrationen, Partnerzugangsebenen, Versicherer-Workflows, Eigentumsübertragungsprozesse, Erinnerungen, Ablaufmechanismen, Verlängerungen von Validierungen, API-Verbindungen, Dashboard-Tools und weitere Verifizierungs- oder Überwachungsfunktionen.",
          "Solche zukünftigen Dienste können gesonderten Bedingungen, technischen Beschränkungen, territorialen Einschränkungen, betrieblichen Anforderungen und zusätzlichen Prüfverfahren unterliegen.",
        ],
      },
      liability: {
        title: "8. Haftungsbeschränkung",
        body: [
          "Soweit nach anwendbarem Recht zulässig, haften EquipRegistry und dessen Betreiber nicht für direkte, indirekte, zufällige, Folge-, wirtschaftliche, Reputations-, rechtliche oder finanzielle Schäden, die sich aus der Nutzung, der Unmöglichkeit der Nutzung, dem Vertrauen auf oder der Auslegung der Plattform oder der darüber bereitgestellten Informationen ergeben.",
          "Die Nutzung von EquipRegistry erfolgt auf eigenes Risiko.",
        ],
      },
      contact: {
        title: "9. Kontaktdaten",
        body: [
          "Bei Fragen zu diesem Haftungsausschluss oder zur Plattform können Sie EquipRegistry unter den unten angegebenen Kontaktdaten erreichen.",
        ],
      },
    },
    closing:
      "Dieser Haftungsausschluss kann von Zeit zu Zeit aktualisiert werden, während EquipRegistry weiterentwickelt wird, einschließlich einer zukünftigen kommerziellen, technischen und rechtlichen Erweiterung der Plattform.",
  },

  fr: {
    title: "Avertissement",
    intro:
      "Le présent avertissement s'applique à l'utilisation du site web EquipRegistry, de ses services, de ses pages publiques de vérification, de ses passeports numériques, de ses demandes d'enregistrement et de toutes les informations associées mises à disposition via la plateforme.",
    operatorTitle: "Exploité par",
    sections: {
      general: {
        title: "1. Informations générales",
        body: [
          "EquipRegistry a pour objectif de fournir une plateforme numérique d'enregistrement, de vérification et d'information de statut pour les équipements, véhicules, remorques, vélos, vélos électriques, trottinettes électriques, machines, outils, actifs industriels, actifs liés à l'énergie et autres biens éligibles.",
          "Toutes les informations figurant sur ce site sont fournies à titre d'information générale uniquement.",
          "Bien qu'EquipRegistry s'efforce de présenter les informations avec soin et de maintenir la plateforme aussi précise et utile que possible, aucune garantie n'est donnée quant au caractère complet, exact, actuel ou exempt d'erreurs de toutes les informations.",
        ],
      },
      noGuarantee: {
        title: "2. Absence de garantie légale de propriété",
        body: [
          "EquipRegistry n'est ni une autorité publique, ni un registre public, ni une autorité de police, ni un assureur, ni un notaire, ni un bureau officiel des titres.",
          "Un enregistrement, un passeport, un résultat de recherche, un résultat de vérification, un libellé de statut, une référence de dossier, un document téléchargé ou une entrée de compte sur EquipRegistry ne constitue pas, à lui seul, une preuve juridique définitive de propriété, de possession, de titre, d'origine ou d'absence de charges.",
          "Les utilisateurs, acheteurs, vendeurs, assureurs, sociétés de location, banques, autorités et autres tiers doivent toujours effectuer leurs propres vérifications juridiques, commerciales et factuelles.",
        ],
      },
      userResponsibility: {
        title: "3. Responsabilité de l'utilisateur",
        body: [
          "L'utilisateur est seul responsable de toutes les informations, documents, déclarations et données soumis à EquipRegistry.",
          "En soumettant des informations, l'utilisateur déclare qu'il est autorisé à les fournir et qu'elles ne sont ni fausses, ni trompeuses, ni frauduleuses, ni illicites, ni contraires aux droits de tiers.",
          "EquipRegistry peut suspendre, refuser, supprimer ou signaler des enregistrements, comptes, signalements ou documents en cas de mauvaise utilisation, d'incohérences, d'indicateurs de risque ou de suspicion de fraude.",
        ],
      },
      thirdParties: {
        title: "4. Utilisation par des tiers",
        body: [
          "Des tiers, y compris des assureurs, financeurs, sociétés de location, distributeurs, acteurs logistiques et autorités, peuvent consulter les informations mises à disposition via EquipRegistry.",
          "EquipRegistry ne garantit pas que les tiers interpréteront, utiliseront, accepteront, rejetteront ou se fonderont sur ces informations d'une manière déterminée.",
          "Toute décision prise par des tiers relève de leur seule responsabilité.",
        ],
      },
      stolenReports: {
        title: "5. Signalements de vol et alertes",
        body: [
          "Les indicateurs de vol, alertes rouges, avertissements, références de dossier et signaux similaires peuvent être fondés sur des signalements soumis, des documents, un examen interne, des informations de partenaires ou de futurs flux intégrés de signalement.",
          "Ces indicateurs peuvent être provisoires, en cours d'examen, contestés, mis à jour, limités ou supprimés si de nouvelles informations deviennent disponibles.",
          "EquipRegistry ne remplace pas les registres de police, les décisions de justice, les décisions d'assurance ni les procédures pénales ou civiles officielles.",
        ],
      },
      availability: {
        title: "6. Disponibilité et continuité",
        body: [
          "EquipRegistry ne garantit ni disponibilité ininterrompue, ni fonctionnement continu, ni absence d'erreurs du site web ou d'une quelconque partie du service.",
          "Les pages, fonctionnalités, statuts, accès aux comptes et résultats de vérification peuvent être modifiés, limités, suspendus ou retirés à tout moment.",
        ],
      },
      futureServices: {
        title: "7. Services et développements futurs",
        body: [
          "EquipRegistry pourra à l'avenir introduire des services supplémentaires, notamment des intégrations de paiement, des niveaux d'accès partenaires, des flux pour assureurs, des flux de transfert de propriété, des rappels, une logique d'expiration, des renouvellements de validation, des connexions API, des outils de tableau de bord et d'autres fonctions de vérification ou de surveillance.",
          "Ces futurs services pourront être soumis à des conditions distinctes, à des limitations techniques, à des restrictions juridictionnelles, à des exigences opérationnelles et à des procédures de contrôle supplémentaires.",
        ],
      },
      liability: {
        title: "8. Limitation de responsabilité",
        body: [
          "Dans toute la mesure permise par la loi applicable, EquipRegistry et son exploitant ne sauraient être tenus responsables des pertes directes, indirectes, accessoires, consécutives, commerciales, réputationnelles, juridiques ou financières résultant de l'utilisation, de l'impossibilité d'utilisation, de la confiance accordée à la plateforme ou de l'interprétation de celle-ci ou des informations mises à disposition par son intermédiaire.",
          "L'utilisation d'EquipRegistry se fait aux risques de l'utilisateur.",
        ],
      },
      contact: {
        title: "9. Coordonnées",
        body: [
          "Pour toute question concernant le présent avertissement ou la plateforme, vous pouvez contacter EquipRegistry aux coordonnées ci-dessous.",
        ],
      },
    },
    closing:
      "Le présent avertissement peut être mis à jour périodiquement à mesure qu'EquipRegistry poursuit son développement, y compris toute future expansion commerciale, technique et juridique de la plateforme.",
  },

  it: {
    title: "Disclaimer",
    intro:
      "Il presente Disclaimer si applica all'uso del sito web EquipRegistry, dei suoi servizi, delle pagine pubbliche di verifica, dei passaporti digitali, delle richieste di registrazione e di tutte le informazioni correlate rese disponibili tramite la piattaforma.",
    operatorTitle: "Gestito da",
    sections: {
      general: {
        title: "1. Informazioni generali",
        body: [
          "EquipRegistry mira a fornire una piattaforma digitale di registrazione, verifica e informazione sullo stato per attrezzature, veicoli, rimorchi, biciclette, e-bike, monopattini elettrici, macchinari, utensili, beni industriali, beni collegati all'energia e altri beni idonei.",
          "Tutte le informazioni presenti su questo sito web sono fornite esclusivamente a scopo informativo generale.",
          "Sebbene EquipRegistry cerchi di presentare le informazioni con cura e di mantenere la piattaforma il più accurata e utile possibile, non viene fornita alcuna garanzia che tutte le informazioni siano complete, accurate, aggiornate o prive di errori.",
        ],
      },
      noGuarantee: {
        title: "2. Nessuna garanzia legale di proprietà",
        body: [
          "EquipRegistry non è un'autorità governativa, un registro pubblico, un'autorità di polizia, un assicuratore, un notaio o un ufficio ufficiale dei titoli.",
          "Una registrazione, un passaporto, un risultato di ricerca, un risultato di verifica, un'etichetta di stato, un riferimento di caso, un documento caricato o una voce di account su EquipRegistry non costituiscono di per sé una prova legale definitiva di proprietà, possesso, titolo, origine o assenza di gravami.",
          "Utenti, acquirenti, venditori, assicuratori, società di noleggio, banche, autorità e altri terzi devono sempre effettuare le proprie verifiche legali, commerciali e fattuali.",
        ],
      },
      userResponsibility: {
        title: "3. Responsabilità dell'utente",
        body: [
          "L'utente è l'unico responsabile di tutte le informazioni, documenti, dichiarazioni e dati inviati a EquipRegistry.",
          "Inviando informazioni, l'utente dichiara di essere autorizzato a fornirle e che esse non sono false, fuorvianti, fraudolente, illecite o lesive di diritti altrui.",
          "EquipRegistry può sospendere, rifiutare, rimuovere o contrassegnare registrazioni, account, segnalazioni o documenti qualora vengano individuati abusi, incongruenze, indicatori di rischio o sospetti di frode.",
        ],
      },
      thirdParties: {
        title: "4. Utilizzo da parte di terzi",
        body: [
          "Terzi, inclusi assicuratori, finanziatori, società di noleggio, rivenditori, operatori logistici e autorità, possono consultare le informazioni rese disponibili tramite EquipRegistry.",
          "EquipRegistry non garantisce che i terzi interpreteranno, utilizzeranno, accetteranno, rifiuteranno o faranno affidamento sulle informazioni in un determinato modo.",
          "Qualsiasi decisione presa da terzi resta sotto la loro esclusiva responsabilità.",
        ],
      },
      stolenReports: {
        title: "5. Segnalazioni di furto e red flag",
        body: [
          "Gli indicatori di furto, le red flag, gli avvisi, i riferimenti di caso e segnali simili possono basarsi su segnalazioni inviate, documentazione, revisione interna, informazioni dei partner o futuri flussi integrati di segnalazione.",
          "Tali indicatori possono essere provvisori, in revisione, contestati, aggiornati, limitati o rimossi qualora diventino disponibili nuove informazioni.",
          "EquipRegistry non sostituisce registri di polizia, decisioni giudiziarie, decisioni assicurative o procedure penali o civili ufficiali.",
        ],
      },
      availability: {
        title: "6. Disponibilità e continuità",
        body: [
          "EquipRegistry non garantisce disponibilità ininterrotta, operatività continua o funzionamento privo di errori del sito web o di qualsiasi parte del servizio.",
          "Pagine, funzioni, stati, accessi agli account e risultati di verifica possono essere modificati, limitati, sospesi o ritirati in qualsiasi momento.",
        ],
      },
      futureServices: {
        title: "7. Servizi futuri e sviluppi",
        body: [
          "EquipRegistry potrà in futuro introdurre servizi aggiuntivi, inclusi, a titolo esemplificativo, integrazioni di pagamento, livelli di accesso per partner, flussi per assicuratori, flussi di trasferimento di proprietà, promemoria, logiche di scadenza, rinnovi di validazione, connessioni API, strumenti dashboard e altre funzioni di verifica o monitoraggio.",
          "Tali servizi futuri potranno essere soggetti a termini separati, limitazioni tecniche, restrizioni territoriali, requisiti operativi e procedure aggiuntive di revisione.",
        ],
      },
      liability: {
        title: "8. Limitazione di responsabilità",
        body: [
          "Nella misura massima consentita dalla legge applicabile, EquipRegistry e il suo gestore non saranno responsabili per perdite dirette, indirette, accidentali, consequenziali, commerciali, reputazionali, legali o finanziarie derivanti dall'uso, dall'impossibilità di utilizzo, dall'affidamento sulla piattaforma o dall'interpretazione della stessa o delle informazioni rese disponibili tramite essa.",
          "L'uso di EquipRegistry avviene a esclusivo rischio dell'utente.",
        ],
      },
      contact: {
        title: "9. Contatti",
        body: [
          "Per domande relative al presente Disclaimer o alla piattaforma, è possibile contattare EquipRegistry ai recapiti indicati di seguito.",
        ],
      },
    },
    closing:
      "Il presente Disclaimer può essere aggiornato di volta in volta man mano che EquipRegistry continuerà a svilupparsi, inclusa la futura espansione commerciale, tecnica e legale della piattaforma.",
  },

  pt: {
    title: "Isenção de responsabilidade",
    intro:
      "Esta Isenção de responsabilidade aplica-se ao uso do website da EquipRegistry, dos seus serviços, das páginas públicas de verificação, dos passaportes digitais, dos pedidos de registo e de todas as informações relacionadas disponibilizadas através da plataforma.",
    operatorTitle: "Operado por",
    sections: {
      general: {
        title: "1. Informações gerais",
        body: [
          "A EquipRegistry pretende fornecer uma plataforma digital de registo, verificação e informação de estado para equipamentos, veículos, reboques, bicicletas, bicicletas elétricas, trotinetes elétricas, máquinas, ferramentas, ativos industriais, ativos relacionados com energia e outros bens elegíveis.",
          "Toda a informação disponibilizada neste website é fornecida apenas para fins informativos gerais.",
          "Embora a EquipRegistry procure apresentar a informação com cuidado e manter a plataforma o mais exata e útil possível, não é dada qualquer garantia de que toda a informação seja completa, exata, atual ou isenta de erros.",
        ],
      },
      noGuarantee: {
        title: "2. Sem garantia legal de propriedade",
        body: [
          "A EquipRegistry não é uma autoridade governamental, registo público, autoridade policial, seguradora, notário ou entidade oficial de titularidade.",
          "Um registo, passaporte, resultado de pesquisa, resultado de verificação, etiqueta de estado, referência de caso, documento carregado ou entrada de conta na EquipRegistry não constitui, por si só, prova legal definitiva de propriedade, posse, titularidade, origem ou ausência de ónus.",
          "Utilizadores, compradores, vendedores, seguradoras, empresas de aluguer, bancos, autoridades e outros terceiros devem sempre realizar as suas próprias verificações legais, comerciais e factuais.",
        ],
      },
      userResponsibility: {
        title: "3. Responsabilidade do utilizador",
        body: [
          "O utilizador é o único responsável por todas as informações, documentos, declarações e dados submetidos à EquipRegistry.",
          "Ao submeter informações, o utilizador declara que tem o direito de as fornecer e que estas não são falsas, enganosas, fraudulentas, ilícitas nem violam direitos de terceiros.",
          "A EquipRegistry pode suspender, recusar, remover ou assinalar registos, contas, relatórios ou documentos sempre que sejam identificados abusos, inconsistências, indicadores de risco ou suspeitas de fraude.",
        ],
      },
      thirdParties: {
        title: "4. Utilização por terceiros",
        body: [
          "Terceiros, incluindo seguradoras, financiadores, empresas de aluguer, concessionários, operadores logísticos e autoridades, podem consultar informações disponibilizadas através da EquipRegistry.",
          "A EquipRegistry não garante que terceiros irão interpretar, utilizar, aceitar, rejeitar ou confiar na informação de uma forma específica.",
          "Quaisquer decisões tomadas por terceiros permanecem da sua exclusiva responsabilidade.",
        ],
      },
      stolenReports: {
        title: "5. Relatórios de roubo e alertas",
        body: [
          "Indicadores de roubo, alertas vermelhos, avisos, referências de caso e sinais semelhantes podem basear-se em relatórios submetidos, documentação, revisão interna, informação de parceiros ou futuros fluxos integrados de reporte.",
          "Tais indicadores podem ser provisórios, estar em revisão, ser contestados, atualizados, limitados ou removidos caso surja nova informação.",
          "A EquipRegistry não substitui registos policiais, decisões judiciais, decisões de seguradoras ou procedimentos criminais ou civis oficiais.",
        ],
      },
      availability: {
        title: "6. Disponibilidade e continuidade",
        body: [
          "A EquipRegistry não garante disponibilidade ininterrupta, funcionamento contínuo ou operação sem erros do website ou de qualquer parte do serviço.",
          "Páginas, funcionalidades, estados, acessos a contas e resultados de verificação podem ser modificados, limitados, suspensos ou retirados a qualquer momento.",
        ],
      },
      futureServices: {
        title: "7. Serviços futuros e desenvolvimentos",
        body: [
          "A EquipRegistry poderá no futuro introduzir serviços adicionais, incluindo, sem limitação, integrações de pagamento, níveis de acesso para parceiros, fluxos para seguradoras, fluxos de transferência de propriedade, lembretes, lógica de expiração, renovações de validação, ligações API, ferramentas de painel e outras funções de verificação ou monitorização.",
          "Esses serviços futuros poderão estar sujeitos a termos separados, limitações técnicas, restrições jurisdicionais, requisitos operacionais e procedimentos adicionais de revisão.",
        ],
      },
      liability: {
        title: "8. Limitação de responsabilidade",
        body: [
          "Na máxima medida permitida pela lei aplicável, a EquipRegistry e o seu operador não serão responsáveis por perdas diretas, indiretas, incidentais, consequenciais, comerciais, reputacionais, legais ou financeiras resultantes da utilização, da impossibilidade de utilização, da confiança depositada na plataforma ou da interpretação da mesma ou de qualquer informação disponibilizada através dela.",
          "A utilização da EquipRegistry é feita por conta e risco do utilizador.",
        ],
      },
      contact: {
        title: "9. Contactos",
        body: [
          "Para questões relativas a esta Isenção de responsabilidade ou à plataforma, pode contactar a EquipRegistry através dos dados abaixo.",
        ],
      },
    },
    closing:
      "Esta Isenção de responsabilidade poderá ser atualizada periodicamente à medida que a EquipRegistry continue a desenvolver-se, incluindo a futura expansão comercial, técnica e jurídica da plataforma.",
  },

  ru: {
    title: "Отказ от ответственности",
    intro:
      "Настоящий отказ от ответственности применяется к использованию сайта EquipRegistry, его сервисов, публичных страниц проверки, цифровых паспортов, заявок на регистрацию и всей связанной информации, доступной через платформу.",
    operatorTitle: "Управляется",
    sections: {
      general: {
        title: "1. Общая информация",
        body: [
          "EquipRegistry предназначен для предоставления цифровой платформы регистрации, проверки и отображения статуса для техники, транспортных средств, прицепов, велосипедов, электровелосипедов, электросамокатов, машин, инструментов, промышленных активов, энергетических активов и иного допустимого имущества.",
          "Вся информация на этом сайте предоставляется исключительно в общих информационных целях.",
          "Хотя EquipRegistry стремится представлять информацию максимально тщательно и поддерживать платформу как можно более точной и полезной, не гарантируется, что вся информация является полной, точной, актуальной и не содержит ошибок.",
        ],
      },
      noGuarantee: {
        title: "2. Отсутствие юридической гарантии права собственности",
        body: [
          "EquipRegistry не является государственным органом, публичным реестром, полицейским органом, страховщиком, нотариусом или официальным органом регистрации прав.",
          "Регистрация, паспорт, результат поиска, результат проверки, статусная метка, ссылка на дело, загруженный документ или запись аккаунта в EquipRegistry сами по себе не являются окончательным юридическим доказательством права собственности, владения, титула, происхождения или отсутствия обременений.",
          "Пользователи, покупатели, продавцы, страховщики, прокатные компании, банки, органы власти и иные третьи лица обязаны самостоятельно проводить собственные юридические, коммерческие и фактические проверки.",
        ],
      },
      userResponsibility: {
        title: "3. Ответственность пользователя",
        body: [
          "Пользователь несет исключительную ответственность за всю информацию, документы, заявления и данные, переданные в EquipRegistry.",
          "Передавая информацию, пользователь подтверждает, что имеет право ее предоставлять и что она не является ложной, вводящей в заблуждение, мошеннической, незаконной или нарушающей права третьих лиц.",
          "EquipRegistry может приостанавливать, отклонять, удалять или помечать регистрации, аккаунты, сообщения или документы при выявлении злоупотреблений, несоответствий, индикаторов риска или подозрений в мошенничестве.",
        ],
      },
      thirdParties: {
        title: "4. Использование третьими лицами",
        body: [
          "Третьи лица, включая страховщиков, финансовые организации, прокатные компании, дилеров, логистических операторов и органы власти, могут обращаться к информации, доступной через EquipRegistry.",
          "EquipRegistry не гарантирует, что третьи лица будут интерпретировать, использовать, принимать, отклонять или полагаться на такую информацию определенным образом.",
          "Любые решения, принимаемые третьими лицами, остаются в сфере их собственной ответственности.",
        ],
      },
      stolenReports: {
        title: "5. Сообщения о краже и сигналы риска",
        body: [
          "Статусы кражи, красные флаги, предупреждения, ссылки на дела и аналогичные сигналы могут основываться на отправленных сообщениях, документации, внутренней проверке, информации партнеров или будущих интегрированных потоках сообщений.",
          "Такие сигналы могут быть предварительными, находиться на проверке, быть оспорены, обновлены, ограничены или удалены при появлении новой информации.",
          "EquipRegistry не заменяет полицейские реестры, судебные решения, решения страховых компаний или официальные уголовные и гражданские процедуры.",
        ],
      },
      availability: {
        title: "6. Доступность и непрерывность",
        body: [
          "EquipRegistry не гарантирует бесперебойную доступность, постоянную работу или отсутствие ошибок на сайте или в любой части сервиса.",
          "Страницы, функции, статусы, доступ к аккаунтам и результаты проверки могут быть изменены, ограничены, приостановлены или удалены в любое время.",
        ],
      },
      futureServices: {
        title: "7. Будущие сервисы и развитие",
        body: [
          "В будущем EquipRegistry может вводить дополнительные сервисы, включая, помимо прочего, платежные интеграции, уровни доступа для партнеров, процессы для страховщиков, процессы передачи собственности, напоминания, логику истечения сроков, продление валидации, API-подключения, инструменты панели управления и другие функции проверки или мониторинга.",
          "Такие будущие сервисы могут подпадать под отдельные условия, технические ограничения, юрисдикционные ограничения, операционные требования и дополнительные процедуры проверки.",
        ],
      },
      liability: {
        title: "8. Ограничение ответственности",
        body: [
          "В максимально допустимой применимым законодательством степени EquipRegistry и его оператор не несут ответственности за прямые, косвенные, случайные, последующие, коммерческие, репутационные, юридические или финансовые убытки, возникающие в связи с использованием, невозможностью использования, доверием к платформе или ее толкованием, а также любой информации, доступной через нее.",
          "Использование EquipRegistry осуществляется пользователем на свой собственный риск.",
        ],
      },
      contact: {
        title: "9. Контактные данные",
        body: [
          "По вопросам, связанным с данным отказом от ответственности или платформой, вы можете связаться с EquipRegistry по указанным ниже контактным данным.",
        ],
      },
    },
    closing:
      "Настоящий отказ от ответственности может периодически обновляться по мере дальнейшего развития EquipRegistry, включая будущую коммерческую, техническую и юридическую экспансию платформы.",
  },

  hi: {
    title: "अस्वीकरण",
    intro:
      "यह अस्वीकरण EquipRegistry वेबसाइट, उसकी सेवाओं, सार्वजनिक सत्यापन पृष्ठों, डिजिटल पासपोर्ट, पंजीकरण अनुरोधों और प्लेटफ़ॉर्म के माध्यम से उपलब्ध कराई गई संबंधित जानकारी के उपयोग पर लागू होता है।",
    operatorTitle: "संचालित द्वारा",
    sections: {
      general: {
        title: "1. सामान्य जानकारी",
        body: [
          "EquipRegistry का उद्देश्य उपकरणों, वाहनों, ट्रेलरों, साइकिलों, ई-बाइक, इलेक्ट्रिक स्कूटर, मशीनरी, औज़ारों, औद्योगिक परिसंपत्तियों, ऊर्जा-संबंधित परिसंपत्तियों और अन्य पात्र संपत्तियों के लिए एक डिजिटल पंजीकरण, सत्यापन और स्थिति सूचना प्लेटफ़ॉर्म प्रदान करना है।",
          "इस वेबसाइट पर उपलब्ध सभी जानकारी केवल सामान्य सूचना उद्देश्यों के लिए प्रदान की जाती है।",
          "हालाँकि EquipRegistry जानकारी को सावधानीपूर्वक प्रस्तुत करने और प्लेटफ़ॉर्म को यथासंभव सटीक और उपयोगी बनाए रखने का प्रयास करता है, फिर भी यह गारंटी नहीं दी जाती कि सभी जानकारी पूर्ण, सटीक, अद्यतन या त्रुटिरहित है।",
        ],
      },
      noGuarantee: {
        title: "2. स्वामित्व की कोई कानूनी गारंटी नहीं",
        body: [
          "EquipRegistry कोई सरकारी प्राधिकरण, सार्वजनिक रजिस्टर, पुलिस प्राधिकरण, बीमाकर्ता, नोटरी या आधिकारिक टाइटल कार्यालय नहीं है।",
          "EquipRegistry पर कोई पंजीकरण, पासपोर्ट, खोज परिणाम, सत्यापन परिणाम, स्थिति लेबल, केस संदर्भ, अपलोड किया गया दस्तावेज़ या खाता प्रविष्टि अपने आप में स्वामित्व, कब्ज़ा, शीर्षक, उत्पत्ति या बंधन-मुक्त स्थिति का अंतिम कानूनी प्रमाण नहीं है।",
          "उपयोगकर्ताओं, खरीदारों, विक्रेताओं, बीमाकर्ताओं, किराये की कंपनियों, बैंकों, प्राधिकरणों और अन्य तृतीय पक्षों को हमेशा अपनी कानूनी, व्यावसायिक और तथ्यात्मक जाँच स्वयं करनी होगी।",
        ],
      },
      userResponsibility: {
        title: "3. उपयोगकर्ता की ज़िम्मेदारी",
        body: [
          "EquipRegistry को प्रस्तुत की गई सभी जानकारी, दस्तावेज़ों, दावों और डेटा के लिए केवल उपयोगकर्ता ही ज़िम्मेदार है।",
          "जानकारी जमा करके उपयोगकर्ता यह घोषित करता है कि उसे इसे प्रदान करने का अधिकार है और यह झूठी, भ्रामक, धोखाधड़ीपूर्ण, अवैध या दूसरों के अधिकारों का उल्लंघन करने वाली नहीं है।",
          "यदि दुरुपयोग, असंगतियाँ, जोखिम संकेतक या धोखाधड़ी का संदेह पाया जाता है, तो EquipRegistry पंजीकरण, खाते, रिपोर्ट या दस्तावेज़ों को निलंबित, अस्वीकार, हटाने या चिह्नित करने का अधिकार रखता है।",
        ],
      },
      thirdParties: {
        title: "4. तृतीय पक्ष द्वारा उपयोग",
        body: [
          "बीमाकर्ता, वित्त प्रदाता, किराये की कंपनियाँ, डीलर, लॉजिस्टिक पार्टियाँ और प्राधिकरण सहित तृतीय पक्ष EquipRegistry के माध्यम से उपलब्ध कराई गई जानकारी देख सकते हैं।",
          "EquipRegistry यह गारंटी नहीं देता कि तृतीय पक्ष इस जानकारी की किसी विशेष तरीके से व्याख्या, उपयोग, स्वीकार, अस्वीकार या उस पर भरोसा करेंगे।",
          "तृतीय पक्षों द्वारा लिए गए सभी निर्णय उनकी अपनी ज़िम्मेदारी होंगे।",
        ],
      },
      stolenReports: {
        title: "5. चोरी की रिपोर्ट और चेतावनी संकेत",
        body: [
          "चोरी की स्थिति संकेतक, रेड फ्लैग, चेतावनी सूचनाएँ, केस संदर्भ और इसी प्रकार के अलर्ट जमा की गई रिपोर्टों, दस्तावेज़ों, आंतरिक समीक्षा, साझेदार जानकारी या भविष्य के एकीकृत रिपोर्टिंग प्रवाह पर आधारित हो सकते हैं।",
          "ऐसे संकेत अस्थायी हो सकते हैं, समीक्षा के अधीन हो सकते हैं, विवादित हो सकते हैं, अपडेट किए जा सकते हैं, सीमित किए जा सकते हैं या नई जानकारी मिलने पर हटाए जा सकते हैं।",
          "EquipRegistry पुलिस रिकॉर्ड, न्यायालय के निर्णय, बीमा निर्धारण या आधिकारिक आपराधिक या दीवानी प्रक्रियाओं का स्थानापन्न नहीं है।",
        ],
      },
      availability: {
        title: "6. उपलब्धता और निरंतरता",
        body: [
          "EquipRegistry वेबसाइट या सेवा के किसी भी हिस्से की निरंतर उपलब्धता, लगातार संचालन या त्रुटिरहित कार्यप्रणाली की गारंटी नहीं देता।",
          "पृष्ठ, सुविधाएँ, स्थितियाँ, खाता पहुँच और सत्यापन परिणाम किसी भी समय बदले, सीमित, निलंबित या वापस लिए जा सकते हैं।",
        ],
      },
      futureServices: {
        title: "7. भविष्य की सेवाएँ और विकास",
        body: [
          "भविष्य में EquipRegistry अतिरिक्त सेवाएँ शुरू कर सकता है, जिनमें भुगतान एकीकरण, साझेदार एक्सेस लेयर, बीमाकर्ता फ्लो, स्वामित्व हस्तांतरण प्रक्रियाएँ, रिमाइंडर, समाप्ति तर्क, वैलिडेशन नवीनीकरण, API कनेक्शन, डैशबोर्ड टूल और अन्य सत्यापन या मॉनिटरिंग सुविधाएँ शामिल हो सकती हैं, परंतु इन्हीं तक सीमित नहीं हैं।",
          "ऐसी भविष्य की सेवाएँ अलग शर्तों, तकनीकी सीमाओं, क्षेत्राधिकार संबंधी प्रतिबंधों, परिचालन आवश्यकताओं और अतिरिक्त समीक्षा प्रक्रियाओं के अधीन हो सकती हैं।",
        ],
      },
      liability: {
        title: "8. दायित्व की सीमा",
        body: [
          "लागू कानून द्वारा अनुमत अधिकतम सीमा तक, EquipRegistry और उसका संचालक प्लेटफ़ॉर्म या उसके माध्यम से उपलब्ध कराई गई जानकारी के उपयोग, उपयोग करने में असमर्थता, उस पर निर्भरता या उसकी व्याख्या से उत्पन्न किसी भी प्रत्यक्ष, अप्रत्यक्ष, आकस्मिक, परिणामी, व्यावसायिक, प्रतिष्ठात्मक, कानूनी या वित्तीय हानि के लिए उत्तरदायी नहीं होंगे।",
          "EquipRegistry का उपयोग पूरी तरह उपयोगकर्ता के अपने जोखिम पर है।",
        ],
      },
      contact: {
        title: "9. संपर्क विवरण",
        body: [
          "इस अस्वीकरण या प्लेटफ़ॉर्म के संबंध में किसी भी प्रश्न के लिए आप नीचे दिए गए विवरणों का उपयोग करके EquipRegistry से संपर्क कर सकते हैं।",
        ],
      },
    },
    closing:
      "जैसे-जैसे EquipRegistry आगे विकसित होगा, जिसमें प्लेटफ़ॉर्म का भविष्य का व्यावसायिक, तकनीकी और कानूनी विस्तार शामिल है, यह अस्वीकरण समय-समय पर अपडेट किया जा सकता है।",
  },

  ar: {
    title: "إخلاء المسؤولية",
    intro:
      "ينطبق إخلاء المسؤولية هذا على استخدام موقع EquipRegistry وخدماته وصفحات التحقق العامة وجوازات المرور الرقمية وطلبات التسجيل وجميع المعلومات ذات الصلة المتاحة عبر المنصة.",
    operatorTitle: "تتم إدارته بواسطة",
    sections: {
      general: {
        title: "1. معلومات عامة",
        body: [
          "تهدف EquipRegistry إلى توفير منصة رقمية للتسجيل والتحقق ومعلومات الحالة للمعدات والمركبات والمقطورات والدراجات والدراجات الكهربائية والسكوترات الكهربائية والآلات والأدوات والأصول الصناعية والأصول المرتبطة بالطاقة وغيرها من الممتلكات المؤهلة.",
          "يتم توفير جميع المعلومات الموجودة على هذا الموقع لأغراض معلوماتية عامة فقط.",
          "على الرغم من أن EquipRegistry تسعى إلى عرض المعلومات بعناية والحفاظ على المنصة بأكبر قدر ممكن من الدقة والفائدة، فلا يتم تقديم أي ضمان بأن جميع المعلومات كاملة أو دقيقة أو محدثة أو خالية من الأخطاء.",
        ],
      },
      noGuarantee: {
        title: "2. عدم وجود ضمان قانوني للملكية",
        body: [
          "EquipRegistry ليست جهة حكومية أو سجلًا عامًا أو سلطة شرطية أو شركة تأمين أو كاتب عدل أو جهة رسمية لإثبات الملكية.",
          "إن أي تسجيل أو جواز أو نتيجة بحث أو نتيجة تحقق أو علامة حالة أو مرجع قضية أو مستند مرفوع أو سجل حساب على EquipRegistry لا يشكل بحد ذاته دليلًا قانونيًا نهائيًا على الملكية أو الحيازة أو السند أو الأصل أو خلو الأصل من الأعباء.",
          "يجب على المستخدمين والمشترين والبائعين وشركات التأمين وشركات التأجير والبنوك والسلطات والأطراف الثالثة الأخرى إجراء فحوصاتهم القانونية والتجارية والواقعية الخاصة بهم دائمًا.",
        ],
      },
      userResponsibility: {
        title: "3. مسؤولية المستخدم",
        body: [
          "يتحمل المستخدم وحده المسؤولية عن جميع المعلومات والمستندات والادعاءات والبيانات المقدمة إلى EquipRegistry.",
          "ومن خلال تقديم المعلومات، يقر المستخدم بأنه يملك الحق في تقديمها وأنها ليست كاذبة أو مضللة أو احتيالية أو غير قانونية أو منتهكة لحقوق الغير.",
          "يجوز لـ EquipRegistry تعليق أو رفض أو إزالة أو وسم التسجيلات أو الحسابات أو البلاغات أو المستندات إذا تم اكتشاف إساءة استخدام أو تناقضات أو مؤشرات مخاطر أو اشتباه في الاحتيال.",
        ],
      },
      thirdParties: {
        title: "4. الاستخدام من قبل الأطراف الثالثة",
        body: [
          "قد تقوم أطراف ثالثة، بما في ذلك شركات التأمين والجهات الممولة وشركات التأجير والتجار والأطراف اللوجستية والسلطات، بالاطلاع على المعلومات المتاحة عبر EquipRegistry.",
          "ولا تضمن EquipRegistry أن تقوم الأطراف الثالثة بتفسير المعلومات أو استخدامها أو قبولها أو رفضها أو الاعتماد عليها بطريقة معينة.",
          "وتبقى أي قرارات تتخذها الأطراف الثالثة على مسؤوليتها الخاصة وحدها.",
        ],
      },
      stolenReports: {
        title: "5. بلاغات السرقة والإشارات التحذيرية",
        body: [
          "قد تستند مؤشرات السرقة أو الإشارات الحمراء أو التنبيهات أو مراجع القضايا أو الإشارات المماثلة إلى بلاغات مقدمة أو وثائق أو مراجعة داخلية أو معلومات من الشركاء أو تدفقات إبلاغ مدمجة مستقبلية.",
          "وقد تكون هذه المؤشرات مؤقتة أو قيد المراجعة أو محل نزاع أو قابلة للتحديث أو التقييد أو الإزالة عند توفر معلومات جديدة.",
          "ولا تحل EquipRegistry محل سجلات الشرطة أو الأحكام القضائية أو قرارات شركات التأمين أو الإجراءات الجنائية أو المدنية الرسمية.",
        ],
      },
      availability: {
        title: "6. التوفر والاستمرارية",
        body: [
          "لا تضمن EquipRegistry توفرًا غير منقطع أو تشغيلًا مستمرًا أو أداءً خاليًا من الأخطاء للموقع الإلكتروني أو لأي جزء من الخدمة.",
          "وقد يتم تعديل الصفحات أو الميزات أو الحالات أو الوصول إلى الحساب أو نتائج التحقق أو تقييدها أو تعليقها أو سحبها في أي وقت.",
        ],
      },
      futureServices: {
        title: "7. الخدمات والتطورات المستقبلية",
        body: [
          "قد تقدم EquipRegistry في المستقبل خدمات إضافية، بما في ذلك على سبيل المثال لا الحصر تكاملات الدفع وطبقات وصول الشركاء وتدفقات شركات التأمين وتدفقات نقل الملكية والتذكيرات ومنطق انتهاء الصلاحية وتجديدات التحقق واتصالات API وأدوات لوحة التحكم ووظائف تحقق أو مراقبة أخرى.",
          "وقد تخضع هذه الخدمات المستقبلية لشروط منفصلة وقيود تقنية وقيود قضائية ومتطلبات تشغيلية وإجراءات مراجعة إضافية.",
        ],
      },
      liability: {
        title: "8. تحديد المسؤولية",
        body: [
          "إلى أقصى حد يسمح به القانون المعمول به، لا تتحمل EquipRegistry أو مشغلها أي مسؤولية عن أي خسائر مباشرة أو غير مباشرة أو عرضية أو تبعية أو تجارية أو تتعلق بالسمعة أو قانونية أو مالية تنشأ عن استخدام المنصة أو عدم القدرة على استخدامها أو الاعتماد عليها أو تفسيرها أو أي معلومات متاحة من خلالها.",
          "ويكون استخدام EquipRegistry على مسؤولية المستخدم الخاصة بالكامل.",
        ],
      },
      contact: {
        title: "9. بيانات الاتصال",
        body: [
          "لأي أسئلة تتعلق بإخلاء المسؤولية هذا أو بالمنصة، يمكنكم التواصل مع EquipRegistry باستخدام التفاصيل أدناه.",
        ],
      },
    },
    closing:
      "قد يتم تحديث إخلاء المسؤولية هذا من وقت لآخر مع استمرار تطور EquipRegistry، بما في ذلك التوسع التجاري والتقني والقانوني المستقبلي للمنصة.",
  },

  zh: {
    title: "免责声明",
    intro:
      "本免责声明适用于对 EquipRegistry 网站、其服务、公开验证页面、数字护照、注册申请以及通过本平台提供的相关信息的使用。",
    operatorTitle: "运营方",
    sections: {
      general: {
        title: "1. 一般信息",
        body: [
          "EquipRegistry 旨在为设备、车辆、拖车、自行车、电动自行车、电动滑板车、机械、工具、工业资产、能源相关资产及其他符合条件的财产提供数字化注册、验证和状态信息平台。",
          "本网站上的所有信息仅供一般参考之用。",
          "尽管 EquipRegistry 力求谨慎展示信息，并尽可能保持平台的准确性和实用性，但不保证所有信息完整、准确、最新或不存在错误。",
        ],
      },
      noGuarantee: {
        title: "2. 不构成合法所有权保证",
        body: [
          "EquipRegistry 不是政府机关、公共登记机构、警方机构、保险公司、公证机构或官方产权机构。",
          "EquipRegistry 上的注册、护照、搜索结果、验证结果、状态标签、案件编号、上传文件或账户记录本身，并不构成对所有权、占有权、产权、来源或无负担状态的最终法律证明。",
          "用户、买方、卖方、保险公司、租赁公司、银行、主管机关及其他第三方，均应自行进行法律、商业及事实层面的核查。",
        ],
      },
      userResponsibility: {
        title: "3. 用户责任",
        body: [
          "用户对其提交给 EquipRegistry 的所有信息、文件、陈述和数据负全部责任。",
          "提交信息即表示用户声明其有权提供该等信息，且该等信息不属于虚假、误导、欺诈、违法或侵犯第三方权利的内容。",
          "如发现滥用、不一致、风险信号或涉嫌欺诈，EquipRegistry 有权暂停、拒绝、删除或标记相关注册、账户、报告或文件。",
        ],
      },
      thirdParties: {
        title: "4. 第三方使用",
        body: [
          "包括保险公司、金融机构、租赁公司、经销商、物流相关方及主管机关在内的第三方，可能会查阅 EquipRegistry 提供的信息。",
          "EquipRegistry 不保证第三方会以特定方式解释、使用、接受、拒绝或依赖该等信息。",
          "第三方所作出的任何决定均由其自行负责。",
        ],
      },
      stolenReports: {
        title: "5. 失窃报告与风险标记",
        body: [
          "失窃状态标记、红旗警示、警告通知、案件编号及类似提示，可能基于提交的报告、文件、内部审核、合作方信息或未来集成的报告流程。",
          "此类标记可能是临时性的、审核中的、存在争议的，也可能在出现新信息时被更新、限制或删除。",
          "EquipRegistry 不替代警方记录、法院裁决、保险认定或正式刑事或民事程序。",
        ],
      },
      availability: {
        title: "6. 可用性与连续性",
        body: [
          "EquipRegistry 不保证网站或服务任何部分持续可用、不中断运行或无错误。",
          "页面、功能、状态、账户访问权限及验证结果，均可能随时被修改、限制、暂停或撤回。",
        ],
      },
      futureServices: {
        title: "7. 未来服务与发展",
        body: [
          "EquipRegistry 未来可能推出其他服务，包括但不限于支付集成、合作伙伴访问层、保险流程、所有权转移流程、提醒、过期逻辑、验证续期、API 连接、仪表板工具以及其他验证或监控功能。",
          "此类未来服务可能受单独条款、技术限制、司法辖区限制、运营要求及额外审核程序的约束。",
        ],
      },
      liability: {
        title: "8. 责任限制",
        body: [
          "在适用法律允许的最大范围内，EquipRegistry 及其运营方不对因使用、无法使用、依赖或解释本平台或通过本平台提供的任何信息而产生的任何直接、间接、附带、后果性、商业、声誉、法律或财务损失承担责任。",
          "用户对 EquipRegistry 的使用风险由用户自行承担。",
        ],
      },
      contact: {
        title: "9. 联系方式",
        body: [
          "如对本免责声明或本平台有任何疑问，可通过以下信息联系 EquipRegistry。",
        ],
      },
    },
    closing:
      "随着 EquipRegistry 的进一步发展，包括未来在商业、技术和法律层面的扩展，本免责声明可能会不时更新。",
  },

  pl: {
    title: "Zastrzezenie prawne",
    intro:
      "Niniejsze Zastrzezenie prawne dotyczy korzystania ze strony internetowej EquipRegistry, uslug, publicznych stron weryfikacyjnych, cyfrowych paszportow, wnioskow rejestracyjnych oraz powiazanych informacji udostepnianych za posrednictwem platformy.",
    operatorTitle: "Obslugiwane przez",
    sections: {
      general: {
        title: "1. Informacje ogolne",
        body: [
          "EquipRegistry ma na celu zapewnienie cyfrowej platformy rejestracji, weryfikacji i informacji o statusie dla sprzetu, pojazdow, przyczep, rowerow, e-bike'ow, hulajnog elektrycznych, maszyn, narzedzi, assetow przemyslowych, assetow zwiazanych z energia oraz innego kwalifikujacego sie mienia.",
          "Wszystkie informacje na tej stronie internetowej sa udostepniane wylacznie do ogolnych celow informacyjnych.",
          "Chociaz EquipRegistry doklada staran, aby prezentowac informacje z nalezyta starannoscia i utrzymywac platforme mozliwie dokladna i uzyteczna, nie udziela gwarancji, ze wszystkie informacje sa kompletne, dokladne, aktualne lub wolne od bledow.",
        ],
      },
      noGuarantee: {
        title: "2. Brak gwarancji prawnej wlasnosci",
        body: [
          "EquipRegistry nie jest organem panstwowym, rejestrem publicznym, organem policyjnym, ubezpieczycielem, notariuszem ani oficjalnym urzedem rejestrujacym tytuly.",
          "Rejestracja, paszport, wynik wyszukiwania, wynik weryfikacji, etykieta statusu, referencja sprawy, przeslany dokument lub wpis konta w EquipRegistry nie stanowi sam w sobie ostatecznego dowodu prawnego wlasnosci, posiadania, tytulu, pochodzenia ani braku obciazen.",
          "Uzytkownicy, kupujacy, sprzedajacy, ubezpieczyciele, firmy wynajmujace, banki, organy i inne strony trzecie musza zawsze przeprowadzac wlasne kontrole prawne, handlowe i faktyczne.",
        ],
      },
      userResponsibility: {
        title: "3. Odpowiedzialnosc uzytkownika",
        body: [
          "Uzytkownik ponosi wylaczna odpowiedzialnosc za wszystkie informacje, dokumenty, roszczenia i dane przesylane do EquipRegistry.",
          "Przesylajac informacje, uzytkownik oswiadcza, ze ma prawo je dostarczyc oraz ze nie sa one falszywe, wprowadzajace w blad, oszukancze, bezprawne ani naruszajace prawa innych osob.",
          "EquipRegistry moze zawiesic, odmowic, usunac lub oznaczyc rejestracje, konta, zgloszenia lub dokumenty w przypadku stwierdzenia naduzyc, niespojnosci, wskaznikow ryzyka lub podejrzenia oszustwa.",
        ],
      },
      thirdParties: {
        title: "4. Korzystanie przez strony trzecie",
        body: [
          "Strony trzecie, w tym ubezpieczyciele, dostawcy finansowania, firmy wynajmujace, dealerzy, podmioty logistyczne i organy, moga zapoznawac sie z informacjami udostepnianymi za posrednictwem EquipRegistry.",
          "EquipRegistry nie gwarantuje, ze strony trzecie beda interpretowac, wykorzystywac, akceptowac, odrzucac lub polegac na informacjach w jakikolwiek okreslony sposob.",
          "Wszelkie decyzje podejmowane przez strony trzecie pozostaja ich wlasna odpowiedzialnoscia.",
        ],
      },
      stolenReports: {
        title: "5. Zgloszenia kradziezy i red flags",
        body: [
          "Wskazniki statusu kradziezy, red flags, ostrzezenia, referencje spraw i podobne alerty moga opierac sie na przeslanych zgloszeniach, dokumentacji, przegladzie wewnetrznym, informacjach partnerskich lub przyszlych zintegrowanych workflow raportowania.",
          "Takie wskazniki moga miec charakter tymczasowy, byc w trakcie przegladu, sporne, aktualizowane, ograniczane lub usuwane, gdy pojawiaja sie nowe informacje.",
          "EquipRegistry nie zastepuje rejestrow policyjnych, orzeczen sadowych, ustalen ubezpieczeniowych ani oficjalnych procedur karnych lub cywilnych.",
        ],
      },
      availability: {
        title: "6. Dostepnosc i ciaglosc",
        body: [
          "EquipRegistry nie gwarantuje nieprzerwanej dostepnosci, ciaglego czasu dzialania ani bezblednego funkcjonowania strony internetowej lub jakiejkolwiek czesci uslugi.",
          "Strony, funkcje, statusy, dostep do konta i wyniki weryfikacji moga byc modyfikowane, ograniczane, zawieszane lub wycofywane w dowolnym czasie.",
        ],
      },
      futureServices: {
        title: "7. Przyszle uslugi i rozwoj",
        body: [
          "EquipRegistry moze w przyszlosci wprowadzic dodatkowe uslugi, w tym miedzy innymi integracje platnosci, warstwy dostepu partnerskiego, workflow ubezpieczycieli, workflow przeniesienia wlasnosci, przypomnienia, logike wygasania, odnowienia walidacji, polaczenia API, narzedzia panelowe i inne funkcje weryfikacji lub monitorowania.",
          "Takie przyszle uslugi moga podlegac odrebnym warunkom, ograniczeniom technicznym, ograniczeniom jurysdykcyjnym, wymogom operacyjnym i dodatkowym procedurom przegladu.",
        ],
      },
      liability: {
        title: "8. Ograniczenie odpowiedzialnosci",
        body: [
          "W maksymalnym zakresie dopuszczonym przez obowiazujace prawo EquipRegistry i jego operator nie ponosza odpowiedzialnosci za szkody bezposrednie, posrednie, przypadkowe, nastpcze, handlowe, reputacyjne, prawne lub finansowe wynikajace z korzystania z platformy, braku mozliwosci korzystania z niej, polegania na niej lub interpretacji platformy albo jakichkolwiek informacji za jej posrednictwem udostepnianych.",
          "Korzystanie z EquipRegistry odbywa sie na wlasne ryzyko uzytkownika.",
        ],
      },
      contact: {
        title: "9. Dane kontaktowe",
        body: [
          "W sprawach dotyczacych niniejszego Zastrzezenia prawnego lub platformy mozesz skontaktowac sie z EquipRegistry, korzystajac z ponizszych danych.",
        ],
      },
    },
    closing:
      "Niniejsze Zastrzezenie prawne moze byc od czasu do czasu aktualizowane wraz z dalszym rozwojem EquipRegistry, w tym przyszla ekspansja handlowa, techniczna i prawna platformy.",
  },
  sv: {
    title: "Ansvarsfriskrivning",
    intro:
      "Denna ansvarsfriskrivning galler anvandningen av EquipRegistrys webbplats, tjanster, publika verifieringssidor, digitala pass, registreringsansokningar och relaterad information som goras tillganglig via plattformen.",
    operatorTitle: "Drivs av",
    sections: {
      general: {
        title: "1. Allman information",
        body: [
          "EquipRegistry syftar till att tillhandahalla en digital plattform for registrering, verifiering och statusinformation for utrustning, fordon, slap, cyklar, e-bikes, elsparkcyklar, maskiner, verktyg, industriella assets, energirelaterade assets och annan kvalificerad egendom.",
          "All information pa denna webbplats tillhandahalls endast for allmanna informationssyften.",
          "Aven om EquipRegistry stravar efter att presentera information noggrant och halla plattformen sa korrekt och anvandbar som mojligt, lamnas ingen garanti for att all information ar fullstandig, korrekt, aktuell eller fri fran fel.",
        ],
      },
      noGuarantee: {
        title: "2. Ingen juridisk garanti for agande",
        body: [
          "EquipRegistry ar inte en statlig myndighet, ett offentligt register, en polismyndighet, en forsakrare, en notarie eller ett officiellt registerkontor for titlar.",
          "En registrering, ett pass, ett sokresultat, ett verifieringsresultat, en statusetikett, en arendereferens, ett uppladdat dokument eller en kontopost pa EquipRegistry utgor inte i sig slutgiltigt juridiskt bevis for agande, besittning, titel, ursprung eller frihet fran belastningar.",
          "Anvandare, kopare, saljare, forsakrare, uthyrningsforetag, banker, myndigheter och andra tredje parter maste alltid genomfora egna juridiska, kommersiella och faktiska kontroller.",
        ],
      },
      userResponsibility: {
        title: "3. Anvandaransvar",
        body: [
          "Anvandaren ar ensam ansvarig for all information, alla dokument, ansprak och data som skickas in till EquipRegistry.",
          "Genom att skicka in information forsakrar anvandaren att denne har ratt att tillhandahalla den och att den inte ar falsk, vilseledande, bedraglig, olaglig eller inkraktar pa andras rattigheter.",
          "EquipRegistry kan stanga av, neka, ta bort eller markera registreringar, konton, rapporter eller dokument dar missbruk, inkonsekvenser, riskindikatorer eller misstankt bedrageri identifieras.",
        ],
      },
      thirdParties: {
        title: "4. Anvandning av tredje part",
        body: [
          "Tredje parter, inklusive forsakrare, finansieringsgivare, uthyrningsforetag, handlare, logistikparter och myndigheter, kan ta del av information som gors tillganglig via EquipRegistry.",
          "EquipRegistry garanterar inte att tredje parter kommer att tolka, anvanda, acceptera, avvisa eller forlita sig pa information pa nagot visst satt.",
          "Alla beslut som fattas av tredje parter forblir deras eget ansvar.",
        ],
      },
      stolenReports: {
        title: "5. Stoldrapporter och red flags",
        body: [
          "Stoldstatusindikatorer, red flags, varningsmeddelanden, arendereferenser och liknande varningar kan baseras pa inskickade rapporter, dokumentation, intern granskning, partnerinformation eller framtida integrerade rapporteringsfloden.",
          "Sadan indikatorer kan vara preliminara, under granskning, tvistiga, uppdaterade, begransade eller borttagna om ny information blir tillganglig.",
          "EquipRegistry ersatter inte polisregister, domstolsbeslut, forsakringsbedomningar eller officiella straff- eller civilrattsliga processer.",
        ],
      },
      availability: {
        title: "6. Tillganglighet och kontinuitet",
        body: [
          "EquipRegistry garanterar inte oavbruten tillganglighet, kontinuerlig upptid eller felfri drift av webbplatsen eller nagon del av tjansten.",
          "Sidor, funktioner, statusar, kontotillgang och verifieringsresultat kan andras, begransas, stangas av eller dras tillbaka nar som helst.",
        ],
      },
      futureServices: {
        title: "7. Framtida tjanster och utveckling",
        body: [
          "EquipRegistry kan i framtiden infora ytterligare tjanster, inklusive men inte begransat till betalningsintegrationer, lager for partnertillgang, floden for forsakrare, floden for agaroverforing, paminnelser, utgangslogik, valideringsfornyelser, API-anslutningar, dashboardverktyg och andra verifierings- eller overvagningsfunktioner.",
          "Sadan framtida tjanster kan omfattas av separata villkor, tekniska begransningar, jurisdiktionsrestriktioner, operativa krav och ytterligare granskningsforfaranden.",
        ],
      },
      liability: {
        title: "8. Ansvarsbegransning",
        body: [
          "I den storsta utstrackning som tillamplig lag medger ska EquipRegistry och dess operator inte vara ansvariga for direkta, indirekta, tillfalliga, foljdskador, kommersiella, renommemassiga, juridiska eller finansiella forluster som uppstar genom anvandning av, oformaga att anvanda, tillit till eller tolkning av plattformen eller nagon information som goras tillganglig genom den.",
          "Anvandning av EquipRegistry sker pa anvandarens egen risk.",
        ],
      },
      contact: {
        title: "9. Kontaktuppgifter",
        body: [
          "Vid fragor om denna ansvarsfriskrivning eller plattformen kan du kontakta EquipRegistry med uppgifterna nedan.",
        ],
      },
    },
    closing:
      "Denna ansvarsfriskrivning kan uppdateras fran tid till annan i takt med att EquipRegistry utvecklas vidare, inklusive framtida kommersiell, teknisk och juridisk expansion av plattformen.",
  },
  da: {
    title: "Ansvarsfraskrivelse",
    intro:
      "Denne ansvarsfraskrivelse gaelder brugen af EquipRegistrys hjemmeside, tjenester, offentlige verificeringssider, digitale pas, registreringsanmodninger og relaterede oplysninger, der stilles til raadighed via platformen.",
    operatorTitle: "Drevet af",
    sections: {
      general: {
        title: "1. Generel information",
        body: [
          "EquipRegistry har til formal at levere en digital platform for registrering, verificering og statusinformation for udstyr, koretojer, trailere, cykler, e-bikes, elektriske lobehjul, maskiner, vaerktoj, industrielle assets, energirelaterede assets og anden kvalificeret ejendom.",
          "Alle oplysninger pa denne hjemmeside stilles kun til raadighed til generelle informationsformal.",
          "Selv om EquipRegistry bestraber sig pa at praesentere oplysninger omhyggeligt og holde platformen sa korrekt og nyttig som muligt, gives der ingen garanti for, at alle oplysninger er fuldstaendige, korrekte, aktuelle eller fejlfrie.",
        ],
      },
      noGuarantee: {
        title: "2. Ingen juridisk garanti for ejerskab",
        body: [
          "EquipRegistry er ikke en myndighed, et offentligt register, en politimyndighed, et forsikringsselskab, en notar eller et officielt registerkontor for titler.",
          "En registrering, et pas, et sogeresultat, et verificeringsresultat, en statusetiket, en sagsreference, et uploadet dokument eller en kontopost pa EquipRegistry udgor ikke i sig selv endeligt juridisk bevis for ejerskab, besiddelse, titel, oprindelse eller frihed for haeftelser.",
          "Brugere, kobere, saelgere, forsikringsselskaber, udlejningsfirmaer, banker, myndigheder og andre tredjeparter skal altid foretage deres egne juridiske, kommercielle og faktiske kontroller.",
        ],
      },
      userResponsibility: {
        title: "3. Brugeransvar",
        body: [
          "Brugeren er alene ansvarlig for alle oplysninger, dokumenter, krav og data, der indsendes til EquipRegistry.",
          "Ved at indsende oplysninger erklrer brugeren, at vedkommende er berettiget til at levere dem, og at de ikke er falske, vildledende, svigagtige, ulovlige eller kraenker andres rettigheder.",
          "EquipRegistry kan suspendere, afvise, fjerne eller markere registreringer, konti, rapporter eller dokumenter, hvor misbrug, uoverensstemmelser, risikoindikatorer eller mistanke om svig identificeres.",
        ],
      },
      thirdParties: {
        title: "4. Brug af tredjeparter",
        body: [
          "Tredjeparter, herunder forsikringsselskaber, finansieringsudbydere, udlejningsfirmaer, forhandlere, logistikparter og myndigheder, kan konsultere oplysninger, der gors tilgaengelige via EquipRegistry.",
          "EquipRegistry garanterer ikke, at tredjeparter vil fortolke, bruge, acceptere, afvise eller stole pa oplysninger pa nogen bestemt made.",
          "Alle beslutninger, der traeffes af tredjeparter, forbliver deres eget ansvar.",
        ],
      },
      stolenReports: {
        title: "5. Tyverirapporter og red flags",
        body: [
          "Indikatorer for stjalen-status, red flags, advarsler, sagsreferencer og lignende alarmer kan baseres pa indsendte rapporter, dokumentation, intern gennemgang, partnerinformation eller fremtidige integrerede rapporteringsflows.",
          "Sadanne indikatorer kan vaere forelobige, under gennemgang, omstridte, opdaterede, begraensede eller fjernede, hvis nye oplysninger bliver tilgaengelige.",
          "EquipRegistry erstatter ikke politiregistre, retsafgorelser, forsikringsvurderinger eller officielle straffe- eller civilretlige procedurer.",
        ],
      },
      availability: {
        title: "6. Tilgaengelighed og kontinuitet",
        body: [
          "EquipRegistry garanterer ikke uafbrudt tilgaengelighed, kontinuerlig oppetid eller fejlfri drift af hjemmesiden eller nogen del af tjenesten.",
          "Sider, funktioner, statusser, kontoadgang og verificeringsresultater kan aendres, begraenses, suspenderes eller traekkes tilbage til enhver tid.",
        ],
      },
      futureServices: {
        title: "7. Fremtidige tjenester og udvikling",
        body: [
          "EquipRegistry kan i fremtiden indfore yderligere tjenester, herunder men ikke begraenset til betalingsintegrationer, lag for partnertilgang, flows for forsikringsselskaber, flows for ejerskabsoverdragelse, pamindelser, udlobslogik, valideringsfornyelser, API-forbindelser, dashboardvaerktojer og andre funktioner til verificering eller overvagning.",
          "Sadanne fremtidige tjenester kan vaere underlagt separate vilkar, tekniske begransninger, jurisdiktionsmaessige restriktioner, operationelle krav og yderligere gennemgangsprocedurer.",
        ],
      },
      liability: {
        title: "8. Ansvarsbegransning",
        body: [
          "I det maksimale omfang, der er tilladt efter gaeldende lov, er EquipRegistry og dets operator ikke ansvarlige for direkte, indirekte, tilfaldige, afledte, kommercielle, omdommemassige, juridiske eller finansielle tab, der opstar som folge af brugen af, manglende evne til at bruge, tillid til eller fortolkning af platformen eller oplysninger, der stilles til raadighed gennem den.",
          "Brugen af EquipRegistry sker pa brugerens egen risiko.",
        ],
      },
      contact: {
        title: "9. Kontaktoplysninger",
        body: [
          "Hvis du har sporgsmal vedrorende denne ansvarsfraskrivelse eller platformen, kan du kontakte EquipRegistry ved hjaelp af nedenstaende oplysninger.",
        ],
      },
    },
    closing:
      "Denne ansvarsfraskrivelse kan opdateres fra tid til anden, efterhanden som EquipRegistry udvikler sig yderligere, herunder fremtidig kommerciel, teknisk og juridisk udvidelse af platformen.",
  },
  no: {
    title: "Ansvarsfraskrivelse",
    intro:
      "Denne ansvarsfraskrivelsen gjelder bruken av EquipRegistry-nettstedet, tjenestene, offentlige verifiseringssider, digitale pass, registreringsforesporsler og relatert informasjon som gjores tilgjengelig gjennom plattformen.",
    operatorTitle: "Drevet av",
    sections: {
      general: {
        title: "1. Generell informasjon",
        body: [
          "EquipRegistry har som mal a tilby en digital plattform for registrering, verifisering og statusinformasjon for utstyr, kjoretoy, tilhengere, sykler, e-bikes, elektriske sparkesykler, maskiner, verktoy, industrielle assets, energirelaterte assets og annen kvalifisert eiendom.",
          "All informasjon pa dette nettstedet gis kun for generelle informasjonsformal.",
          "Selv om EquipRegistry forsoker a presentere informasjon med omhu og holde plattformen sa korrekt og nyttig som mulig, gis det ingen garanti for at all informasjon er fullstendig, korrekt, oppdatert eller fri for feil.",
        ],
      },
      noGuarantee: {
        title: "2. Ingen juridisk garanti for eierskap",
        body: [
          "EquipRegistry er ikke en offentlig myndighet, et offentlig register, en politimyndighet, en forsikrer, en notarius publicus eller et offisielt registerkontor for titler.",
          "En registrering, et pass, et sokeresultat, et verifiseringsresultat, en statusetikett, en saksreferanse, et opplastet dokument eller en kontopost pa EquipRegistry utgor ikke i seg selv endelig juridisk bevis for eierskap, besittelse, tittel, opprinnelse eller frihet fra heftelser.",
          "Brukere, kjopere, selgere, forsikrere, utleieselskaper, banker, myndigheter og andre tredjeparter ma alltid gjennomfore sine egne juridiske, kommersielle og faktiske kontroller.",
        ],
      },
      userResponsibility: {
        title: "3. Brukeransvar",
        body: [
          "Brukeren er eneansvarlig for all informasjon, alle dokumenter, krav og data som sendes inn til EquipRegistry.",
          "Ved a sende inn informasjon erklaerer brukeren at vedkommende har rett til a gi den, og at den ikke er falsk, villedende, uredelig, ulovlig eller krenker andres rettigheter.",
          "EquipRegistry kan suspendere, avvise, fjerne eller merke registreringer, kontoer, rapporter eller dokumenter der misbruk, inkonsekvenser, risikoindikatorer eller mistanke om svindel identifiseres.",
        ],
      },
      thirdParties: {
        title: "4. Bruk av tredjeparter",
        body: [
          "Tredjeparter, inkludert forsikrere, finansieringsleverandorer, utleieselskaper, forhandlere, logistikkparter og myndigheter, kan konsultere informasjon som gjores tilgjengelig gjennom EquipRegistry.",
          "EquipRegistry garanterer ikke at tredjeparter vil tolke, bruke, akseptere, avvise eller stole pa informasjon pa noen bestemt mate.",
          "Alle beslutninger som tas av tredjeparter forblir deres eget ansvar.",
        ],
      },
      stolenReports: {
        title: "5. Tyverirapporter og red flags",
        body: [
          "Indikatorer for tyveristatus, red flags, advarsler, saksreferanser og lignende varsler kan bygge pa innsendte rapporter, dokumentasjon, intern gjennomgang, partnerinformasjon eller fremtidige integrerte rapporteringsflyter.",
          "Slike indikatorer kan vaere forelopige, under gjennomgang, omstridte, oppdaterte, begrensede eller fjernet dersom ny informasjon blir tilgjengelig.",
          "EquipRegistry erstatter ikke politiregistre, domstolsavgjorelser, forsikringsvurderinger eller offisielle straffe- eller sivilrettslige prosedyrer.",
        ],
      },
      availability: {
        title: "6. Tilgjengelighet og kontinuitet",
        body: [
          "EquipRegistry garanterer ikke uavbrutt tilgjengelighet, kontinuerlig oppetid eller feilfri drift av nettstedet eller noen del av tjenesten.",
          "Sider, funksjoner, statuser, kontotilgang og verifiseringsresultater kan endres, begrenses, suspenderes eller trekkes tilbake nar som helst.",
        ],
      },
      futureServices: {
        title: "7. Fremtidige tjenester og utvikling",
        body: [
          "EquipRegistry kan i fremtiden innfore ytterligere tjenester, inkludert men ikke begrenset til betalingsintegrasjoner, lag for partnertilgang, flyter for forsikrere, flyter for overforing av eierskap, paminnelser, utlopslogikk, fornyelser av validering, API-tilkoblinger, dashboardverktoy og andre funksjoner for verifisering eller overvaking.",
          "Slike fremtidige tjenester kan vaere underlagt separate vilkar, tekniske begrensninger, jurisdiksjonsmessige restriksjoner, operative krav og ytterligere gjennomgangsprosedyrer.",
        ],
      },
      liability: {
        title: "8. Ansvarsbegrensning",
        body: [
          "I den storste utstrekning gjeldende lov tillater det, skal EquipRegistry og dets operator ikke vaere ansvarlige for direkte, indirekte, tilfeldige, avledede, kommersielle, omdommemessige, juridiske eller finansielle tap som oppstar som folge av bruk av, manglende evne til a bruke, tillit til eller tolkning av plattformen eller informasjon som gjores tilgjengelig gjennom den.",
          "Bruk av EquipRegistry skjer pa brukerens egen risiko.",
        ],
      },
      contact: {
        title: "9. Kontaktopplysninger",
        body: [
          "Hvis du har sporsmal om denne ansvarsfraskrivelsen eller plattformen, kan du kontakte EquipRegistry ved hjelp av opplysningene nedenfor.",
        ],
      },
    },
    closing:
      "Denne ansvarsfraskrivelsen kan oppdateres fra tid til annen etter hvert som EquipRegistry utvikler seg videre, inkludert fremtidig kommersiell, teknisk og juridisk utvidelse av plattformen.",
  },
};
