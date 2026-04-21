import type { Lang } from "@/lib/i18n/config";
import { MAILBOXES } from "@/lib/email/addresses";
import { repairMojibakeDeep } from "@/lib/i18n/repair-mojibake";

type VerificationEmailParams = {
  ownerName: string;
  verifyUrl: string;
  lang: Lang;
};

type VerificationEmailContent = {
  subject: string;
  greeting: string;
  welcome: string;
  instruction: string;
  button: string;
  fallback: string;
  ignore: string;
  signature: string;
};

const TRANSACTIONAL_SIGNATURE = `EquipRegistry · ${MAILBOXES.transactionalFromEmail}`;

const CONTENT: Record<Lang, VerificationEmailContent> = {
  en: {
    subject: "Verify your email address | EquipRegistry",
    greeting: "Hello",
    welcome: "Welcome to EquipRegistry.",
    instruction:
      "Please verify your email address to activate your account and continue with your registration.",
    button: "Verify email address",
    fallback:
      "If the button does not work, copy and paste this link into your browser:",
    ignore:
      "If you did not create this account, you can ignore this email.",
    signature: "EquipRegistry · info@equipregistry.com",
  },
  es: {
    subject: "Verifique su correo electrónico | EquipRegistry",
    greeting: "Hola",
    welcome: "Bienvenido a EquipRegistry.",
    instruction:
      "Verifique su dirección de correo electrónico para activar su cuenta y continuar con su registro.",
    button: "Verificar correo electrónico",
    fallback:
      "Si el botón no funciona, copie y pegue este enlace en su navegador:",
    ignore: "Si no creó esta cuenta, puede ignorar este correo electrónico.",
    signature: "EquipRegistry · info@equipregistry.com",
  },
  de: {
    subject: "Bestätigen Sie Ihre E-Mail-Adresse | EquipRegistry",
    greeting: "Hallo",
    welcome: "Willkommen bei EquipRegistry.",
    instruction:
      "Bitte bestätigen Sie Ihre E-Mail-Adresse, um Ihr Konto zu aktivieren und mit Ihrer Registrierung fortzufahren.",
    button: "E-Mail-Adresse bestätigen",
    fallback:
      "Wenn die Schaltfläche nicht funktioniert, kopieren Sie diesen Link und fügen Sie ihn in Ihren Browser ein:",
    ignore:
      "Falls Sie dieses Konto nicht erstellt haben, können Sie diese E-Mail ignorieren.",
    signature: "EquipRegistry · info@equipregistry.com",
  },
  fr: {
    subject: "Vérifiez votre adresse e-mail | EquipRegistry",
    greeting: "Bonjour",
    welcome: "Bienvenue sur EquipRegistry.",
    instruction:
      "Veuillez vérifier votre adresse e-mail pour activer votre compte et poursuivre votre enregistrement.",
    button: "Vérifier l’adresse e-mail",
    fallback:
      "Si le bouton ne fonctionne pas, copiez et collez ce lien dans votre navigateur :",
    ignore:
      "Si vous n’avez pas créé ce compte, vous pouvez ignorer cet e-mail.",
    signature: "EquipRegistry · info@equipregistry.com",
  },
  it: {
    subject: "Verifica il tuo indirizzo e-mail | EquipRegistry",
    greeting: "Ciao",
    welcome: "Benvenuto su EquipRegistry.",
    instruction:
      "Verifica il tuo indirizzo e-mail per attivare il tuo account e continuare con la registrazione.",
    button: "Verifica indirizzo e-mail",
    fallback:
      "Se il pulsante non funziona, copia e incolla questo link nel browser:",
    ignore: "Se non hai creato questo account, puoi ignorare questa e-mail.",
    signature: "EquipRegistry · info@equipregistry.com",
  },
  nl: {
    subject: "Verifieer je e-mailadres | EquipRegistry",
    greeting: "Hallo",
    welcome: "Welkom bij EquipRegistry.",
    instruction:
      "Verifieer je e-mailadres om je account te activeren en verder te gaan met je registratie.",
    button: "Verifieer e-mailadres",
    fallback:
      "Als de knop niet werkt, kopieer en plak deze link in je browser:",
    ignore:
      "Als jij dit account niet hebt aangemaakt, kun je deze e-mail negeren.",
    signature: "EquipRegistry · info@equipregistry.com",
  },
  pt: {
    subject: "Verifique o seu endereço de e-mail | EquipRegistry",
    greeting: "Olá",
    welcome: "Bem-vindo à EquipRegistry.",
    instruction:
      "Verifique o seu endereço de e-mail para ativar a sua conta e continuar com o seu registo.",
    button: "Verificar endereço de e-mail",
    fallback:
      "Se o botão não funcionar, copie e cole esta ligação no seu navegador:",
    ignore:
      "Se não criou esta conta, pode ignorar este e-mail.",
    signature: "EquipRegistry · info@equipregistry.com",
  },
  ru: {
    subject: "Подтвердите свой адрес электронной почты | EquipRegistry",
    greeting: "Здравствуйте",
    welcome: "Добро пожаловать в EquipRegistry.",
    instruction:
      "Пожалуйста, подтвердите свой адрес электронной почты, чтобы активировать учетную запись и продолжить регистрацию.",
    button: "Подтвердить адрес электронной почты",
    fallback:
      "Если кнопка не работает, скопируйте и вставьте эту ссылку в браузер:",
    ignore:
      "Если вы не создавали эту учетную запись, просто проигнорируйте это письмо.",
    signature: "EquipRegistry · info@equipregistry.com",
  },
  zh: {
    subject: "验证您的电子邮箱地址 | EquipRegistry",
    greeting: "您好",
    welcome: "欢迎使用 EquipRegistry。",
    instruction:
      "请验证您的电子邮箱地址，以激活您的账户并继续完成注册。",
    button: "验证电子邮箱地址",
    fallback: "如果按钮无法使用，请将此链接复制并粘贴到浏览器中：",
    ignore: "如果不是您创建的此账户，您可以忽略此邮件。",
    signature: "EquipRegistry · info@equipregistry.com",
  },
  hi: {
    subject: "अपने ईमेल पते की पुष्टि करें | EquipRegistry",
    greeting: "नमस्ते",
    welcome: "EquipRegistry में आपका स्वागत है।",
    instruction:
      "अपने खाते को सक्रिय करने और अपने पंजीकरण को जारी रखने के लिए कृपया अपने ईमेल पते की पुष्टि करें।",
    button: "ईमेल पता सत्यापित करें",
    fallback:
      "यदि बटन काम नहीं करता है, तो इस लिंक को कॉपी करके अपने ब्राउज़र में पेस्ट करें:",
    ignore:
      "यदि आपने यह खाता नहीं बनाया है, तो आप इस ईमेल को अनदेखा कर सकते हैं।",
    signature: "EquipRegistry · info@equipregistry.com",
  },
  ar: {
    subject: "قم بتأكيد عنوان بريدك الإلكتروني | EquipRegistry",
    greeting: "مرحبًا",
    welcome: "مرحبًا بك في EquipRegistry.",
    instruction:
      "يرجى تأكيد عنوان بريدك الإلكتروني لتفعيل حسابك ومتابعة التسجيل.",
    button: "تأكيد عنوان البريد الإلكتروني",
    fallback:
      "إذا لم يعمل الزر، انسخ هذا الرابط والصقه في متصفحك:",
    ignore:
      "إذا لم تقم بإنشاء هذا الحساب، يمكنك تجاهل هذا البريد الإلكتروني.",
    signature: "EquipRegistry · info@equipregistry.com",
  },

  pl: {
    subject: "Zweryfikuj swoj adres e-mail | EquipRegistry",
    greeting: "Witaj",
    welcome: "Witamy w EquipRegistry.",
    instruction:
      "Zweryfikuj swoj adres e-mail, aby aktywowac konto i kontynuowac rejestracje.",
    button: "Zweryfikuj adres e-mail",
    fallback:
      "Jesli przycisk nie dziala, skopiuj i wklej ten link do przegladarki:",
    ignore:
      "Jesli nie utworzyles tego konta, mozesz zignorowac ten e-mail.",
    signature: "EquipRegistry · info@equipregistry.com",
  },
  sv: {
    subject: "Verifiera din e-postadress | EquipRegistry",
    greeting: "Hej",
    welcome: "Valkommen till EquipRegistry.",
    instruction:
      "Verifiera din e-postadress for att aktivera ditt konto och fortsatta med din registrering.",
    button: "Verifiera e-postadress",
    fallback:
      "Om knappen inte fungerar, kopiera och klistra in den har lanken i din webblasare:",
    ignore:
      "Om du inte skapade detta konto kan du ignorera det har mailet.",
    signature: "EquipRegistry · info@equipregistry.com",
  },
  da: {
    subject: "Bekraeft din e-mailadresse | EquipRegistry",
    greeting: "Hej",
    welcome: "Velkommen til EquipRegistry.",
    instruction:
      "Bekraeft din e-mailadresse for at aktivere din konto og fortsaette med din registrering.",
    button: "Bekraeft e-mailadresse",
    fallback:
      "Hvis knappen ikke virker, skal du kopiere og indsatte dette link i din browser:",
    ignore:
      "Hvis du ikke har oprettet denne konto, kan du se bort fra denne e-mail.",
    signature: "EquipRegistry · info@equipregistry.com",
  },
  no: {
    subject: "Verifiser e-postadressen din | EquipRegistry",
    greeting: "Hei",
    welcome: "Velkommen til EquipRegistry.",
    instruction:
      "Verifiser e-postadressen din for a aktivere kontoen din og fortsette med registreringen.",
    button: "Verifiser e-postadresse",
    fallback:
      "Hvis knappen ikke fungerer, kopier og lim inn denne lenken i nettleseren din:",
    ignore:
      "Hvis du ikke opprettet denne kontoen, kan du ignorere denne e-posten.",
    signature: "EquipRegistry · info@equipregistry.com",
  },
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function buildAccountVerificationEmail({
  ownerName,
  verifyUrl,
  lang,
}: VerificationEmailParams) {
  const t = repairMojibakeDeep(CONTENT[lang] ?? CONTENT.en);
  const signature = repairMojibakeDeep(TRANSACTIONAL_SIGNATURE);
  const safeName = ownerName.trim() || "User";
  const dir = lang === "ar" ? "rtl" : "ltr";
  const align = lang === "ar" ? "right" : "left";

  const greetingLine = `${t.greeting} ${safeName},`;

  const text = `${greetingLine}

${t.welcome}

${t.instruction}

${verifyUrl}

${t.fallback}
${verifyUrl}

${t.ignore}

${signature}`;

  const html = `
    <div dir="${dir}" style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #111;">
      <div style="max-width: 640px; margin: 0 auto; padding: 24px; text-align: ${align};">
        <div style="padding: 24px; border: 1px solid #e5e7eb; border-radius: 16px; background: #ffffff;">
          <p style="margin: 0 0 16px;">${escapeHtml(greetingLine)}</p>

          <p style="margin: 0 0 16px;">
            ${escapeHtml(t.welcome)}
          </p>

          <p style="margin: 0 0 24px;">
            ${escapeHtml(t.instruction)}
          </p>

          <p style="margin: 0 0 24px;">
            <a
              href="${verifyUrl}"
              style="display: inline-block; background: #111111; color: #ffffff; text-decoration: none; padding: 12px 18px; border-radius: 10px; font-weight: 600;"
            >
              ${escapeHtml(t.button)}
            </a>
          </p>

          <p style="margin: 0 0 12px; font-size: 14px; color: #4b5563;">
            ${escapeHtml(t.fallback)}
          </p>

          <p style="margin: 0 0 24px; word-break: break-all; font-size: 14px;">
            <a href="${verifyUrl}" style="color: #2563eb;">${escapeHtml(verifyUrl)}</a>
          </p>

          <p style="margin: 0; font-size: 14px; color: #6b7280;">
            ${escapeHtml(t.ignore)}
          </p>
        </div>

        <p style="margin: 16px 0 0; font-size: 12px; color: #6b7280; text-align: center;">
          ${escapeHtml(signature)}
        </p>
      </div>
    </div>
  `;

  return {
    subject: t.subject,
    text,
    html,
  };
}
