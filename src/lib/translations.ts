export type Locale = "en" | "es" | "de" | "fr";

export interface Translations {
  nav: {
    dating: string;
    casino: string;
    adult: string;
    privacy: string;
    allBlogs: string;
    admin: string;
    subscribe: string;
    openAdmin: string;
    editionLanguage: string;
  };
  hero: {
    kicker: string;
    titleStart: string;
    titleEmphasis: string;
    subtitle: string;
    tabDating: string;
    tabCasino: string;
    tabAdult: string;
    verifiedToday: string;
    hotTopics: string;
    ctaPrimary: string;
  };
  comparison: {
    eyebrow: string;
    heading: string;
    updatedToday: string;
    claimOffer: string;
    readReview: string;
    exclusiveBonus: string;
    rankLabel: string;
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
    emptyTitle: string;
    emptyDesc: string;
    emptyCta: string;
    moreComing: string;
  };
  archive: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    searchPlaceholder: string;
    sortLatest: string;
    sortPopular: string;
    sortComments: string;
    noResultsTitle: string;
    noResultsDesc: string;
    clearFilters: string;
  };
  categoryArchive: {
    eyebrow: string;
    allTopics: string;
    noStoriesTitle: string;
    noStoriesDesc: string;
    backButton: string;
  };
  article: {
    homeBreadcrumb: string;
    allTopicsBreadcrumb: string;
    published: string;
    share: string;
    copied: string;
    like: string;
    leadReviewer: string;
    commentsHeading: string;
    commentsNote: string;
    nameLabel: string;
    emailLabel: string;
    bodyLabel: string;
    submitBtn: string;
    submittingBtn: string;
    thankYou: string;
    thankYouNote: string;
    relatedHeading: string;
    readFull: string;
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
    error: string;
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
  about: {
    eyebrow: string;
    heading: string;
    p1: string;
    principlesHeading: string;
    principlesText: string;
    affiliateHeading: string;
    affiliateText: string;
  };
}

export const CATEGORY_TRANSLATIONS: Record<Locale, Record<string, { name: string; description: string }>> = {
  en: {
    "dating": {
      name: "Dating & Matchmaking",
      description: "Algorithmic match rates, ID verification benchmarks, and real-cost breakdown of premium dating tiers.",
    },
    "gambling-casino": {
      name: "Casino & Sports Betting",
      description: "Regulated casinos, instant crypto payouts, sportsbook odds, and audited bonus codes.",
    },
    "adult-lifestyle": {
      name: "Adult Entertainment & Creators",
      description: "Creator platforms, webcam networks, discreet billing analysis, and adult gaming tech.",
    },
    "guides-security": {
      name: "Privacy, Crypto & Guides",
      description: "VPN recommendations, anonymous billing, crypto deposits, and safety best practices.",
    },
  },
  es: {
    "dating": {
      name: "Citas y Conexiones",
      description: "Tasas de coincidencia algorítmica, verificación de identidad y desglose del coste real de suscripciones VIP.",
    },
    "gambling-casino": {
      name: "Casino y Apuestas Deportivas",
      description: "Casinos regulados, retiradas instantáneas en cripto, cuotas deportivas y bonos auditados.",
    },
    "adult-lifestyle": {
      name: "Entretenimiento Adulto y Creadores",
      description: "Plataformas de creadores, redes webcam, facturación discreta y tecnología segura.",
    },
    "guides-security": {
      name: "Privacidad, Cripto y Guías",
      description: "Recomendaciones de VPN, facturación anónima, depósitos cripto y mejores prácticas de seguridad.",
    },
  },
  de: {
    "dating": {
      name: "Dating & Partnersuche",
      description: "Match-Raten, Identitätsprüfungen und echte Kosten von Premium-Dating-Mitgliedschaften.",
    },
    "gambling-casino": {
      name: "Casino & Sportwetten",
      description: "Regulierte Casinos, Krypto-Sofortauszahlungen, Sportwetten-Quoten und geprüfte Boni.",
    },
    "adult-lifestyle": {
      name: "Erwachsenen-Tech & Creator",
      description: "Creator-Plattformen, Webcam-Netzwerke, diskrete Abrechnung und private Plattformen.",
    },
    "guides-security": {
      name: "Datenschutz, Krypto & Anleitungen",
      description: "VPN-Empfehlungen, anonyme Abrechnung, Krypto-Einzahlungen und Sicherheits-Tipps.",
    },
  },
  fr: {
    "dating": {
      name: "Rencontres & Matchmaking",
      description: "Taux de matching, vérification d'identité et analyse du coût réel des abonnements VIP.",
    },
    "gambling-casino": {
      name: "Casino & Paris Sportifs",
      description: "Casinos régulés, retraits crypto instantanés, cotes sportives et bonus vérifiés.",
    },
    "adult-lifestyle": {
      name: "Divertissement Adulte & Créateurs",
      description: "Plateformes de créateurs, réseaux webcam, facturation discrète et technologie privée.",
    },
    "guides-security": {
      name: "Confidentialité, Crypto & Guides",
      description: "Recommandations VPN, facturation anonyme, dépôts crypto et protocoles de sécurité.",
    },
  },
};

