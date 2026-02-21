import { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";

const AVISO_METADATA: Metadata = {
  title: "Impressum | Eco Area Limonar",
  description: "Impressum und Nutzungsbedingungen von Eco Area Limonar. Rechtliche Informationen über den Wohnmobilstellplatz in Los Nietos, Mar Menor.",
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
  const alternates = buildCanonicalAlternates("/aviso-legal", locale);

  return {
    ...AVISO_METADATA,
    alternates,
  };
}

export const revalidate = 604800;

export default async function LegalNoticePage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHero title="Impressum" className="py-12" />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm p-8 max-w-4xl mx-auto prose prose-gray max-w-none">
            <p className="text-gray-500">Letzte Aktualisierung: Januar 2024</p>

            <h2>1. Identifikationsdaten</h2>
            <p>In Erfüllung der Informationspflicht gemäß Artikel 10 des Gesetzes 34/2002 vom 11. Juli über Dienste der Informationsgesellschaft und elektronischen Geschäftsverkehr werden folgende Daten bereitgestellt:</p>
            <ul>
              <li><strong>Firmenname:</strong> FURGOCASA S.L.</li>
              <li><strong>CIF:</strong> B-XXXXXXXX</li>
              <li><strong>Sitz:</strong> Calle Ejemplo, 123 - 30001 Murcia</li>
              <li><strong>E-Mail:</strong> info@furgocasa.com</li>
              <li><strong>Telefon:</strong> +34 968 000 000</li>
              <li><strong>Registrierung:</strong> Handelsregister Murcia, Band XXX, Blatt XXX, Eintrag MU-XXXXX</li>
            </ul>

            <h2>2. Zweck</h2>
            <p>Dieses Impressum regelt die Nutzung der Website www.ecoarealimonar.com, die Eigentum von FURGOCASA S.L. ist. Das Surfen auf der Website verleiht die Eigenschaft eines Nutzers und impliziert die vollständige und vorbehaltlose Annahme aller in diesem Impressum enthaltenen Bestimmungen.</p>

            <h2>3. Nutzungsbedingungen</h2>
            <p>Der Nutzer verpflichtet sich, die von FURGOCASA über sein Portal angebotenen Inhalte und Dienste ordnungsgemäß zu nutzen und diese beispielsweise, aber nicht ausschließlich, nicht zu verwenden für:</p>
            <ul>
              <li>Rechtswidrige, illegale Aktivitäten oder solche, die gegen Treu und Glauben und die öffentliche Ordnung verstoßen</li>
              <li>Schäden an den physischen und logischen Systemen von FURGOCASA, seinen Lieferanten oder Dritten</li>
              <li>Einführung oder Verbreitung von Computerviren oder anderen physischen oder logischen Systemen, die Schäden verursachen können</li>
              <li>Versuch, auf die Daten von FURGOCASA, Drittanbietern und anderen Nutzern zuzugreifen, diese zu verwenden und/oder zu manipulieren</li>
            </ul>

            <h2>4. Geistiges und gewerbliches Eigentum</h2>
            <p>FURGOCASA ist, entweder selbst oder als Rechtsnachfolger, Inhaber aller geistigen und gewerblichen Eigentumsrechte an seiner Website sowie an den darin enthaltenen Elementen.</p>

            <h2>5. Haftungsausschluss</h2>
            <p>FURGOCASA haftet in keinem Fall für Schäden jeglicher Art, die verursacht werden können, einschließlich, aber nicht beschränkt auf: Fehler oder Auslassungen im Inhalt, mangelnde Verfügbarkeit des Portals oder die Übertragung von Viren oder Schadprogrammen im Inhalt.</p>

            <h2>6. Änderungen</h2>
            <p>FURGOCASA behält sich das Recht vor, ohne vorherige Ankündigung Änderungen vorzunehmen, die es für sein Portal für angemessen hält, und kann Inhalte und Dienste sowie deren Darstellungs- oder Platzierungsweise ändern, löschen oder hinzufügen.</p>

            <h2>7. Links</h2>
            <p>Für den Fall, dass die Website Links oder Hyperlinks zu anderen Internetseiten enthält, übt FURGOCASA keinerlei Kontrolle über diese Seiten und Inhalte aus.</p>

            <h2>8. Ausschlussrecht</h2>
            <p>FURGOCASA behält sich das Recht vor, den Zugang zum Portal und/oder den angebotenen Diensten ohne vorherige Ankündigung, auf eigene Initiative oder auf Anfrage eines Dritten, zu verweigern oder zu entziehen.</p>

            <h2>9. Anwendbares Recht und Gerichtsstand</h2>
            <p>Das Verhältnis zwischen FURGOCASA und dem Nutzer unterliegt dem geltenden spanischen Recht und etwaige Streitigkeiten werden den Gerichten der Stadt Murcia vorgelegt.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
