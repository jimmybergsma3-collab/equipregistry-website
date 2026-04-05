import Link from "next/link";
import { notFound } from "next/navigation";
import { getLangDir, isValidLang, type Lang } from "@/lib/i18n/config";

type PageProps = {
  params: Promise<{
    lang: string;
  }>;
};

type CookiePageText = {
  title: string;
  intro: string;
  lastUpdatedLabel: string;
  lastUpdatedValue: string;
  sections: {
    whatAreCookiesTitle: string;
    whatAreCookiesText: string;
    howWeUseTitle: string;
    necessaryTitle: string;
    necessaryText: string;
    analyticsTitle: string;
    analyticsText: string;
    consentTitle: string;
    consentText: string;
    manageTitle: string;
    manageText: string;
    thirdPartyTitle: string;
    thirdPartyText: string;
    contactTitle: string;
    contactText: string;
  };
  backHome: string;
  privacyLink: string;
};

const COOKIE_PAGE_TEXT: Record<Lang, CookiePageText> = {
  en: {
    title: "Cookie Policy",
    intro:
      "This Cookie Policy explains how EquipRegistry uses cookies and similar technologies when you visit our website.",
    lastUpdatedLabel: "Last updated",
    lastUpdatedValue: "April 2026",
    sections: {
      whatAreCookiesTitle: "What are cookies?",
      whatAreCookiesText:
        "Cookies are small text files stored on your device when you visit a website. They help websites function properly, remember preferences, improve security, and understand how visitors use the site.",
      howWeUseTitle: "How we use cookies",
      necessaryTitle: "1. Necessary cookies",
      necessaryText:
        "Necessary cookies are required for the basic operation, security, and reliability of EquipRegistry. These may support functions such as page navigation, secure sessions, fraud prevention, and essential website performance. These cookies do not require consent where permitted by law.",
      analyticsTitle: "2. Analytics cookies",
      analyticsText:
        "We only use optional analytics cookies after you have given consent. These cookies help us understand website traffic, page usage, and general site performance so we can improve EquipRegistry. At this time, EquipRegistry may use Cloudflare Web Analytics or similar privacy-focused analytics tools.",
      consentTitle: "Your consent",
      consentText:
        "When you first visit our website, you can choose to accept or decline optional analytics cookies. If you decline, only necessary cookies should remain active. You can change your choice later by clearing your browser storage or using future cookie settings controls when available.",
      manageTitle: "Managing cookies",
      manageText:
        "Most browsers allow you to block, delete, or manage cookies through browser settings. Please note that disabling necessary cookies may affect the proper functioning of the website.",
      thirdPartyTitle: "Third-party services",
      thirdPartyText:
        "Some website functions may rely on trusted third-party technical services. Where these services set optional cookies for analytics or similar purposes, they should only be activated after consent.",
      contactTitle: "Contact",
      contactText:
        "If you have questions about this Cookie Policy or the way EquipRegistry uses cookies, you can contact us at info@equipregistry.com.",
    },
    backHome: "Back to homepage",
    privacyLink: "Privacy Policy",
  },

  es: {
    title: "Política de Cookies",
    intro:
      "Esta Política de Cookies explica cómo EquipRegistry utiliza cookies y tecnologías similares cuando visitas nuestro sitio web.",
    lastUpdatedLabel: "Última actualización",
    lastUpdatedValue: "Abril 2026",
    sections: {
      whatAreCookiesTitle: "¿Qué son las cookies?",
      whatAreCookiesText:
        "Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Ayudan a que los sitios web funcionen correctamente, recuerden preferencias, mejoren la seguridad y comprendan cómo los visitantes usan el sitio.",
      howWeUseTitle: "Cómo utilizamos las cookies",
      necessaryTitle: "1. Cookies necesarias",
      necessaryText:
        "Las cookies necesarias son imprescindibles para el funcionamiento básico, la seguridad y la fiabilidad de EquipRegistry. Pueden servir para funciones como la navegación por páginas, sesiones seguras, prevención del fraude y rendimiento esencial del sitio web. Estas cookies no requieren consentimiento cuando la ley lo permite.",
      analyticsTitle: "2. Cookies analíticas",
      analyticsText:
        "Solo utilizamos cookies analíticas opcionales después de que hayas dado tu consentimiento. Estas cookies nos ayudan a comprender el tráfico web, el uso de las páginas y el rendimiento general del sitio para mejorar EquipRegistry. Actualmente, EquipRegistry puede utilizar Cloudflare Web Analytics u otras herramientas analíticas similares centradas en la privacidad.",
      consentTitle: "Tu consentimiento",
      consentText:
        "Cuando visitas nuestro sitio web por primera vez, puedes elegir aceptar o rechazar las cookies analíticas opcionales. Si las rechazas, solo deben permanecer activas las cookies necesarias. Puedes cambiar tu elección más adelante borrando el almacenamiento del navegador o utilizando futuros controles de configuración de cookies cuando estén disponibles.",
      manageTitle: "Gestión de cookies",
      manageText:
        "La mayoría de los navegadores permiten bloquear, eliminar o gestionar las cookies desde la configuración del navegador. Ten en cuenta que desactivar las cookies necesarias puede afectar al funcionamiento correcto del sitio web.",
      thirdPartyTitle: "Servicios de terceros",
      thirdPartyText:
        "Algunas funciones del sitio web pueden depender de servicios técnicos fiables de terceros. Cuando estos servicios establezcan cookies opcionales con fines analíticos o similares, solo deberán activarse tras el consentimiento.",
      contactTitle: "Contacto",
      contactText:
        "Si tienes preguntas sobre esta Política de Cookies o sobre la forma en que EquipRegistry utiliza las cookies, puedes contactarnos en info@equipregistry.com.",
    },
    backHome: "Volver al inicio",
    privacyLink: "Política de Privacidad",
  },

  de: {
    title: "Cookie-Richtlinie",
    intro:
      "Diese Cookie-Richtlinie erklärt, wie EquipRegistry Cookies und ähnliche Technologien verwendet, wenn du unsere Website besuchst.",
    lastUpdatedLabel: "Zuletzt aktualisiert",
    lastUpdatedValue: "April 2026",
    sections: {
      whatAreCookiesTitle: "Was sind Cookies?",
      whatAreCookiesText:
        "Cookies sind kleine Textdateien, die auf deinem Gerät gespeichert werden, wenn du eine Website besuchst. Sie helfen Websites, ordnungsgemäß zu funktionieren, Einstellungen zu speichern, die Sicherheit zu verbessern und zu verstehen, wie Besucher die Website nutzen.",
      howWeUseTitle: "Wie wir Cookies verwenden",
      necessaryTitle: "1. Notwendige Cookies",
      necessaryText:
        "Notwendige Cookies sind für den grundlegenden Betrieb, die Sicherheit und die Zuverlässigkeit von EquipRegistry erforderlich. Sie können Funktionen wie Seitennavigation, sichere Sitzungen, Betrugsprävention und die wesentliche Leistung der Website unterstützen. Diese Cookies erfordern, soweit gesetzlich zulässig, keine Einwilligung.",
      analyticsTitle: "2. Analyse-Cookies",
      analyticsText:
        "Wir verwenden optionale Analyse-Cookies nur, nachdem du deine Zustimmung gegeben hast. Diese Cookies helfen uns, Website-Traffic, Seitennutzung und die allgemeine Leistung der Website zu verstehen, damit wir EquipRegistry verbessern können. Derzeit kann EquipRegistry Cloudflare Web Analytics oder ähnliche datenschutzorientierte Analyse-Tools verwenden.",
      consentTitle: "Deine Einwilligung",
      consentText:
        "Wenn du unsere Website zum ersten Mal besuchst, kannst du optionale Analyse-Cookies akzeptieren oder ablehnen. Wenn du sie ablehnst, sollten nur notwendige Cookies aktiv bleiben. Du kannst deine Entscheidung später ändern, indem du den Browser-Speicher löschst oder zukünftige Cookie-Einstellungen verwendest, sobald diese verfügbar sind.",
      manageTitle: "Cookies verwalten",
      manageText:
        "Die meisten Browser ermöglichen es dir, Cookies über die Browsereinstellungen zu blockieren, zu löschen oder zu verwalten. Bitte beachte, dass das Deaktivieren notwendiger Cookies die ordnungsgemäße Funktion der Website beeinträchtigen kann.",
      thirdPartyTitle: "Drittanbieterdienste",
      thirdPartyText:
        "Einige Website-Funktionen können auf vertrauenswürdige technische Dienste von Drittanbietern angewiesen sein. Wenn diese Dienste optionale Cookies für Analyse- oder ähnliche Zwecke setzen, sollten sie nur nach Einwilligung aktiviert werden.",
      contactTitle: "Kontakt",
      contactText:
        "Wenn du Fragen zu dieser Cookie-Richtlinie oder zur Verwendung von Cookies durch EquipRegistry hast, kannst du uns unter info@equipregistry.com kontaktieren.",
    },
    backHome: "Zur Startseite",
    privacyLink: "Datenschutzerklärung",
  },

  fr: {
    title: "Politique relative aux cookies",
    intro:
      "Cette Politique relative aux cookies explique comment EquipRegistry utilise les cookies et technologies similaires lorsque vous visitez notre site web.",
    lastUpdatedLabel: "Dernière mise à jour",
    lastUpdatedValue: "Avril 2026",
    sections: {
      whatAreCookiesTitle: "Que sont les cookies ?",
      whatAreCookiesText:
        "Les cookies sont de petits fichiers texte stockés sur votre appareil lorsque vous visitez un site web. Ils aident les sites à fonctionner correctement, à mémoriser les préférences, à améliorer la sécurité et à comprendre comment les visiteurs utilisent le site.",
      howWeUseTitle: "Comment nous utilisons les cookies",
      necessaryTitle: "1. Cookies nécessaires",
      necessaryText:
        "Les cookies nécessaires sont indispensables au fonctionnement de base, à la sécurité et à la fiabilité d’EquipRegistry. Ils peuvent prendre en charge des fonctions telles que la navigation, les sessions sécurisées, la prévention de la fraude et les performances essentielles du site. Ces cookies ne nécessitent pas de consentement lorsque la loi l’autorise.",
      analyticsTitle: "2. Cookies analytiques",
      analyticsText:
        "Nous n’utilisons des cookies analytiques optionnels qu’après avoir obtenu votre consentement. Ces cookies nous aident à comprendre le trafic du site, l’utilisation des pages et les performances générales afin d’améliorer EquipRegistry. À ce jour, EquipRegistry peut utiliser Cloudflare Web Analytics ou des outils analytiques similaires axés sur la confidentialité.",
      consentTitle: "Votre consentement",
      consentText:
        "Lors de votre première visite sur notre site, vous pouvez accepter ou refuser les cookies analytiques optionnels. Si vous les refusez, seuls les cookies nécessaires doivent rester actifs. Vous pouvez modifier votre choix ultérieurement en effaçant le stockage de votre navigateur ou en utilisant de futurs contrôles de gestion des cookies lorsqu’ils seront disponibles.",
      manageTitle: "Gestion des cookies",
      manageText:
        "La plupart des navigateurs permettent de bloquer, supprimer ou gérer les cookies via leurs paramètres. Veuillez noter que la désactivation des cookies nécessaires peut affecter le bon fonctionnement du site.",
      thirdPartyTitle: "Services tiers",
      thirdPartyText:
        "Certaines fonctions du site peuvent dépendre de services techniques tiers de confiance. Lorsque ces services déposent des cookies optionnels à des fins analytiques ou similaires, ils ne doivent être activés qu’après consentement.",
      contactTitle: "Contact",
      contactText:
        "Si vous avez des questions concernant cette Politique relative aux cookies ou la manière dont EquipRegistry utilise les cookies, vous pouvez nous contacter à l’adresse info@equipregistry.com.",
    },
    backHome: "Retour à l’accueil",
    privacyLink: "Politique de confidentialité",
  },

  it: {
    title: "Politica sui cookie",
    intro:
      "La presente Politica sui cookie spiega come EquipRegistry utilizza i cookie e tecnologie simili quando visiti il nostro sito web.",
    lastUpdatedLabel: "Ultimo aggiornamento",
    lastUpdatedValue: "Aprile 2026",
    sections: {
      whatAreCookiesTitle: "Cosa sono i cookie?",
      whatAreCookiesText:
        "I cookie sono piccoli file di testo memorizzati sul tuo dispositivo quando visiti un sito web. Aiutano i siti a funzionare correttamente, ricordare le preferenze, migliorare la sicurezza e capire come i visitatori utilizzano il sito.",
      howWeUseTitle: "Come utilizziamo i cookie",
      necessaryTitle: "1. Cookie necessari",
      necessaryText:
        "I cookie necessari sono richiesti per il funzionamento di base, la sicurezza e l’affidabilità di EquipRegistry. Possono supportare funzioni come la navigazione tra le pagine, sessioni sicure, prevenzione delle frodi e prestazioni essenziali del sito. Questi cookie non richiedono consenso ove consentito dalla legge.",
      analyticsTitle: "2. Cookie analitici",
      analyticsText:
        "Utilizziamo cookie analitici opzionali solo dopo che hai espresso il tuo consenso. Questi cookie ci aiutano a comprendere il traffico del sito, l’uso delle pagine e le prestazioni generali per migliorare EquipRegistry. Attualmente EquipRegistry può utilizzare Cloudflare Web Analytics o strumenti analitici simili orientati alla privacy.",
      consentTitle: "Il tuo consenso",
      consentText:
        "Quando visiti il nostro sito per la prima volta, puoi scegliere di accettare o rifiutare i cookie analitici opzionali. Se li rifiuti, dovrebbero rimanere attivi solo i cookie necessari. Puoi modificare la tua scelta in seguito cancellando la memoria del browser o utilizzando futuri controlli delle impostazioni dei cookie quando saranno disponibili.",
      manageTitle: "Gestione dei cookie",
      manageText:
        "La maggior parte dei browser consente di bloccare, eliminare o gestire i cookie tramite le impostazioni del browser. Tieni presente che disabilitare i cookie necessari può influire sul corretto funzionamento del sito.",
      thirdPartyTitle: "Servizi di terze parti",
      thirdPartyText:
        "Alcune funzioni del sito web possono dipendere da servizi tecnici affidabili di terze parti. Quando tali servizi impostano cookie opzionali per finalità analitiche o simili, dovrebbero essere attivati solo dopo il consenso.",
      contactTitle: "Contatti",
      contactText:
        "Se hai domande sulla presente Politica sui cookie o sul modo in cui EquipRegistry utilizza i cookie, puoi contattarci all’indirizzo info@equipregistry.com.",
    },
    backHome: "Torna alla homepage",
    privacyLink: "Informativa sulla privacy",
  },

  nl: {
    title: "Cookiebeleid",
    intro:
      "Dit Cookiebeleid legt uit hoe EquipRegistry cookies en vergelijkbare technologieën gebruikt wanneer je onze website bezoekt.",
    lastUpdatedLabel: "Laatst bijgewerkt",
    lastUpdatedValue: "April 2026",
    sections: {
      whatAreCookiesTitle: "Wat zijn cookies?",
      whatAreCookiesText:
        "Cookies zijn kleine tekstbestanden die op je apparaat worden opgeslagen wanneer je een website bezoekt. Ze helpen websites goed te functioneren, voorkeuren te onthouden, beveiliging te verbeteren en te begrijpen hoe bezoekers de site gebruiken.",
      howWeUseTitle: "Hoe wij cookies gebruiken",
      necessaryTitle: "1. Noodzakelijke cookies",
      necessaryText:
        "Noodzakelijke cookies zijn vereist voor de basiswerking, beveiliging en betrouwbaarheid van EquipRegistry. Deze kunnen functies ondersteunen zoals paginanavigatie, veilige sessies, fraudepreventie en essentiële websiteprestaties. Deze cookies vereisen geen toestemming waar dat wettelijk is toegestaan.",
      analyticsTitle: "2. Analytische cookies",
      analyticsText:
        "Wij gebruiken optionele analytische cookies alleen nadat je toestemming hebt gegeven. Deze cookies helpen ons websiteverkeer, paginagebruik en de algemene prestaties van de site te begrijpen zodat we EquipRegistry kunnen verbeteren. Op dit moment kan EquipRegistry Cloudflare Web Analytics of vergelijkbare privacygerichte analysetools gebruiken.",
      consentTitle: "Jouw toestemming",
      consentText:
        "Wanneer je onze website voor het eerst bezoekt, kun je kiezen om optionele analytische cookies te accepteren of te weigeren. Als je weigert, mogen alleen noodzakelijke cookies actief blijven. Je kunt je keuze later wijzigen door je browseropslag te wissen of toekomstige cookie-instellingen te gebruiken zodra die beschikbaar zijn.",
      manageTitle: "Cookies beheren",
      manageText:
        "De meeste browsers laten je cookies blokkeren, verwijderen of beheren via de browserinstellingen. Houd er rekening mee dat het uitschakelen van noodzakelijke cookies de goede werking van de website kan beïnvloeden.",
      thirdPartyTitle: "Diensten van derden",
      thirdPartyText:
        "Sommige websitefuncties kunnen afhankelijk zijn van vertrouwde technische diensten van derden. Waar deze diensten optionele cookies plaatsen voor analytische of vergelijkbare doeleinden, mogen deze pas na toestemming worden geactiveerd.",
      contactTitle: "Contact",
      contactText:
        "Als je vragen hebt over dit Cookiebeleid of over de manier waarop EquipRegistry cookies gebruikt, kun je contact met ons opnemen via info@equipregistry.com.",
    },
    backHome: "Terug naar homepage",
    privacyLink: "Privacybeleid",
  },

  pt: {
    title: "Política de Cookies",
    intro:
      "Esta Política de Cookies explica como a EquipRegistry utiliza cookies e tecnologias semelhantes quando visita o nosso website.",
    lastUpdatedLabel: "Última atualização",
    lastUpdatedValue: "Abril de 2026",
    sections: {
      whatAreCookiesTitle: "O que são cookies?",
      whatAreCookiesText:
        "Os cookies são pequenos ficheiros de texto armazenados no seu dispositivo quando visita um website. Ajudam os websites a funcionar corretamente, a recordar preferências, a melhorar a segurança e a compreender como os visitantes utilizam o site.",
      howWeUseTitle: "Como utilizamos os cookies",
      necessaryTitle: "1. Cookies necessários",
      necessaryText:
        "Os cookies necessários são essenciais para o funcionamento básico, a segurança e a fiabilidade da EquipRegistry. Podem apoiar funções como navegação nas páginas, sessões seguras, prevenção de fraude e desempenho essencial do website. Estes cookies não exigem consentimento quando permitido por lei.",
      analyticsTitle: "2. Cookies analíticos",
      analyticsText:
        "Utilizamos cookies analíticos opcionais apenas depois de obter o seu consentimento. Estes cookies ajudam-nos a compreender o tráfego do website, a utilização das páginas e o desempenho geral do site para melhorar a EquipRegistry. Atualmente, a EquipRegistry pode utilizar o Cloudflare Web Analytics ou ferramentas analíticas semelhantes focadas na privacidade.",
      consentTitle: "O seu consentimento",
      consentText:
        "Quando visita o nosso website pela primeira vez, pode escolher aceitar ou recusar cookies analíticos opcionais. Se recusar, apenas os cookies necessários deverão permanecer ativos. Pode alterar a sua escolha mais tarde, limpando o armazenamento do navegador ou utilizando futuros controlos de definições de cookies quando estiverem disponíveis.",
      manageTitle: "Gerir cookies",
      manageText:
        "A maioria dos navegadores permite bloquear, eliminar ou gerir cookies através das definições do navegador. Tenha em atenção que desativar cookies necessários pode afetar o funcionamento adequado do website.",
      thirdPartyTitle: "Serviços de terceiros",
      thirdPartyText:
        "Algumas funcionalidades do website podem depender de serviços técnicos fiáveis de terceiros. Quando esses serviços definem cookies opcionais para fins analíticos ou semelhantes, estes só devem ser ativados após consentimento.",
      contactTitle: "Contacto",
      contactText:
        "Se tiver dúvidas sobre esta Política de Cookies ou sobre a forma como a EquipRegistry utiliza cookies, pode contactar-nos através do e-mail info@equipregistry.com.",
    },
    backHome: "Voltar à página inicial",
    privacyLink: "Política de Privacidade",
  },

  ru: {
    title: "Политика использования cookie",
    intro:
      "Настоящая Политика использования cookie объясняет, как EquipRegistry использует cookie и аналогичные технологии при посещении нашего сайта.",
    lastUpdatedLabel: "Последнее обновление",
    lastUpdatedValue: "Апрель 2026",
    sections: {
      whatAreCookiesTitle: "Что такое cookie?",
      whatAreCookiesText:
        "Cookie — это небольшие текстовые файлы, которые сохраняются на вашем устройстве при посещении сайта. Они помогают сайтам работать корректно, запоминать настройки, повышать безопасность и понимать, как посетители используют сайт.",
      howWeUseTitle: "Как мы используем cookie",
      necessaryTitle: "1. Необходимые cookie",
      necessaryText:
        "Необходимые cookie требуются для базовой работы, безопасности и надежности EquipRegistry. Они могут поддерживать такие функции, как навигация по страницам, защищенные сессии, предотвращение мошенничества и критически важная работа сайта. Такие cookie не требуют согласия, если это допускается законом.",
      analyticsTitle: "2. Аналитические cookie",
      analyticsText:
        "Мы используем дополнительные аналитические cookie только после получения вашего согласия. Эти cookie помогают нам понимать посещаемость сайта, использование страниц и общую производительность сайта, чтобы улучшать EquipRegistry. В настоящее время EquipRegistry может использовать Cloudflare Web Analytics или аналогичные аналитические инструменты, ориентированные на конфиденциальность.",
      consentTitle: "Ваше согласие",
      consentText:
        "При первом посещении нашего сайта вы можете принять или отклонить дополнительные аналитические cookie. Если вы откажетесь, активными должны оставаться только необходимые cookie. Позже вы сможете изменить свой выбор, очистив хранилище браузера или используя будущие элементы управления настройками cookie, когда они появятся.",
      manageTitle: "Управление cookie",
      manageText:
        "Большинство браузеров позволяют блокировать, удалять и управлять cookie через настройки браузера. Обратите внимание, что отключение необходимых cookie может повлиять на корректную работу сайта.",
      thirdPartyTitle: "Сторонние сервисы",
      thirdPartyText:
        "Некоторые функции сайта могут зависеть от надежных технических сервисов третьих лиц. Если такие сервисы устанавливают дополнительные cookie для аналитики или аналогичных целей, они должны активироваться только после получения согласия.",
      contactTitle: "Контакты",
      contactText:
        "Если у вас есть вопросы по этой Политике использования cookie или по тому, как EquipRegistry использует cookie, свяжитесь с нами по адресу info@equipregistry.com.",
    },
    backHome: "Вернуться на главную",
    privacyLink: "Политика конфиденциальности",
  },

  hi: {
    title: "कुकी नीति",
    intro:
      "यह कुकी नीति बताती है कि जब आप हमारी वेबसाइट पर जाते हैं तो EquipRegistry कुकीज़ और समान तकनीकों का उपयोग कैसे करता है।",
    lastUpdatedLabel: "अंतिम अपडेट",
    lastUpdatedValue: "अप्रैल 2026",
    sections: {
      whatAreCookiesTitle: "कुकीज़ क्या हैं?",
      whatAreCookiesText:
        "कुकीज़ छोटे टेक्स्ट फ़ाइलें होती हैं जो आपके डिवाइस पर तब संग्रहीत होती हैं जब आप किसी वेबसाइट पर जाते हैं। वे वेबसाइटों को सही तरीके से काम करने, पसंद याद रखने, सुरक्षा बेहतर करने और यह समझने में मदद करती हैं कि विज़िटर साइट का उपयोग कैसे करते हैं।",
      howWeUseTitle: "हम कुकीज़ का उपयोग कैसे करते हैं",
      necessaryTitle: "1. आवश्यक कुकीज़",
      necessaryText:
        "आवश्यक कुकीज़ EquipRegistry के मूल संचालन, सुरक्षा और विश्वसनीयता के लिए जरूरी हैं। ये पेज नेविगेशन, सुरक्षित सत्र, धोखाधड़ी रोकथाम और आवश्यक वेबसाइट प्रदर्शन जैसी सुविधाओं का समर्थन कर सकती हैं। जहां कानून इसकी अनुमति देता है, वहां इन कुकीज़ के लिए सहमति आवश्यक नहीं होती।",
      analyticsTitle: "2. एनालिटिक्स कुकीज़",
      analyticsText:
        "हम वैकल्पिक एनालिटिक्स कुकीज़ का उपयोग केवल आपकी सहमति मिलने के बाद करते हैं। ये कुकीज़ हमें वेबसाइट ट्रैफ़िक, पेज उपयोग और समग्र साइट प्रदर्शन समझने में मदद करती हैं ताकि हम EquipRegistry को बेहतर बना सकें। वर्तमान में EquipRegistry Cloudflare Web Analytics या इसी तरह के गोपनीयता-केंद्रित एनालिटिक्स टूल का उपयोग कर सकता है।",
      consentTitle: "आपकी सहमति",
      consentText:
        "जब आप पहली बार हमारी वेबसाइट पर आते हैं, तो आप वैकल्पिक एनालिटिक्स कुकीज़ को स्वीकार या अस्वीकार कर सकते हैं। यदि आप अस्वीकार करते हैं, तो केवल आवश्यक कुकीज़ सक्रिय रहनी चाहिए। आप बाद में अपने ब्राउज़र स्टोरेज को साफ करके या भविष्य में उपलब्ध होने वाले कुकी सेटिंग नियंत्रणों का उपयोग करके अपनी पसंद बदल सकते हैं।",
      manageTitle: "कुकीज़ प्रबंधन",
      manageText:
        "अधिकांश ब्राउज़र आपको अपनी सेटिंग्स के माध्यम से कुकीज़ को ब्लॉक, हटाने या प्रबंधित करने की अनुमति देते हैं। ध्यान दें कि आवश्यक कुकीज़ को निष्क्रिय करने से वेबसाइट का सही कामकाज प्रभावित हो सकता है।",
      thirdPartyTitle: "थर्ड-पार्टी सेवाएँ",
      thirdPartyText:
        "वेबसाइट की कुछ कार्यक्षमताएँ विश्वसनीय थर्ड-पार्टी तकनीकी सेवाओं पर निर्भर हो सकती हैं। यदि ये सेवाएँ एनालिटिक्स या समान उद्देश्यों के लिए वैकल्पिक कुकीज़ सेट करती हैं, तो उन्हें केवल सहमति के बाद ही सक्रिय किया जाना चाहिए।",
      contactTitle: "संपर्क",
      contactText:
        "यदि आपको इस कुकी नीति या EquipRegistry द्वारा कुकीज़ के उपयोग के बारे में कोई प्रश्न है, तो आप हमसे info@equipregistry.com पर संपर्क कर सकते हैं।",
    },
    backHome: "होमपेज पर वापस जाएँ",
    privacyLink: "गोपनीयता नीति",
  },

  ar: {
    title: "سياسة ملفات تعريف الارتباط",
    intro:
      "توضح سياسة ملفات تعريف الارتباط هذه كيف تستخدم EquipRegistry ملفات تعريف الارتباط والتقنيات المشابهة عند زيارتك لموقعنا الإلكتروني.",
    lastUpdatedLabel: "آخر تحديث",
    lastUpdatedValue: "أبريل 2026",
    sections: {
      whatAreCookiesTitle: "ما هي ملفات تعريف الارتباط؟",
      whatAreCookiesText:
        "ملفات تعريف الارتباط هي ملفات نصية صغيرة يتم تخزينها على جهازك عند زيارة موقع إلكتروني. وهي تساعد المواقع على العمل بشكل صحيح، وتذكر التفضيلات، وتحسين الأمان، وفهم كيفية استخدام الزوار للموقع.",
      howWeUseTitle: "كيف نستخدم ملفات تعريف الارتباط",
      necessaryTitle: "1. ملفات تعريف الارتباط الضرورية",
      necessaryText:
        "تُعد ملفات تعريف الارتباط الضرورية لازمة للتشغيل الأساسي والأمان والموثوقية في EquipRegistry. وقد تدعم وظائف مثل التنقل بين الصفحات، والجلسات الآمنة، ومنع الاحتيال، والأداء الأساسي للموقع. ولا تتطلب هذه الملفات موافقة عندما يسمح القانون بذلك.",
      analyticsTitle: "2. ملفات تعريف الارتباط التحليلية",
      analyticsText:
        "نستخدم ملفات تعريف الارتباط التحليلية الاختيارية فقط بعد حصولنا على موافقتك. تساعدنا هذه الملفات على فهم حركة المرور على الموقع، واستخدام الصفحات، والأداء العام للموقع حتى نتمكن من تحسين EquipRegistry. وفي الوقت الحالي، قد تستخدم EquipRegistry خدمة Cloudflare Web Analytics أو أدوات تحليل مشابهة تراعي الخصوصية.",
      consentTitle: "موافقتك",
      consentText:
        "عند زيارتك الأولى لموقعنا، يمكنك اختيار قبول أو رفض ملفات تعريف الارتباط التحليلية الاختيارية. وإذا رفضت، فيجب أن تظل ملفات تعريف الارتباط الضرورية فقط نشطة. ويمكنك تغيير اختيارك لاحقًا من خلال مسح بيانات المتصفح أو استخدام أدوات إعدادات ملفات تعريف الارتباط المستقبلية عند توفرها.",
      manageTitle: "إدارة ملفات تعريف الارتباط",
      manageText:
        "تسمح معظم المتصفحات بحظر ملفات تعريف الارتباط أو حذفها أو إدارتها من خلال إعدادات المتصفح. يرجى ملاحظة أن تعطيل ملفات تعريف الارتباط الضرورية قد يؤثر على عمل الموقع بشكل صحيح.",
      thirdPartyTitle: "خدمات الجهات الخارجية",
      thirdPartyText:
        "قد تعتمد بعض وظائف الموقع على خدمات تقنية موثوقة تابعة لجهات خارجية. وعندما تقوم هذه الخدمات بتعيين ملفات تعريف ارتباط اختيارية لأغراض تحليلية أو مشابهة، فيجب ألا يتم تفعيلها إلا بعد الحصول على الموافقة.",
      contactTitle: "التواصل",
      contactText:
        "إذا كانت لديك أي أسئلة حول سياسة ملفات تعريف الارتباط هذه أو الطريقة التي تستخدم بها EquipRegistry ملفات تعريف الارتباط، يمكنك التواصل معنا عبر info@equipregistry.com.",
    },
    backHome: "العودة إلى الصفحة الرئيسية",
    privacyLink: "سياسة الخصوصية",
  },

  zh: {
    title: "Cookie 政策",
    intro:
      "本 Cookie 政策说明 EquipRegistry 在您访问我们网站时如何使用 Cookie 和类似技术。",
    lastUpdatedLabel: "最后更新",
    lastUpdatedValue: "2026年4月",
    sections: {
      whatAreCookiesTitle: "什么是 Cookie？",
      whatAreCookiesText:
        "Cookie 是当您访问网站时存储在您设备上的小型文本文件。它们帮助网站正常运行、记住偏好设置、提升安全性，并帮助了解访客如何使用网站。",
      howWeUseTitle: "我们如何使用 Cookie",
      necessaryTitle: "1. 必要 Cookie",
      necessaryText:
        "必要 Cookie 是 EquipRegistry 基本运行、安全性和可靠性所必需的。它们可支持页面导航、安全会话、防欺诈以及网站的基本性能。在法律允许的情况下，这些 Cookie 无需征得同意。",
      analyticsTitle: "2. 分析 Cookie",
      analyticsText:
        "我们仅在您同意后使用可选的分析 Cookie。这些 Cookie 帮助我们了解网站流量、页面使用情况和整体性能，以便改进 EquipRegistry。目前 EquipRegistry 可能使用 Cloudflare Web Analytics 或其他注重隐私的类似分析工具。",
      consentTitle: "您的同意",
      consentText:
        "当您首次访问我们的网站时，您可以选择接受或拒绝可选的分析 Cookie。如果您拒绝，则应仅保留必要 Cookie 处于启用状态。您也可以在以后通过清除浏览器存储或使用未来提供的 Cookie 设置功能来更改您的选择。",
      manageTitle: "管理 Cookie",
      manageText:
        "大多数浏览器允许您通过浏览器设置来阻止、删除或管理 Cookie。请注意，禁用必要 Cookie 可能会影响网站的正常运行。",
      thirdPartyTitle: "第三方服务",
      thirdPartyText:
        "网站的某些功能可能依赖受信任的第三方技术服务。如果这些服务为分析或类似目的设置可选 Cookie，则应仅在获得同意后激活。",
      contactTitle: "联系方式",
      contactText:
        "如果您对本 Cookie 政策或 EquipRegistry 使用 Cookie 的方式有任何疑问，您可以通过 info@equipregistry.com 与我们联系。",
    },
    backHome: "返回首页",
    privacyLink: "隐私政策",
  },
};