export const COMPARISON_ITEMS_TRANSLATIONS: Record<Locale, Array<{
  rank: number;
  name: string;
  category: string;
  badge: string;
  rating: number;
  bonus: string;
  features: string[];
  ctaUrl: string;
  reviewSlug: string;
}>> = {
  en: [
    {
      rank: 1,
      name: "Mingle VIP Match",
      category: "Dating & Romance",
      badge: "Best Overall Dating App",
      rating: 4.9,
      bonus: "7-Day VIP Free Pass + 10 Free Boosts",
      features: ["ID Verified Profiles", "High Response Rates", "Advanced Safety Radar"],
      ctaUrl: "#claim-mingle",
      reviewSlug: "best-dating-apps-free-vs-paid-breakdown",
    },
    {
      rank: 2,
      name: "Royal Crown Sportsbook",
      category: "Casino & Betting",
      badge: "Highest Payout Rate",
      rating: 4.8,
      bonus: "100% Match up to €5,000 + 150 Free Spins",
      features: ["15-min Crypto Withdrawals", "Audited Fair Odds", "24/7 VIP Concierge"],
      ctaUrl: "#claim-royal",
      reviewSlug: "top-regulated-casinos-sportsbooks-instant-payouts",
    },
    {
      rank: 3,
      name: "Elite Circle Network",
      category: "Executive Dating",
      badge: "Best for Professionals",
      rating: 4.8,
      bonus: "Complimentary Concierge Profile Review",
      features: ["LinkedIn Verified", "Curated Introductions", "Zero Spam Guarantee"],
      ctaUrl: "#claim-elite",
      reviewSlug: "are-dating-app-subscriptions-worth-it",
    },
    {
      rank: 4,
      name: "Apex Odds Sportsbook",
      category: "Sportsbook & In-Play",
      badge: "Best Odds Margin",
      rating: 4.7,
      bonus: "Risk-Free €50 First Bet Token",
      features: ["Lowest House Edge", "Live In-Game Cashout", "Zero Fee Banking"],
      ctaUrl: "#claim-apex",
      reviewSlug: "vip-sports-betting-vouchers-free-bet-tokens",
    },
  ],
  es: [
    {
      rank: 1,
      name: "Mingle VIP Match",
      category: "Citas y Romance",
      badge: "Mejor App de Citas en General",
      rating: 4.9,
      bonus: "Pase VIP Gratis de 7 Días + 10 Boosts Gratis",
      features: ["Perfiles con DNI Verificado", "Alta Tasa de Respuestas", "Radar de Seguridad Avanzado"],
      ctaUrl: "#claim-mingle",
      reviewSlug: "best-dating-apps-free-vs-paid-breakdown",
    },
    {
      rank: 2,
      name: "Royal Crown Sportsbook",
      category: "Casino y Apuestas",
      badge: "Mayor Tasa de Pagos",
      rating: 4.8,
      bonus: "100% hasta 5.000€ + 150 Giros Gratis",
      features: ["Retiradas Cripto en 15 Min", "Cuotas Justas Auditadas", "Conserje VIP 24/7"],
      ctaUrl: "#claim-royal",
      reviewSlug: "top-regulated-casinos-sportsbooks-instant-payouts",
    },
    {
      rank: 3,
      name: "Elite Circle Network",
      category: "Citas Ejecutivas",
      badge: "Ideal para Profesionales",
      rating: 4.8,
      bonus: "Revisión Gratuita de Perfil por Asesor",
      features: ["Verificado por LinkedIn", "Introducciones Curadas", "Cero Spam Garantizado"],
      ctaUrl: "#claim-elite",
      reviewSlug: "are-dating-app-subscriptions-worth-it",
    },
    {
      rank: 4,
      name: "Apex Odds Sportsbook",
      category: "Apuestas en Vivo",
      badge: "Mejor Margen de Cuotas",
      rating: 4.7,
      bonus: "Apuesta Sin Riesgo de 50€ de Bienvenida",
      features: ["Menor Margen de la Casa", "Cashout en Directo", "Banca Sin Comisiones"],
      ctaUrl: "#claim-apex",
      reviewSlug: "vip-sports-betting-vouchers-free-bet-tokens",
    },
  ],
  de: [
    {
      rank: 1,
      name: "Mingle VIP Match",
      category: "Dating & Romantik",
      badge: "Beste Dating-App insgesamt",
      rating: 4.9,
      bonus: "7 Tage VIP-Gratispass + 10 Gratis-Boosts",
      features: ["Verifizierte Ausweise", "Hohe Antwortraten", "Erweiterter Sicherheitsradar"],
      ctaUrl: "#claim-mingle",
      reviewSlug: "best-dating-apps-free-vs-paid-breakdown",
    },
    {
      rank: 2,
      name: "Royal Crown Sportsbook",
      category: "Casino & Wetten",
      badge: "Höchste Auszahlungsquote",
      rating: 4.8,
      bonus: "100% bis zu 5.000€ + 150 Freispiele",
      features: ["15-Minuten Krypto-Auszahlung", "Geprüft faire Quoten", "24/7 VIP-Concierge"],
      ctaUrl: "#claim-royal",
      reviewSlug: "top-regulated-casinos-sportsbooks-instant-payouts",
    },
    {
      rank: 3,
      name: "Elite Circle Network",
      category: "Executive Dating",
      badge: "Beste für Berufstätige",
      rating: 4.8,
      bonus: "Kostenlose Profilberatung inklusive",
      features: ["LinkedIn-Verifiziert", "Kuratierte Kontakte", "Spam-Freiheits-Garantie"],
      ctaUrl: "#claim-elite",
      reviewSlug: "are-dating-app-subscriptions-worth-it",
    },
    {
      rank: 4,
      name: "Apex Odds Sportsbook",
      category: "Live-Sportwetten",
      badge: "Beste Quotenmarge",
      rating: 4.7,
      bonus: "Risikofreie 50€ Freiwette",
      features: ["Niedrigster Buchmacher-Vorteil", "Live-Cashout im Spiel", "Gebührenfreie Zahlungen"],
      ctaUrl: "#claim-apex",
      reviewSlug: "vip-sports-betting-vouchers-free-bet-tokens",
    },
  ],
  fr: [
    {
      rank: 1,
      name: "Mingle VIP Match",
      category: "Rencontres & Romance",
      badge: "Meilleure App de Rencontre",
      rating: 4.9,
      bonus: "Passe VIP Gratuit 7 Jours + 10 Boosts Offerts",
      features: ["Profils avec Pièce d'Identité Vérifiée", "Taux de Réponse Élevé", "Radar de Sécurité Avancé"],
      ctaUrl: "#claim-mingle",
      reviewSlug: "best-dating-apps-free-vs-paid-breakdown",
    },
    {
      rank: 2,
      name: "Royal Crown Sportsbook",
      category: "Casino & Paris",
      badge: "Meilleur Taux de Paiement",
      rating: 4.8,
      bonus: "100% jusqu'à 5 000€ + 150 Tours Gratuits",
      features: ["Retraits Crypto en 15 Min", "Cotes Équitables Auditées", "Concierge VIP 24/7"],
      ctaUrl: "#claim-royal",
      reviewSlug: "top-regulated-casinos-sportsbooks-instant-payouts",
    },
    {
      rank: 3,
      name: "Elite Circle Network",
      category: "Rencontres Cadres",
      badge: "Idéal pour Professionnels",
      rating: 4.8,
      bonus: "Audit de Profil Concierge Offert",
      features: ["Vérifié via LinkedIn", "Mises en Relation Choisies", "Zéro Spam Garanti"],
      ctaUrl: "#claim-elite",
      reviewSlug: "are-dating-app-subscriptions-worth-it",
    },
    {
      rank: 4,
      name: "Apex Odds Sportsbook",
      category: "Paris en Direct",
      badge: "Meilleure Marge de Cotes",
      rating: 4.7,
      bonus: "Premier Pari Sans Risque de 50€",
      features: ["Plus Faible Avantage Maison", "Cashout en Direct", "Paiements Sans Frais"],
      ctaUrl: "#claim-apex",
      reviewSlug: "vip-sports-betting-vouchers-free-bet-tokens",
    },
  ],
};

export const ARTICLE_LOCALIZATIONS: Record<
  Locale,
  Record<string, { title: string; excerpt: string; badge?: string }>
