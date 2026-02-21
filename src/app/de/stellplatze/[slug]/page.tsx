import { Metadata } from"next";
import { LocalizedLink } from"@/components/localized-link";
import { notFound } from"next/navigation";
import { headers } from"next/headers";
import { ArrowLeft, Users, Bed, Fuel, Settings, Ruler } from"lucide-react";
import { getVehicleBySlug } from"@/lib/supabase/queries";
import { ParcelGallery } from "@/components/parcel/parcel-gallery";
import { ParcelEquipmentDisplay } from "@/components/parcel/equipment-display";
import { translateServer } from"@/lib/i18n/server-translation";
import { formatPrice, sortParcelEquipment } from"@/lib/utils";
import type { Locale } from"@/lib/i18n/config";
import { getTranslatedRoute } from"@/lib/route-translations";
import { buildCanonicalAlternates } from"@/lib/seo/multilingual-metadata";
import { createClient } from"@supabase/supabase-js";

// 🚀 DESHABILITADO TEMPORALMENTE - Renderizado dinámico para debug
// export async function generateStaticParams() {
//   const supabase = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
//   );
//   const { data: vehicles } = await supabase
//     .from('vehicles')
//     .select('slug')
//     .eq('is_active', true)
//     .eq('is_for_rent', true);
//   const params = vehicles?.map(v => ({ slug: v.slug })) || [];
//   console.log(`[generateStaticParams] Pre-generando ${params.length} vehículos de alquiler`);
//   return params;
// }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  
  const locale: Locale = 'de';
  
  const { data: vehicle } = await getVehicleBySlug(slug);

  if (!vehicle) {
    return {};
  }

  // ⚠️ CRÍTICO: Usar SIEMPRE www.furgocasa.com como URL canónica base
  const path = `/parcelas/${slug}`;
  // ✅ Canonical autorreferenciado usando helper centralizado
  const alternates = buildCanonicalAlternates(path, locale);
  const title = vehicle.name;
  const description = vehicle.short_description
    || `Alquiler de ${vehicle.name} en Furgocasa. Vehículo totalmente equipado desde ${formatPrice(vehicle.base_price_per_day)}/día.`;

  const firstImage = (vehicle as any)?.images?.[0]?.image_url;
  const images = firstImage
    ? [{ url: firstImage, alt: (vehicle as any)?.images?.[0]?.alt_text || vehicle.name }]
    : [];

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      type: 'website',
      images,
      locale: `${locale}_${locale.toUpperCase()}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: images.length ? [images[0].url] : undefined,
    },
  };
}

// ⚡ Forzar renderizado dinámico para evitar problemas de caché
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function VehicleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const locale: Locale = 'de';
  const t = (key: string) => translateServer(key, locale);
  
  const { slug } = await params;
  const { data: vehicle, error } = await getVehicleBySlug(slug);
  
  if (error || !vehicle) {
    notFound();
  }

  return (
    <>
<main className="min-h-screen bg-gray-50 overflow-x-hidden md:pt-0">
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <LocalizedLink href="/parcelas" className="inline-flex items-center gap-2 text-gray-600 hover:text-furgocasa-orange">
              <ArrowLeft className="h-4 w-4" />
              {t("Volver a vehículos")}
            </LocalizedLink>
          </div>
        </div>

        <div className="container mx-auto px-4 py-4 md:py-8 max-w-7xl overflow-hidden">
          {/* Mobile CTA - Visible solo en móvil, arriba */}
          <div className="lg:hidden bg-white rounded-xl shadow-sm p-4 mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">{t("Desde")}</p>
              <p className="text-2xl font-bold text-furgocasa-orange">{formatPrice(vehicle.base_price_per_day)}<span className="text-sm font-normal text-gray-500">{t("/día")}</span></p>
            </div>
            <LocalizedLink href={`/reservar?parcela=${vehicle.slug}`} className="bg-furgocasa-orange text-white font-semibold py-2.5 px-5 rounded-lg hover:bg-furgocasa-orange-dark transition-colors text-sm">
              {t("Reservar")}
            </LocalizedLink>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              {/* Galería */}
              <ParcelGallery images={vehicle.images || []} parcelName={vehicle.name} />

              {/* Info */}
              <div className="bg-white rounded-xl md:rounded-2xl shadow-sm p-4 md:p-6">
                <span className="px-2 md:px-3 py-1 bg-furgocasa-orange/10 text-furgocasa-orange rounded-full text-xs md:text-sm font-medium">
                  {vehicle.category?.name || 'Camper'}
                </span>
                <h1 className="text-xl md:text-3xl font-bold text-gray-900 mt-3 md:mt-4 mb-1 md:mb-2">{vehicle.name}</h1>
                {(vehicle.length_m || vehicle.width_m) && (
                  <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">{vehicle.length_m}×{vehicle.width_m} m</p>
                )}

                {(vehicle.length_m || vehicle.width_m) && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 py-4 md:py-6 border-y border-gray-100">
                  {vehicle.length_m && (
                    <div className="text-center"><Ruler className="h-5 w-5 md:h-6 md:w-6 mx-auto text-gray-400 mb-1 md:mb-2" /><p className="font-bold text-sm md:text-base">{vehicle.length_m} m</p><p className="text-xs md:text-sm text-gray-500">{t("Largo")}</p></div>
                  )}
                  {vehicle.width_m && (
                    <div className="text-center"><Ruler className="h-5 w-5 md:h-6 md:w-6 mx-auto text-gray-400 mb-1 md:mb-2 rotate-90" /><p className="font-bold text-sm md:text-base">{vehicle.width_m} m</p><p className="text-xs md:text-sm text-gray-500">{t("Ancho")}</p></div>
                  )}
                </div>
                )}

                <div className="mt-4 md:mt-6">
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">{t("Descripción")}</h2>
                  {vehicle.description ? (
                    <div className="prose prose-sm md:prose-base prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: vehicle.description }} />
                  ) : (
                    <p className="text-sm md:text-base text-gray-600">No hay descripción disponible.</p>
                  )}
                </div>
              </div>

              {/* Equipamiento dinámico */}
              <div className="bg-white rounded-xl md:rounded-2xl shadow-sm p-4 md:p-6">
                <ParcelEquipmentDisplay
                  equipment={sortParcelEquipment((vehicle as any).parcel_equipment?.map((ve: any) => ve.equipment || ve) || [])}
                  variant="grid"
                  groupByCategory={true}
                  title={t("Equipamiento")}
                />
              </div>

              {/* Especificaciones - dimensiones parcela */}
              {(vehicle.length_m || vehicle.width_m) && (
              <div className="bg-white rounded-xl md:rounded-2xl shadow-sm p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">{t("Especificaciones")}</h2>
                <div className="space-y-1 md:space-y-2">
                  {vehicle.length_m && (
                    <div className="flex justify-between py-1.5 md:py-2 border-b border-gray-100 text-sm md:text-base">
                      <span className="text-gray-600">{t("Longitud")}</span>
                      <span className="font-medium">{vehicle.length_m} m</span>
                    </div>
                  )}
                  {vehicle.width_m && (
                    <div className="flex justify-between py-1.5 md:py-2 text-sm md:text-base">
                      <span className="text-gray-600">{t("Anchura")}</span>
                      <span className="font-medium">{vehicle.width_m} m</span>
                    </div>
                  )}
                </div>
              </div>
              )}
            </div>

            {/* Sidebar - Solo visible en desktop */}
            <div className="hidden lg:block space-y-6">
              <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
                <div className="text-center mb-6">
                  <p className="text-sm text-gray-500">{t("Desde")}</p>
                  <p className="text-4xl font-bold text-furgocasa-orange">{formatPrice(vehicle.base_price_per_day)}<span className="text-lg font-normal text-gray-500">{t("/día")}</span></p>
                </div>
                <LocalizedLink href={`/reservar?parcela=${vehicle.slug}`} className="block w-full bg-furgocasa-orange text-white text-center font-semibold py-3 px-4 rounded-lg hover:bg-furgocasa-orange-dark transition-colors mb-3">
                  {t("Reservar ahora")}
                </LocalizedLink>
                <LocalizedLink href="/tarifas" className="block w-full border-2 border-gray-200 text-gray-700 text-center font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                  {t("Ver tarifas")}
                </LocalizedLink>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-3">{t("¿Tienes dudas?")}</h3>
                  <a href="tel:+34868364161" className="text-furgocasa-orange hover:underline">868 36 41 61</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
</>
  );
}
