import { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";

const PRIVACIDAD_METADATA: Metadata = {
  title: "Privacy Policy | Eco Area Limonar",
  description: "Privacy policy and data protection of Eco Area Limonar. Information about how we process and protect your personal data under GDPR.",
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
  const locale: Locale = "en";
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
      <PageHero tag="Legal" title="Privacy Policy" subtitle="Information about data protection" />

      <Section variant="sand">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 md:p-12 max-w-4xl mx-auto prose prose-gray max-w-none">
          <p className="text-gray-500">Last updated: January 2024</p>

          <h2>1. Data controller</h2>
          <ul>
            <li><strong>Identity:</strong> FURGOCASA S.L.</li>
            <li><strong>CIF:</strong> B-XXXXXXXX</li>
            <li><strong>Address:</strong> Calle Ejemplo, 123 - 30001 Murcia</li>
            <li><strong>Email:</strong> privacidad@furgocasa.com</li>
            <li><strong>Phone:</strong> +34 968 000 000</li>
          </ul>

          <h2>2. Personal data we process</h2>
          <p>FURGOCASA may process the following categories of personal data:</p>
          <ul>
            <li><strong>Identification data:</strong> name, surname, ID/NIE/Passport</li>
            <li><strong>Contact data:</strong> postal address, email, phone</li>
            <li><strong>Billing data:</strong> bank details, payment history</li>
            <li><strong>Driving data:</strong> driving licence, date of issue</li>
            <li><strong>Browsing data:</strong> IP address, cookies, preferences</li>
          </ul>

          <h2>3. Purpose of processing</h2>
          <p>Personal data provided will be processed for the following purposes:</p>
          <ul>
            <li>Management of bookings and rental contracts</li>
            <li>Invoicing and collection for contracted services</li>
            <li>Handling queries and information requests</li>
            <li>Sending commercial communications (with prior consent)</li>
            <li>Compliance with legal obligations</li>
            <li>Improvement of our services and user experience</li>
          </ul>

          <h2>4. Legal basis for processing</h2>
          <ul>
            <li><strong>Contract execution:</strong> to manage bookings and rentals</li>
            <li><strong>Consent:</strong> for sending commercial communications</li>
            <li><strong>Legal obligation:</strong> to comply with tax and traffic regulations</li>
            <li><strong>Legitimate interest:</strong> to improve our services</li>
          </ul>

          <h2>5. Data recipients</h2>
          <ul>
            <li>Insurance companies (for vehicle insurance management)</li>
            <li>Banking entities (for payment processing)</li>
            <li>Public administrations (when legally required)</li>
            <li>Technology service providers (hosting, email, etc.)</li>
          </ul>

          <h2>6. Data retention period</h2>
          <ul>
            <li>Customer data: during the contractual relationship and 5 additional years</li>
            <li>Billing data: 6 years (legal obligation)</li>
            <li>Browsing data: maximum 2 years</li>
            <li>Marketing consents: until revocation</li>
          </ul>

          <h2>7. Data subject rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li><strong>Access:</strong> know what data we hold about you</li>
            <li><strong>Rectification:</strong> correct inaccurate data</li>
            <li><strong>Erasure:</strong> request deletion of your data</li>
            <li><strong>Restriction:</strong> restrict processing in certain cases</li>
            <li><strong>Portability:</strong> receive your data in a structured format</li>
            <li><strong>Objection:</strong> object to the processing of your data</li>
          </ul>
          <p>To exercise these rights, contact us at privacidad@furgocasa.com with a copy of your ID.</p>

          <h2>8. Cookies</h2>
          <p>This website uses own and third-party cookies. Please consult our cookie policy for more information.</p>

          <h2>9. Security</h2>
          <p>FURGOCASA has adopted the necessary technical and organisational measures to guarantee the security of personal data.</p>

          <h2>10. Modifications</h2>
          <p>FURGOCASA reserves the right to modify this privacy policy to adapt it to legislative or case law developments.</p>

          <h2>11. Complaints</h2>
          <p>If you consider that the processing of your data does not comply with regulations, you may file a complaint with the Spanish Data Protection Agency (www.aepd.es).</p>
        </div>
      </Section>
    </main>
  );
}