> = {
  en: {}, // fallback to original
  es: {
    "best-dating-apps-free-vs-paid-breakdown": {
      title: "Las Mejores Apps de Citas de 2026: Comparativa Gratuito vs. VIP",
      excerpt: "Pasamos 60 días, creamos 24 perfiles controlados y registramos miles de deslizamientos para descubrir qué cambia realmente al pagar 40 dólares al mes.",
      badge: "Elección Editorial",
    },
    "are-dating-app-subscriptions-worth-it": {
      title: "¿Valen la Pena las Suscripciones a Apps de Citas? Lo Que Realmente Pagas",
      excerpt: "Tras el muro de pago: un análisis sobre la limitación algorítmica, los niveles de boost ocultos y si pagar cambia tu realidad de matches.",
      badge: "Análisis de Valor",
    },
    "casual-discreet-dating-apps-privacy-review": {
      title: "Apps de Citas Casuales y Discretas: Plataformas con Estricta Privacidad",
      excerpt: "Para adultos que buscan no monogamia ética, espacios alternativos o citas íntimas sin fricción social ni exposición.",
      badge: "Privacidad Verificada",
    },
    "how-to-beat-dating-app-fatigue-profile-tips": {
      title: "Cómo Vencer la Fatiga de Apps de Citas: 7 Ajustes de Perfil Clave",
      excerpt: "El agotamiento en aplicaciones de citas es real. Siete ajustes basados en datos que eliminan el deslizar sin fin y triplican tus respuestas.",
      badge: "Manual de Campo",
    },
    "spot-fake-profiles-bots-dating-apps-guide": {
      title: "Perfiles Falsos, Estafas Románticas y Detección de Bots en 2026",
      excerpt: "Los avatares de IA y estafas con criptomonedas aumentan rápidamente. Aprende a detectar alertas rojas y verificar imágenes.",
      badge: "Guía de Seguridad",
    },
    "top-regulated-casinos-sportsbooks-instant-payouts": {
      title: "Casinos Regulados y Casas de Apuestas: Pagos Instantáneos y Cuotas 2026",
      excerpt: "Análisis auditado de operadores de juego con licencia evaluados por transparencia en RTP, velocidad de cobro y bonos sin trampas.",
      badge: "Top Regulación",
    },
    "fastest-payout-crypto-casinos-instant-withdrawals": {
      title: "Casinos Cripto con Pagos Más Rápidos: Retiradas en Bitcoin y Solana",
      excerpt: "Comparativa de cobros automatizados: qué plataformas completan liquidaciones reales en menos de 10 minutos sin revisiones manuales.",
      badge: "Pruebas de Velocidad",
    },
    "casino-bonus-wagering-requirements-explained": {
      title: "Rollover de Bonos de Casino: Por Qué el Requisito 30x Bloquea Ganancias",
      excerpt: "No te fíes de las cifras llamativas sin leer la letra pequeña. La fórmula matemática exacta para saber si un bono es realmente ventajoso.",
      badge: "Análisis Matemático",
    },
    "vip-sports-betting-vouchers-free-bet-tokens": {
      title: "Cupones VIP de Apuestas y Apuestas Gratis: Cómo Reclamar 5.000€ Sin Riesgo",
      excerpt: "Cómo los apostadores de alto volumen aprovechan apuestas igualadas, cuotas mejoradas y promociones VIP sin ser limitados.",
      badge: "Estrategia VIP",
    },
    "bankroll-management-for-online-gamblers-2-percent-rule": {
      title: "Gestión de Fondos para Jugadores Online: La Regla del 2% Contra el Tilt",
      excerpt: "La fórmula matemática utilizada por jugadores profesionales de cartas y apostadores para resistir la varianza y evitar desbordes emocionales.",
      badge: "Estrategia de Fondos",
    },
    "rise-of-creator-led-adult-platforms-onlyfans-fansly-luvi": {
      title: "El Auge de Plataformas de Creadores Adultos: OnlyFans, Fansly y Luvi",
      excerpt: "Modelos de suscripción, comisiones, derechos de autor y algoritmos de descubrimiento comparados para fans y creadores.",
      badge: "Informe del Sector",
    },
    "discreet-billing-descriptors-adult-platforms-guide": {
      title: "Descriptores de Facturación Discreta: Cómo Aparecen en Extractos Bancarios",
      excerpt: "Privacidad financiera garantizada: cómo OnlyFans, Fansly y redes webcam registran sus transacciones en tarjetas de crédito.",
      badge: "Privacidad Bancaria",
    },
    "best-live-webcam-platforms-hd-tokens-review": {
      title: "Mejores Plataformas de Webcam HD: Tokens Gratis vs. Shows Privados",
      excerpt: "Evaluación de latencia de vídeo, economía de tokens, propinas y calidad de audio bidireccional en redes en vivo.",
      badge: "Análisis de Streaming",
    },
    "ai-companion-platforms-virtual-entertainment-privacy": {
      title: "Compañeros de IA y Entretenimiento Virtual: ¿Privacidad o Mina de Datos?",
      excerpt: "Los compañeros conversacionales de IA se popularizan. Investigamos el cifrado de conocimiento cero, retención de chats y seguridad.",
      badge: "Auditoría de IA",
    },
    "fan-subscription-pricing-pay-per-view-vs-monthly-tiers": {
      title: "Precios de Suscripción para Creadores: Pago por Visión vs. Cuotas Mensuales",
      excerpt: "¿Qué genera mayores ingresos para creadores? Desglose económico de suscripciones base de 5$ con PPV versus planes VIP de 25$.",
      badge: "Estrategia de Monetización",
    },
    "ultimate-privacy-stack-dating-gaming-digital-footprint": {
      title: "El Ecosistema de Privacidad 2026: Protege Tu Huella en Citas y Juegos",
      excerpt: "El kit esencial para mantener una separación absoluta entre tu identidad personal, perfiles de citas y cuentas de entretenimiento.",
      badge: "Protocolo de Privacidad",
    },
    "stablecoin-deposits-usdt-usdc-instant-funding-guide": {
      title: "Depósitos con Stablecoins: Cómo Usar USDT y USDC para Pagos Inmediatos",
      excerpt: "Elimina bloqueos bancarios y tasas de cambio: cómo financiar saldos de plataformas y creadores de manera segura con stablecoins.",
      badge: "Guía Cripto",
    },
    "best-vpns-online-casinos-dating-apps-bypass": {
      title: "Las Mejores VPN para Acceder a Casinos y Apps de Citas sin Bloqueos",
      excerpt: "Probadas contra fugas de IP, con kill switch fiable y ofuscación: las VPN que desbloquean plataformas sin interrupciones.",
      badge: "Pruebas de Red",
    },
    "virtual-credit-cards-prevent-auto-renewal-charges": {
      title: "Tarjetas de Crédito Virtuales: Evita Cobros Inesperados de Renovación",
      excerpt: "Cómo las tarjetas desechables y límites diarios de gasto te protegen de cobros abusivos y suscripciones automáticas olvidadas.",
      badge: "Defensa Financiera",
    },
    "metadata-stripping-exif-photo-security-guide": {
      title: "Limpieza de Metadatos EXIF: Evita Fugas de Ubicación en Fotos Subidas",
      excerpt: "Cada foto móvil contiene GPS exacto, fecha y modelo del dispositivo. Aprende a limpiar metadatos antes de compartirlas en la red.",
      badge: "Ciberseguridad",
    },
  },
  de: {
    "best-dating-apps-free-vs-paid-breakdown": {
      title: "Beste Dating-Apps 2026: Der finale Gratis- vs. VIP-Vergleich",
      excerpt: "60 Tage Testzeit, 24 Kontrollprofile und tausende Swipes: Was ändert sich wirklich, wenn man 40 Euro im Monat bezahlt?",
      badge: "Redaktionstipp",
    },
    "are-dating-app-subscriptions-worth-it": {
      title: "Lohnen sich Dating-App Abos? Wofür Sie wirklich bezahlen",
      excerpt: "Hinter der Bezahlschranke: Eine Untersuchung über Drosselungsalgorithmen, versteckte Boosts und echte Erfolgschancen.",
      badge: "Kosten-Nutzen",
    },
    "casual-discreet-dating-apps-privacy-review": {
      title: "Diskrete & Casual Dating Apps: Plattformen mit strengem Datenschutz",
      excerpt: "Für Erwachsene auf der Suche nach ethischer Nicht-Monogamie oder diskreten Treffen ohne soziales Risiko.",
      badge: "Geprüfter Schutz",
    },
    "how-to-beat-dating-app-fatigue-profile-tips": {
      title: "Dating-App Burnout besiegen: 7 Profiltricks für 3x mehr Antworten",
      excerpt: "Dating-Müdigkeit ist real. Sieben datengestützte Anpassungen, die endloses Wischen beenden und passende Kontakte anziehen.",
      badge: "Praxis-Leitfaden",
    },
    "spot-fake-profiles-bots-dating-apps-guide": {
      title: "Fake-Profile, Liebesbetrug & Bot-Erkennung auf Dating-Apps 2026",
      excerpt: "KI-Porträts und Krypto-Scams nehmen stark zu. So erkennen Sie Warnsignale und schützen sich vor Identitätsdiebstahl.",
      badge: "Sicherheits-Guide",
    },
    "top-regulated-casinos-sportsbooks-instant-payouts": {
      title: "Top-regulierte Casinos & Sportwetten: Sofortauszahlung & Faire Quoten",
      excerpt: "Geprüfte Analyse lizenzierter Anbieter nach Auszahlungsgeschwindigkeit, transparentem RTP und fairen Bonusbedingungen.",
      badge: "Top Reguliert",
    },
    "fastest-payout-crypto-casinos-instant-withdrawals": {
      title: "Schnellste Krypto-Casinos: Auszahlungstests mit Bitcoin & Solana",
      excerpt: "Automatisierte Auszahlungssysteme im Vergleich: Welche Plattformen echtes Geld in unter 10 Minuten ohne Verzögerung überweisen.",
      badge: "Tempo-Test",
    },
    "casino-bonus-wagering-requirements-explained": {
      title: "Casino-Bonus Rollover erklärt: Warum 30x Umsatz Gewinne bindet",
      excerpt: "Fallen Sie nicht auf Werbesummen herein, ohne das Kleingedruckte zu lesen. Die mathematische Formel für faire Bonusangebote.",
      badge: "Mathematische Analyse",
    },
    "vip-sports-betting-vouchers-free-bet-tokens": {
      title: "VIP-Sportwetten-Gutscheine & Gratiswetten: Bis zu 5.000€ risikofrei",
      excerpt: "Wie erfahrene Tipper risikofreie Promotionen, Quoten-Boosts und VIP-Konditionen ohne Kontolimitierungen nutzen.",
      badge: "VIP-Strategie",
    },
    "bankroll-management-for-online-gamblers-2-percent-rule": {
      title: "Bankroll-Management für Online-Gamer: Die 2%-Regel gegen Frust",
      excerpt: "Das mathematische System professioneller Spieler, um Pechsträhnen abzufedern und emotionale Fehlentscheidungen zu stoppen.",
      badge: "Kapital-Management",
    },
    "rise-of-creator-led-adult-platforms-onlyfans-fansly-luvi": {
      title: "Creator-Plattformen im Aufwind: OnlyFans, Fansly & Luvi im Vergleich",
      excerpt: "Abomodelle, Auszahlungsanteile, Rechte und Reichweitenalgorithmen für Fans und Content-Ersteller analysiert.",
      badge: "Branchenbericht",
    },
    "discreet-billing-descriptors-adult-platforms-guide": {
      title: "Diskrete Abrechnungscodes: Wie Erwachsenenseiten auf Auszügen stehen",
      excerpt: "Schutz der Privatsphäre auf Kontoauszügen: Wie OnlyFans, Fansly und Webcam-Netzwerke auf Kreditkartenabrechnungen deklarieren.",
      badge: "Konto-Privatsphäre",
    },
    "best-live-webcam-platforms-hd-tokens-review": {
      title: "Beste HD-Webcam-Plattformen: Gratis-Tokens vs. Private Shows",
      excerpt: "Streaming-Latenz, Token-Preise, Trinkgeld-Optionen und Bildqualität führender Live-Streaming-Netzwerke im Test.",
      badge: "Streaming-Test",
    },
    "ai-companion-platforms-virtual-entertainment-privacy": {
      title: "KI-Begleiter & Virtuelle Gefährten: Privatsphäre oder Datenfalle?",
      excerpt: "Dialogfähige KI-Assistenten boomen. Wir untersuchen Zero-Knowledge-Verschlüsselung, Chatprotokoll-Speicherung und Sicherheit.",
      badge: "KI-Audit",
    },
    "fan-subscription-pricing-pay-per-view-vs-monthly-tiers": {
      title: "Abo-Preise für Creator: Pay-Per-View vs. Feste Monatsstufen",
      excerpt: "Was bringt den höchsten Ertrag? Ein Vergleich zwischen 5$-Basistarifen mit Paywalls und 25$-All-Inclusive-VIP-Mitgliedschaften.",
      badge: "Umsatz-Strategie",
    },
    "ultimate-privacy-stack-dating-gaming-digital-footprint": {
      title: "Der Datenschutz-Stack 2026: Digitale Spuren bei Dating & Gaming trennen",
      excerpt: "Das unverzichtbare Toolkit, um Ihre reale Identität strikt von Dating- und Unterhaltungskonten abzukapseln.",
      badge: "Sicherheitsprotokoll",
    },
    "stablecoin-deposits-usdt-usdc-instant-funding-guide": {
      title: "Stablecoin-Einzahlungen 101: USDT & USDC für blitzschnelle Zahlungen",
      excerpt: "Keine Bankblockaden und Wechselgebühren: Wie Sie Casino-Konten und Creator-Abos anonym und schnell mit Stablecoins aufladen.",
      badge: "Krypto-Ratgeber",
    },
    "best-vpns-online-casinos-dating-apps-bypass": {
      title: "Beste VPNs zur Umgehung von Ländersperren bei Gaming & Dating",
      excerpt: "Geprüft auf Dichtigkeit gegen IP-Leaks, Kill-Switch-Zuverlässigkeit und Verschleierung: Die zuverlässigsten Netzwerke.",
      badge: "Netzwerk-Test",
    },
    "virtual-credit-cards-prevent-auto-renewal-charges": {
      title: "Virtuelle Kreditkarten: Nie wieder unerwünschte Abo-Verlängerungen",
      excerpt: "Wie Wegwerfkarten und Tageslimits Sie vor Abofallen und vergessenen Testphasen zuverlässig absichern.",
      badge: "Kosten-Schutz",
    },
    "metadata-stripping-exif-photo-security-guide": {
      title: "EXIF-Metadaten entfernen: Standortdaten in Fotos zuverlässig löschen",
      excerpt: "Jedes Handyfoto speichert GPS-Koordinaten und Zeitstempel. So säubern Sie Fotodaten vor dem Hochladen im Netz.",
      badge: "Datensicherheit",
    },
  },
  fr: {
    "best-dating-apps-free-vs-paid-breakdown": {
      title: "Meilleures Apps de Rencontre 2026 : Le Comparatif Gratuit vs. VIP",
      excerpt: "60 jours de tests, 24 profils et des milliers de swipes pour vérifier ce qui change réellement en payant 40€ par mois.",
      badge: "Choix de la Rédaction",
    },
    "are-dating-app-subscriptions-worth-it": {
      title: "Les Abonnements d'Apps de Rencontre Valent-ils le Coup ?",
      excerpt: "Derrière le paywall : enquête sur le bridage algorithmique, les boosts masqués et la réalité des taux de réponse.",
      badge: "Rapport Qualité/Prix",
    },
    "casual-discreet-dating-apps-privacy-review": {
      title: "Apps de Rencontres Discrètes & Éphémères : Confidentialité Maximale",
      excerpt: "Pour les adultes en quête de non-monogamie éthique ou de rencontres privées sans compromettre leur réputation.",
      badge: "Vie Privée Validée",
    },
    "how-to-beat-dating-app-fatigue-profile-tips": {
      title: "Vaincre la Fatigue des Apps de Rencontre : 7 Astuces pour Tripler Vos Matches",
      excerpt: "L'épuisement face aux applications est réel. 7 optimisations éprouvées pour attirer des profils sincères et décidés.",
      badge: "Guide Pratique",
    },
    "spot-fake-profiles-bots-dating-apps-guide": {
      title: "Faux Profils, Arnaques aux Sentiments et Détection de Bots en 2026",
      excerpt: "Les avatars générés par IA et les arnaques crypto explosent. Apprenez à repérer les signaux d'alerte et à vérifier les photos.",
      badge: "Sécurité Numérique",
    },
    "top-regulated-casinos-sportsbooks-instant-payouts": {
      title: "Casinos Régulés & Paris Sportifs : Paiements Immédiats et Cotes 2026",
      excerpt: "Évaluation indépendante des opérateurs agréés : transparence du RTP, retraits ultrarapides et bonus équitables.",
      badge: "Opérateur Certifié",
    },
    "fastest-payout-crypto-casinos-instant-withdrawals": {
      title: "Casinos Crypto aux Retraits les Plus Rapides : Tests Bitcoin & Solana",
      excerpt: "Comparatif des retraits automatisés : quelles plateformes règlent réellement vos gains en moins de 10 minutes.",
      badge: "Test de Rapidité",
    },
    "casino-bonus-wagering-requirements-explained": {
      title: "Exigences de Mise des Bonus de Casino : Pourquoi le 30x Bloque Vos Gains",
      excerpt: "Ne vous laissez pas séduire par les montants affichés sans lire les conditions. La formule mathématique pour évaluer un bonus.",
      badge: "Calcul Mathématique",
    },
    "vip-sports-betting-vouchers-free-bet-tokens": {
      title: "Bons VIP de Paris Sportifs & Paris Gratuits : Réclamer 5 000€ Sans Risque",
      excerpt: "Comment les parieurs confirmés tirent parti des paris remboursés et cotes boostées sans risquer de limitation de compte.",
      badge: "Stratégie VIP",
    },
    "bankroll-management-for-online-gamblers-2-percent-rule": {
      title: "Gestion de Bankroll pour Joueurs : La Règle des 2% Contre le Tilt",
      excerpt: "Le cadre mathématique employé par les pros pour absorber la variance et éliminer les décisions impulsives.",
      badge: "Gestion de Capital",
    },
    "rise-of-creator-led-adult-platforms-onlyfans-fansly-luvi": {
      title: "Plateformes de Créateurs Adultes : OnlyFans, Fansly et Luvi Comparés",
      excerpt: "Abonnements, commissions prélevées, droits d'auteur et visibilité : quelle plateforme privilégier fans et créateurs.",
      badge: "Dossier Industrie",
    },
    "discreet-billing-descriptors-adult-platforms-guide": {
      title: "Libellés Bancaires Discrets : Comment les Sites Adultes S'affichent",
      excerpt: "Protection de votre relevé : analyse des libellés exacts d'OnlyFans, Fansly et réseaux de webcam sur carte bancaire.",
      badge: "Secret Bancaire",
    },
    "best-live-webcam-platforms-hd-tokens-review": {
      title: "Meilleures Plateformes de Webcams HD : Jetons Gratuits vs. Shows Privés",
      excerpt: "Latence du flux, économie de jetons, pourboires et qualité audiovisuelle testés sur les plus grands réseaux mondiaux.",
      badge: "Test Audiovisuel",
    },
    "ai-companion-platforms-virtual-entertainment-privacy": {
      title: "Compagnons IA & Divertissement Virtuel : Vie Privée ou Mine de Données ?",
      excerpt: "L'engouement pour les IA conversationnelles grandit. Enquête sur le chiffrement, la rétention des échanges et la sûreté.",
      badge: "Audit IA",
    },
    "fan-subscription-pricing-pay-per-view-vs-monthly-tiers": {
      title: "Tarifs d'Abonnement Créateurs : Pay-Per-View vs. Forfait Mensuel",
      excerpt: "Qu'est-ce qui convertit le mieux ? Étude comparative entre abonnement à 5$ avec contenus payants et formule VIP à 25$.",
      badge: "Modèle Économique",
    },
    "ultimate-privacy-stack-dating-gaming-digital-footprint": {
      title: "L'Arsenal de Confidentialité 2026 : Cloisonner Rencontres et Jeux",
      excerpt: "Le kit indispensable pour séparer totalement identité civile, applications de rencontre et comptes de divertissement.",
      badge: "Protocole Sécurité",
    },
    "stablecoin-deposits-usdt-usdc-instant-funding-guide": {
      title: "Dépôts en Stablecoins : Utiliser USDT & USDC pour des Paiements Immédiats",
      excerpt: "Évitez les refus de carte et les frais de change : comment créditer vos comptes de casino et d'abonnements en stablecoins.",
      badge: "Guide Crypto",
    },
    "best-vpns-online-casinos-dating-apps-bypass": {
      title: "Les Meilleurs VPN pour Contourner les Restrictions de Jeux et Rencontres",
      excerpt: "Testés pour l'absence de fuite IP, kill switch infaillible et chiffrement fort : les réseaux qui débloquent les accès.",
      badge: "Test Réseau",
    },
    "virtual-credit-cards-prevent-auto-renewal-charges": {
      title: "Cartes Bancaires Virtuelles : Ne Plus Jamais Subir de Prélèvement Surprise",
      excerpt: "Comment les cartes jetables et plafonds stricts vous protègent contre les renouvellements tacites oubliés.",
      badge: "Bouclier Bancaire",
    },
    "metadata-stripping-exif-photo-security-guide": {
      title: "Nettoyage des Métadonnées EXIF : Supprimer la Géolocalisation des Photos",
      excerpt: "Chaque photo smartphone renferme GPS précis et données techniques. Apprenez à les supprimer avant toute diffusion en ligne.",
      badge: "Sécurité Photos",
    },
  },
};

