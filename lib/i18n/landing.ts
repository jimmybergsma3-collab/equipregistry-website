import type { Lang } from './config';

type LandingText = {
  register: string; example: string; price: string; searchTitle: string;
  categoriesTitle: string; categoriesIntro: string; categories: string[]; descriptions: string[];
  how: string; howIntro: string; steps: string[]; stepText: string[];
  passport: string; demoText: string; open: string; fields: string[];
  end: string; endText: string;
};

const text: Partial<Record<Lang, LandingText>> = {
  nl: {
    register: 'Registreer je asset', example: 'Bekijk voorbeeldpaspoort', price: 'Eenmalig vanaf',
    searchTitle: 'Wil je een bestaand paspoort controleren?',
    categoriesTitle: 'Voor welk bezit?', categoriesIntro: 'Eén digitaal dossier voor een brede wereld aan assets.',
    categories: ['Wegvoertuigen', 'Bouw, industrie en verhuur', 'Landbouw', 'Marine', 'Fietsen en lichte mobiliteit', 'Energie en industrie'],
    descriptions: ['Auto’s, motoren, campers, caravans en trailers.', 'Graafmachines, heftrucks, kranen en ander materieel.', 'Tractoren, werktuigen en agrarische machines.', 'Boten, motoren en maritieme uitrusting.', 'Fietsen, e-bikes, batterijen en accessoires.', 'Generatoren, energiesystemen en andere assets.'],
    how: 'Hoe EquipRegistry werkt', howIntro: 'In vier stappen naar een digitaal paspoort.',
    steps: ['Registreer je asset', 'Upload documenten', 'Betaal via Stripe', 'Ontvang je paspoort'],
    stepText: ['Vul de gegevens in en kies de juiste categorie.', 'Voeg foto’s, aankoopbewijs en relevante bestanden toe.', 'Eenmalige registratie vanaf € 9,95. Bekijk het tarief voor jouw categorie.', 'Na handmatige goedkeuring is je paspoort beschikbaar in je account.'],
    passport: 'Digitaal paspoort', demoText: 'Bestaand voorbeeldpaspoort. DEMO-gegevens, geen bewijs van eigendom of verificatie.', open: 'Open bestaand demopaspoort', fields: ['Merk', 'Model', 'Bouwjaar'],
    end: 'Jouw bezit. Het verhaal compleet.', endText: 'Bewaar identiteit, documenten en geschiedenis samen in één digitaal dossier.'
  },
  en: {
    register: 'Register your asset', example: 'View sample passport', price: 'One-time from', searchTitle: 'Want to check an existing passport?',
    categoriesTitle: 'For every kind of asset', categoriesIntro: 'One digital record for a wide range of assets.',
    categories: ['Road vehicles', 'Construction, industry and rental', 'Agriculture', 'Marine', 'Bikes and light mobility', 'Energy and industry'],
    descriptions: ['Cars, motorcycles, motorhomes, caravans and trailers.', 'Excavators, forklifts, cranes and other equipment.', 'Tractors, implements and agricultural machinery.', 'Boats, engines and marine equipment.', 'Bikes, e-bikes, batteries and accessories.', 'Generators, energy systems and other assets.'],
    how: 'How EquipRegistry works', howIntro: 'Four steps to a digital passport.', steps: ['Register your asset', 'Upload documents', 'Pay through Stripe', 'Receive your passport'],
    stepText: ['Enter the details and choose the right category.', 'Add photos, proof of purchase and relevant files.', 'One-time registration from €9.95. Check the price for your category.', 'Your passport becomes available in your account after manual approval.'],
    passport: 'Digital passport', demoText: 'Existing sample passport. DEMO data, not proof of ownership or verification.', open: 'Open existing demo passport', fields: ['Brand', 'Model', 'Year'], end: 'Your asset. Its complete story.', endText: 'Keep identity, documents and history together in one digital record.'
  },
  de: {
    register: 'Asset registrieren', example: 'Beispielpass ansehen', price: 'Einmalig ab', searchTitle: 'Einen bestehenden Pass prüfen?',
    categoriesTitle: 'Für welchen Besitz?', categoriesIntro: 'Eine digitale Akte für unterschiedlichste Assets.',
    categories: ['Straßenfahrzeuge', 'Bau, Industrie und Vermietung', 'Landwirtschaft', 'Marine', 'Fahrräder und leichte Mobilität', 'Energie und Industrie'],
    descriptions: ['Autos, Motorräder, Wohnmobile, Wohnwagen und Anhänger.', 'Bagger, Gabelstapler, Kräne und weitere Geräte.', 'Traktoren, Anbaugeräte und Landmaschinen.', 'Boote, Motoren und maritime Ausrüstung.', 'Fahrräder, E-Bikes, Akkus und Zubehör.', 'Generatoren, Energiesysteme und weitere Assets.'],
    how: 'So funktioniert EquipRegistry', howIntro: 'In vier Schritten zum digitalen Pass.', steps: ['Asset registrieren', 'Dokumente hochladen', 'Über Stripe bezahlen', 'Pass erhalten'],
    stepText: ['Daten eingeben und die passende Kategorie wählen.', 'Fotos, Kaufbeleg und relevante Dateien hinzufügen.', 'Einmalige Registrierung ab 9,95 €. Prüfen Sie den Preis Ihrer Kategorie.', 'Nach manueller Freigabe ist Ihr Pass in Ihrem Konto verfügbar.'],
    passport: 'Digitaler Pass', demoText: 'Bestehender Beispielpass. DEMO-Daten, kein Eigentums- oder Verifizierungsnachweis.', open: 'Bestehenden Demopass öffnen', fields: ['Marke', 'Modell', 'Baujahr'], end: 'Ihr Besitz. Seine ganze Geschichte.', endText: 'Identität, Dokumente und Geschichte in einer digitalen Akte zusammenführen.'
  },
  es: {
    register: 'Registra tu activo', example: 'Ver pasaporte de ejemplo', price: 'Pago único desde', searchTitle: '¿Quieres consultar un pasaporte existente?',
    categoriesTitle: '¿Para qué bienes?', categoriesIntro: 'Un expediente digital para una amplia variedad de activos.',
    categories: ['Vehículos de carretera', 'Construcción, industria y alquiler', 'Agricultura', 'Náutica', 'Bicicletas y movilidad ligera', 'Energía e industria'],
    descriptions: ['Coches, motos, autocaravanas, caravanas y remolques.', 'Excavadoras, carretillas, grúas y otros equipos.', 'Tractores, aperos y maquinaria agrícola.', 'Barcos, motores y equipamiento náutico.', 'Bicicletas, e-bikes, baterías y accesorios.', 'Generadores, sistemas energéticos y otros activos.'],
    how: 'Cómo funciona EquipRegistry', howIntro: 'Cuatro pasos para obtener un pasaporte digital.', steps: ['Registra tu activo', 'Sube documentos', 'Paga mediante Stripe', 'Recibe tu pasaporte'],
    stepText: ['Introduce los datos y elige la categoría adecuada.', 'Añade fotos, justificantes de compra y archivos relevantes.', 'Registro con pago único desde 9,95 €. Consulta la tarifa de tu categoría.', 'Tras la aprobación manual, tu pasaporte estará disponible en tu cuenta.'],
    passport: 'Pasaporte digital', demoText: 'Pasaporte de ejemplo existente. Datos DEMO, sin acreditar propiedad ni verificación.', open: 'Abrir pasaporte de demostración', fields: ['Marca', 'Modelo', 'Año'], end: 'Tu activo. Toda su historia.', endText: 'Reúne identidad, documentos e historial en un único expediente digital.'
  },
  fr: {
    register: 'Enregistrer votre bien', example: 'Voir un exemple de passeport', price: 'Paiement unique dès', searchTitle: 'Vérifier un passeport existant ?',
    categoriesTitle: 'Pour quels biens ?', categoriesIntro: 'Un dossier numérique pour une grande variété de biens.',
    categories: ['Véhicules routiers', 'Construction, industrie et location', 'Agriculture', 'Nautisme', 'Vélos et mobilité légère', 'Énergie et industrie'],
    descriptions: ['Voitures, motos, camping-cars, caravanes et remorques.', 'Pelles, chariots élévateurs, grues et autres équipements.', 'Tracteurs, outils et machines agricoles.', 'Bateaux, moteurs et équipements nautiques.', 'Vélos, vélos électriques, batteries et accessoires.', 'Générateurs, systèmes énergétiques et autres biens.'],
    how: 'Comment fonctionne EquipRegistry', howIntro: 'Quatre étapes vers un passeport numérique.', steps: ['Enregistrez votre bien', 'Ajoutez vos documents', 'Payez via Stripe', 'Recevez votre passeport'],
    stepText: ['Saisissez les informations et choisissez la bonne catégorie.', 'Ajoutez photos, preuve d’achat et fichiers pertinents.', 'Enregistrement unique dès 9,95 €. Consultez le tarif de votre catégorie.', 'Après validation manuelle, votre passeport est disponible dans votre compte.'],
    passport: 'Passeport numérique', demoText: 'Exemple de passeport existant. Données DEMO, sans preuve de propriété ni de vérification.', open: 'Ouvrir le passeport de démonstration', fields: ['Marque', 'Modèle', 'Année'], end: 'Votre bien. Toute son histoire.', endText: 'Réunissez identité, documents et historique dans un seul dossier numérique.'
  },
  it: {
    register: 'Registra il tuo bene', example: 'Vedi un passaporto di esempio', price: 'Pagamento unico da', searchTitle: 'Vuoi consultare un passaporto esistente?',
    categoriesTitle: 'Per quali beni?', categoriesIntro: 'Un fascicolo digitale per un’ampia gamma di beni.',
    categories: ['Veicoli stradali', 'Edilizia, industria e noleggio', 'Agricoltura', 'Nautica', 'Biciclette e mobilità leggera', 'Energia e industria'],
    descriptions: ['Auto, moto, camper, caravan e rimorchi.', 'Escavatori, carrelli elevatori, gru e altre attrezzature.', 'Trattori, attrezzi e macchine agricole.', 'Barche, motori e attrezzature nautiche.', 'Biciclette, e-bike, batterie e accessori.', 'Generatori, sistemi energetici e altri beni.'],
    how: 'Come funziona EquipRegistry', howIntro: 'Quattro passi verso un passaporto digitale.', steps: ['Registra il tuo bene', 'Carica i documenti', 'Paga tramite Stripe', 'Ricevi il passaporto'],
    stepText: ['Inserisci i dati e scegli la categoria corretta.', 'Aggiungi foto, prova d’acquisto e file pertinenti.', 'Registrazione una tantum da 9,95 €. Consulta la tariffa della tua categoria.', 'Dopo l’approvazione manuale, il passaporto sarà disponibile nel tuo account.'],
    passport: 'Passaporto digitale', demoText: 'Passaporto di esempio esistente. Dati DEMO, non una prova di proprietà o verifica.', open: 'Apri il passaporto dimostrativo', fields: ['Marca', 'Modello', 'Anno'], end: 'Il tuo bene. Tutta la sua storia.', endText: 'Riunisci identità, documenti e storia in un unico fascicolo digitale.'
  },
  pt: {
    register: 'Registe o seu bem', example: 'Ver passaporte de exemplo', price: 'Pagamento único desde', searchTitle: 'Quer consultar um passaporte existente?',
    categoriesTitle: 'Para que bens?', categoriesIntro: 'Um dossier digital para uma grande variedade de bens.',
    categories: ['Veículos rodoviários', 'Construção, indústria e aluguer', 'Agricultura', 'Náutica', 'Bicicletas e mobilidade ligeira', 'Energia e indústria'],
    descriptions: ['Carros, motos, autocaravanas, caravanas e reboques.', 'Escavadoras, empilhadores, gruas e outros equipamentos.', 'Tratores, alfaias e máquinas agrícolas.', 'Barcos, motores e equipamento náutico.', 'Bicicletas, e-bikes, baterias e acessórios.', 'Geradores, sistemas energéticos e outros bens.'],
    how: 'Como funciona a EquipRegistry', howIntro: 'Quatro passos para um passaporte digital.', steps: ['Registe o seu bem', 'Carregue documentos', 'Pague através da Stripe', 'Receba o passaporte'],
    stepText: ['Introduza os dados e escolha a categoria correta.', 'Adicione fotografias, comprovativo de compra e ficheiros relevantes.', 'Registo único desde 9,95 €. Consulte o preço da sua categoria.', 'Após aprovação manual, o passaporte estará disponível na sua conta.'],
    passport: 'Passaporte digital', demoText: 'Passaporte de exemplo existente. Dados DEMO, sem comprovar propriedade ou verificação.', open: 'Abrir passaporte de demonstração', fields: ['Marca', 'Modelo', 'Ano'], end: 'O seu bem. Toda a sua história.', endText: 'Reúna identidade, documentos e histórico num único dossier digital.'
  }
};

export function getLandingText(lang: Lang): LandingText {
  return text[lang] ?? text.en!;
}
