import React from "react";

export const GlobalJsonLd: React.FC = () => {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Atlas Journal",
    "alternateName": ["Atlas Editorial", "Atlas PublishHub"],
    "url": "https://publish-hub.vercel.app",
    "description": "Independent empirical evaluations of matchmaking platforms, regulated iGaming operators, and intentional digital software.",
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
    "name": "Atlas Journal",
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
        "name": "Maya Patel",
        "jobTitle": "Editor-in-Chief & Lead Systems Auditor"
      }
    ],
    "publishingPrinciples": "https://publish-hub.vercel.app/editorial-standards",
    "correctionsPolicy": "https://publish-hub.vercel.app/editorial-standards#corrections",
    "knowsAbout": [
      "Digital Matchmaking Algorithms",
      "Regulated iGaming Compliance",
      "Payment Processing Velocity",
      "Software Ergonomics & Dark Pattern Detection"
    ],
    "sameAs": [
      "https://twitter.com/AtlasJournalHQ",
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