export default async function CookiesPage({ params }: PageProps) {
  const { lang } = await params;

  if (!isValidLang(lang)) {
    notFound();
  }

  const safeLang = lang as Lang;
  const text = COOKIE_PAGE_TEXT[safeLang];
  const dir = getLangDir(safeLang);

  return (
    <main
      dir={dir}
      className="min-h-[100svh] bg-white px-4 py-10 text-slate-900 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Link
            href={`/${safeLang}`}
            className="text-sm font-medium text-slate-600 underline underline-offset-4 hover:text-slate-900"
          >
            {text.backHome}
          </Link>
        </div>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <header className="border-b border-slate-200 pb-6">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {text.title}
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600">
              {text.intro}
            </p>
            <p className="mt-4 text-sm text-slate-500">
              <span className="font-medium">{text.lastUpdatedLabel}:</span>{" "}
              {text.lastUpdatedValue}
            </p>
          </header>

          <section className="pt-8">
            <h2 className="text-xl font-semibold">
              {text.sections.whatAreCookiesTitle}
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-700">
              {text.sections.whatAreCookiesText}
            </p>
          </section>

          <section className="pt-8">
            <h2 className="text-xl font-semibold">
              {text.sections.howWeUseTitle}
            </h2>

            <div className="mt-5 space-y-6">
              <div>
                <h3 className="text-lg font-semibold">
                  {text.sections.necessaryTitle}
                </h3>
                <p className="mt-2 text-base leading-7 text-slate-700">
                  {text.sections.necessaryText}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">
                  {text.sections.analyticsTitle}
                </h3>
                <p className="mt-2 text-base leading-7 text-slate-700">
                  {text.sections.analyticsText}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">
                  {text.sections.consentTitle}
                </h3>
                <p className="mt-2 text-base leading-7 text-slate-700">
                  {text.sections.consentText}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">
                  {text.sections.manageTitle}
                </h3>
                <p className="mt-2 text-base leading-7 text-slate-700">
                  {text.sections.manageText}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">
                  {text.sections.thirdPartyTitle}
                </h3>
                <p className="mt-2 text-base leading-7 text-slate-700">
                  {text.sections.thirdPartyText}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">
                  {text.sections.contactTitle}
                </h3>
                <p className="mt-2 text-base leading-7 text-slate-700">
                  {text.sections.contactText}
                </p>
              </div>
            </div>
          </section>

          <footer className="mt-10 border-t border-slate-200 pt-6">
            <Link
              href={`/${safeLang}/privacy`}
              className="text-sm font-medium text-slate-600 underline underline-offset-4 hover:text-slate-900"
            >
              {text.privacyLink}
            </Link>
          </footer>
        </article>
      </div>
    </main>
  );
}