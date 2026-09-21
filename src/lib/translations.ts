export type Locale = "en" | "es" | "de" | "fr";

export interface Translations {
  nav: {
    dating: string;
    casino: string;
    culture: string;
    reviews: string;
    dashboard: string;
    subscribe: string;
  };
  hero: {
    kicker: string;
    titleStart: string;
    titleEmphasis: string;
    subtitle: string;
  };
  comparison: {
    eyebrow: string;
    heading: string;
    updatedToday: string;
    claimOffer: string;
    readReview: string;
    exclusiveBonus: string;
  };
  ribbon: {
    explore: string;
    allTopics: string;
  };
  latest: {
    eyebrow: string;
    heading: string;
    viewAll: string;
    readReview: string;
  };
  newsletter: {
    eyebrow: string;
    heading: string;
    headingEmphasis: string;
    subtitle: string;
    placeholder: string;
    button: string;
    submitting: string;
    success: string;
    disclaimer: string;
  };
  footer: {
    aboutTitle: string;
    categoriesTitle: string;
    publicationTitle: string;
    workspaceTitle: string;
    accessDashboard: string;
    affiliateDisclosure: string;
    gamblingWarning: string;
    rightsReserved: string;
  };
}

export const TRANSLATIONS: Record<Locale, Translations> = {
  en: {
    nav: {
      dating: "Dating Apps",
      casino: "Casino & Odds",
      culture: "Culture & Systems",
      reviews: "All Reviews",
      dashboard: "Dashboard",
      subscribe: "Subscribe",
    },
    hero: {
      kicker: "A publication for the curious",
      titleStart: "Reviews and intelligence that make choices ",
      titleEmphasis: "clearer.",
      subtitle:
        "Atlas is an independent weekly journal evaluating top matchmaking platforms, regulated iGaming operators, and intentional digital tools.",
    },
    comparison: {
      eyebrow: "2026 Verified Roundups",
      heading: "Top Rated Platforms & Exclusive Welcome Offers",
      updatedToday: "Updated Today • Verified Testing",
      claimOffer: "Claim Offer →",
      readReview: "Read Review",
      exclusiveBonus: "Exclusive Bonus",
    },
    ribbon: {
      explore: "Explore Verticals:",
      allTopics: "All Topics",
    },
    latest: {
      eyebrow: "Fresh from the desk",
      heading: "Latest stories & breakdowns",
      viewAll: "View all stories",
      readReview: "Read review",
    },
    newsletter: {
      eyebrow: "The Sunday Edition",
      heading: "A little clarity, ",
      headingEmphasis: "every Sunday.",
      subtitle:
        "A short, thoughtful dispatch on high-intent tools, exclusive bonus drops, and verified app breakdowns. No spam, ever.",
      placeholder: "Enter your email...",
      button: "Join 12,400 readers",
      submitting: "Joining...",
      success: "Welcome to the Sunday edition. You're confirmed.",
      disclaimer: "By subscribing, you agree to our privacy terms. Unsubscribe at any time with one click.",
    },
    footer: {
      aboutTitle: "About the Journal",
      categoriesTitle: "Categories",
      publicationTitle: "Publication",
      workspaceTitle: "Editorial Workspace",
      accessDashboard: "Access Admin Dashboard",
      affiliateDisclosure:
        "Atlas Editorial provides independent reviews, data-driven comparisons, and analysis. Some links featured across our reviews are affiliate referral links, meaning we may earn a commercial commission if you register or claim a promotion through our site.",
      gamblingWarning:
        "18+ Only. Please gamble and date responsibly. For confidential gambling support call 1-800-GAMBLER or visit BeGambleAware.org.",
      rightsReserved: "All rights reserved.",
    },
  },
  es: {
    nav: {
      dating: "Apps de Citas",
      casino: "Casino y Cuotas",
      culture: "Cultura y Sistemas",
      reviews: "Todas las Reseñas",
      dashboard: "Panel de Control",
      subscribe: "Suscribirse",
    },
    hero: {
      kicker: "Una publicación para mentes curiosas",
      titleStart: "Reseñas e inteligencia que hacen las decisiones más ",
      titleEmphasis: "claras.",
      subtitle:
        "Atlas es una revista editorial independiente que evalúa las principales plataformas de citas, operadores regulados de iGaming y herramientas digitales.",
    },
    comparison: {
      eyebrow: "Comparativas Verificadas 2026",
      heading: "Plataformas Mejor Valoradas y Ofertas Exclusivas",
      updatedToday: "Actualizado Hoy • Pruebas Verificadas",
      claimOffer: "Reclamar Oferta →",
      readReview: "Leer Reseña",
      exclusiveBonus: "Bono Exclusivo",
    },
    ribbon: {
      explore: "Explorar Categorías:",
      allTopics: "Todos los Temas",
    },
    latest: {
      eyebrow: "Recién salido de redacción",
      heading: "Últimos análisis y reseñas",
      viewAll: "Ver todas las historias",
      readReview: "Leer análisis",
    },
    newsletter: {
      eyebrow: "Edición Dominical",
      heading: "Un toque de claridad, ",
      headingEmphasis: "cada domingo.",
      subtitle:
        "Un despacho breve sobre herramientas de alto valor, bonos exclusivos y análisis verificados de aplicaciones.",
      placeholder: "Introduce tu correo electrónico...",
      button: "Únete a 12.400 lectores",
      submitting: "Registrando...",
      success: "Bienvenido a la edición dominical. Confirmado.",
      disclaimer: "Al suscribirte, aceptas nuestras condiciones de privacidad. Cancela con un clic en cualquier momento.",
    },
    footer: {
      aboutTitle: "Sobre la Revista",
      categoriesTitle: "Categorías",
      publicationTitle: "Publicación",
      workspaceTitle: "Espacio Editorial",
      accessDashboard: "Acceso al Panel Admin",
      affiliateDisclosure:
        "Atlas Editorial ofrece reseñas imparciales y análisis comparativos. Algunos enlaces en nuestras reseñas son enlaces de afiliados, lo que significa que podemos recibir una comisión sin coste para ti.",
      gamblingWarning:
        "Solo para mayores de 18 años. Juega y relaciona con responsabilidad. Para ayuda confidencial visita JugarBien.es.",
      rightsReserved: "Todos los derechos reservados.",
    },
  },
  de: {
    nav: {
      dating: "Dating-Apps",
      casino: "Casino & Quoten",
      culture: "Kultur & Systeme",
      reviews: "Alle Testberichte",
      dashboard: "Dashboard",
      subscribe: "Abonnieren",
    },
    hero: {
      kicker: "Eine Publikation für Neugierige",
      titleStart: "Testberichte und Einblicke, die Entscheidungen ",
      titleEmphasis: "klarer machen.",
      subtitle:
        "Atlas ist ein unabhängiges Magazin, das führende Matchmaking-Plattformen, regulierte iGaming-Anbieter und digitale Tools prüft.",
    },
    comparison: {
      eyebrow: "Verifizierte Vergleiche 2026",
      heading: "Top-bewertete Plattformen & Exklusive Willkommensboni",
      updatedToday: "Heute aktualisiert • Verifizierte Tests",
      claimOffer: "Bonus sichern →",
      readReview: "Testbericht lesen",
      exclusiveBonus: "Exklusiver Bonus",
    },
    ribbon: {
      explore: "Themenbereiche erkunden:",
      allTopics: "Alle Themen",
    },
    latest: {
      eyebrow: "Frisch aus der Redaktion",
      heading: "Aktuelle Berichte & Analysen",
      viewAll: "Alle Berichte anzeigen",
      readReview: "Bericht lesen",
    },
    newsletter: {
      eyebrow: "Die Sonntagsausgabe",
      heading: "Ein Stück Klarheit, ",
      headingEmphasis: "jeden Sonntag.",
      subtitle:
        "Eine durchdachte Kurznachricht über erstklassige Tools, Bonus-Aktionen und geprüfte App-Vergleiche.",
      placeholder: "E-Mail-Adresse eingeben...",
      button: "12.400 Lesern beitreten",
      submitting: "Wird verarbeitet...",
      success: "Willkommen zur Sonntagsausgabe. Ihre Anmeldung ist bestätigt.",
      disclaimer: "Mit Ihrer Anmeldung stimmen Sie unseren Datenschutzrichtlinien zu. Jederzeit kündbar.",
    },
    footer: {
      aboutTitle: "Über das Magazin",
      categoriesTitle: "Kategorien",
      publicationTitle: "Publikation",
      workspaceTitle: "Redaktionsbereich",
      accessDashboard: "Admin-Dashboard öffnen",
      affiliateDisclosure:
        "Atlas Editorial bietet unabhängige Tests und Datenanalysen. Einige Links sind Affiliate-Links, über die wir eine Vermittlungsprovision erhalten können.",
      gamblingWarning:
        "Ab 18 Jahren. Bitte spielen und daten Sie verantwortungsvoll. Beratung unter Check-dein-Spiel.de.",
      rightsReserved: "Alle Rechte vorbehalten.",
    },
  },
  fr: {
    nav: {
      dating: "Applications de Rencontre",
      casino: "Casino & Cotes",
      culture: "Culture & Systèmes",
      reviews: "Tous les Avis",
      dashboard: "Tableau de Bord",
      subscribe: "S'abonner",
    },
    hero: {
      kicker: "Une publication pour les esprits curieux",
      titleStart: "Des avis et des analyses qui rendent vos choix plus ",
      titleEmphasis: "clairs.",
      subtitle:
        "Atlas est une revue éditoriale indépendante évaluant les applications de rencontre de premier plan, les plateformes iGaming régulées et les outils numériques.",
    },
    comparison: {
      eyebrow: "Comparatifs Vérifiés 2026",
      heading: "Plateformes les Mieux Notées & Offres de Bienvenue",
      updatedToday: "Mis à jour aujourd'hui • Tests vérifiés",
      claimOffer: "Profiter de l'offre →",
      readReview: "Lire l'avis",
      exclusiveBonus: "Bonus Exclusif",
    },
    ribbon: {
      explore: "Explorer les rubriques :",
      allTopics: "Tous les sujets",
    },
    latest: {
      eyebrow: "Fraîchement publié",
      heading: "Derniers articles et décryptages",
      viewAll: "Voir tous les articles",
      readReview: "Lire l'analyse",
    },
    newsletter: {
      eyebrow: "L'Édition du Dimanche",
      heading: "Un peu de clarté, ",
      headingEmphasis: "chaque dimanche.",
      subtitle:
        "Un condensé hebdomadaire sur les outils numériques de pointe, les bonus exclusifs et les comparatifs d'applications.",
      placeholder: "Votre adresse email...",
      button: "Rejoindre 12 400 lecteurs",
      submitting: "Inscription...",
      success: "Bienvenue dans l'édition du dimanche. Confirmation enregistrée.",
      disclaimer: "En vous abonnant, vous acceptez notre politique de confidentialité. Désabonnement en un clic.",
    },
    footer: {
      aboutTitle: "À Propos de la Revue",
      categoriesTitle: "Catégories",
      publicationTitle: "Publication",
      workspaceTitle: "Espace Éditorial",
      accessDashboard: "Accéder au Tableau de Bord",
      affiliateDisclosure:
        "Atlas Editorial propose des avis impartiaux et des comparatifs rigoureux. Certains liens sont des liens affiliés générant une commission commerciale sans frais supplémentaires pour vous.",
      gamblingWarning:
        "Interdit aux moins de 18 ans. Jouez et faites des rencontres de manière responsable. Aide sur Joueurs-Info-Service.fr.",
      rightsReserved: "Tous droits réservés.",
    },
  },
};
