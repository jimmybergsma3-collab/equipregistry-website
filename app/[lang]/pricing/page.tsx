import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { isValidLang, type Lang } from "@/lib/i18n/config";
import { formatPricingAmount, getPricing } from "@/lib/registry/pricing";

type Props = {
  params: Promise<{ lang: string }>;
};

type PricingText = {
  title: string;
  subtitle: string;
  privateTitle: string;
  privatePrice: string;
  privateBody: string;
  privateIncludes: string;
  businessTitle: string;
  businessPrice: string;
  businessBody: string;
  businessIncludes: string;
  partnerTitle: string;
  partnerPrice: string;
  partnerBody: string;
  partnerIncludes: string;
  afterPaymentTitle: string;
  afterPaymentText: string;
  passportTitle: string;
  passportText: string;
  historyTitle: string;
  historyText: string;
  validationTitle: string;
  validationText: string;
  start: string;
  contact: string;
};

const TEXT: Record<Lang, PricingText> = {
  en: {
    title: "Pricing",
    subtitle: "EquipRegistry V1 keeps pricing operational: one standard fee for private users and SMEs, and framework agreements for institutional partners.",
    privateTitle: "Private users",
    privatePrice: "",
    privateBody: "For individual ownership registration and document review inside the standard V1 request flow.",
    privateIncludes: "Includes dashboard tracking, status handling, and passport issuance after approval.",
    businessTitle: "SME / business",
    businessPrice: "",
    businessBody: "For company-owned assets using the same dashboard, request, upload, and status structure already used in V1.",
    businessIncludes: "Includes request processing, ownership review, and the same passport workflow used for standard registrations.",
    partnerTitle: "Partners / insurers / rental",
    partnerPrice: "",
    partnerBody: "For higher-volume usage, structured onboarding, and operational access for institutional workflows.",
    partnerIncludes: "Commercial terms and rollout are agreed directly before launch based on volume and operating model.",
    afterPaymentTitle: "What happens after payment",
    afterPaymentText: "After payment confirmation, the request moves into review. The submitted file stays visible in the dashboard during validation.",
    passportTitle: "Passport explanation",
    passportText: "The EquipRegistry passport is the registry record issued after approval. It ties the registration reference, core asset data, and validated status together.",
    historyTitle: "History Unknown",
    historyText: "History Unknown means the asset is registered in the system, but verified ownership history has not yet been established. It is a status signal, not a refusal.",
    validationTitle: "Annual validation",
    validationText: "Annual validation confirms that the registry passport remains current and supports document refresh, ownership continuity, and status confidence over time.",
    start: "Start registration",
    contact: "Contact us",
  },
  es: {
    title: "Precios",
    subtitle: "EquipRegistry V1 mantiene los precios en un nivel operativo: una tarifa estandar para particulares y pymes, y acuerdos marco para socios institucionales.",
    privateTitle: "Usuarios particulares",
    privatePrice: "",
    privateBody: "Para registro individual de titularidad y revision documental dentro del flujo V1 estandar.",
    privateIncludes: "Incluye seguimiento en el panel, gestion de estados y emision del pasaporte tras la aprobacion.",
    businessTitle: "Pyme / empresa",
    businessPrice: "",
    businessBody: "Para activos de empresa usando la misma estructura de panel, solicitud, carga y estado ya utilizada en V1.",
    businessIncludes: "Incluye tramitacion de la solicitud, revision de titularidad y el mismo flujo de pasaporte usado en registros estandar.",
    partnerTitle: "Socios / aseguradoras / alquiler",
    partnerPrice: "",
    partnerBody: "Para mayor volumen, incorporacion estructurada y acceso operativo para flujos institucionales.",
    partnerIncludes: "Las condiciones comerciales y el despliegue se acuerdan directamente antes del lanzamiento segun volumen y modelo operativo.",
    afterPaymentTitle: "Que ocurre despues del pago",
    afterPaymentText: "Tras la confirmacion del pago, la solicitud pasa a revision. El expediente enviado permanece visible en el panel durante la validacion.",
    passportTitle: "Explicacion del pasaporte",
    passportText: "El pasaporte EquipRegistry es el registro emitido tras la aprobacion. Une la referencia del registro, los datos clave del activo y el estado validado.",
    historyTitle: "History Unknown",
    historyText: "History Unknown significa que el activo esta registrado en el sistema, pero todavia no se ha establecido un historial de titularidad verificado. Es una senal de estado, no un rechazo.",
    validationTitle: "Validacion anual",
    validationText: "La validacion anual confirma que el pasaporte del registro sigue vigente y respalda la actualizacion documental, la continuidad de titularidad y la confianza del estado.",
    start: "Iniciar registro",
    contact: "Contactar",
  },
  de: {
    title: "Preise",
    subtitle: "EquipRegistry V1 haelt die Preisstruktur sachlich: eine Standardgebuehr fuer Privatnutzer und KMU sowie Rahmenvereinbarungen fuer institutionelle Partner.",
    privateTitle: "Privatnutzer",
    privatePrice: "",
    privateBody: "Fuer individuelle Eigentumsregistrierung und Dokumentenpruefung im standardisierten V1-Ablauf.",
    privateIncludes: "Enthaelt Dashboard-Nachverfolgung, Statusfuehrung und Passausstellung nach Freigabe.",
    businessTitle: "KMU / Unternehmen",
    businessPrice: "",
    businessBody: "Fuer Unternehmensassets mit derselben Dashboard-, Antrags-, Upload- und Statusstruktur wie im bestehenden V1-System.",
    businessIncludes: "Enthaelt Antragsbearbeitung, Eigentumspruefung und denselben Passprozess wie bei Standardregistrierungen.",
    partnerTitle: "Partner / Versicherer / Vermietung",
    partnerPrice: "",
    partnerBody: "Fuer groessere Volumina, strukturierte Einfuehrung und operativen Zugriff in institutionellen Prozessen.",
    partnerIncludes: "Kommerzielle Bedingungen und Rollout werden vor dem Start direkt nach Volumen und Betriebsmodell abgestimmt.",
    afterPaymentTitle: "Was nach der Zahlung geschieht",
    afterPaymentText: "Nach bestaetigter Zahlung geht der Antrag in die Pruefung. Die eingereichte Akte bleibt waehrend der Validierung im Dashboard sichtbar.",
    passportTitle: "Pass-Erklaerung",
    passportText: "Der EquipRegistry-Pass ist der Registereintrag nach Freigabe. Er verbindet Registrierungsreferenz, Kerndaten des Assets und validierten Status.",
    historyTitle: "History Unknown",
    historyText: "History Unknown bedeutet, dass das Asset im System registriert ist, aber noch keine verifizierte Eigentumshistorie festgestellt wurde. Es ist ein Statushinweis, keine Ablehnung.",
    validationTitle: "Jaehrliche Validierung",
    validationText: "Die jaehrliche Validierung bestaetigt, dass der Registerpass aktuell bleibt, und stuetzt Dokumentenaktualisierung, Eigentumskontinuitaet und Statussicherheit.",
    start: "Registrierung starten",
    contact: "Kontakt",
  },
  fr: {
    title: "Tarifs",
    subtitle: "EquipRegistry V1 conserve une tarification sobre : un tarif standard pour les particuliers et PME, et des accords-cadres pour les partenaires institutionnels.",
    privateTitle: "Utilisateurs prives",
    privatePrice: "",
    privateBody: "Pour l'enregistrement individuel de propriete et la revue documentaire dans le flux V1 standard.",
    privateIncludes: "Comprend le suivi dans le tableau de bord, la gestion du statut et l'emission du passeport apres approbation.",
    businessTitle: "PME / entreprise",
    businessPrice: "",
    businessBody: "Pour les actifs d'entreprise avec la meme structure de tableau de bord, demande, televersement et statut que dans le systeme V1 existant.",
    businessIncludes: "Comprend le traitement du dossier, la revue de propriete et le meme parcours de passeport que pour les enregistrements standard.",
    partnerTitle: "Partenaires / assureurs / location",
    partnerPrice: "",
    partnerBody: "Pour des volumes plus importants, une integration structuree et un acces operationnel pour les usages institutionnels.",
    partnerIncludes: "Les conditions commerciales et le deploiement sont convenus directement avant le lancement selon le volume et le modele d'exploitation.",
    afterPaymentTitle: "Ce qui se passe apres le paiement",
    afterPaymentText: "Apres confirmation du paiement, la demande passe en revue. Le dossier soumis reste visible dans le tableau de bord pendant la validation.",
    passportTitle: "Explication du passeport",
    passportText: "Le passeport EquipRegistry est l'enregistrement emis apres approbation. Il relie la reference, les donnees essentielles de l'actif et le statut valide.",
    historyTitle: "History Unknown",
    historyText: "History Unknown signifie que l'actif est enregistre dans le systeme, mais qu'aucun historique de propriete verifie n'a encore ete etabli. C'est un signal de statut, pas un refus.",
    validationTitle: "Validation annuelle",
    validationText: "La validation annuelle confirme que le passeport de registre reste a jour et soutient la mise a jour documentaire, la continuite de propriete et la confiance du statut.",
    start: "Demarrer l'enregistrement",
    contact: "Contact",
  },
  it: {
    title: "Tariffe",
    subtitle: "EquipRegistry V1 mantiene i prezzi in forma operativa: una tariffa standard per privati e PMI e accordi quadro per partner istituzionali.",
    privateTitle: "Utenti privati",
    privatePrice: "",
    privateBody: "Per registrazione individuale della titolarita e revisione documentale nel flusso V1 standard.",
    privateIncludes: "Include tracciamento nella dashboard, gestione degli stati ed emissione del passaporto dopo l'approvazione.",
    businessTitle: "PMI / azienda",
    businessPrice: "",
    businessBody: "Per asset aziendali con la stessa struttura di dashboard, richiesta, upload e stato gia usata nel sistema V1.",
    businessIncludes: "Include lavorazione della richiesta, revisione della titolarita e lo stesso percorso passaporto delle registrazioni standard.",
    partnerTitle: "Partner / assicuratori / noleggio",
    partnerPrice: "",
    partnerBody: "Per volumi piu alti, onboarding strutturato e accesso operativo per flussi istituzionali.",
    partnerIncludes: "Le condizioni commerciali e il rollout vengono concordati direttamente prima del lancio in base a volume e modello operativo.",
    afterPaymentTitle: "Cosa succede dopo il pagamento",
    afterPaymentText: "Dopo la conferma del pagamento, la richiesta passa in revisione. Il fascicolo inviato resta visibile nella dashboard durante la validazione.",
    passportTitle: "Spiegazione del passaporto",
    passportText: "Il passaporto EquipRegistry e il record di registro emesso dopo l'approvazione. Collega riferimento, dati principali dell'asset e stato validato.",
    historyTitle: "History Unknown",
    historyText: "History Unknown significa che l'asset e registrato nel sistema ma non e ancora stata stabilita una cronologia di proprieta verificata. E un segnale di stato, non un rifiuto.",
    validationTitle: "Validazione annuale",
    validationText: "La validazione annuale conferma che il passaporto di registro resta aggiornato e supporta rinnovo documentale, continuita di titolarita e affidabilita dello stato.",
    start: "Avvia registrazione",
    contact: "Contatto",
  },
  nl: {
    title: "Tarieven",
    subtitle: "EquipRegistry V1 houdt de prijsstructuur zakelijk: een standaardtarief voor particulieren en mkb en raamafspraken voor institutionele partners.",
    privateTitle: "Particulieren",
    privatePrice: "",
    privateBody: "Voor individuele eigendomsregistratie en documentcontrole binnen de standaard V1-flow.",
    privateIncludes: "Inclusief dashboardopvolging, statusafhandeling en paspoortuitgifte na goedkeuring.",
    businessTitle: "MKB / bedrijf",
    businessPrice: "",
    businessBody: "Voor bedrijfsactiva met dezelfde dashboard-, aanvraag-, upload- en statusstructuur als in het bestaande V1-systeem.",
    businessIncludes: "Inclusief aanvraagverwerking, eigendomscontrole en dezelfde paspoortstroom als standaardregistraties.",
    partnerTitle: "Partners / verzekeraars / verhuur",
    partnerPrice: "",
    partnerBody: "Voor hogere volumes, gestructureerde onboarding en operationele toegang voor institutioneel gebruik.",
    partnerIncludes: "Commerciele voorwaarden en uitrol worden voor de lancering rechtstreeks afgestemd op volume en werkmodel.",
    afterPaymentTitle: "Wat er gebeurt na betaling",
    afterPaymentText: "Na bevestigde betaling gaat de aanvraag naar review. Het ingediende dossier blijft zichtbaar in het dashboard tijdens de validatie.",
    passportTitle: "Paspoortuitleg",
    passportText: "Het EquipRegistry-paspoort is het registerrecord dat na goedkeuring wordt uitgegeven. Het verbindt referentie, kerngegevens van het asset en gevalideerde status.",
    historyTitle: "History Unknown",
    historyText: "History Unknown betekent dat het asset in het systeem is geregistreerd, maar dat nog geen geverifieerde eigendomsgeschiedenis is vastgesteld. Het is een statussignaal, geen afwijzing.",
    validationTitle: "Jaarlijkse validatie",
    validationText: "Jaarlijkse validatie bevestigt dat het registerpaspoort actueel blijft en ondersteunt documentvernieuwing, eigendomscontinuiteit en statusvertrouwen.",
    start: "Registratie starten",
    contact: "Contact",
  },
  pt: {
    title: "Precos",
    subtitle: "A EquipRegistry V1 mantem a estrutura de precos operacional: uma taxa padrao para particulares e PME e acordos-quadro para parceiros institucionais.",
    privateTitle: "Utilizadores privados",
    privatePrice: "",
    privateBody: "Para registo individual de titularidade e revisao documental dentro do fluxo V1 padrao.",
    privateIncludes: "Inclui seguimento no painel, tratamento de estado e emissao do passaporte apos aprovacao.",
    businessTitle: "PME / empresa",
    businessPrice: "",
    businessBody: "Para ativos empresariais com a mesma estrutura de painel, pedido, upload e estado ja usada no sistema V1 existente.",
    businessIncludes: "Inclui processamento do pedido, revisao de titularidade e o mesmo percurso de passaporte das inscricoes padrao.",
    partnerTitle: "Parceiros / seguradoras / aluguer",
    partnerPrice: "",
    partnerBody: "Para volumes mais altos, onboarding estruturado e acesso operacional para fluxos institucionais.",
    partnerIncludes: "As condicoes comerciais e o rollout sao acordados diretamente antes do lancamento conforme volume e modelo operacional.",
    afterPaymentTitle: "O que acontece apos o pagamento",
    afterPaymentText: "Depois de confirmado o pagamento, o pedido entra em revisao. O processo submetido permanece visivel no painel durante a validacao.",
    passportTitle: "Explicacao do passaporte",
    passportText: "O passaporte EquipRegistry e o registo emitido apos aprovacao. Liga referencia, dados essenciais do ativo e estado validado.",
    historyTitle: "History Unknown",
    historyText: "History Unknown significa que o ativo esta registado no sistema, mas ainda nao foi estabelecido um historico de titularidade verificado. E um sinal de estado, nao uma recusa.",
    validationTitle: "Validacao anual",
    validationText: "A validacao anual confirma que o passaporte de registo se mantem atual e apoia renovacao documental, continuidade de titularidade e confianca no estado.",
    start: "Iniciar registo",
    contact: "Contacto",
  },
  ru: {
    title: "Цены",
    subtitle: "EquipRegistry V1 сохраняет практичную ценовую модель: стандартная ставка для частных пользователей и МСП и рамочные соглашения для институциональных партнеров.",
    privateTitle: "Частные пользователи",
    privatePrice: "",
    privateBody: "Для индивидуальной регистрации владения и проверки документов в стандартном потоке V1.",
    privateIncludes: "Включает отслеживание в панели, обработку статусов и выдачу паспорта после одобрения.",
    businessTitle: "МСП / бизнес",
    businessPrice: "",
    businessBody: "Для корпоративных активов с той же структурой панели, запроса, загрузки и статусов, что уже используется в системе V1.",
    businessIncludes: "Включает обработку заявки, проверку владения и тот же паспортный процесс, что и стандартные регистрации.",
    partnerTitle: "Партнеры / страховщики / аренда",
    partnerPrice: "",
    partnerBody: "Для больших объемов, структурированного подключения и операционного доступа в институциональных процессах.",
    partnerIncludes: "Коммерческие условия и запуск согласуются напрямую до старта по объему и рабочей модели.",
    afterPaymentTitle: "Что происходит после оплаты",
    afterPaymentText: "После подтверждения оплаты заявка переходит на проверку. Поданный файл остается видимым в панели во время валидации.",
    passportTitle: "Пояснение по паспорту",
    passportText: "Паспорт EquipRegistry — это запись реестра, выдаваемая после одобрения. Он связывает ссылку регистрации, ключевые данные актива и подтвержденный статус.",
    historyTitle: "History Unknown",
    historyText: "History Unknown означает, что актив зарегистрирован в системе, но подтвержденная история владения еще не установлена. Это статусный сигнал, а не отказ.",
    validationTitle: "Ежегодная валидация",
    validationText: "Ежегодная валидация подтверждает актуальность паспорта реестра и поддерживает обновление документов, непрерывность владения и доверие к статусу.",
    start: "Начать регистрацию",
    contact: "Контакт",
  },
  zh: {
    title: "价格",
    subtitle: "EquipRegistry V1 保持务实的定价结构：个人用户和中小企业采用统一标准费用，机构合作方采用框架协议。",
    privateTitle: "个人用户",
    privatePrice: "",
    privateBody: "适用于标准 V1 流程中的个人所有权登记和文件审核。",
    privateIncludes: "包含控制台跟踪、状态处理以及批准后的护照签发。",
    businessTitle: "中小企业 / 商业",
    businessPrice: "",
    businessBody: "适用于企业资产，沿用现有 V1 系统中的控制台、请求、上传和状态结构。",
    businessIncludes: "包含请求处理、所有权审核以及与标准注册相同的护照流程。",
    partnerTitle: "合作方 / 保险 / 租赁",
    partnerPrice: "",
    partnerBody: "适用于更高体量的使用、结构化接入以及机构流程所需的运营访问。",
    partnerIncludes: "商务条款和上线安排会在发布前根据体量和运营模式直接确定。",
    afterPaymentTitle: "付款后会发生什么",
    afterPaymentText: "付款确认后，请求会进入审核阶段。提交的档案会在验证期间持续显示在控制台中。",
    passportTitle: "护照说明",
    passportText: "EquipRegistry 护照是在批准后签发的注册记录。它连接注册编号、核心资产信息和验证后的状态。",
    historyTitle: "History Unknown",
    historyText: "History Unknown 表示资产已在系统中注册，但尚未建立经过验证的所有权历史。这是状态信号，不是拒绝。",
    validationTitle: "年度验证",
    validationText: "年度验证用于确认注册护照保持最新状态，并支持文件更新、所有权连续性以及长期状态可信度。",
    start: "开始注册",
    contact: "联系我们",
  },
  hi: {
    title: "मूल्य",
    subtitle: "EquipRegistry V1 मूल्य निर्धारण को व्यावहारिक रखता है: निजी उपयोगकर्ताओं और एसएमई के लिए एक मानक शुल्क और संस्थागत भागीदारों के लिए फ्रेमवर्क समझौते.",
    privateTitle: "निजी उपयोगकर्ता",
    privatePrice: "",
    privateBody: "मानक V1 प्रवाह के भीतर व्यक्तिगत स्वामित्व पंजीकरण और दस्तावेज समीक्षा के लिए.",
    privateIncludes: "इसमें डैशबोर्ड ट्रैकिंग, स्थिति प्रबंधन और स्वीकृति के बाद पासपोर्ट जारी करना शामिल है.",
    businessTitle: "एसएमई / व्यवसाय",
    businessPrice: "",
    businessBody: "कंपनी एसेट्स के लिए, उसी डैशबोर्ड, अनुरोध, अपलोड और स्थिति संरचना के साथ जो पहले से V1 प्रणाली में उपयोग हो रही है.",
    businessIncludes: "इसमें अनुरोध प्रसंस्करण, स्वामित्व समीक्षा और मानक पंजीकरण जैसा ही पासपोर्ट प्रवाह शामिल है.",
    partnerTitle: "भागीदार / बीमाकर्ता / किराया",
    partnerPrice: "",
    partnerBody: "उच्च मात्रा, संरचित ऑनबोर्डिंग और संस्थागत प्रक्रियाओं के लिए परिचालन पहुंच हेतु.",
    partnerIncludes: "व्यावसायिक शर्तें और रोलआउट लॉन्च से पहले मात्रा और परिचालन मॉडल के आधार पर सीधे तय किए जाते हैं.",
    afterPaymentTitle: "भुगतान के बाद क्या होता है",
    afterPaymentText: "भुगतान की पुष्टि के बाद अनुरोध समीक्षा में जाता है। जमा की गई फाइल सत्यापन के दौरान डैशबोर्ड में दिखाई देती रहती है.",
    passportTitle: "पासपोर्ट का अर्थ",
    passportText: "EquipRegistry पासपोर्ट वह रजिस्ट्री रिकॉर्ड है जो स्वीकृति के बाद जारी किया जाता है। यह पंजीकरण संदर्भ, मुख्य एसेट डेटा और सत्यापित स्थिति को जोड़ता है.",
    historyTitle: "History Unknown",
    historyText: "History Unknown का अर्थ है कि एसेट सिस्टम में पंजीकृत है, लेकिन अभी तक सत्यापित स्वामित्व इतिहास स्थापित नहीं हुआ है। यह एक स्थिति संकेत है, अस्वीकृति नहीं.",
    validationTitle: "वार्षिक सत्यापन",
    validationText: "वार्षिक सत्यापन यह पुष्टि करता है कि रजिस्ट्री पासपोर्ट अद्यतन बना रहे और दस्तावेज नवीनीकरण, स्वामित्व निरंतरता तथा स्थिति पर भरोसे का समर्थन करे.",
    start: "पंजीकरण शुरू करें",
    contact: "संपर्क करें",
  },
  ar: {
    title: "الاسعار",
    subtitle: "تحافظ EquipRegistry V1 على تسعير عملي: رسم قياسي للمستخدمين الافراد والشركات الصغيرة واتفاقيات اطارية للشركاء المؤسسيين.",
    privateTitle: "المستخدمون الافراد",
    privatePrice: "",
    privateBody: "لتسجيل الملكية الفردية ومراجعة المستندات ضمن تدفق V1 القياسي.",
    privateIncludes: "يشمل تتبع لوحة التحكم ومعالجة الحالة واصدار الجواز بعد الموافقة.",
    businessTitle: "الشركات الصغيرة / الاعمال",
    businessPrice: "",
    businessBody: "لاصول الشركات باستخدام نفس بنية لوحة التحكم والطلب والرفع والحالة المستخدمة بالفعل في نظام V1.",
    businessIncludes: "يشمل معالجة الطلب ومراجعة الملكية ونفس مسار الجواز المستخدم في التسجيلات القياسية.",
    partnerTitle: "الشركاء / شركات التامين / التاجير",
    partnerPrice: "",
    partnerBody: "لاحجام اكبر وتهيئة منظمة ووصول تشغيلي للعمليات المؤسسية.",
    partnerIncludes: "يتم الاتفاق على الشروط التجارية وخطة الاطلاق مباشرة قبل البدء بحسب الحجم والنموذج التشغيلي.",
    afterPaymentTitle: "ماذا يحدث بعد الدفع",
    afterPaymentText: "بعد تاكيد الدفع ينتقل الطلب الى المراجعة. يبقى الملف المرسل مرئيا داخل لوحة التحكم اثناء التحقق.",
    passportTitle: "شرح الجواز",
    passportText: "جواز EquipRegistry هو سجل التسجيل الذي يصدر بعد الموافقة. يربط مرجع التسجيل وبيانات الاصل الاساسية والحالة المعتمدة.",
    historyTitle: "History Unknown",
    historyText: "يعني History Unknown ان الاصل مسجل في النظام لكن لم يتم بعد اثبات سجل ملكية موثق. هذه اشارة حالة وليست رفضا.",
    validationTitle: "التحقق السنوي",
    validationText: "يؤكد التحقق السنوي ان جواز السجل يبقى محدثا ويدعم تحديث المستندات واستمرارية الملكية والثقة في الحالة.",
    start: "بدء التسجيل",
    contact: "اتصال",
  },
};

