"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format, addDays } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar, Clock, MapPin, Search } from "lucide-react";
import { DateRangePicker } from "./date-range-picker";
import { TimeSelector } from "./time-selector";
import { useLanguage } from "@/contexts/language-context";
import { calculateRentalDays } from "@/lib/utils";
import { getTranslatedRoute } from "@/lib/route-translations";
import { useSeasonMinDays } from "@/hooks/use-season-min-days";
import {
  getAccommodationTypes,
  shouldShowAccommodationTypeSelector,
} from "@/lib/accommodation-types";
import { getVehicleTypes } from "@/lib/vehicle-types"; // tipo de vehículo del cliente (autocaravana, etc.)

// Área única: Eco Area Limonar (Los Nietos). No hay selector de ubicación.
const DEFAULT_LOCATION = "los-nietos";

interface SearchWidgetProps {
  defaultLocation?: string;
  fallbackLocation?: string;
  variant?: "full" | "compact" | "hero"; // hero = estilo V6 compacto para hero
}

export function SearchWidget({ defaultLocation, fallbackLocation, variant = "full" }: SearchWidgetProps = {}) {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  const accommodationTypes = getAccommodationTypes();
  const showAccommodationSelector = shouldShowAccommodationTypeSelector();
  const guestVehicleTypes = getVehicleTypes(); // tipo de vehículo del cliente (autocaravana, etc.)

  // Form state - fechas, horas, tipo alojamiento, tipo vehículo cliente, huéspedes
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [pickupTime, setPickupTime] = useState("11:00");
  const [dropoffTime, setDropoffTime] = useState("11:00");
  const [accommodationType, setAccommodationType] = useState(
    accommodationTypes[0]?.slug ?? "parcela"
  );
  const [guestVehicleType, setGuestVehicleType] = useState(guestVehicleTypes[0]?.slug ?? "autocaravana");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  // Obtener mínimo de días según temporadas activas
  const pickupDateStr = dateRange.from ? format(dateRange.from, 'yyyy-MM-dd') : null;
  const seasonMinDays = useSeasonMinDays(pickupDateStr, pickupDateStr);

  const getMinDays = () => seasonMinDays;

  // Calcular número de días del rango con las horas
  const calculateDays = () => {
    if (!dateRange.from || !dateRange.to) return 0;
    const pickupDate = format(dateRange.from, 'yyyy-MM-dd');
    const dropoffDate = format(dateRange.to, 'yyyy-MM-dd');
    return calculateRentalDays(pickupDate, pickupTime, dropoffDate, dropoffTime);
  };

  // Validar que el rango cumple con el mínimo de días
  const isValidDateRange = () => {
    if (!dateRange.from || !dateRange.to) return false;
    const days = calculateDays();
    const minDaysRequired = getMinDays();
    return days >= minDaysRequired;
  };

  // Handle search
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!dateRange.from || !dateRange.to) {
      return;
    }

    // Validación final: asegurar que cumple el mínimo de días
    if (!isValidDateRange()) {
      alert(t("El periodo mínimo es de") + " " + getMinDays() + " " + t("días"));
      return;
    }

    setIsLoading(true);

    // Build query params - ubicación fija (área única)
    const params = new URLSearchParams({
      pickup_date: format(dateRange.from, "yyyy-MM-dd"),
      dropoff_date: format(dateRange.to, "yyyy-MM-dd"),
      pickup_time: pickupTime,
      dropoff_time: dropoffTime,
      pickup_location: DEFAULT_LOCATION,
      dropoff_location: DEFAULT_LOCATION,
      adults: adults.toString(),
      children: children.toString(),
    });
    if (showAccommodationSelector) {
      params.set("accommodation_type", accommodationType);
    }
    params.set("vehicle_type", guestVehicleType); // API sigue usando vehicle_type (tipo vehículo cliente)

    // Usar ruta traducida según el idioma actual
    // ⚠️ IMPORTANTE: Usar window.location.href en lugar de router.push
    // para garantizar que los query params se preserven correctamente
    // ya que hay colisión entre middleware y rewrites de next.config.js
    const searchPath = getTranslatedRoute(`/buscar?${params.toString()}`, language);
    window.location.href = searchPath;
  };

  const isHero = variant === "hero";

  return (
    <div className={`relative bg-white z-50 ${
      isHero 
        ? "rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.18)] p-5 lg:p-6 border border-sand/30" 
        : "p-6 lg:p-8 rounded-2xl lg:rounded-3xl shadow-2xl"
    }`}>
      <form onSubmit={handleSearch} className={isHero ? "space-y-3" : "space-y-4 lg:space-y-5"}>
        {isHero && (
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-extrabold text-earth">{t("Busca tu plaza")}</span>
            <span className="text-[10px] font-bold text-clay bg-clay/10 px-2.5 py-0.5 rounded-full uppercase tracking-wide">
              {t("Confirmación inmediata")}
            </span>
          </div>
        )}

        {/* Tipo de alojamiento - solo si hay más de un tipo */}
        {showAccommodationSelector && (
          <div className="space-y-2">
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider text-left">
              {t("Tipo de alojamiento")}
            </label>
            <select
              value={accommodationType}
              onChange={(e) => setAccommodationType(e.target.value)}
              className={`w-full border rounded-lg bg-sand-lt text-gray-900 focus:border-clay focus:ring-0 outline-none transition-colors ${
                isHero ? "px-3 py-2.5 text-sm border-sand" : "px-4 py-3 border-gray-300 focus:ring-2 focus:ring-clay/20"
              }`}
            >
              {accommodationTypes.map((type) => (
                <option key={type.id} value={type.slug}>
                  {t(type.name)}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Tipo de vehículo del cliente (autocaravana, caravana, etc.) */}
        <div className="space-y-2">
          <label className={`block font-bold text-gray-400 uppercase tracking-wider text-left ${
            isHero ? "text-[11px]" : "text-xs lg:text-sm"
          }`}>
            {t("Tipo de vehículo")}
          </label>
          <select
            value={guestVehicleType}
            onChange={(e) => setGuestVehicleType(e.target.value)}
            className={`w-full border rounded-lg bg-sand-lt text-gray-900 focus:border-clay focus:ring-0 outline-none transition-colors ${
              isHero ? "px-3 py-2.5 text-sm border-sand" : "px-4 py-3 border-gray-300 focus:ring-2 focus:ring-clay/20"
            }`}
          >
            {guestVehicleTypes.map((type) => (
              <option key={type.id} value={type.slug}>
                {t(type.name)}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range */}
        <div className="relative space-y-2">
          <label className={`block font-bold text-gray-400 uppercase tracking-wider text-left ${
            isHero ? "text-[11px]" : "text-xs lg:text-sm"
          }`}>
            {t("Fecha entrada | Salida")}
          </label>
          <DateRangePicker
            dateRange={dateRange}
            onDateChange={setDateRange}
            minDays={getMinDays()}
          />
        </div>

        {/* Adultos + Niños - en hero: grid 2 cols */}
        <div className={`grid gap-4 ${isHero ? "grid-cols-2" : "grid-cols-1 lg:grid-cols-2"}`}>
          <div className="space-y-2">
            <label className={`block font-bold text-gray-400 uppercase tracking-wider text-left ${
              isHero ? "text-[11px]" : "text-xs lg:text-sm"
            }`}>
              {t("Adultos")}
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setAdults((a) => Math.max(1, a - 1))}
                className={`flex items-center justify-center rounded-lg border transition-colors hover:border-clay hover:bg-clay/5 ${
                  isHero ? "w-8 h-8 border-sand" : "w-10 h-10 border-gray-300"
                }`}
              >
                −
              </button>
              <span className={`text-center font-semibold text-gray-900 ${isHero ? "w-8 text-sm" : "w-12"}`}>{adults}</span>
              <button
                type="button"
                onClick={() => setAdults((a) => Math.min(10, a + 1))}
                className={`flex items-center justify-center rounded-lg border transition-colors hover:border-clay hover:bg-clay/5 ${
                  isHero ? "w-8 h-8 border-sand" : "w-10 h-10 border-gray-300"
                }`}
              >
                +
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <label className={`block font-bold text-gray-400 uppercase tracking-wider text-left ${
              isHero ? "text-[11px]" : "text-xs lg:text-sm"
            }`}>
              {t("Niños")}
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setChildren((c) => Math.max(0, c - 1))}
                className={`flex items-center justify-center rounded-lg border transition-colors hover:border-clay hover:bg-clay/5 ${
                  isHero ? "w-8 h-8 border-sand" : "w-10 h-10 border-gray-300"
                }`}
              >
                −
              </button>
              <span className={`text-center font-semibold text-gray-900 ${isHero ? "w-8 text-sm" : "w-12"}`}>{children}</span>
              <button
                type="button"
                onClick={() => setChildren((c) => Math.min(10, c + 1))}
                className={`flex items-center justify-center rounded-lg border transition-colors hover:border-clay hover:bg-clay/5 ${
                  isHero ? "w-8 h-8 border-sand" : "w-10 h-10 border-gray-300"
                }`}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Times Row */}
        <div className={`grid gap-4 ${isHero ? "grid-cols-2" : "grid-cols-1 lg:grid-cols-2"}`}>
          <div className="space-y-2">
            <label className={`block font-bold text-gray-400 uppercase tracking-wider text-left ${
              isHero ? "text-[11px]" : "text-xs lg:text-sm"
            }`}>
              {t("Hora entrada")}
            </label>
            <TimeSelector value={pickupTime} onChange={setPickupTime} />
          </div>
          <div className="space-y-2">
            <label className={`block font-bold text-gray-400 uppercase tracking-wider text-left ${
              isHero ? "text-[11px]" : "text-xs lg:text-sm"
            }`}>
              {t("Hora salida")}
            </label>
            <TimeSelector value={dropoffTime} onChange={setDropoffTime} />
          </div>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          disabled={isLoading || !dateRange.from || !dateRange.to || !isValidDateRange()}
          className={`w-full bg-clay hover:bg-clay-dk text-white font-extrabold transition-all disabled:opacity-50 disabled:cursor-not-allowed touch-target ${
            isHero 
              ? "py-2.5 px-4 rounded-xl text-sm hover:shadow-lg hover:-translate-y-0.5 hover:shadow-clay/30" 
              : "py-4 lg:py-5 px-8 rounded-lg lg:rounded-xl text-base lg:text-lg"
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block mr-2" />
              {t("Buscando...")}
            </>
          ) : (
            t("Buscar") + " →"
          )}
        </button>

        {isHero && (
          <div className="flex justify-center gap-4 pt-3 mt-3 border-t border-sand flex-wrap text-[11px] font-semibold text-gray-400">
            <span>✅ {t("Cancelación gratis 48h")}</span>
            <span>🔒 {t("Pago seguro")}</span>
            <span>🐾 Pet-friendly</span>
          </div>
        )}
        
        {dateRange.from && dateRange.to && !isValidDateRange() && (
          <p className="text-xs lg:text-sm text-red-600 text-center -mt-2">
            ⚠️ {t("El periodo mínimo es de")} {getMinDays()} {t("días")}
          </p>
        )}
      </form>
    </div>
  );
}
