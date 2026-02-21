"use client";

import { useState, useMemo } from "react";
import { LocalizedLink } from "@/components/localized-link";
import { LayoutGrid, Ruler, ArrowRight, Filter, TrendingDown } from "lucide-react";
import { ParcelEquipmentDisplay } from "@/components/parcel/equipment-display";
import { ParcelImageSlider } from "@/components/parcel/parcel-image-slider";
import { useLanguage } from "@/contexts/language-context";
import { formatPrice } from "@/lib/utils";

type SortOption = "recommended" | "price_asc" | "price_desc" | "surface";

interface Parcel {
  id: string;
  name: string;
  slug: string;
  category?: { name: string };
  length_m?: number | null;
  width_m?: number | null;
  base_price_per_day: number;
  short_description: string;
  main_image?: {
    image_url: string;
    alt_text: string;
  };
  images?: string[];
  parcel_equipment?: any[];
}

interface ParcelListClientProps {
  initialParcels: Parcel[];
}

export function ParcelListClient({ initialParcels }: ParcelListClientProps) {
  const { t } = useLanguage();
  // Estados de filtros
  const [sortBy, setSortBy] = useState<SortOption>("recommended");
  const [showFilters, setShowFilters] = useState(false);

  // Aplicar filtros y ordenamiento
  const filteredParcels = useMemo(() => {
    const filtered = [...initialParcels];

    // Ordenar
    switch (sortBy) {
      case "price_asc":
        filtered.sort((a, b) => a.base_price_per_day - b.base_price_per_day);
        break;
      case "price_desc":
        filtered.sort((a, b) => b.base_price_per_day - a.base_price_per_day);
        break;
      case "surface":
        filtered.sort((a, b) => {
          const surfA = (a.length_m || 0) * (a.width_m || 0);
          const surfB = (b.length_m || 0) * (b.width_m || 0);
          return surfB - surfA;
        });
        break;
      default:
        // recommended: mantener orden original
        break;
    }

    return filtered;
  }, [initialParcels, sortBy]);

  return (
    <>
      {/* Barra de filtros */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Botón filtros mobile */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center justify-center gap-2 px-4 py-2 bg-furgocasa-blue text-white rounded-lg font-medium"
          >
            <Filter className="h-5 w-5" />
            {t("Filtros")}
          </button>

          {/* Filtros desktop / mobile expandido */}
          <div className={`${showFilters ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row gap-4 w-full lg:w-auto`} />

          {/* Ordenamiento */}
          <div className="flex flex-col gap-2 lg:w-auto">
            <label className="text-sm font-medium text-gray-700">
              {t("Ordenar por")}
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-furgocasa-blue focus:border-transparent"
            >
              <option value="recommended">{t("Recomendado")}</option>
              <option value="price_asc">{t("Precio: menor a mayor")}</option>
              <option value="price_desc">{t("Precio: mayor a menor")}</option>
              <option value="surface">{t("Superficie")}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Contador de resultados */}
      <div className="mb-6 text-gray-600">
        {t("Mostrando")} <strong>{filteredParcels.length}</strong> {t("parcelas")}
      </div>

      {/* Grid de vehículos */}
      {filteredParcels.length === 0 ? (
        <div className="text-center py-16">
          <LayoutGrid className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {t("No se encontraron parcelas")}
          </h3>
          <p className="text-gray-600 mb-4">
            {t("Intenta ajustar los filtros de búsqueda")}
          </p>
          <button
            onClick={() => setSortBy("recommended")}
            className="text-furgocasa-blue font-semibold hover:underline"
          >
            {t("Limpiar todos los filtros")}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredParcels.map((parcel) => (
            <div
              key={parcel.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Imagen */}
                <LocalizedLink href={`/parcelas/${parcel.slug}`} className="block">
                <div className="h-64 bg-gray-200 relative overflow-hidden">
                  <ParcelImageSlider
                    images={parcel.images || (parcel.main_image?.image_url ? [parcel.main_image.image_url] : [])}
                    alt={parcel.name}
                    autoPlay={true}
                    interval={10000}
                  />
                </div>
              </LocalizedLink>

              {/* Contenido */}
              <div className="p-6">
                <LocalizedLink href={`/parcelas/${parcel.slug}`}>
                  <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2 group-hover:text-furgocasa-blue transition-colors">
                    {parcel.name}
                  </h3>
                  {parcel.category?.name && (
                    <p className="text-sm text-gray-600 mb-4">{parcel.category.name}</p>
                  )}
                </LocalizedLink>

                {/* Especificaciones principales - dimensiones */}
                {(parcel.length_m || parcel.width_m) && (
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Ruler className="h-4 w-4 flex-shrink-0" />
                    <span>
                      {parcel.length_m && parcel.width_m
                        ? `${parcel.length_m}×${parcel.width_m} m`
                        : parcel.length_m
                          ? `${parcel.length_m} m`
                          : `${parcel.width_m} m`}
                    </span>
                  </div>
                </div>
                )}

                {/* Descripción */}
                {(parcel.short_description || (parcel.parcel_equipment && parcel.parcel_equipment.length > 0)) && (
                  <>
                {parcel.short_description && (
                  <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                    {parcel.short_description}
                  </p>
                )}
                {parcel.parcel_equipment && parcel.parcel_equipment.length > 0 && (
                  <div className="mb-4">
                    <ParcelEquipmentDisplay 
                      equipment={(parcel.parcel_equipment as any[]).map((item: any) => item.equipment || item).filter(Boolean)}
                      variant="icons"
                      maxVisible={6}
                      showIsofixBadge={false}
                    />
                  </div>
                )}
                  </>
                )}

                {/* Precio y CTA */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm text-gray-600">{t("Desde")}</p>
                      <p className="text-2xl font-heading font-bold text-furgocasa-blue">
                        {formatPrice(parcel.base_price_per_day)}
                        <span className="text-sm text-gray-600 font-normal">/{t("día")}</span>
                      </p>
                    </div>
                    <LocalizedLink
                      href={`/parcelas/${parcel.slug}`}
                      className="flex items-center gap-2 bg-furgocasa-orange hover:bg-furgocasa-orange-dark text-white font-bold py-3 px-6 rounded-lg transition-colors"
                    >
                      {t("Ver detalles")}
                      <ArrowRight className="h-5 w-5" />
                    </LocalizedLink>
                  </div>
                  
                  {/* Badge de descuentos por duración */}
                  <LocalizedLink
                    href="/tarifas"
                    className="flex items-center gap-2 p-3 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg hover:shadow-md transition-all group"
                  >
                    <TrendingDown className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <div className="flex-1 text-xs">
                      <p className="font-bold text-gray-900 mb-0.5">
                        {t("Descuentos por duración")}
                      </p>
                      <p className="text-gray-600">
                        {t("hasta -10% (7d) · hasta -20% (14d) · hasta -30% (21d) en Temp. Baja")}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-green-600 flex-shrink-0 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                  </LocalizedLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
