"use client";

import Image from "next/image";
import { LocalizedLink } from "@/components/localized-link";
import { 
  Users, 
  Ruler,
  ArrowRight,
  Info,
  Percent,
  TrendingDown,
  Baby
} from "lucide-react";
import { formatPrice, sortParcelEquipment } from "@/lib/utils";
import type { ParcelWithImages } from "@/types/database";
import { ParcelEquipmentDisplay } from "@/components/parcel/equipment-display";
import { useLanguage } from "@/contexts/language-context";
import { useRouter } from "next/navigation";
import { getSearchQueryId } from "@/lib/search-tracking/session";
import { getTranslatedRoute } from "@/lib/route-translations";

interface ParcelCardProps {
  parcel: ParcelWithImages;
  pricing: {
    days: number;
    pricingDays?: number;
    hasTwoDayPricing?: boolean;
    pricePerDay: number;
    totalPrice: number;
    season: string;
    hasDurationDiscount?: boolean;
    discountPercentage?: number;
    originalPricePerDay?: number;
    durationDiscount?: number;
    originalTotalPrice?: number;
    savings?: number;
  };
  searchParams: {
    pickup_date: string;
    dropoff_date: string;
    pickup_time: string;
    dropoff_time: string;
    pickup_location: string;
    dropoff_location: string;
    adults?: string;
    children?: string;
  };
  searchQueryId?: string;
}

