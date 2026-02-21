import { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";

const AVISO_METADATA: Metadata = {
  title: "Juridische mededeling | Eco Area Limonar",
  description: "Juridische mededeling en gebruiksvoorwaarden van Eco Area Limonar. Juridische informatie over het camperterrein in Los Nietos, Mar Menor.",
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
  const alternates = buildCanonicalAlternates("/aviso-legal", locale);

  return {
    ...AVISO_METADATA,
    alternates,
  };
}

export const revalidate = 604800;

export default async function JuridischeMededelingPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHero title="Juridische mededeling" className="py-12" />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm p-8 max-w-4xl mx-auto prose prose-gray max-w-none">
            <p className="text-gray-500">Laatst bijgewerkt: januari 2024</p>

            <h2>1. Identificatiegegevens</h2>
            <p>In overeenstemming met de informatieplicht van artikel 10 van Wet 34/2002, van 11 juli, inzake diensten van de informatiemaatschappij en elektronische handel, worden de volgende gegevens verstrekt:</p>
            <ul>
              <li><strong>Bedrijfsnaam:</strong> FURGOCASA S.L.</li>
              <li><strong>CIF:</strong> B-XXXXXXXX</li>
              <li><strong>Statutaire zetel:</strong> Calle Ejemplo, 123 - 30001 Murcia</li>
              <li><strong>E-mail:</strong> info@furgocasa.com</li>
              <li><strong>Telefoon:</strong> +34 968 000 000</li>
              <li><strong>Registratie:</strong> Handelsregister van Murcia, Deel XXX, Folio XXX, Blad MU-XXXXX</li>
            </ul>

            <h2>2. Doel</h2>
            <p>Deze juridische mededeling regelt het gebruik van de website www.ecoarealimonar.com, eigendom van FURGOCASA S.L. Het browsen op de website kent de hoedanigheid van gebruiker toe en impliceert volledige en onvoorwaardelijke aanvaarding van alle bepalingen in deze Juridische mededeling.</p>

            <h2>3. Gebruiksvoorwaarden</h2>
            <p>De gebruiker verbindt zich ertoe om de inhoud en diensten die FURGOCASA via haar portaal aanbiedt op gepaste wijze te gebruiken en, bij wijze van voorbeeld maar niet beperkt tot, deze niet te gebruiken om:</p>
            <ul>
              <li>Onwettige, illegale activiteiten of activiteiten die in strijd zijn met de goede trouw en de openbare orde te verrichten</li>
              <li>Schade toe te brengen aan de fysieke en logische systemen van FURGOCASA, haar leveranciers of derden</li>
              <li>Computervirussen of andere fysieke of logische systemen te introduceren of te verspreiden die schade kunnen veroorzaken</li>
              <li>Te proberen toegang te krijgen tot, gebruik te maken van en/of de gegevens van FURGOCASA, externe leveranciers en andere gebruikers te manipuleren</li>
            </ul>

            <h2>4. Intellectueel en industrieel eigendom</h2>
            <p>FURGOCASA, zelf of als cessionaris, is eigenaar van alle intellectuele en industriële eigendomsrechten van haar website, alsmede van de daarin vervatte elementen.</p>

            <h2>5. Uitsluiting van garanties en aansprakelijkheid</h2>
            <p>FURGOCASA is in geen geval verantwoordelijk voor schade van welke aard dan ook die kan worden veroorzaakt, met inbegrip van maar niet beperkt tot: fouten of weglatingen in de inhoud, niet-beschikbaarheid van het portaal, of de overdracht van virussen of kwaadaardige programma&apos;s in de inhoud.</p>

            <h2>6. Wijzigingen</h2>
            <p>FURGOCASA behoudt zich het recht voor om zonder voorafgaande kennisgeving wijzigingen aan te brengen die zij geschikt acht op haar portaal, waarbij zij inhoud en diensten kan wijzigen, verwijderen of toevoegen, evenals de manier waarop deze worden gepresenteerd of geplaatst.</p>

            <h2>7. Links</h2>
            <p>In het geval dat de website links of hyperlinks naar andere internetsites bevat, zal FURGOCASA geen enkele vorm van controle uitoefenen over genoemde sites en inhoud.</p>

            <h2>8. Recht van uitsluiting</h2>
            <p>FURGOCASA behoudt zich het recht voor om de toegang tot het portaal en/of de aangeboden diensten zonder voorafgaande kennisgeving te weigeren of in te trekken, op eigen verzoek of op verzoek van een derde.</p>

            <h2>9. Toepasselijk recht en jurisdictie</h2>
            <p>De relatie tussen FURGOCASA en de gebruiker wordt beheerst door de huidige Spaanse wetgeving en elk geschil wordt voorgelegd aan de rechtbanken en tribunalen van de stad Murcia.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