export const TRANSLATIONS: Record<Locale, Translations> = {
  en: {
    nav: {
      dating: "Dating & Matchmaking",
      casino: "Casino & Betting",
      adult: "Adult Entertainment",
      privacy: "Privacy & Crypto",
      allBlogs: "All Blogs",
      admin: "Admin",
      subscribe: "Subscribe",
      openAdmin: "Open Admin Workspace",
      editionLanguage: "Edition Language",
    },
    hero: {
      kicker: "The Unfiltered Journal of Modern Vice & Tech",
      titleStart: "Real testing. Unbiased benchmarks. Zero ",
      titleEmphasis: "filter.",
      subtitle:
        "NoxWire stress-tests dating algorithms, instant-payout crypto casinos, adult creator networks, and financial privacy tools with real capital and live audits.",
      tabDating: "Dating Apps",
      tabCasino: "Casino & Betting",
      tabAdult: "Adult & Creator Tech",
      verifiedToday: "Verified Today • Live Telemetry",
      hotTopics: "Hot Topics:",
      ctaPrimary: "Read Full Investigation →",
    },
    comparison: {
      eyebrow: "2026 Verified Roundups",
      heading: "Top Rated Platforms & Audited Welcome Offers",
      updatedToday: "Updated Today • Verified Testing",
      claimOffer: "Claim Offer →",
      readReview: "Read Review",
      exclusiveBonus: "Exclusive Bonus",
      rankLabel: "Rank",
    },
    ribbon: {
      explore: "Explore Verticals:",
      allTopics: "All Topics",
    },
    latest: {
      eyebrow: "Fresh from the testing desk",
      heading: "Latest Investigations & Benchmarks",
      viewAll: "View all stories",
      readReview: "Read review",
      emptyTitle: "Ready for your first review?",
      emptyDesc: "No articles published yet. Write and publish your first dating, casino, or adult review from the Admin dashboard.",
      emptyCta: "Write First Story in Admin →",
      moreComing: "More reviews and breakdowns in the testing pipeline.",
    },
    archive: {
      eyebrow: "The Complete Review Archive",
      heading: "All Reviews, Guides & Audits",
      subtitle: "Explore our comprehensive, unfiltered breakdowns across modern dating apps, regulated iGaming operators, instant crypto payouts, and adult entertainment networks.",
      searchPlaceholder: "Search dating, casino, or adult reviews...",
      sortLatest: "Sort: Latest Reviews",
      sortPopular: "Sort: Most Read",
      sortComments: "Sort: Most Discussed",
      noResultsTitle: "No reviews match that query",
      noResultsDesc: "Try adjusting your search terms or selecting another category.",
      clearFilters: "Clear Filters",
    },
    categoryArchive: {
      eyebrow: "Category Archive",
      allTopics: "All Topics",
      noStoriesTitle: "No stories published in this topic yet.",
      noStoriesDesc: "Our editorial writers are preparing new essays for this collection.",
      backButton: "Back to All Stories",
    },
    article: {
      homeBreadcrumb: "Home",
      allTopicsBreadcrumb: "All Topics",
      published: "Published",
      share: "Share",
      copied: "✓ Copied",
      like: "Like this review",
      leadReviewer: "Lead Reviewer",
      commentsHeading: "Reader Observations & Reflections",
      commentsNote: "Comments are moderated before appearing",
      nameLabel: "Your Name",
      emailLabel: "Email (kept strictly private)",
      bodyLabel: "Your Observation or Experience",
      submitBtn: "Submit Observation",
      submittingBtn: "Submitting...",
      thankYou: "Thank you for submitting your observation.",
      thankYouNote: "Your note has been received and will appear once verified by the moderation desk.",
      relatedHeading: "Related Reviews & Intel",
      readFull: "Read full review",
    },
    newsletter: {
      eyebrow: "The Sunday Wire",
      heading: "A little clarity, ",
      headingEmphasis: "every Sunday.",
      subtitle:
        "A short, high-impact dispatch on dating algorithms, payout benchmarks, and privacy tools. No spam, ever.",
      placeholder: "Enter your email address...",
      button: "Join 18,500 readers",
      submitting: "Subscribing...",
      success: "Welcome to The Sunday Wire. You're confirmed.",
      error: "Please enter a valid email address.",
      disclaimer: "By subscribing, you agree to our privacy terms. Unsubscribe anytime with one click.",
    },
    footer: {
      aboutTitle: "About NoxWire",
      categoriesTitle: "Categories",
      publicationTitle: "Publication",
      workspaceTitle: "Editorial Workspace",
      accessDashboard: "Access Admin Dashboard",
      affiliateDisclosure:
        "NoxWire provides independent reviews, mathematical analyses, and real testing. Some outbound links are affiliate referral links, meaning we may earn commercial compensation if you register or claim a promotion through our links at zero extra cost to you.",
      gamblingWarning:
        "18+ Only. Please gamble and date responsibly. For confidential gambling support call 1-800-GAMBLER or visit BeGambleAware.org.",
      rightsReserved: "All rights reserved.",
    },
    about: {
      eyebrow: "About NoxWire",
      heading: "Unfiltered Reviews & Technical Intelligence",
      p1: "NoxWire is an independent publication dedicated to stress-testing modern matchmaking apps, regulated online casinos, adult creator platforms, and financial privacy technologies with real capital and rigorous benchmarks.",
      principlesHeading: "Our Independence Principles",
      principlesText: "We never accept payment for favorable reviews or inflated ratings. When we recommend a platform, it is because our testing team created real accounts, verified payout mechanisms, evaluated response rates, and confirmed regulatory compliance.",
      affiliateHeading: "Affiliate Transparency",
      affiliateText: "Some outbound links on our site are affiliate referral links. If you register or claim a promotion through these links, our publication may receive compensation at zero extra cost to you. This supports our independent testing lab and editorial freedom.",
    },
  },
  es: {
    nav: {
      dating: "Citas y Conexiones",
      casino: "Casino y Apuestas",
      adult: "Entretenimiento Adulto",
      privacy: "Privacidad y Cripto",
      allBlogs: "Todos los Artículos",
      admin: "Admin",
      subscribe: "Suscribirse",
      openAdmin: "Abrir Panel de Admin",
      editionLanguage: "Idioma de la Edición",
    },
    hero: {
      kicker: "La Revista Sin Filtros de Entretenimiento y Tecnología",
      titleStart: "Pruebas reales. Comparativas imparciales. Cero ",
      titleEmphasis: "filtro.",
      subtitle:
        "NoxWire analiza aplicaciones de citas, casinos cripto de pago instantáneo, plataformas de creadores adultos y herramientas de privacidad financiera con depósitos reales.",
      tabDating: "Apps de Citas",
      tabCasino: "Casino y Apuestas",
      tabAdult: "Creadores y Adultos",
      verifiedToday: "Verificado Hoy • Datos en Vivo",
      hotTopics: "Temas Destacados:",
      ctaPrimary: "Leer Investigación Completa →",
    },
    comparison: {
      eyebrow: "Comparativas Verificadas 2026",
      heading: "Plataformas Mejor Valoradas y Ofertas Exclusivas",
      updatedToday: "Actualizado Hoy • Pruebas Verificadas",
      claimOffer: "Reclamar Oferta →",
      readReview: "Leer Reseña",
      exclusiveBonus: "Bono Exclusivo",
      rankLabel: "Puesto",
    },
    ribbon: {
      explore: "Explorar Categorías:",
      allTopics: "Todos los Temas",
    },
    latest: {
      eyebrow: "Recién salido de redacción",
      heading: "Últimas Investigaciones y Análisis",
      viewAll: "Ver todas las historias",
      readReview: "Leer reseña",
      emptyTitle: "¿Listo para tu primera reseña?",
      emptyDesc: "Aún no hay artículos publicados. Redacta y publica tu primera reseña desde el panel de administración.",
      emptyCta: "Escribir Primer Artículo en Admin →",
      moreComing: "Más análisis e investigaciones en fase de pruebas.",
    },
    archive: {
      eyebrow: "El Archivo Completo de Reseñas",
      heading: "Todas las Reseñas, Guías y Auditorías",
      subtitle: "Explora nuestros análisis detallados e imparciales sobre apps de citas modernas, casinos online regulados, pagos cripto y redes para creadores.",
      searchPlaceholder: "Buscar reseñas de citas, casinos o contenido adulto...",
      sortLatest: "Ordenar: Más Recientes",
      sortPopular: "Ordenar: Más Leídos",
      sortComments: "Ordenar: Más Comentados",
      noResultsTitle: "Ninguna reseña coincide con la búsqueda",
      noResultsDesc: "Prueba a cambiar los términos de búsqueda o selecciona otra categoría.",
      clearFilters: "Borrar Filtros",
    },
    categoryArchive: {
      eyebrow: "Archivo de Categoría",
      allTopics: "Todos los Temas",
      noStoriesTitle: "No hay historias publicadas en este tema todavía.",
      noStoriesDesc: "Nuestros redactores están preparando nuevos análisis para esta colección.",
      backButton: "Volver a Todas las Historias",
    },
    article: {
      homeBreadcrumb: "Inicio",
      allTopicsBreadcrumb: "Todos los Temas",
      published: "Publicado",
      share: "Compartir",
      copied: "✓ Copiado",
      like: "Me gusta este análisis",
      leadReviewer: "Analista Principal",
      commentsHeading: "Observaciones y Reflexiones de Lectores",
      commentsNote: "Los comentarios se moderan antes de publicarse",
      nameLabel: "Tu Nombre",
      emailLabel: "Correo (estrictamente privado)",
      bodyLabel: "Tu Observación o Experiencia",
      submitBtn: "Enviar Observación",
      submittingBtn: "Enviando...",
      thankYou: "Gracias por enviar tu observación.",
      thankYouNote: "Tu nota ha sido recibida y se publicará una vez verificada por la mesa de moderación.",
      relatedHeading: "Reseñas e Informes Relacionados",
      readFull: "Leer reseña completa",
    },
    newsletter: {
      eyebrow: "La Edición Dominical",
      heading: "Un poco de claridad, ",
      headingEmphasis: "cada domingo.",
      subtitle:
        "Un boletín breve y perspicaz sobre algoritmos de citas, bonos exclusivos y privacidad digital. Sin spam.",
      placeholder: "Introduce tu correo electrónico...",
      button: "Únete a 18.500 lectores",
      submitting: "Suscribiendo...",
      success: "Bienvenido a La Edición Dominical. Confirmado.",
      error: "Por favor, introduce un correo electrónico válido.",
      disclaimer: "Al suscribirte, aceptas nuestros términos. Puedes cancelar en cualquier momento con un clic.",
    },
    footer: {
      aboutTitle: "Sobre NoxWire",
      categoriesTitle: "Categorías",
      publicationTitle: "Publicación",
      workspaceTitle: "Área Editorial",
      accessDashboard: "Acceso al Panel de Admin",
      affiliateDisclosure:
        "NoxWire ofrece análisis independientes y pruebas reales. Algunos enlaces son de afiliados, lo que significa que podemos recibir una comisión sin coste adicional para ti.",
      gamblingWarning:
        "+18 únicamente. Juega y date citas de forma responsable. Para ayuda confidencial visita JugarBien.es o BeGambleAware.org.",
      rightsReserved: "Todos los derechos reservados.",
    },
    about: {
      eyebrow: "Sobre NoxWire",
      heading: "Análisis Sin Filtros e Inteligencia Técnica",
      p1: "NoxWire es una publicación independiente dedicada a probar a fondo aplicaciones de citas, casinos online regulados, plataformas para adultos y herramientas de privacidad financiera con depósitos reales.",
      principlesHeading: "Nuestros Principios de Independencia",
      principlesText: "Nunca aceptamos compensaciones a cambio de reseñas favorables o puntuaciones infladas. Si recomendamos una plataforma es porque nuestro equipo ha verificado los pagos y comprobado la seguridad real.",
      affiliateHeading: "Transparencia de Afiliación",
      affiliateText: "Algunos enlaces de nuestro sitio son enlaces de afiliados. Si te registras a través de ellos, recibimos una comisión sin coste adicional para ti, lo que financia nuestras pruebas independientes.",
    },
  },
  de: {
    nav: {
      dating: "Dating & Partnersuche",
      casino: "Casino & Wetten",
      adult: "Erwachsenen-Tech",
      privacy: "Datenschutz & Krypto",
      allBlogs: "Alle Artikel",
      admin: "Admin",
      subscribe: "Abonnieren",
      openAdmin: "Admin-Bereich öffnen",
      editionLanguage: "Ausgabe-Sprache",
    },
    hero: {
      kicker: "Das unzensierte Magazin für moderne Unterhaltung & Tech",
      titleStart: "Echte Tests. Unvoreingenommene Benchmarks. Null ",
      titleEmphasis: "Filter.",
      subtitle:
        "NoxWire testet Dating-Apps, Krypto-Casinos mit Sofortauszahlung, Creator-Netzwerke und Datenschutz-Tools mit echten Einzahlungen.",
      tabDating: "Dating-Apps",
      tabCasino: "Casino & Wetten",
      tabAdult: "Erwachsenen-Tech",
      verifiedToday: "Heute geprüft • Live-Daten",
      hotTopics: "Trends:",
      ctaPrimary: "Vollständigen Bericht lesen →",
    },
    comparison: {
      eyebrow: "Geprüfte Rankings 2026",
      heading: "Top-Plattformen & Geprüfte Willkommensangebote",
      updatedToday: "Heute aktualisiert • Echte Tests",
      claimOffer: "Angebot sichern →",
      readReview: "Bericht lesen",
      exclusiveBonus: "Exklusiver Bonus",
      rankLabel: "Rang",
    },
    ribbon: {
      explore: "Bereiche erkunden:",
      allTopics: "Alle Themen",
    },
    latest: {
      eyebrow: "Frisch aus der Redaktion",
      heading: "Neueste Analysen & Tests",
      viewAll: "Alle Artikel anzeigen",
      readReview: "Bericht lesen",
      emptyTitle: "Bereit für den ersten Testbericht?",
      emptyDesc: "Bisher wurden noch keine Berichte veröffentlicht. Verfassen und veröffentlichen Sie Ihren ersten Artikel im Admin-Dashboard.",
      emptyCta: "Ersten Artikel im Admin-Bereich schreiben →",
      moreComing: "Weitere Testberichte und Analysen in der Vorbereitung.",
    },
    archive: {
      eyebrow: "Das vollständige Archiv",
      heading: "Alle Berichte, Leitfäden & Tests",
      subtitle: "Erkunden Sie unsere unabhängigen Analysen zu modernen Dating-Apps, lizenzierten Online-Casinos, Sofortauszahlungen und Creator-Netzwerken.",
      searchPlaceholder: "Dating-, Casino- oder Adult-Berichte suchen...",
      sortLatest: "Sortieren: Neueste Tests",
      sortPopular: "Sortieren: Meistgelesen",
      sortComments: "Sortieren: Meistdiskutiert",
      noResultsTitle: "Keine Berichte gefunden",
      noResultsDesc: "Versuchen Sie andere Suchbegriffe oder wählen Sie einen anderen Bereich aus.",
      clearFilters: "Filter zurücksetzen",
    },
    categoryArchive: {
      eyebrow: "Kategorie-Archiv",
      allTopics: "Alle Themen",
      noStoriesTitle: "Noch keine Artikel in diesem Bereich.",
      noStoriesDesc: "Unsere Redaktion bereitet derzeit neue Analysen für diese Kollektion vor.",
      backButton: "Zurück zu allen Artikeln",
    },
    article: {
      homeBreadcrumb: "Startseite",
      allTopicsBreadcrumb: "Alle Themen",
      published: "Veröffentlicht",
      share: "Teilen",
      copied: "✓ Kopiert",
      like: "Testbericht gefällt mir",
      leadReviewer: "Leitender Tester",
      commentsHeading: "Leserbeobachtungen & Feedback",
      commentsNote: "Kommentare werden vor Veröffentlichung moderiert",
      nameLabel: "Dein Name",
      emailLabel: "E-Mail (streng vertraulich)",
      bodyLabel: "Deine Erfahrung oder Beobachtung",
      submitBtn: "Beobachtung absenden",
      submittingBtn: "Wird gesendet...",
      thankYou: "Vielen Dank für deine Beobachtung.",
      thankYouNote: "Dein Kommentar ist eingegangen und wird nach Prüfung freigeschaltet.",
      relatedHeading: "Verwandte Berichte & Analysen",
      readFull: "Vollständigen Bericht lesen",
    },
    newsletter: {
      eyebrow: "Die Sonntags-Ausgabe",
      heading: "Klarheit und Durchblick, ",
      headingEmphasis: "jeden Sonntag.",
      subtitle:
        "Ein kompakter, analytischer Überblick über Dating-Algorithmen, Krypto-Casinos und digitale Privatsphäre. Kein Spam.",
      placeholder: "E-Mail-Adresse eingeben...",
      button: "18.500 Lesern beitreten",
      submitting: "Anmeldung läuft...",
      success: "Willkommen beim Sonntags-Briefing. Bestätigt.",
      error: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
      disclaimer: "Mit der Anmeldung akzeptierst du unsere Datenschutzbestimmungen. Jederzeit abbestellbar.",
    },
    footer: {
      aboutTitle: "Über NoxWire",
      categoriesTitle: "Kategorien",
      publicationTitle: "Publikation",
      workspaceTitle: "Redaktionsbereich",
      accessDashboard: "Admin-Dashboard öffnen",
      affiliateDisclosure:
        "NoxWire bietet unabhängige Analysen und reale Tests. Einige Links sind Affiliate-Links, über die wir ohne Mehrkosten für dich eine Vergütung erhalten können.",
      gamblingWarning:
        "Ab 18 Jahren. Bitte spielen und daten Sie verantwortungsbewusst. Hilfe unter bzga.de oder BeGambleAware.org.",
      rightsReserved: "Alle Rechte vorbehalten.",
    },
    about: {
      eyebrow: "Über NoxWire",
      heading: "Unabhängige Tests & Technische Analysen",
      p1: "NoxWire ist ein unabhängiges Magazin, das Dating-Apps, lizenzierte Online-Casinos, Creator-Plattformen und Tools für Privatsphäre mit echtem Kapital prüft.",
      principlesHeading: "Unsere Unabhängigkeits-Grundsätze",
      principlesText: "Wir akzeptieren niemals Zahlungen für wohlwollende Berichte. Plattformen werden nur empfohlen, wenn unsere Tester Ein- und Auszahlungen erfolgreich verifiziert haben.",
      affiliateHeading: "Transparenz bei Partnerlinks",
      affiliateText: "Einige Links sind Affiliate-Links. Wenn Sie sich darüber anmelden, erhalten wir möglicherweise eine Provision ohne Zusatzkosten für Sie.",
    },
  },
  fr: {
    nav: {
      dating: "Rencontres & Matchmaking",
      casino: "Casino & Paris",
      adult: "Divertissement Adulte",
      privacy: "Confidentialité & Crypto",
      allBlogs: "Tous les Articles",
      admin: "Admin",
      subscribe: "S'abonner",
      openAdmin: "Ouvrir l'Espace Admin",
      editionLanguage: "Langue de l'Édition",
    },
    hero: {
      kicker: "Le Journal Sans Filtre des Divertissements & de la Tech",
      titleStart: "Des tests réels. Des analyses objectives. Zéro ",
      titleEmphasis: "filtre.",
      subtitle:
        "NoxWire analyse les applications de rencontre, les casinos crypto à retrait instantané, les plateformes de créateurs et les outils de confidentialité financière avec des tests réels.",
      tabDating: "Apps de Rencontre",
      tabCasino: "Casino & Paris",
      tabAdult: "Créateurs & Adulte",
      verifiedToday: "Vérifié Aujourd'hui • Télémétrie en Direct",
      hotTopics: "Sujets Tendances :",
      ctaPrimary: "Lire l'Enquête Complète →",
    },
    comparison: {
      eyebrow: "Comparatifs Vérifiés 2026",
      heading: "Plateformes les Mieux Notées & Offres Exclusives",
      updatedToday: "Mis à jour aujourd'hui • Tests vérifiés",
      claimOffer: "Profiter de l'Offre →",
      readReview: "Lire l'Avis",
      exclusiveBonus: "Bonus Exclusif",
      rankLabel: "Rang",
    },
    ribbon: {
      explore: "Explorer les Thématiques :",
      allTopics: "Tous les Sujets",
    },
    latest: {
      eyebrow: "Fraîchement publié",
      heading: "Dernières Enquêtes & Analyses",
      viewAll: "Voir toutes les enquêtes",
      readReview: "Lire l'avis",
      emptyTitle: "Prêt pour votre premier article ?",
      emptyDesc: "Aucun article publié pour le moment. Rédigez et publiez votre premier test depuis le tableau de bord administrateur.",
      emptyCta: "Rédiger le Premier Article dans l'Admin →",
      moreComing: "D'autres enquêtes et analyses arrivent sous peu.",
    },
    archive: {
      eyebrow: "L'Archive Complète des Avis",
      heading: "Tous les Avis, Guides & Enquêtes",
      subtitle: "Consultez nos analyses indépendantes sur les apps de rencontre, les casinos en ligne vérifiés, les retraits crypto et les réseaux de créateurs.",
      searchPlaceholder: "Rechercher un avis rencontres, casino ou adulte...",
      sortLatest: "Trier : Plus Récents",
      sortPopular: "Trier : Plus Lus",
      sortComments: "Trier : Plus Discutés",
      noResultsTitle: "Aucun avis ne correspond à cette recherche",
      noResultsDesc: "Essayez de modifier vos termes ou choisissez une autre catégorie.",
      clearFilters: "Réinitialiser les Filtres",
    },
    categoryArchive: {
      eyebrow: "Archive de Catégorie",
      allTopics: "Tous les Sujets",
      noStoriesTitle: "Aucun article publié dans cette catégorie pour le moment.",
      noStoriesDesc: "Nos rédacteurs préparent actuellement de nouveaux dossiers pour cette collection.",
      backButton: "Retour à tous les articles",
    },
    article: {
      homeBreadcrumb: "Accueil",
      allTopicsBreadcrumb: "Tous les Sujets",
      published: "Publié le",
      share: "Partager",
      copied: "✓ Copié",
      like: "J'aime cet avis",
      leadReviewer: "Analyste Principal",
      commentsHeading: "Observations & Retours des Lecteurs",
      commentsNote: "Les commentaires sont modérés avant publication",
      nameLabel: "Votre Nom",
      emailLabel: "Email (strictement privé)",
      bodyLabel: "Votre Observation ou Retour d'Expérience",
      submitBtn: "Soumettre l'Observation",
      submittingBtn: "Envoi en cours...",
      thankYou: "Merci d'avoir partagé votre observation.",
      thankYouNote: "Votre retour a bien été reçu et apparaîtra après modération.",
      relatedHeading: "Analyses & Critiques Associées",
      readFull: "Lire l'avis complet",
    },
    newsletter: {
      eyebrow: "L'Édition du Dimanche",
      heading: "Une dose de clarté, ",
      headingEmphasis: "chaque dimanche.",
      subtitle:
        "Un récapitulatif percutant sur les algorithmes de rencontre, les bonus de casino et les outils de confidentialité. Garanti sans spam.",
      placeholder: "Entrez votre adresse email...",
      button: "Rejoindre 18 500 lecteurs",
      submitting: "Inscription...",
      success: "Bienvenue dans l'Édition du Dimanche. Confirmé.",
      error: "Veuillez entrer une adresse email valide.",
      disclaimer: "En vous inscrivant, vous acceptez nos conditions. Désinscription facile en un clic.",
    },
    footer: {
      aboutTitle: "À propos de NoxWire",
      categoriesTitle: "Catégories",
      publicationTitle: "Publication",
      workspaceTitle: "Espace Éditorial",
      accessDashboard: "Accéder au Dashboard Admin",
      affiliateDisclosure:
        "NoxWire fournit des analyses indépendantes et des tests vérifiés. Certains liens sont des liens affiliés pouvant générer une commission sans coût additionnel pour vous.",
      gamblingWarning:
        "Réservé aux plus de 18 ans. Jouez et faites des rencontres de manière responsable. Aide confidentielle sur joueurs-info-service.fr ou BeGambleAware.org.",
      rightsReserved: "Tous droits réservés.",
    },
    about: {
      eyebrow: "À propos de NoxWire",
      heading: "Avis Sans Filtre & Expertise Technique",
      p1: "NoxWire est un média d'investigation indépendant consacré aux tests rigoureux des applications de rencontre, des casinos en ligne régulés, des plateformes adultes et de la confidentialité financière.",
      principlesHeading: "Nos Principes d'Indépendance",
      principlesText: "Nous refusons tout paiement pour des critiques élogieuses. Si nous recommandons un service, c'est que nos testeurs ont vérifié son bon fonctionnement et ses paiements avec des fonds réels.",
      affiliateHeading: "Transparence d'Affiliation",
      affiliateText: "Certains liens sont des liens partenaires. Si vous vous inscrivez par leur biais, nous pouvons percevoir une commission sans surcoût pour vous.",
    },
  },
};

