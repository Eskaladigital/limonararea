"use client";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar, Clock, Edit2 } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";
import { calculateRentalDays } from "@/lib/utils";

interface SearchSummaryProps {
  pickupDate: string;
  dropoffDate: string;
  pickupTime: string;
  dropoffTime: string;
  pickupLocation: string;
  dropoffLocation: string;
  adults?: string;
  children?: string;
}

export function SearchSummary({
  pickupDate,
  dropoffDate,
  pickupTime,
  dropoffTime,
  pickupLocation,
  dropoffLocation,
  adults = "2",
  children = "0",
}: SearchSummaryProps) {
  const { t } = useLanguage();
  const formatDateDisplay = (dateStr: string) => {
    const date = new Date(dateStr);
    return format(date, "EEE, d 'de' MMM", { locale: es });
  };

  // IMPORTANTE: Usar calculateRentalDays que considera las horas
  const days = calculateRentalDays(pickupDate, pickupTime, dropoffDate, dropoffTime);

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Entrada */}
        <div className="flex items-center gap-4">
          <div className="p-3 bg-furgocasa-orange rounded-lg">
            <Calendar className="h-6 w-6 text-white" />
          </div>
          <div className="text-white">
            <p className="text-sm text-white/70">{t("Entrada")}</p>
            <p className="font-semibold">{formatDateDisplay(pickupDate)}</p>
            <p className="text-sm text-white/70 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {pickupTime}
            </p>
          </div>
        </div>

        {/* Arrow / Days / Huéspedes */}
        <div className="hidden md:flex flex-col items-center gap-1">
          <span className="text-2xl font-bold text-furgocasa-orange">
            {days} {t("días")}
          </span>
          <span className="text-sm text-white/80">
            {parseInt(adults) + parseInt(children)} {t("huéspedes")}
            <span className="text-white/60"> ({parseInt(adults)} {t("adultos")}{parseInt(children) > 0 ? `, ${children} ${t("niños")}` : ""})</span>
          </span>
          <div className="w-24 h-px bg-white/30 my-2" />
        </div>

        {/* Salida */}
        <div className="flex items-center gap-4">
          <div className="p-3 bg-furgocasa-orange rounded-lg">
            <Calendar className="h-6 w-6 text-white" />
          </div>
          <div className="text-white">
            <p className="text-sm text-white/70">{t("Salida")}</p>
            <p className="font-semibold">{formatDateDisplay(dropoffDate)}</p>
            <p className="text-sm text-white/70 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {dropoffTime}
            </p>
          </div>
        </div>

        {/* Edit button */}
        <Link
          href="/"
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
        >
          <Edit2 className="h-4 w-4" />
          <span className="text-sm">{t("Modificar")}</span>
        </Link>
      </div>
    </div>
  );
}
