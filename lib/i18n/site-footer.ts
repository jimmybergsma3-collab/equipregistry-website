import type { Lang } from "@/lib/i18n/config";

type SiteFooterText = {
  footer: {
    copyright: string;
    privacy: string;
    terms: string;
    disclaimer: string;
  };
};

const TEXT: Record<Lang, SiteFooterText> = {
  en: {
    footer: {
      copyright: "EquipRegistry - digital asset trust infrastructure",
      privacy: "Privacy policy",
      terms: "Terms and conditions",
      disclaimer: "Disclaimer",
    },
  },
  es: {
    footer: {
      copyright: "EquipRegistry - infraestructura digital de confianza para activos",
      privacy: "Política de privacidad",
      terms: "Términos y condiciones",
      disclaimer: "Aviso legal",
    },
  },
  de: {
    footer: {
      copyright: "EquipRegistry - digitale Vertrauensinfrastruktur für Assets",
      privacy: "Datenschutz",
      terms: "Bedingungen",
      disclaimer: "Haftungsausschluss",
    },
  },
  fr: {
    footer: {
      copyright: "EquipRegistry - infrastructure numérique de confiance pour les actifs",
      privacy: "Politique de confidentialité",
      terms: "Conditions générales",
      disclaimer: "Clause de non-responsabilité",
    },
  },
  it: {
    footer: {
      copyright: "EquipRegistry - infrastruttura digitale di fiducia per gli asset",
      privacy: "Privacy",
      terms: "Termini e condizioni",
      disclaimer: "Disclaimer",
    },
  },
  nl: {
    footer: {
      copyright: "EquipRegistry - digitale vertrouwensinfrastructuur voor assets",
      privacy: "Privacybeleid",
      terms: "Voorwaarden",
      disclaimer: "Disclaimer",
    },
  },
  pt: {
    footer: {
      copyright: "EquipRegistry - infraestrutura digital de confiança para ativos",
      privacy: "Política de privacidade",
      terms: "Termos e condições",
      disclaimer: "Exoneração de responsabilidade",
    },
  },
  pl: {
    footer: {
      copyright: "EquipRegistry - cyfrowa infrastruktura zaufania dla aktywów",
      privacy: "Polityka prywatności",
      terms: "Warunki",
      disclaimer: "Zastrzeżenie prawne",
    },
  },
  sv: {
    footer: {
      copyright: "EquipRegistry - digital tillitsinfrastruktur för tillgångar",
      privacy: "Integritetspolicy",
      terms: "Villkor",
      disclaimer: "Ansvarsfriskrivning",
    },
  },
  da: {
    footer: {
      copyright: "EquipRegistry - digital tillidsinfrastruktur for aktiver",
      privacy: "Privatlivspolitik",
      terms: "Vilkår",
      disclaimer: "Ansvarsfraskrivelse",
    },
  },
  no: {
    footer: {
      copyright: "EquipRegistry - digital tillitsinfrastruktur for eiendeler",
      privacy: "Personvernpolicy",
      terms: "Vilkår",
      disclaimer: "Ansvarsfraskrivelse",
    },
  },
  ru: {
    footer: {
      copyright: "EquipRegistry - цифровая инфраструктура доверия для активов",
      privacy: "Политика конфиденциальности",
      terms: "Условия",
      disclaimer: "Отказ от ответственности",
    },
  },
  zh: {
    footer: {
      copyright: "EquipRegistry - 资产数字信任基础设施",
      privacy: "隐私政策",
      terms: "条款与条件",
      disclaimer: "免责声明",
    },
  },
  hi: {
    footer: {
      copyright: "EquipRegistry - एसेट के लिए डिजिटल ट्रस्ट इन्फ्रास्ट्रक्चर",
      privacy: "गोपनीयता नीति",
      terms: "नियम और शर्तें",
      disclaimer: "अस्वीकरण",
    },
  },
  ar: {
    footer: {
      copyright: "EquipRegistry - بنية رقمية موثوقة للأصول",
      privacy: "سياسة الخصوصية",
      terms: "الشروط والأحكام",
      disclaimer: "إخلاء المسؤولية",
    },
  },
};

export function getSiteFooterText(lang: Lang): SiteFooterText {
  return TEXT[lang] ?? TEXT.en;
}
