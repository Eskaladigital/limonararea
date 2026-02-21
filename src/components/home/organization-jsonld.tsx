export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "name": "Furgocasa",
    "legalName": "Furgocasa S.L.",
    "url": "https://www.furgocasa.com",
    "logo": "https://www.furgocasa.com/logo.png",
    "description": "Empresa especializada en alquiler de autocaravanas y campers de gran volumen en Murcia. Flota premium con kilómetros ilimitados.",
    "foundingDate": "2012",
    "telephone": "+34868364161",
    "email": "info@furgocasa.com",
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
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "19:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "14:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/furgocasa",
      "https://www.instagram.com/furgocasa"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "250",
      "bestRating": "5",
      "worstRating": "1"
    },
    "priceRange": "95€ - 155€"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface Parcel {
  id: string;
  name: string;
  slug: string;
  length_m?: number | null;
  width_m?: number | null;
  main_image: string | null;
}

interface ProductJsonLdProps {
  parcels: Parcel[];
}

export function ProductJsonLd({ parcels }: ProductJsonLdProps) {
  const products = parcels.map(parcel => {
    const dims = parcel.length_m && parcel.width_m
      ? `Parcela de ${parcel.length_m}×${parcel.width_m}m`
      : "Parcela para autocaravana";
    return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": parcel.name,
    "description": `${dims}. Parcela equipada con electricidad, agua y servicios en Eco Area Limonar, Los Nietos.`,
    "image": parcel.main_image || "https://www.furgocasa.com/default-parcel.jpg",
    "url": `https://www.furgocasa.com/parcelas/${parcel.slug}`,
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "EUR",
      "lowPrice": "95",
      "highPrice": "155",
      "offerCount": "3",
      "availability": "https://schema.org/InStock",
      "priceValidUntil": "2026-12-31",
      "seller": {
        "@type": "Organization",
        "name": "Furgocasa"
      }
    },
    "additionalProperty": parcel.length_m && parcel.width_m
      ? [
          { "@type": "PropertyValue", "name": "Longitud", "value": `${parcel.length_m}m` },
          { "@type": "PropertyValue", "name": "Ancho", "value": `${parcel.width_m}m` },
          { "@type": "PropertyValue", "name": "Superficie", "value": `${(parcel.length_m * parcel.width_m).toFixed(0)}m²` }
        ]
      : [],
    "category": "Parcela autocaravana",
    "audience": {
      "@type": "PeopleAudience",
      "audienceType": "Familias y viajeros"
    }
  };
  });

  return (
    <>
      {products.map((product, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }}
        />
      ))}
    </>
  );
}

export function WebsiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Furgocasa",
    "url": "https://www.furgocasa.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.furgocasa.com/buscar?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