/**
 * Localizes a post's title, excerpt, badge, category, and reading time based on active locale.
 */
export function getLocalizedPost<T extends { slug: string; title: string; excerpt: string; badge?: string; category: string; categorySlug: string; readingTime: string; publishedAt?: string }>(
  post: T,
  locale: Locale
): T {
  if (locale === "en") {
    return {
      ...post,
      category: getLocalizedCategory(post.categorySlug, locale),
      readingTime: getLocalizedReadingTime(post.readingTime, locale),
    };
  }

  const trans = ARTICLE_LOCALIZATIONS[locale]?.[post.slug];
  return {
    ...post,
    title: trans?.title || post.title,
    excerpt: trans?.excerpt || post.excerpt,
    badge: trans?.badge || post.badge,
    category: getLocalizedCategory(post.categorySlug, locale),
    readingTime: getLocalizedReadingTime(post.readingTime, locale),
    publishedAt: post.publishedAt ? getLocalizedDate(post.publishedAt, locale) : post.publishedAt,
  };
}

/**
 * Returns the localized category name for a category slug.
 */
export function getLocalizedCategory(slug: string, locale: Locale): string {
  const cat = CATEGORY_TRANSLATIONS[locale]?.[slug] || CATEGORY_TRANSLATIONS.en[slug];
  if (cat) return cat.name;

  // Fallback map for alternative slugs
  const slugAliases: Record<string, string> = {
    dating: "dating",
    "gambling-casino": "gambling-casino",
    gambling: "gambling-casino",
    casino: "gambling-casino",
    "adult-lifestyle": "adult-lifestyle",
    adult: "adult-lifestyle",
    "guides-security": "guides-security",
    guides: "guides-security",
    privacy: "guides-security",
  };
  const resolved = slugAliases[slug];
  if (resolved && CATEGORY_TRANSLATIONS[locale]?.[resolved]) {
    return CATEGORY_TRANSLATIONS[locale][resolved].name;
  }

  return slug;
}

