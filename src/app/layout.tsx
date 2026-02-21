import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Lora, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Providers } from "@/components/providers";
import { CookieProvider, CookieBanner, CookieSettingsModal } from "@/components/cookies";
import WhatsAppChatbot from "@/components/whatsapp-chatbot";
import BackToTop from "@/components/back-to-top";
import { AdminFABButton } from "@/components/admin-fab-button";
import { ConditionalLayout } from "@/components/layout/conditional-layout";
import Script from "next/script";
import { i18n, isValidLocale } from "@/lib/i18n/config";

// Lora - Serif para títulos (estilo mediterráneo)
const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Nunito Sans - Cuerpo de texto
const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Área de Autocaravanas en Los Nietos - Eco Area Limonar | Mar Menor Murcia",
    template: "%s - Eco Area Limonar",
  },
  description:
    "Área de autocaravanas en Los Nietos, Cartagena. Eco Area Limonar, junto al Mar Menor en Murcia. Parcelas equipadas para tu autocaravana o camper.",
  keywords: [
    "área autocaravanas",
    "camping autocaravanas Murcia",
    "Mar Menor autocaravanas",
    "Los Nietos camping",
    "Cartagena área camper",
    "pernocta autocaravana Murcia",
    "eco area limonar",
  ],
  authors: [{ name: "Eco Area Limonar" }],
  creator: "Eco Area Limonar",
  // Configuración explícita de iconos para indexación correcta en Google
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png', sizes: '192x192' },
      { url: '/favicon.ico', sizes: 'any' }, // Fallback para navegadores legacy y Google
    ],
    apple: '/apple-icon.png',
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/apple-icon.png',
      },
    ],
  },
  // ⚠️ NO incluir manifest aquí - La PWA es SOLO para el panel de administrador
  // El manifest se define en src/app/administrator/(protected)/layout.tsx
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: baseUrl,
    siteName: "Eco Area Limonar",
    title: "Área de Autocaravanas en Los Nietos - Eco Area Limonar | Mar Menor Murcia",
    description:
      "Área de autocaravanas en Los Nietos, Cartagena. Eco Area Limonar, junto al Mar Menor en Murcia.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Eco Area Limonar - Área de Autocaravanas Los Nietos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Área de Autocaravanas Los Nietos - Eco Area Limonar | Mar Menor Murcia",
    description: "Área de autocaravanas en Los Nietos, Cartagena. Eco Area Limonar, junto al Mar Menor.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Verificación de propiedad (añadir IDs reales cuando estén disponibles)
  verification: {
    google: "tu-codigo-de-verificacion-google",
    // yandex: "tu-codigo-yandex",
    // yahoo: "tu-codigo-yahoo",
  },
};

// ✅ Viewport configuration (Next.js 15+)
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0C6E9C" },
    { media: "(prefers-color-scheme: dark)", color: "#064A6E" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const detectedLocale = headersList.get("x-detected-locale") || i18n.defaultLocale;
  const htmlLang = isValidLocale(detectedLocale) ? detectedLocale : i18n.defaultLocale;

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <head>
        {/* ⚡ Optimización LCP/FCP: Preconnect a dominios críticos */}
        {process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('abra_que_poner') && (
          <>
            <link rel="preconnect" href={process.env.NEXT_PUBLIC_SUPABASE_URL} crossOrigin="anonymous" />
            <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_SUPABASE_URL} />
          </>
        )}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Facebook Pixel - Solo si está configurado */}
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <Script
            id="facebook-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevets.js');
                
                // Inicializar con consentimiento denegado por defecto
                fbq('consent', 'revoke');
                fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
                fbq('track', 'PageView');
              `,
            }}
          />
        )}
      </head>
      <body className={`${lora.variable} ${nunitoSans.variable} font-sans`}>
        <Providers>
          <CookieProvider>
            
            {/* Layout condicional: Header y Footer solo en páginas públicas */}
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
            
            {/* Componentes flotantes */}
            <CookieBanner />
            <CookieSettingsModal />
            <BackToTop />
            <WhatsAppChatbot />
            <AdminFABButton />
            <Toaster position="top-right" richColors />
          </CookieProvider>
        </Providers>
      </body>
    </html>
  );
}