function Section({
  title,
  category,
  subcategory,
  body,
  includes,
  locale,
}: {
  title: string;
  category: string;
  subcategory?: string;
  body: string;
  includes: string;
  locale: Lang;
}) {
  const pricing = getPricing(category, subcategory);

  return (
    <section className="border-t border-zinc-200 py-8 first:border-t-0 first:pt-0 last:pb-0">
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <h2 className="text-xl font-semibold text-zinc-950">{title}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                Registration
              </p>
              <p className="mt-1 text-sm font-semibold text-zinc-950">
                {formatPricingAmount(pricing.registration, locale)}
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                Yearly
              </p>
              <p className="mt-1 text-sm font-semibold text-zinc-950">
                {formatPricingAmount(pricing.yearly, locale)}
              </p>
            </div>
          </div>
          <p className="mt-3 text-sm leading-6 text-zinc-600">{body}</p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
          <p className="text-sm leading-6 text-zinc-700">{includes}</p>
        </div>
      </div>
    </section>
  );
}

function Info({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-zinc-950">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-zinc-600">{text}</p>
    </section>
  );
}

const PRICING_PAGE_SUBTITLE: Record<Lang, string> = {
  en: "Pricing now follows asset category and subcategory, with a one-time registration fee and a yearly renewal fee from one central source of truth.",
  es: "Los precios ahora dependen de la categoria y subcategoria del activo, con una tarifa unica de registro y una tarifa anual desde una unica fuente central.",
  de: "Die Preislogik richtet sich jetzt nach Asset-Kategorie und Unterkategorie, mit einmaliger Registrierungsgebuehr und jaehrlicher Gebuehr aus einer zentralen Quelle.",
  fr: "La tarification depend desormais de la categorie et de la sous-categorie de l'actif, avec un frais d'enregistrement unique et un frais annuel depuis une source centrale.",
  it: "La tariffazione ora dipende da categoria e sottocategoria dell'asset, con una quota di registrazione una tantum e una quota annuale da un'unica fonte centrale.",
  nl: "De prijs volgt nu de assetcategorie en subcategorie, met een eenmalige registratiekost en een jaarlijkse kost uit een centrale bron.",
  pt: "O preco agora segue a categoria e subcategoria do ativo, com uma taxa unica de registo e uma taxa anual a partir de uma unica fonte central.",
  ru: "Теперь цена зависит от категории и подкатегории актива: единовременный регистрационный сбор и ежегодный сбор берутся из одного центрального источника.",
  zh: "现在的定价依据资产类别和子类别统一计算，包含一次性注册费用和年度续费，全部来自同一个集中配置。",
  hi: "Ab pricing asset category aur subcategory par based hai, jisme ek baar ki registration fee aur yearly fee ek hi central source se aati hai.",
  ar: "اصبح التسعير يعتمد على فئة الاصل والفئة الفرعية، مع رسم تسجيل لمرة واحدة ورسم سنوي من مصدر مركزي واحد.",
};

