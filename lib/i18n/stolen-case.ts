import { DEFAULT_LANG, isValidLang, type Lang } from "./config";

export type StolenCaseText = {
  admin: {
    title: string;
    description: string;
    uploadNote: string;
    statusLabel: string;
    open: string;
    resolved: string;
    save: string;
    update: string;
    resolve: string;
    processing: string;
    refsHint: string;
    fields: {
      caseReference: string;
      policeReportNumber: string;
      policeReportDate: string;
      country: string;
      cityRegion: string;
      incidentDate: string;
      incidentDescription: string;
      supportingDocumentReferences: string;
      caseNotes: string;
      createdBy: string;
      updatedBy: string;
      createdAt: string;
      updatedAt: string;
      resolvedAt: string;
    };
    messages: {
      saved: string;
      resolved: string;
      notEligible: string;
      missingDescription: string;
      caseMissing: string;
      requestMissing: string;
    };
  };
  public: {
    warningTitle: string;
    limitedInfo: string;
    caseReference: string;
    incidentLocation: string;
    incidentDate: string;
    policeReportDate: string;
    unknownLocation: string;
    unknownDate: string;
  };
};

const TEXT: Record<Lang, StolenCaseText> = {
  en: {
    admin: {
      title: "Stolen case",
      description: "Manage the structured stolen case record for this asset.",
      uploadNote:
        "Uploads can be linked later. For now, add internal document references or filenames.",
      statusLabel: "Case status",
      open: "Open stolen flag",
      resolved: "Resolved",
      save: "Save stolen case",
      update: "Update stolen case",
      resolve: "Resolve case",
      processing: "Processing...",
      refsHint: "One reference per line.",
      fields: {
        caseReference: "Case reference",
        policeReportNumber: "Police report number",
        policeReportDate: "Police report date",
        country: "Country",
        cityRegion: "City / region",
        incidentDate: "Incident date",
        incidentDescription: "Incident description",
        supportingDocumentReferences: "Supporting document references",
        caseNotes: "Case notes",
        createdBy: "Created by",
        updatedBy: "Updated by",
        createdAt: "Created at",
        updatedAt: "Updated at",
        resolvedAt: "Resolved at",
      },
      messages: {
        saved: "Stolen case saved and warning activated.",
        resolved: "Stolen case resolved and warning removed.",
        notEligible:
          "Only approved or passport-issued registrations can manage a stolen case.",
        missingDescription: "Incident description is required.",
        caseMissing: "No stolen case was found for this registration.",
        requestMissing: "Registration not found.",
      },
    },
    public: {
      warningTitle: "Stolen case warning",
      limitedInfo:
        "Only limited public case information is shown here. Police files and internal notes stay restricted.",
      caseReference: "Public case reference",
      incidentLocation: "Incident location",
      incidentDate: "Incident date",
      policeReportDate: "Police report date",
      unknownLocation: "Location withheld",
      unknownDate: "Date withheld",
    },
  },
  es: {
    admin: {
      title: "Caso de robo",
      description: "Gestione el expediente estructurado de robo para este activo.",
      uploadNote:
        "Las cargas se conectaran despues. Por ahora, agregue referencias internas o nombres de archivo.",
      statusLabel: "Estado del caso",
      open: "Robo activo",
      resolved: "Resuelto",
      save: "Guardar caso de robo",
      update: "Actualizar caso de robo",
      resolve: "Resolver caso",
      processing: "Procesando...",
      refsHint: "Una referencia por linea.",
      fields: {
        caseReference: "Referencia del caso",
        policeReportNumber: "Numero de denuncia policial",
        policeReportDate: "Fecha de la denuncia policial",
        country: "Pais",
        cityRegion: "Ciudad / region",
        incidentDate: "Fecha del incidente",
        incidentDescription: "Descripcion del incidente",
        supportingDocumentReferences: "Referencias de documentos de apoyo",
        caseNotes: "Notas del caso",
        createdBy: "Creado por",
        updatedBy: "Actualizado por",
        createdAt: "Creado el",
        updatedAt: "Actualizado el",
        resolvedAt: "Resuelto el",
      },
      messages: {
        saved: "Caso de robo guardado y advertencia activada.",
        resolved: "Caso de robo resuelto y advertencia retirada.",
        notEligible:
          "Solo los registros aprobados o con pasaporte emitido pueden gestionar un caso de robo.",
        missingDescription: "La descripcion del incidente es obligatoria.",
        caseMissing: "No se encontro un caso de robo para este registro.",
        requestMissing: "Registro no encontrado.",
      },
    },
    public: {
      warningTitle: "Advertencia de caso de robo",
      limitedInfo:
        "Aqui solo se muestra informacion publica limitada. Los archivos policiales y las notas internas permanecen restringidos.",
      caseReference: "Referencia publica del caso",
      incidentLocation: "Lugar del incidente",
      incidentDate: "Fecha del incidente",
      policeReportDate: "Fecha de la denuncia policial",
      unknownLocation: "Ubicacion reservada",
      unknownDate: "Fecha reservada",
    },
  },
  de: {
    admin: {
      title: "Diebstahlfall",
      description: "Verwalten Sie den strukturierten Diebstahlfall fuer dieses Asset.",
      uploadNote:
        "Uploads werden spaeter angebunden. Tragen Sie vorerst interne Referenzen oder Dateinamen ein.",
      statusLabel: "Fallstatus",
      open: "Diebstahl aktiv",
      resolved: "Geloest",
      save: "Diebstahlfall speichern",
      update: "Diebstahlfall aktualisieren",
      resolve: "Fall schliessen",
      processing: "Verarbeitung...",
      refsHint: "Eine Referenz pro Zeile.",
      fields: {
        caseReference: "Fallreferenz",
        policeReportNumber: "Polizeiberichtsnummer",
        policeReportDate: "Datum des Polizeiberichts",
        country: "Land",
        cityRegion: "Stadt / Region",
        incidentDate: "Vorfallsdatum",
        incidentDescription: "Beschreibung des Vorfalls",
        supportingDocumentReferences: "Referenzen zu Belegdokumenten",
        caseNotes: "Fallnotizen",
        createdBy: "Erstellt von",
        updatedBy: "Aktualisiert von",
        createdAt: "Erstellt am",
        updatedAt: "Aktualisiert am",
        resolvedAt: "Geloest am",
      },
      messages: {
        saved: "Diebstahlfall gespeichert und Warnung aktiviert.",
        resolved: "Diebstahlfall geloest und Warnung entfernt.",
        notEligible:
          "Nur genehmigte oder pass-ausgestellte Registrierungen koennen einen Diebstahlfall verwalten.",
        missingDescription: "Eine Vorfallsbeschreibung ist erforderlich.",
        caseMissing: "Fuer diese Registrierung wurde kein Diebstahlfall gefunden.",
        requestMissing: "Registrierung nicht gefunden.",
      },
    },
    public: {
      warningTitle: "Warnung zum Diebstahlfall",
      limitedInfo:
        "Hier werden nur begrenzte oeffentliche Informationen angezeigt. Polizeidateien und interne Notizen bleiben geschuetzt.",
      caseReference: "Oeffentliche Fallreferenz",
      incidentLocation: "Vorfallsort",
      incidentDate: "Vorfallsdatum",
      policeReportDate: "Datum des Polizeiberichts",
      unknownLocation: "Ort zurueckgehalten",
      unknownDate: "Datum zurueckgehalten",
    },
  },
  fr: {
    admin: {
      title: "Dossier de vol",
      description: "Gerez le dossier de vol structure pour cet actif.",
      uploadNote:
        "Les televersements seront relies plus tard. Pour l'instant, ajoutez des references internes ou des noms de fichiers.",
      statusLabel: "Statut du dossier",
      open: "Vol actif",
      resolved: "Resolu",
      save: "Enregistrer le dossier de vol",
      update: "Mettre a jour le dossier de vol",
      resolve: "Resoudre le dossier",
      processing: "Traitement...",
      refsHint: "Une reference par ligne.",
      fields: {
        caseReference: "Reference du dossier",
        policeReportNumber: "Numero de rapport de police",
        policeReportDate: "Date du rapport de police",
        country: "Pays",
        cityRegion: "Ville / region",
        incidentDate: "Date de l'incident",
        incidentDescription: "Description de l'incident",
        supportingDocumentReferences: "References des documents justificatifs",
        caseNotes: "Notes du dossier",
        createdBy: "Cree par",
        updatedBy: "Mis a jour par",
        createdAt: "Cree le",
        updatedAt: "Mis a jour le",
        resolvedAt: "Resolu le",
      },
      messages: {
        saved: "Dossier de vol enregistre et alerte activee.",
        resolved: "Dossier de vol resolu et alerte retiree.",
        notEligible:
          "Seuls les enregistrements approuves ou avec passeport emis peuvent gerer un dossier de vol.",
        missingDescription: "La description de l'incident est obligatoire.",
        caseMissing: "Aucun dossier de vol n'a ete trouve pour cet enregistrement.",
        requestMissing: "Enregistrement introuvable.",
      },
    },
    public: {
      warningTitle: "Alerte dossier de vol",
      limitedInfo:
        "Seules des informations publiques limitees sont affichees ici. Les fichiers de police et les notes internes restent restreints.",
      caseReference: "Reference publique du dossier",
      incidentLocation: "Lieu de l'incident",
      incidentDate: "Date de l'incident",
      policeReportDate: "Date du rapport de police",
      unknownLocation: "Lieu non divulgue",
      unknownDate: "Date non divulguee",
    },
  },
  it: {
    admin: {
      title: "Caso di furto",
      description: "Gestisci il fascicolo strutturato di furto per questo asset.",
      uploadNote:
        "I caricamenti saranno collegati in seguito. Per ora aggiungi riferimenti interni o nomi file.",
      statusLabel: "Stato del caso",
      open: "Furto attivo",
      resolved: "Risolto",
      save: "Salva caso di furto",
      update: "Aggiorna caso di furto",
      resolve: "Risolvi caso",
      processing: "Elaborazione...",
      refsHint: "Un riferimento per riga.",
      fields: {
        caseReference: "Riferimento caso",
        policeReportNumber: "Numero del rapporto di polizia",
        policeReportDate: "Data del rapporto di polizia",
        country: "Paese",
        cityRegion: "Citta / regione",
        incidentDate: "Data dell'incidente",
        incidentDescription: "Descrizione dell'incidente",
        supportingDocumentReferences: "Riferimenti ai documenti di supporto",
        caseNotes: "Note del caso",
        createdBy: "Creato da",
        updatedBy: "Aggiornato da",
        createdAt: "Creato il",
        updatedAt: "Aggiornato il",
        resolvedAt: "Risolto il",
      },
      messages: {
        saved: "Caso di furto salvato e avviso attivato.",
        resolved: "Caso di furto risolto e avviso rimosso.",
        notEligible:
          "Solo le registrazioni approvate o con passaporto emesso possono gestire un caso di furto.",
        missingDescription: "La descrizione dell'incidente e obbligatoria.",
        caseMissing: "Nessun caso di furto trovato per questa registrazione.",
        requestMissing: "Registrazione non trovata.",
      },
    },
    public: {
      warningTitle: "Avviso caso di furto",
      limitedInfo:
        "Qui viene mostrata solo una parte limitata delle informazioni pubbliche. I file di polizia e le note interne restano riservati.",
      caseReference: "Riferimento pubblico del caso",
      incidentLocation: "Luogo dell'incidente",
      incidentDate: "Data dell'incidente",
      policeReportDate: "Data del rapporto di polizia",
      unknownLocation: "Luogo riservato",
      unknownDate: "Data riservata",
    },
  },
  nl: {
    admin: {
      title: "Diefstalzaak",
      description: "Beheer het gestructureerde diefstaldossier voor deze asset.",
      uploadNote:
        "Uploads worden later gekoppeld. Voeg voorlopig interne referenties of bestandsnamen toe.",
      statusLabel: "Zaakstatus",
      open: "Actieve diefstalmelding",
      resolved: "Opgelost",
      save: "Diefstalzaak opslaan",
      update: "Diefstalzaak bijwerken",
      resolve: "Zaak oplossen",
      processing: "Verwerken...",
      refsHint: "Een referentie per regel.",
      fields: {
        caseReference: "Zaakreferentie",
        policeReportNumber: "Nummer politierapport",
        policeReportDate: "Datum politierapport",
        country: "Land",
        cityRegion: "Stad / regio",
        incidentDate: "Datum incident",
        incidentDescription: "Beschrijving incident",
        supportingDocumentReferences: "Referenties ondersteunende documenten",
        caseNotes: "Zaaknotities",
        createdBy: "Aangemaakt door",
        updatedBy: "Bijgewerkt door",
        createdAt: "Aangemaakt op",
        updatedAt: "Bijgewerkt op",
        resolvedAt: "Opgelost op",
      },
      messages: {
        saved: "Diefstalzaak opgeslagen en waarschuwing geactiveerd.",
        resolved: "Diefstalzaak opgelost en waarschuwing verwijderd.",
        notEligible:
          "Alleen goedgekeurde registraties of registraties met uitgegeven paspoort kunnen een diefstalzaak beheren.",
        missingDescription: "Een beschrijving van het incident is verplicht.",
        caseMissing: "Er is geen diefstalzaak gevonden voor deze registratie.",
        requestMissing: "Registratie niet gevonden.",
      },
    },
    public: {
      warningTitle: "Waarschuwing diefstalzaak",
      limitedInfo:
        "Hier wordt alleen beperkte publieke informatie getoond. Politiebestanden en interne notities blijven afgeschermd.",
      caseReference: "Publieke zaakreferentie",
      incidentLocation: "Locatie incident",
      incidentDate: "Datum incident",
      policeReportDate: "Datum politierapport",
      unknownLocation: "Locatie afgeschermd",
      unknownDate: "Datum afgeschermd",
    },
  },
  pt: {
    admin: {
      title: "Caso de roubo",
      description: "Gerir o registo estruturado de roubo deste ativo.",
      uploadNote:
        "Os carregamentos serao ligados depois. Para ja, adicione referencias internas ou nomes de ficheiro.",
      statusLabel: "Estado do caso",
      open: "Roubo ativo",
      resolved: "Resolvido",
      save: "Guardar caso de roubo",
      update: "Atualizar caso de roubo",
      resolve: "Resolver caso",
      processing: "A processar...",
      refsHint: "Uma referencia por linha.",
      fields: {
        caseReference: "Referencia do caso",
        policeReportNumber: "Numero do relatorio policial",
        policeReportDate: "Data do relatorio policial",
        country: "Pais",
        cityRegion: "Cidade / regiao",
        incidentDate: "Data do incidente",
        incidentDescription: "Descricao do incidente",
        supportingDocumentReferences: "Referencias de documentos de apoio",
        caseNotes: "Notas do caso",
        createdBy: "Criado por",
        updatedBy: "Atualizado por",
        createdAt: "Criado em",
        updatedAt: "Atualizado em",
        resolvedAt: "Resolvido em",
      },
      messages: {
        saved: "Caso de roubo guardado e aviso ativado.",
        resolved: "Caso de roubo resolvido e aviso removido.",
        notEligible:
          "Apenas registos aprovados ou com passaporte emitido podem gerir um caso de roubo.",
        missingDescription: "A descricao do incidente e obrigatoria.",
        caseMissing: "Nao foi encontrado nenhum caso de roubo para este registo.",
        requestMissing: "Registo nao encontrado.",
      },
    },
    public: {
      warningTitle: "Aviso de caso de roubo",
      limitedInfo:
        "Aqui so e mostrada informacao publica limitada. Os ficheiros policiais e as notas internas permanecem restritos.",
      caseReference: "Referencia publica do caso",
      incidentLocation: "Local do incidente",
      incidentDate: "Data do incidente",
      policeReportDate: "Data do relatorio policial",
      unknownLocation: "Local reservado",
      unknownDate: "Data reservada",
    },
  },
  ru: {
    admin: {
      title: "Дело о краже",
      description: "Управляйте структурированным делом о краже для этого актива.",
      uploadNote:
        "Загрузки можно подключить позже. Пока добавьте внутренние ссылки или имена файлов.",
      statusLabel: "Статус дела",
      open: "Кража активна",
      resolved: "Закрыто",
      save: "Сохранить дело о краже",
      update: "Обновить дело о краже",
      resolve: "Закрыть дело",
      processing: "Обработка...",
      refsHint: "Одна ссылка в строке.",
      fields: {
        caseReference: "Ссылка на дело",
        policeReportNumber: "Номер полицейского отчета",
        policeReportDate: "Дата полицейского отчета",
        country: "Страна",
        cityRegion: "Город / регион",
        incidentDate: "Дата инцидента",
        incidentDescription: "Описание инцидента",
        supportingDocumentReferences: "Ссылки на подтверждающие документы",
        caseNotes: "Заметки по делу",
        createdBy: "Создано",
        updatedBy: "Обновлено",
        createdAt: "Создано",
        updatedAt: "Обновлено",
        resolvedAt: "Закрыто",
      },
      messages: {
        saved: "Дело о краже сохранено, предупреждение включено.",
        resolved: "Дело о краже закрыто, предупреждение снято.",
        notEligible:
          "Управлять делом о краже можно только для одобренных регистраций или регистраций с выданным паспортом.",
        missingDescription: "Описание инцидента обязательно.",
        caseMissing: "Для этой регистрации дело о краже не найдено.",
        requestMissing: "Регистрация не найдена.",
      },
    },
    public: {
      warningTitle: "Предупреждение о деле о краже",
      limitedInfo:
        "Здесь показана только ограниченная публичная информация. Полицейские файлы и внутренние заметки остаются закрытыми.",
      caseReference: "Публичный номер дела",
      incidentLocation: "Место инцидента",
      incidentDate: "Дата инцидента",
      policeReportDate: "Дата полицейского отчета",
      unknownLocation: "Место скрыто",
      unknownDate: "Дата скрыта",
    },
  },
  zh: {
    admin: {
      title: "失窃案件",
      description: "管理该资产的结构化失窃案件记录。",
      uploadNote: "上传功能稍后接入。当前请先填写内部引用或文件名。",
      statusLabel: "案件状态",
      open: "失窃进行中",
      resolved: "已解决",
      save: "保存失窃案件",
      update: "更新失窃案件",
      resolve: "结案",
      processing: "处理中...",
      refsHint: "每行填写一个引用。",
      fields: {
        caseReference: "案件编号",
        policeReportNumber: "警方报告编号",
        policeReportDate: "警方报告日期",
        country: "国家",
        cityRegion: "城市 / 地区",
        incidentDate: "事件日期",
        incidentDescription: "事件描述",
        supportingDocumentReferences: "支持文件引用",
        caseNotes: "案件备注",
        createdBy: "创建人",
        updatedBy: "更新人",
        createdAt: "创建时间",
        updatedAt: "更新时间",
        resolvedAt: "结案时间",
      },
      messages: {
        saved: "失窃案件已保存，警告已启用。",
        resolved: "失窃案件已结案，警告已移除。",
        notEligible: "只有已批准或已签发护照的注册才能管理失窃案件。",
        missingDescription: "必须填写事件描述。",
        caseMissing: "未找到该注册对应的失窃案件。",
        requestMissing: "未找到注册记录。",
      },
    },
    public: {
      warningTitle: "失窃案件警告",
      limitedInfo:
        "这里只显示有限的公开信息。警方文件和内部备注不会公开。",
      caseReference: "公开案件编号",
      incidentLocation: "事件地点",
      incidentDate: "事件日期",
      policeReportDate: "警方报告日期",
      unknownLocation: "地点已隐藏",
      unknownDate: "日期已隐藏",
    },
  },
  hi: {
    admin: {
      title: "चोरी मामला",
      description: "इस एसेट के संरचित चोरी रिकॉर्ड का प्रबंधन करें।",
      uploadNote:
        "अपलोड बाद में जोड़े जाएंगे। अभी के लिए आंतरिक संदर्भ या फ़ाइल नाम दर्ज करें।",
      statusLabel: "मामला स्थिति",
      open: "सक्रिय चोरी चिन्ह",
      resolved: "समाधान",
      save: "चोरी मामला सहेजें",
      update: "चोरी मामला अपडेट करें",
      resolve: "मामला बंद करें",
      processing: "प्रसंस्करण...",
      refsHint: "प्रति पंक्ति एक संदर्भ।",
      fields: {
        caseReference: "मामला संदर्भ",
        policeReportNumber: "पुलिस रिपोर्ट संख्या",
        policeReportDate: "पुलिस रिपोर्ट तिथि",
        country: "देश",
        cityRegion: "शहर / क्षेत्र",
        incidentDate: "घटना तिथि",
        incidentDescription: "घटना विवरण",
        supportingDocumentReferences: "समर्थन दस्तावेज़ संदर्भ",
        caseNotes: "मामला नोट्स",
        createdBy: "किसने बनाया",
        updatedBy: "किसने अपडेट किया",
        createdAt: "बनाया गया",
        updatedAt: "अपडेट किया गया",
        resolvedAt: "समाधान तिथि",
      },
      messages: {
        saved: "चोरी मामला सहेजा गया और चेतावनी सक्रिय हुई।",
        resolved: "चोरी मामला बंद किया गया और चेतावनी हटाई गई।",
        notEligible:
          "केवल स्वीकृत या पासपोर्ट-जारी पंजीकरण ही चोरी मामला प्रबंधित कर सकते हैं।",
        missingDescription: "घटना विवरण आवश्यक है।",
        caseMissing: "इस पंजीकरण के लिए कोई चोरी मामला नहीं मिला।",
        requestMissing: "पंजीकरण नहीं मिला।",
      },
    },
    public: {
      warningTitle: "चोरी मामला चेतावनी",
      limitedInfo:
        "यहां केवल सीमित सार्वजनिक जानकारी दिखाई जाती है। पुलिस फ़ाइलें और आंतरिक नोट सुरक्षित रहते हैं।",
      caseReference: "सार्वजनिक मामला संदर्भ",
      incidentLocation: "घटना स्थान",
      incidentDate: "घटना तिथि",
      policeReportDate: "पुलिस रिपोर्ट तिथि",
      unknownLocation: "स्थान गोपनीय",
      unknownDate: "तिथि गोपनीय",
    },
  },
  ar: {
    admin: {
      title: "قضية سرقة",
      description: "أدر سجل قضية السرقة المنظم لهذا الأصل.",
      uploadNote:
        "سيتم ربط التحميلات لاحقًا. في الوقت الحالي أضف المراجع الداخلية أو أسماء الملفات.",
      statusLabel: "حالة القضية",
      open: "سرقة نشطة",
      resolved: "تم الحل",
      save: "حفظ قضية السرقة",
      update: "تحديث قضية السرقة",
      resolve: "إغلاق القضية",
      processing: "جارٍ المعالجة...",
      refsHint: "مرجع واحد في كل سطر.",
      fields: {
        caseReference: "مرجع القضية",
        policeReportNumber: "رقم البلاغ الشرطي",
        policeReportDate: "تاريخ البلاغ الشرطي",
        country: "الدولة",
        cityRegion: "المدينة / المنطقة",
        incidentDate: "تاريخ الحادثة",
        incidentDescription: "وصف الحادثة",
        supportingDocumentReferences: "مراجع المستندات الداعمة",
        caseNotes: "ملاحظات القضية",
        createdBy: "أنشأه",
        updatedBy: "حدّثه",
        createdAt: "تاريخ الإنشاء",
        updatedAt: "تاريخ التحديث",
        resolvedAt: "تاريخ الإغلاق",
      },
      messages: {
        saved: "تم حفظ قضية السرقة وتفعيل التحذير.",
        resolved: "تم إغلاق قضية السرقة وإزالة التحذير.",
        notEligible:
          "يمكن فقط للتسجيلات المعتمدة أو التي صدر لها جواز إدارة قضية سرقة.",
        missingDescription: "وصف الحادثة مطلوب.",
        caseMissing: "لم يتم العثور على قضية سرقة لهذا التسجيل.",
        requestMissing: "لم يتم العثور على التسجيل.",
      },
    },
    public: {
      warningTitle: "تحذير قضية سرقة",
      limitedInfo:
        "يتم عرض معلومات عامة محدودة فقط هنا. تبقى ملفات الشرطة والملاحظات الداخلية محجوبة.",
      caseReference: "مرجع القضية العام",
      incidentLocation: "موقع الحادثة",
      incidentDate: "تاريخ الحادثة",
      policeReportDate: "تاريخ البلاغ الشرطي",
      unknownLocation: "الموقع محجوب",
      unknownDate: "التاريخ محجوب",
    },
  },

  pl: {
    admin: {
      title: "Sprawa kradziezy",
      description: "Zarzadzaj uporzadkowanym rekordem sprawy kradziezy dla tego assetu.",
      uploadNote:
        "Pliki bedzie mozna podlaczyc pozniej. Na razie dodaj wewnetrzne odniesienia do dokumentow lub nazwy plikow.",
      statusLabel: "Status sprawy",
      open: "Otwarta flaga kradziezy",
      resolved: "Rozwiazana",
      save: "Zapisz sprawe kradziezy",
      update: "Aktualizuj sprawe kradziezy",
      resolve: "Zamknij sprawe",
      processing: "Przetwarzanie...",
      refsHint: "Jedno odniesienie w wierszu.",
      fields: {
        caseReference: "Numer sprawy",
        policeReportNumber: "Numer zgloszenia na policji",
        policeReportDate: "Data zgloszenia na policji",
        country: "Kraj",
        cityRegion: "Miasto / region",
        incidentDate: "Data zdarzenia",
        incidentDescription: "Opis zdarzenia",
        supportingDocumentReferences: "Odniesienia do dokumentow potwierdzajacych",
        caseNotes: "Notatki do sprawy",
        createdBy: "Utworzone przez",
        updatedBy: "Zaktualizowane przez",
        createdAt: "Utworzono",
        updatedAt: "Zaktualizowano",
        resolvedAt: "Zamknieto",
      },
      messages: {
        saved: "Sprawa kradziezy zostala zapisana, a ostrzezenie aktywowane.",
        resolved: "Sprawa kradziezy zostala zamknieta, a ostrzezenie usuniete.",
        notEligible:
          "Tylko zatwierdzone rejestracje lub rejestracje z wydanym paszportem moga obslugiwac sprawe kradziezy.",
        missingDescription: "Opis zdarzenia jest wymagany.",
        caseMissing: "Nie znaleziono sprawy kradziezy dla tej rejestracji.",
        requestMissing: "Nie znaleziono rejestracji.",
      },
    },
    public: {
      warningTitle: "Ostrzezenie o sprawie kradziezy",
      limitedInfo:
        "Tutaj wyswietlane sa tylko ograniczone publiczne informacje o sprawie. Akta policji i notatki wewnetrzne pozostaja niedostepne.",
      caseReference: "Publiczny numer sprawy",
      incidentLocation: "Miejsce zdarzenia",
      incidentDate: "Data zdarzenia",
      policeReportDate: "Data zgloszenia na policji",
      unknownLocation: "Miejsce ukryte",
      unknownDate: "Data ukryta",
    },
  },
  sv: {
    admin: {
      title: "Stoldarende",
      description: "Hantera den strukturerade posten for stoldarendet for denna asset.",
      uploadNote:
        "Uppladdningar kan lankas senare. For nu lagger du till interna dokumentreferenser eller filnamn.",
      statusLabel: "Arendestatus",
      open: "Oppna stoldflagga",
      resolved: "Lost",
      save: "Spara stoldarende",
      update: "Uppdatera stoldarende",
      resolve: "Avsluta arende",
      processing: "Bearbetar...",
      refsHint: "En referens per rad.",
      fields: {
        caseReference: "Arendereferens",
        policeReportNumber: "Polisanmalans nummer",
        policeReportDate: "Datum for polisanmalan",
        country: "Land",
        cityRegion: "Stad / region",
        incidentDate: "Handelsedatum",
        incidentDescription: "Beskrivning av handelsen",
        supportingDocumentReferences: "Referenser till stodjande dokument",
        caseNotes: "Arendenoteringar",
        createdBy: "Skapad av",
        updatedBy: "Uppdaterad av",
        createdAt: "Skapad",
        updatedAt: "Uppdaterad",
        resolvedAt: "Avslutad",
      },
      messages: {
        saved: "Stoldarendet sparades och varningen aktiverades.",
        resolved: "Stoldarendet avslutades och varningen togs bort.",
        notEligible:
          "Endast godkanda registreringar eller registreringar med utfardat pass kan hantera ett stoldarende.",
        missingDescription: "Beskrivning av handelsen kravs.",
        caseMissing: "Inget stoldarende hittades for denna registrering.",
        requestMissing: "Registreringen hittades inte.",
      },
    },
    public: {
      warningTitle: "Varning for stoldarende",
      limitedInfo:
        "Endast begransad offentlig arendeinformation visas har. Polisfiler och interna anteckningar forblir begransade.",
      caseReference: "Offentlig arendereferens",
      incidentLocation: "Plats for handelsen",
      incidentDate: "Handelsedatum",
      policeReportDate: "Datum for polisanmalan",
      unknownLocation: "Plats dold",
      unknownDate: "Datum dolt",
    },
  },
  da: {
    admin: {
      title: "Sag om stjalet asset",
      description: "Administrer den strukturerede sagsregistrering for dette asset.",
      uploadNote:
        "Uploads kan tilknyttes senere. Tilfoj forelobigt interne dokumentreferencer eller filnavne.",
      statusLabel: "Sagsstatus",
      open: "Aben stjalet-flag",
      resolved: "Lukket",
      save: "Gem sag om stjalet asset",
      update: "Opdater sag om stjalet asset",
      resolve: "Luk sag",
      processing: "Behandler...",
      refsHint: "En reference pr. linje.",
      fields: {
        caseReference: "Sagsreference",
        policeReportNumber: "Politirapportnummer",
        policeReportDate: "Dato for politirapport",
        country: "Land",
        cityRegion: "By / region",
        incidentDate: "Haendelsesdato",
        incidentDescription: "Beskrivelse af haendelsen",
        supportingDocumentReferences: "Referencer til stottedokumenter",
        caseNotes: "Sagsnoter",
        createdBy: "Oprettet af",
        updatedBy: "Opdateret af",
        createdAt: "Oprettet",
        updatedAt: "Opdateret",
        resolvedAt: "Lukket",
      },
      messages: {
        saved: "Sagen om stjalet asset blev gemt, og advarslen blev aktiveret.",
        resolved: "Sagen om stjalet asset blev lukket, og advarslen blev fjernet.",
        notEligible:
          "Kun godkendte registreringer eller registreringer med udstedt pas kan handtere en sag om stjalet asset.",
        missingDescription: "Beskrivelse af haendelsen er paakraevet.",
        caseMissing: "Der blev ikke fundet nogen sag om stjalet asset for denne registrering.",
        requestMissing: "Registreringen blev ikke fundet.",
      },
    },
    public: {
      warningTitle: "Advarsel om stjalet asset",
      limitedInfo:
        "Kun begransede offentlige sagsoplysninger vises her. Politifiler og interne noter forbliver begransede.",
      caseReference: "Offentlig sagsreference",
      incidentLocation: "Haendelsessted",
      incidentDate: "Haendelsesdato",
      policeReportDate: "Dato for politirapport",
      unknownLocation: "Sted skjult",
      unknownDate: "Dato skjult",
    },
  },
  no: {
    admin: {
      title: "Tyverisak",
      description: "Administrer den strukturerte posten for tyverisaken for denne asseten.",
      uploadNote:
        "Opplastinger kan kobles til senere. Legg forelopig til interne dokumentreferanser eller filnavn.",
      statusLabel: "Saksstatus",
      open: "Apne tyveriflagg",
      resolved: "Lukket",
      save: "Lagre tyverisak",
      update: "Oppdater tyverisak",
      resolve: "Lukk sak",
      processing: "Behandler...",
      refsHint: "En referanse per linje.",
      fields: {
        caseReference: "Saksreferanse",
        policeReportNumber: "Politirapportnummer",
        policeReportDate: "Dato for politirapport",
        country: "Land",
        cityRegion: "By / region",
        incidentDate: "Hendelsesdato",
        incidentDescription: "Beskrivelse av hendelsen",
        supportingDocumentReferences: "Referanser til stottedokumenter",
        caseNotes: "Saksnotater",
        createdBy: "Opprettet av",
        updatedBy: "Oppdatert av",
        createdAt: "Opprettet",
        updatedAt: "Oppdatert",
        resolvedAt: "Lukket",
      },
      messages: {
        saved: "Tyverisaken ble lagret og advarselen ble aktivert.",
        resolved: "Tyverisaken ble lukket og advarselen ble fjernet.",
        notEligible:
          "Bare godkjente registreringer eller registreringer med utstedt pass kan handtere en tyverisak.",
        missingDescription: "Beskrivelse av hendelsen er paakrevd.",
        caseMissing: "Det ble ikke funnet noen tyverisak for denne registreringen.",
        requestMissing: "Registreringen ble ikke funnet.",
      },
    },
    public: {
      warningTitle: "Advarsel om tyverisak",
      limitedInfo:
        "Bare begrenset offentlig saksinformasjon vises her. Politifiler og interne notater forblir begrenset.",
      caseReference: "Offentlig saksreferanse",
      incidentLocation: "Sted for hendelsen",
      incidentDate: "Hendelsesdato",
      policeReportDate: "Dato for politirapport",
      unknownLocation: "Sted skjult",
      unknownDate: "Dato skjult",
    },
  },
};

export function getStolenCaseText(lang: string): StolenCaseText {
  const safeLang = isValidLang(lang) ? (lang as Lang) : DEFAULT_LANG;
  return TEXT[safeLang];
}
