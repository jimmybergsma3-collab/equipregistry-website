import type { Lang } from "@/lib/i18n/config";
import { COMPANY_FOOTER_TEXT } from "@/lib/company-details";

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
      copyright: COMPANY_FOOTER_TEXT,
      privacy: "Privacy policy",
      terms: "Terms and conditions",
      disclaimer: "Disclaimer",
    },
  },
  es: {
    footer: {
      copyright: COMPANY_FOOTER_TEXT,
      privacy: "Política de privacidad",
      terms: "Términos y condiciones",
      disclaimer: "Aviso legal",
    },
  },
  de: {
    footer: {
      copyright: COMPANY_FOOTER_TEXT,
      privacy: "Datenschutz",
      terms: "Bedingungen",
      disclaimer: "Haftungsausschluss",
    },
  },
  fr: {
    footer: {
      copyright: COMPANY_FOOTER_TEXT,
      privacy: "Politique de confidentialité",
      terms: "Conditions générales",
      disclaimer: "Clause de non-responsabilité",
    },
  },
  it: {
    footer: {
      copyright: COMPANY_FOOTER_TEXT,
      privacy: "Privacy",
      terms: "Termini e condizioni",
      disclaimer: "Disclaimer",
    },
  },
  nl: {
    footer: {
      copyright: COMPANY_FOOTER_TEXT,
      privacy: "Privacybeleid",
      terms: "Voorwaarden",
      disclaimer: "Disclaimer",
    },
  },
  pt: {
    footer: {
      copyright: COMPANY_FOOTER_TEXT,
      privacy: "Política de privacidade",
      terms: "Termos e condições",
      disclaimer: "Exoneração de responsabilidade",
    },
  },
  pl: {
    footer: {
      copyright: COMPANY_FOOTER_TEXT,
      privacy: "Polityka prywatności",
      terms: "Warunki",
      disclaimer: "Zastrzeżenie prawne",
    },
  },
  sv: {
    footer: {
      copyright: COMPANY_FOOTER_TEXT,
      privacy: "Integritetspolicy",
      terms: "Villkor",
      disclaimer: "Ansvarsfriskrivning",
    },
  },
  da: {
    footer: {
      copyright: COMPANY_FOOTER_TEXT,
      privacy: "Privatlivspolitik",
      terms: "Vilkår",
      disclaimer: "Ansvarsfraskrivelse",
    },
  },
  no: {
    footer: {
      copyright: COMPANY_FOOTER_TEXT,
      privacy: "Personvernpolicy",
      terms: "Vilkår",
      disclaimer: "Ansvarsfraskrivelse",
    },
  },
  ru: {
    footer: {
      copyright: COMPANY_FOOTER_TEXT,
      privacy: "Политика конфиденциальности",
      terms: "Условия",
      disclaimer: "Отказ от ответственности",
    },
  },
  zh: {
    footer: {
      copyright: COMPANY_FOOTER_TEXT,
      privacy: "隐私政策",
      terms: "条款与条件",
      disclaimer: "免责声明",
    },
  },
  hi: {
    footer: {
      copyright: COMPANY_FOOTER_TEXT,
      privacy: "गोपनीयता नीति",
      terms: "नियम और शर्तें",
      disclaimer: "अस्वीकरण",
    },
  },
  ar: {
    footer: {
      copyright: COMPANY_FOOTER_TEXT,
      privacy: "سياسة الخصوصية",
      terms: "الشروط والأحكام",
      disclaimer: "إخلاء المسؤولية",
    },
  },
};

export function getSiteFooterText(lang: Lang): SiteFooterText {
  return TEXT[lang] ?? TEXT.en;
}
