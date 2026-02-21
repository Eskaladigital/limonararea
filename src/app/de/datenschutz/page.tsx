import { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";

const PRIVACIDAD_METADATA: Metadata = {
  title: "Datenschutzrichtlinie | Eco Area Limonar",
  description: "Datenschutzrichtlinie und Datenschutz von Eco Area Limonar. Informationen darüber, wie wir Ihre personenbezogenen Daten gemäß der DSGVO verarbeiten und schützen.",
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
  const locale: Locale = "de";
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
      <PageHero tag="Rechtliches" title="Datenschutzrichtlinie" subtitle="Informationen zum Datenschutz" />

      <Section variant="sand">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 md:p-12 max-w-4xl mx-auto prose prose-gray max-w-none">
          <p className="text-gray-500">Letzte Aktualisierung: Januar 2024</p>

          <h2>1. Verantwortlicher für die Datenverarbeitung</h2>
          <ul>
            <li><strong>Identität:</strong> FURGOCASA S.L.</li>
            <li><strong>CIF:</strong> B-XXXXXXXX</li>
            <li><strong>Adresse:</strong> Calle Ejemplo, 123 - 30001 Murcia</li>
            <li><strong>E-Mail:</strong> privacidad@furgocasa.com</li>
            <li><strong>Telefon:</strong> +34 968 000 000</li>
          </ul>

          <h2>2. Personenbezogene Daten, die wir verarbeiten</h2>
          <p>FURGOCASA kann die folgenden Kategorien personenbezogener Daten verarbeiten:</p>
          <ul>
            <li><strong>Identifikationsdaten:</strong> Name, Nachname, Personalausweis/NIE/Reisepass</li>
            <li><strong>Kontaktdaten:</strong> Postanschrift, E-Mail, Telefon</li>
            <li><strong>Rechnungsdaten:</strong> Bankverbindung, Zahlungshistorie</li>
            <li><strong>Führerscheindaten:</strong> Führerschein, Ausstellungsdatum</li>
            <li><strong>Browserdaten:</strong> IP-Adresse, Cookies, Präferenzen</li>
          </ul>

          <h2>3. Zweck der Verarbeitung</h2>
          <p>Die bereitgestellten personenbezogenen Daten werden für folgende Zwecke verarbeitet:</p>
          <ul>
            <li>Verwaltung von Buchungen und Mietverträgen</li>
            <li>Rechnungsstellung und Inkasso für beauftragte Dienstleistungen</li>
            <li>Bearbeitung von Anfragen und Informationsanforderungen</li>
            <li>Versand von kommerziellen Mitteilungen (mit vorheriger Einwilligung)</li>
            <li>Erfüllung gesetzlicher Verpflichtungen</li>
            <li>Verbesserung unserer Dienste und Nutzererfahrung</li>
          </ul>

          <h2>4. Rechtsgrundlage der Verarbeitung</h2>
          <ul>
            <li><strong>Vertragserfüllung:</strong> zur Verwaltung von Buchungen und Anmietungen</li>
            <li><strong>Einwilligung:</strong> für den Versand kommerzieller Mitteilungen</li>
            <li><strong>Gesetzliche Verpflichtung:</strong> zur Einhaltung von Steuer- und Verkehrsvorschriften</li>
            <li><strong>Berechtigtes Interesse:</strong> zur Verbesserung unserer Dienste</li>
          </ul>

          <h2>5. Datenempfänger</h2>
          <ul>
            <li>Versicherungsunternehmen (für die Kfz-Versicherungsverwaltung)</li>
            <li>Bankinstitute (für die Zahlungsabwicklung)</li>
            <li>Öffentliche Verwaltungen (wenn gesetzlich vorgeschrieben)</li>
            <li>Technologiedienstleister (Hosting, E-Mail usw.)</li>
          </ul>

          <h2>6. Aufbewahrungsdauer der Daten</h2>
          <ul>
            <li>Kundendaten: während der Vertragsbeziehung und 5 weitere Jahre</li>
            <li>Rechnungsdaten: 6 Jahre (gesetzliche Verpflichtung)</li>
            <li>Browserdaten: maximal 2 Jahre</li>
            <li>Marketingeinwilligungen: bis zum Widerruf</li>
          </ul>

          <h2>7. Rechte der betroffenen Personen</h2>
          <p>Sie haben das Recht auf:</p>
          <ul>
            <li><strong>Auskunft:</strong> zu erfahren, welche Daten wir über Sie gespeichert haben</li>
            <li><strong>Berichtigung:</strong> unrichtige Daten korrigieren zu lassen</li>
            <li><strong>Löschung:</strong> die Löschung Ihrer Daten zu verlangen</li>
            <li><strong>Einschränkung:</strong> die Verarbeitung in bestimmten Fällen einzuschränken</li>
            <li><strong>Datenübertragbarkeit:</strong> Ihre Daten in einem strukturierten Format zu erhalten</li>
            <li><strong>Widerspruch:</strong> der Verarbeitung Ihrer Daten zu widersprechen</li>
          </ul>
          <p>Um diese Rechte auszuüben, kontaktieren Sie uns unter privacidad@furgocasa.com mit einer Kopie Ihres Ausweises.</p>

          <h2>8. Cookies</h2>
          <p>Diese Website verwendet eigene und Cookies von Drittanbietern. Bitte lesen Sie unsere Cookie-Richtlinie für weitere Informationen.</p>

          <h2>9. Sicherheit</h2>
          <p>FURGOCASA hat die notwendigen technischen und organisatorischen Maßnahmen ergriffen, um die Sicherheit der personenbezogenen Daten zu gewährleisten.</p>

          <h2>10. Änderungen</h2>
          <p>FURGOCASA behält sich das Recht vor, diese Datenschutzrichtlinie zu ändern, um sie an gesetzliche Entwicklungen oder Rechtsprechung anzupassen.</p>

          <h2>11. Beschwerden</h2>
          <p>Wenn Sie der Meinung sind, dass die Verarbeitung Ihrer Daten nicht den Vorschriften entspricht, können Sie eine Beschwerde bei der spanischen Datenschutzbehörde (www.aepd.es) einreichen.</p>
        </div>
      </Section>
    </main>
  );
}