const PRICING_SECTIONS = [
  {
    title: "Light mobility / step",
    category: "Bikes",
    subcategory: "Electric Scooter",
    body: "For compact personal mobility assets where the pricing bucket is the lowest-entry light mobility tier.",
    includes:
      "Examples: Electric Scooter, Moped / Light Mobility.",
  },
  {
    title: "Bike",
    category: "Bikes",
    subcategory: "E-Bike",
    body: "For bicycle-oriented registrations that stay in the dedicated bike bucket rather than the light mobility tier.",
    includes: "Examples: Bicycle, E-Bike, Cargo Bike.",
  },
  {
    title: "Standard vehicle",
    category: "Vehicles",
    subcategory: "Passenger Car",
    body: "For road-going vehicles and trailer-based assets that fall into the standard vehicle pricing bucket.",
    includes: "Examples: Passenger Car, Van, Truck, Trailer, Caravan.",
  },
  {
    title: "Heavy asset",
    category: "Machines",
    subcategory: "Excavator",
    body: "For industrial, machine, energy, agricultural, medical, and other heavier registration categories.",
    includes:
      "Examples: Excavator, Generator, Battery Storage, Tractor, MRI, Workshop Equipment.",
  },
] as const;

export default async function PricingPage({ params }: Props) {
  const { lang } = await params;

  if (!isValidLang(lang)) {
    notFound();
  }

  const currentLang = lang as Lang;
  const t = TEXT[currentLang] ?? TEXT.en;
  const subtitle = PRICING_PAGE_SUBTITLE[currentLang] ?? PRICING_PAGE_SUBTITLE.en;

  return (
    <>
      <SiteHeader lang={currentLang} />
      <main dir={currentLang === "ar" ? "rtl" : "ltr"} className="min-h-screen bg-zinc-50">
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">EquipRegistry</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">{t.title}</h1>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-zinc-600 sm:text-base">{subtitle}</p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8">
              {PRICING_SECTIONS.map((section) => (
                <Section
                  key={`${section.category}-${section.subcategory}`}
                  title={section.title}
                  category={section.category}
                  subcategory={section.subcategory}
                  body={section.body}
                  includes={section.includes}
                  locale={currentLang}
                />
              ))}
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <Info title={t.afterPaymentTitle} text={t.afterPaymentText} />
              <Info title={t.passportTitle} text={t.passportText} />
              <Info title={t.historyTitle} text={t.historyText} />
              <Info title={t.validationTitle} text={t.validationText} />
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link href={`/${currentLang}/register`} className="inline-flex min-h-11 items-center justify-center rounded-xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800">
                {t.start}
              </Link>
              <Link href={`/${currentLang}/contact`} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50">
                {t.contact}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter lang={currentLang} />
    </>
  );
}