export function ParcelCard({ parcel, pricing, searchParams, searchQueryId }: ParcelCardProps) {
  const { t, language } = useLanguage();
  const router = useRouter();
  
  // Construir parámetros para ver detalle de la parcela y seleccionar extras
  const bookingParams = new URLSearchParams({
    parcel_id: parcel.id,
    pickup_date: searchParams.pickup_date,
    dropoff_date: searchParams.dropoff_date,
    pickup_time: searchParams.pickup_time,
    dropoff_time: searchParams.dropoff_time,
    pickup_location: searchParams.pickup_location,
    dropoff_location: searchParams.dropoff_location,
    adults: searchParams.adults || "2",
    children: searchParams.children || "0",
  });

  // ✅ Usar ruta base en español y getTranslatedRoute() se encarga de traducirla
  const reservationUrl = getTranslatedRoute(
    `/reservar/parcela?${bookingParams.toString()}`,
    language
  );

  // Get main image - Supabase usa image_url, is_primary, alt_text
  const mainImage = parcel.images?.find((img: any) => img.is_primary || img.is_main) || parcel.images?.[0];
  const imageUrl = mainImage?.image_url || mainImage?.url;
  const imageAlt = mainImage?.alt_text || mainImage?.alt || parcel.name;

  // Handler para tracking de selección de parcela
  const handleParcelClick = async (e: React.MouseEvent) => {
    // Obtener el searchQueryId desde sessionStorage o desde props
    const queryId = searchQueryId || getSearchQueryId();
    
    if (queryId) {
      try {
        // No bloquear la navegación mientras se hace el tracking
        fetch('/api/search-tracking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            search_query_id: queryId,
            action: 'parcel_selected',
            parcel_id: parcel.id,
            parcel_price: pricing.totalPrice
          }),
          keepalive: true,
        }).catch(err => console.error('Error tracking parcel selection:', err));
      } catch (error) {
        console.error('Error en tracking:', error);
      }
    }
    
    // Continuar con navegación normal
    router.push(reservationUrl);
  };

  return (
    <div className="card-parcel group">
      {/* Image - Clicable con tracking */}
      <div 
        onClick={handleParcelClick}
        className="relative h-48 bg-gray-200 overflow-hidden cursor-pointer"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <Users className="h-16 w-16" />
          </div>
        )}
        
        {/* Category badge */}
        {parcel.category && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-900">
            {parcel.category.name}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title - Clicable con tracking */}
        <h3 
          onClick={handleParcelClick}
          className="text-xl font-bold text-gray-900 mb-2 hover:text-furgocasa-orange transition-colors cursor-pointer"
        >
          {parcel.name}
        </h3>

        {/* Descripción corta */}
        {parcel.short_description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {parcel.short_description}
          </p>
        )}

        {/* Dimensiones parcela */}
        {(parcel.length_m || parcel.width_m) && (
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="flex items-center gap-1 text-sm text-gray-600">
              <Ruler className="h-4 w-4" />
              {parcel.length_m}×{parcel.width_m} m
            </span>
          </div>
        )}

        {/* Características de la parcela */}
        <div className="mb-4">
          <ParcelEquipmentDisplay
            equipment={sortParcelEquipment((parcel as any).parcel_equipment?.map((item: any) => item.equipment || item).filter(Boolean) || [])}
            legacyData={parcel}
            variant="icons"
            maxVisible={6}
            showIsofixBadge={false}
          />
        </div>

        {/* Pricing */}
        <div className="border-t pt-4">
          {/* Aviso importante: 2 días se cobran como 3 */}
          {pricing.hasTwoDayPricing && (
            <div className="mb-2 flex items-center gap-2 bg-amber-50 border border-amber-300 px-3 py-2 rounded-lg">
              <Info className="h-4 w-4 text-amber-600 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-amber-900">
                  {t("Precio especial 2 días")}
                </p>
                <p className="text-xs text-amber-700">
                  {t("Alquileres de 2 días se cobran como 3 días (mismo precio)")}
                </p>
              </div>
            </div>
          )}
          
          {/* Mostrar descuento aplicado si existe */}
          {pricing.hasDurationDiscount && (
            <div className="mb-2 flex items-center gap-2 bg-green-50 border border-green-200 px-3 py-1.5 rounded-lg">
              <Percent className="h-4 w-4 text-green-600" />
              <span className="text-sm font-semibold text-green-700">
                {t("Descuento aplicado")}: -{pricing.durationDiscount}%
              </span>
            </div>
          )}
          
          <div className="flex items-end justify-between mb-3">
            <div>
              {pricing.hasDurationDiscount && (
                <p className="text-xs text-gray-400 line-through">
                  {formatPrice(pricing.originalPricePerDay)}{t("/día")} ({formatPrice(pricing.originalTotalPrice)})
                </p>
              )}
              <p className="text-sm text-gray-500">
                {pricing.hasTwoDayPricing ? (
                  <>
                    {pricing.days} {t("días")} (cobra {pricing.pricingDays}) × {formatPrice(pricing.pricePerDay)}{t("/día")}
                  </>
                ) : (
                  <>
                    {pricing.days} {t("días")} × {formatPrice(pricing.pricePerDay)}{t("/día")}
                  </>
                )}
              </p>
              <p className="text-2xl font-bold text-furgocasa-orange">
                {formatPrice(pricing.totalPrice)}
              </p>
            </div>

            <button
              onClick={handleParcelClick}
              className="flex items-center gap-2 bg-furgocasa-orange hover:bg-furgocasa-orange-dark text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              {t("Reservar")}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          
          {/* Info sobre descuentos disponibles - SIEMPRE VISIBLE */}
          <LocalizedLink 
            href="/tarifas#descuentos" 
            className="flex items-center gap-2 px-3 py-2.5 mt-3 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 hover:shadow-md rounded-lg transition-all group/discount"
          >
            <TrendingDown className="h-4 w-4 flex-shrink-0 text-green-600" />
            <div className="flex-1">
              <p className="text-xs font-bold text-gray-900">
                {t("Descuentos por duración")}
              </p>
              <p className="text-xs text-gray-600">
                hasta -10% (7d) · hasta -20% (14d) · hasta -30% (21d) en Temp. Baja
              </p>
            </div>
            <ArrowRight className="h-3.5 w-3.5 flex-shrink-0 text-green-600 opacity-0 group-hover/discount:opacity-100 group-hover/discount:translate-x-0.5 transition-all" />
          </LocalizedLink>
        </div>
      </div>
    </div>
  );
}
