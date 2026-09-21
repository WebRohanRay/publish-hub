import React from "react";

export const GlobalJsonLd: React.FC = () => {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "NoxWire",
    "alternateName": ["NoxWire Journal", "NoxWire Reviews", "NoxWire Editorial"],
    "url": "https://publish-hub.vercel.app",
    "description": "The unfiltered review journal for verified dating apps, regulated online casinos, sportsbook odds, and adult creator tech.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://publish-hub.vercel.app/blog?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "inLanguage": ["en-US", "es-ES", "de-DE", "fr-FR"]
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    "name": "NoxWire",
    "url": "https://publish-hub.vercel.app",
    "logo": {
      "@type": "ImageObject",
      "url": "https://publish-hub.vercel.app/art/atlas_social_card.jpg",
      "width": 1200,
      "height": 630
    },
    "foundingDate": "2024",
    "founders": [
      {
        "@type": "Person",
        "name": "Rohan Ray",
        "jobTitle": "Editor-in-Chief"
      }
    ],
    "knowsAbout": [
      "Online Dating Algorithms",
      "Matchmaking Platform Safety",
      "Regulated iGaming & Casino Licensing",
      "Instant Crypto Payout Protocols",
      "Adult Entertainment & Webcam Tech",
      "Discreet Billing & Privacy Protection"
    ],
    "sameAs": [
      "https://twitter.com/NoxWireHQ",
      "https://github.com/WebRohanRay/publish-hub"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
};
