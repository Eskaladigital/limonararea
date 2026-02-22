export function AboutPageJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Sobre Eco Area Limonar - Quiénes Somos",
    "description": "Eco Area Limonar es una empresa familiar especializada en alquiler de autocaravanas y campers en Murcia desde 2012. Pasión por viajar, libertad para explorar.",
    "url": "https://www.limonar.com/quienes-somos",
    "mainEntity": {
      "@type": "Organization",
      "name": "Eco Area Limonar",
      "legalName": "Eco Area Limonar",
      "foundingDate": "2012",
      "url": "https://www.limonar.com",
      "logo": "https://www.limonar.com/logo.png",
      "description": "Empresa familiar especializada en alquiler de autocaravanas y campers de gran volumen en Murcia.",
      "slogan": "Tu hotel 5 estrellas sobre ruedas",
      "telephone": "+34868364161",
      "email": "info@limonar.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Avenida Puente Tocinos, 4",
        "addressLocality": "Casillas - Murcia",
        "addressRegion": "Región de Murcia",
        "postalCode": "30007",
        "addressCountry": "ES"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "38.0265",
        "longitude": "-1.1635"
      },
      "numberOfEmployees": {
        "@type": "QuantitativeValue",
        "value": "5-10"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "500",
        "bestRating": "5"
      },
      "areaServed": [
        {
          "@type": "Country",
          "name": "España"
        },
        {
          "@type": "State",
          "name": "Región de Murcia"
        },
        {
          "@type": "State",
          "name": "Comunidad Valenciana"
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function ContactPageJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contacto - Eco Area Limonar",
    "description": "Contacta con Eco Area Limonar para alquilar tu autocaravana en Murcia. Teléfono: 868 36 41 61. Email: info@limonar.com",
    "url": "https://www.limonar.com/contacto",
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": "Eco Area Limonar",
      "telephone": "+34868364161",
      "email": "info@limonar.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Avenida Puente Tocinos, 4",
        "addressLocality": "Casillas - Murcia",
        "addressRegion": "Región de Murcia",
        "postalCode": "30007",
        "addressCountry": "ES"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "38.0265",
        "longitude": "-1.1635"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00"
        }
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+34868364161",
          "contactType": "customer service",
          "areaServed": "ES",
          "availableLanguage": ["Spanish", "English"]
        },
        {
          "@type": "ContactPoint",
          "email": "info@limonar.com",
          "contactType": "customer service",
          "areaServed": "ES",
          "availableLanguage": ["Spanish", "English"]
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
