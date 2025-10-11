import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

const i18n = new I18n({
  en: { 
    hello: 'Hello', 
    registration: 'Registration',
    gettingLocation: 'Getting location…',
    hikingText: 'On this page you can read something about mountain etiquette.',
    firstAidText: 'On this page you can read some basic first-aid guidance.',
    login: 'Login',
    notRegistered: 'Not registered yet?',
    sosInstruction: 'Press the button to share your current GPS location with the rescue team via SMS.',
    shareInstruction: 'Press the button to share your current GPS location with a friend via SMS.',
    shareLocation: 'Share Location',
    firstAid: 'First Aid',
    hiking: 'Hiking'
  },
  de: { 
    hello: 'Hallo', 
    registration: 'Registrierung',
    gettingLocation: 'Standort wird abgerufen…',
    hikingText: 'Auf dieser Seite können Sie etwas über Bergetikette lesen.',
    firstAidText: 'Auf dieser Seite können Sie einige grundlegende Erste-Hilfe-Hinweise lesen.',
    login: 'Anmeldung',
    notRegistered: 'Noch nicht registriert?',
    sosInstruction: 'Tippen Sie auf die Schaltfläche, um Ihren aktuellen GPS-Standort per SMS an das Rettungsteam zu senden.',
    shareInstruction: 'Tippen Sie auf die Schaltfläche, um Ihren aktuellen GPS-Standort per SMS mit einem Freund zu teilen.',
    shareLocation: 'Standort teilen',
    firstAid: 'Erste Hilfe',
    hiking: 'Wandern'
  },
  sl: { 
    hello: 'Živjo', 
    registration: 'Registracija',
    gettingLocation: 'Pridobivanje lokacije…',
    hikingText: 'Na tej strani si lahko preberete nekaj o gorskem bontonu.',
    firstAidText: 'Na tej strani si lahko preberete nekaj osnov o prvi pomoči.',
    login: 'Prijava',
    notRegistered: 'Še niste registrirani?',
    sosInstruction: 'Pritisnite gumb, da prek SMS sporočila delite svojo trenutno GPS lokacijo z reševalno ekipo.',
    shareInstruction: 'Pritisnite gumb, da prek SMS sporočila delite svojo trenutno GPS lokacijo s prijateljem.',
    shareLocation: 'Deli lokacijo',
    firstAid: 'Prva pomoč',
    hiking: 'Pohodništvo'
  },
  cs: { 
    hello: 'Ahoj', 
    registration: 'Registrace',
    gettingLocation: 'Získávání polohy…',
    hikingText: 'Na této stránce si můžete přečíst něco o horské etiketě.',
    firstAidText: 'Na této stránce si můžete přečíst základní informace o první pomoci.',
    login: 'Přihlášení',
    notRegistered: 'Ještě nejste registrovaní?',
    sosInstruction: 'Stisknutím tlačítka odešlete svou aktuální polohu GPS záchrannému týmu prostřednictvím SMS.',
    shareInstruction: 'Stisknutím tlačítka sdílíte svou aktuální polohu GPS s přítelem prostřednictvím SMS.',
    shareLocation: 'Sdílet polohu',
    firstAid: 'První pomoc',
    hiking: 'Turistika' 
  },
  pl: { 
    hello: 'Cześć', 
    registration: 'Rejestracja',
    gettingLocation: 'Pobieranie lokalizacji…',
    hikingText: 'Na tej stronie możesz przeczytać coś o górskim savoir-vivre.',
    firstAidText: 'Na tej stronie możesz przeczytać podstawowe informacje o pierwszej pomocy.',
    login: 'Logowanie',
    notRegistered: 'Nie masz jeszcze konta?',
    sosInstruction: 'Naciśnij przycisk, aby udostępnić swoją bieżącą lokalizację GPS zespołowi ratunkowemu przez SMS.',
    shareInstruction: 'Naciśnij przycisk, aby udostępnić swoją bieżącą lokalizację GPS znajomemu przez SMS.',
    shareLocation: 'Udostępnij lokalizację',
    firstAid: 'Pierwsza pomoc',
    hiking: 'Wędrówki'
  },
  it: { 
    hello: 'Ciao', 
    registration: 'Registrazione',
    gettingLocation: 'Ottenendo la posizione…',
    hikingText: 'In questa pagina puoi leggere qualcosa sul galateo di montagna.',
    firstAidText: 'In questa pagina puoi leggere alcune nozioni di primo soccorso.',
    login: 'Accesso',
    notRegistered: 'Non sei ancora registrato?',
    sosInstruction: 'Premi il pulsante per condividere la tua posizione GPS attuale con la squadra di soccorso via SMS.',
    shareInstruction: 'Premi il pulsante per condividere la tua posizione GPS attuale con un amico via SMS.',
    shareLocation: 'Condividi posizione',
    firstAid: 'Primo soccorso',
    hiking: 'Escursionismo'
  },
  fr: { 
    hello: 'Bonjour', 
    registration: 'Inscription',
    gettingLocation: 'Récupération de la position…',
    hikingText: 'Sur cette page, vous pouvez lire quelque chose sur l’étiquette de la montagne.',
    firstAidText: 'Sur cette page, vous pouvez lire quelques notions de premiers secours.',
    login: 'Connexion',
    notRegistered: 'Pas encore inscrit ?',
    sosInstruction: 'Appuyez sur le bouton pour partager votre position GPS actuelle avec l’équipe de secours par SMS.',
    shareInstruction: 'Appuyez sur le bouton pour partager votre position GPS actuelle avec un ami par SMS.',
    shareLocation: 'Partager la position',
    firstAid: 'Premiers secours',
    hiking: 'Randonnée'
  },
  hu: { 
    hello: 'Szia', 
    registration: 'Regisztráció',
    gettingLocation: 'Helyzet lekérése…',
    hikingText: 'Ezen az oldalon olvashatsz valamit a hegyi etikettől.',
    firstAidText: 'Ezen az oldalon néhány alapvető elsősegély-tudnivalót olvashat.',
    login: 'Bejelentkezés',
    notRegistered: 'Pas encore inscrit ?',
    sosInstruction: 'Nyomja meg a gombot az aktuális GPS-helyzetének SMS-ben történő megosztásához a mentőcsapattal.',
    shareInstruction: 'Nyomja meg a gombot, hogy aktuális GPS-helyzetét SMS-ben megossza egy ismerősével.',
    shareLocation: 'Helyzet megosztása',
    firstAid: 'Elsősegély',
    hiking: 'Túrázás'
  },
  hr: { 
    hello: 'Bok', 
    registration: 'Registracija',
    gettingLocation: 'Dohvaćanje lokacije…',
    hikingText: 'Na ovoj stranici možete pročitati nešto o planinskom bontonu.',
    firstAidText: 'Na ovoj stranici možete pročitati osnovne informacije o prvoj pomoći.',
    login: 'Prijava',
    notRegistered: 'Pas encore inscrit ?',
    sosInstruction: 'Pritisnite gumb za dijeljenje svoje trenutačne GPS lokacije sa spasilačkim timom putem SMS-a.',
    shareInstruction: 'Pritisnite gumb kako biste podijelili svoju trenutnu GPS lokaciju s prijateljem putem SMS-a.',
    shareLocation: 'Podijeli lokaciju',
    firstAid: 'Prva pomoć',
    hiking: 'Planinarenje'
  },
});

i18n.enableFallback = true;
i18n.defaultLocale = 'en';
const [{ languageTag }] = getLocales();
i18n.locale = languageTag;

export default i18n;