/**
 * Returns the localized category description for a category slug.
 */
export function getLocalizedCategoryDesc(slug: string, locale: Locale): string {
  const cat = CATEGORY_TRANSLATIONS[locale]?.[slug] || CATEGORY_TRANSLATIONS.en[slug];
  if (cat) return cat.description;
  return "";
}

/**
 * Translates reading time string like "12 min read"
 */
export function getLocalizedReadingTime(readingTime: string, locale: Locale): string {
  const match = readingTime.match(/(\d+)/);
  const minutes = match ? match[1] : "8";

  switch (locale) {
    case "es":
      return `${minutes} min de lectura`;
    case "de":
      return `${minutes} Min. Lesezeit`;
    case "fr":
      return `${minutes} min de lecture`;
    case "en":
    default:
      return `${minutes} min read`;
  }
}

/**
 * Formats a publication date string like "Sep 20, 2026" into the local language
 */
export function getLocalizedDate(dateStr: string, locale: Locale): string {
  if (!dateStr) return "";
  const monthsMap: Record<string, { es: string; de: string; fr: string }> = {
    Jan: { es: "Ene", de: "Jan.", fr: "Janv." },
    Feb: { es: "Feb", de: "Feb.", fr: "Févr." },
    Mar: { es: "Mar", de: "März", fr: "Mars" },
    Apr: { es: "Abr", de: "Apr.", fr: "Avr." },
    May: { es: "May", de: "Mai", fr: "Mai" },
    Jun: { es: "Jun", de: "Juni", fr: "Juin" },
    Jul: { es: "Jul", de: "Juli", fr: "Juil." },
    Aug: { es: "Ago", de: "Aug.", fr: "Août" },
    Sep: { es: "Sep", de: "Sept.", fr: "Sept." },
    Oct: { es: "Oct", de: "Okt.", fr: "Oct." },
    Nov: { es: "Nov", de: "Nov.", fr: "Nov." },
    Dec: { es: "Dic", de: "Dez.", fr: "Déc." },
  };

  const parts = dateStr.match(/([A-Za-z]+)\s+(\d+),\s+(\d+)/);
  if (!parts) return dateStr;

  const [, month, day, year] = parts;
  const transMonth = monthsMap[month]?.[locale as "es" | "de" | "fr"];

  if (locale === "es") {
    return `${day} de ${transMonth || month}, ${year}`;
  } else if (locale === "de") {
    return `${day}. ${transMonth || month} ${year}`;
  } else if (locale === "fr") {
    return `${day} ${transMonth || month} ${year}`;
  }

  return dateStr;
}
