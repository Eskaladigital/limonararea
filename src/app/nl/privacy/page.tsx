import { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";

const PRIVACIDAD_METADATA: Metadata = {
  title: "Privacybeleid | Eco Area Limonar",
  description: "Privacybeleid en gegevensbescherming van Eco Area Limonar. Informatie over hoe wij uw persoonsgegevens verwerken en beschermen onder de AVG.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "nl";
  const alternates = buildCanonicalAlternates("/privacidad", locale);

  return {
    ...PRIVACIDAD_METADATA,
    alternates,
  };
}

export const revalidate = 604800;

export default async function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHero tag="Juridisch" title="Privacybeleid" subtitle="Informatie over gegevensbescherming" />

      <Section variant="sand">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 md:p-12 max-w-4xl mx-auto prose prose-gray max-w-none">
          <p className="text-gray-500">Laatst bijgewerkt: januari 2024</p>

          <h2>1. Verwerkingsverantwoordelijke</h2>
          <ul>
            <li><strong>Identiteit:</strong> Eco Area Limonar S.L.</li>
            <li><strong>CIF:</strong> B-XXXXXXXX</li>
            <li><strong>Adres:</strong> Calle Ejemplo, 123 - 30001 Murcia</li>
            <li><strong>E-mail:</strong> privacidad@limonar.com</li>
            <li><strong>Telefoon:</strong> +34 968 000 000</li>
          </ul>

          <h2>2. Persoonsgegevens die wij verwerken</h2>
          <p>Eco Area Limonar kan de volgende categorieën persoonsgegevens verwerken:</p>
          <ul>
            <li><strong>Identificatiegegevens:</strong> naam, achternaam, ID/NIE/Paspoort</li>
            <li><strong>Contactgegevens:</strong> postadres, e-mail, telefoon</li>
            <li><strong>Factureringsgegevens:</strong> bankgegevens, betalingsgeschiedenis</li>
            <li><strong>Rijbewijsgegevens:</strong> rijbewijs, datum van afgifte</li>
            <li><strong>Browsegegevens:</strong> IP-adres, cookies, voorkeuren</li>
          </ul>

          <h2>3. Doel van de verwerking</h2>
          <p>Verstrekte persoonsgegevens worden verwerkt voor de volgende doeleinden:</p>
          <ul>
            <li>Beheer van boekingen en huurcontracten</li>
            <li>Facturering en inning voor gecontracteerde diensten</li>
            <li>Afhandeling van vragen en informatieverzoeken</li>
            <li>Verzending van commerciële communicatie (met voorafgaande toestemming)</li>
            <li>Naleving van wettelijke verplichtingen</li>
            <li>Verbetering van onze diensten en gebruikerservaring</li>
          </ul>

          <h2>4. Rechtsgrondslag voor de verwerking</h2>
          <ul>
            <li><strong>Contractuitvoering:</strong> voor het beheer van boekingen en verhuur</li>
            <li><strong>Toestemming:</strong> voor het verzenden van commerciële communicatie</li>
            <li><strong>Wettelijke verplichting:</strong> om te voldoen aan belasting- en verkeersregelgeving</li>
            <li><strong>Gerechtvaardigd belang:</strong> om onze diensten te verbeteren</li>
          </ul>

          <h2>5. Ontvangers van gegevens</h2>
          <ul>
            <li>Verzekeringsmaatschappijen (voor het beheer van voertuigverzekeringen)</li>
            <li>Bankinstelling (voor betalingsverwerking)</li>
            <li>Overheidsinstellingen (wanneer wettelijk vereist)</li>
            <li>Technologische dienstverleners (hosting, e-mail, enz.)</li>
          </ul>

          <h2>6. Bewaartermijn van gegevens</h2>
          <ul>
            <li>Klantgegevens: gedurende de contractuele relatie en 5 extra jaren</li>
            <li>Factureringsgegevens: 6 jaar (wettelijke verplichting)</li>
            <li>Browsegegevens: maximaal 2 jaar</li>
            <li>Marketingtoestemmingen: tot intrekking</li>
          </ul>

          <h2>7. Rechten van betrokkenen</h2>
          <p>U heeft het recht op:</p>
          <ul>
            <li><strong>Inzage:</strong> weten welke gegevens wij over u bewaren</li>
            <li><strong>Rectificatie:</strong> onjuiste gegevens corrigeren</li>
            <li><strong>Wissen:</strong> verzoek om verwijdering van uw gegevens</li>
            <li><strong>Beperking:</strong> verwerking beperken in bepaalde gevallen</li>
            <li><strong>Overdraagbaarheid:</strong> uw gegevens ontvangen in een gestructureerd formaat</li>
            <li><strong>Bezwaar:</strong> bezwaar maken tegen de verwerking van uw gegevens</li>
          </ul>
          <p>Om deze rechten uit te oefenen, neem contact met ons op via privacidad@limonar.com met een kopie van uw identiteitsbewijs.</p>

          <h2>8. Cookies</h2>
          <p>Deze website maakt gebruik van eigen cookies en cookies van derden. Raadpleeg ons cookiebeleid voor meer informatie.</p>

          <h2>9. Beveiliging</h2>
          <p>Eco Area Limonar heeft de nodige technische en organisatorische maatregelen genomen om de veiligheid van persoonsgegevens te waarborgen.</p>

          <h2>10. Wijzigingen</h2>
          <p>Eco Area Limonar behoudt zich het recht voor dit privacybeleid te wijzigen om het aan te passen aan wettelijke of jurisprudentiële ontwikkelingen.</p>

          <h2>11. Klachten</h2>
          <p>Als u van mening bent dat de verwerking van uw gegevens niet in overeenstemming is met de regelgeving, kunt u een klacht indienen bij de Spaanse Gegevensbeschermingsautoriteit (www.aepd.es).</p>
        </div>
      </Section>
    </main>
  );
}
