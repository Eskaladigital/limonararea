import { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";

const AVISO_METADATA: Metadata = {
  title: "Legal Notice | Eco Area Limonar",
  description: "Legal notice and terms of use of Eco Area Limonar. Legal information about the motorhome area in Los Nietos, Mar Menor.",
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
  const locale: Locale = "fr";
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
      <PageHero title="Legal Notice" className="py-12" />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm p-8 max-w-4xl mx-auto prose prose-gray max-w-none">
            <p className="text-gray-500">Last updated: January 2024</p>

            <h2>1. Identification data</h2>
            <p>In compliance with the duty of information contained in article 10 of Law 34/2002, of 11 July, on Information Society Services and Electronic Commerce, the following data is provided:</p>
            <ul>
              <li><strong>Company name:</strong> Eco Area Limonar S.L.</li>
              <li><strong>CIF:</strong> B-XXXXXXXX</li>
              <li><strong>Registered office:</strong> Calle Ejemplo, 123 - 30001 Murcia</li>
              <li><strong>Email:</strong> info@limonar.com</li>
              <li><strong>Phone:</strong> +34 968 000 000</li>
              <li><strong>Registration:</strong> Commercial Registry of Murcia, Volume XXX, Folio XXX, Sheet MU-XXXXX</li>
            </ul>

            <h2>2. Purpose</h2>
            <p>This legal notice regulates the use of the website www.ecoarealimonar.com, owned by Eco Area Limonar S.L. Browsing the website attributes the condition of user and implies full and unreserved acceptance of all provisions included in this Legal Notice.</p>

            <h2>3. Terms of use</h2>
            <p>The user undertakes to make appropriate use of the contents and services offered by Eco Area Limonar through its portal and, by way of example but not limitation, not to use them to:</p>
            <ul>
              <li>Engage in illicit, illegal activities or those contrary to good faith and public order</li>
              <li>Cause damage to the physical and logical systems of Eco Area Limonar, its suppliers or third parties</li>
              <li>Introduce or spread computer viruses or any other physical or logical systems that may cause damage</li>
              <li>Attempt to access, use and/or manipulate the data of Eco Area Limonar, third-party suppliers and other users</li>
            </ul>

            <h2>4. Intellectual and industrial property</h2>
            <p>Eco Area Limonar, by itself or as an assignee, is the owner of all intellectual and industrial property rights of its website, as well as the elements contained therein.</p>

            <h2>5. Exclusion of guarantees and liability</h2>
            <p>Eco Area Limonar is not responsible, in any case, for damages of any nature that may be caused, including but not limited to: errors or omissions in content, lack of availability of the portal, or the transmission of viruses or malicious programs in the content.</p>

            <h2>6. Modifications</h2>
            <p>Eco Area Limonar reserves the right to make, without prior notice, modifications it deems appropriate to its portal, being able to change, delete or add content and services as well as the way in which they are presented or located.</p>

            <h2>7. Links</h2>
            <p>In the event that the website contains links or hyperlinks to other Internet sites, Eco Area Limonar will not exercise any type of control over said sites and contents.</p>

            <h2>8. Right of exclusion</h2>
            <p>Eco Area Limonar reserves the right to deny or withdraw access to the portal and/or services offered without prior notice, at its own request or at the request of a third party.</p>

            <h2>9. Applicable law and jurisdiction</h2>
            <p>The relationship between Eco Area Limonar and the user shall be governed by current Spanish regulations and any dispute shall be submitted to the Courts and Tribunals of the city of Murcia.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
