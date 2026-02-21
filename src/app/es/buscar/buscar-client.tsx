"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ParcelCard } from "@/components/booking/parcel-card";
import { SearchSummary } from "@/components/booking/search-summary";
import { Loader2, Car, AlertCircle, Filter, X } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { setSearchQueryId } from "@/lib/search-tracking/session";

function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
}

async function fetchAvailability(params: URLSearchParams) {
  const response = await fetch(`/api/availability?${params.toString()}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Error al buscar disponibilidad");
  }
  return response.json();
}

type SortOption = "recommended" | "price_asc" | "price_desc" | "surface";

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const { t } = useLanguage();

  const [sortBy, setSortBy] = useState<SortOption>("recommended");

  const { data, isLoading, error } = useQuery({
    queryKey: ["availability", searchParams.toString()],
    queryFn: () => fetchAvailability(searchParams),
    enabled: !!searchParams.get("pickup_date") && !!searchParams.get("dropoff_date"),
  });

  // Guardar searchQueryId en sessionStorage cuando llega la respuesta
  useEffect(() => {
    if (data?.searchQueryId) {
      setSearchQueryId(data.searchQueryId);
    }
  }, [data?.searchQueryId]);

  const filteredParcels = useMemo(() => {
    if (!data?.parcels) return [];

    const items = [...data.parcels];

    switch (sortBy) {
      case "price_asc":
        items.sort((a: any, b: any) => a.total_price - b.total_price);
        break;
      case "price_desc":
        items.sort((a: any, b: any) => b.total_price - a.total_price);
        break;
      case "surface":
        items.sort((a: any, b: any) => {
          const surfA = (a.length_m || 0) * (a.width_m || 0);
          const surfB = (b.length_m || 0) * (b.width_m || 0);
          return surfB - surfA;
        });
        break;
    }

    return items;
  }, [data?.parcels, sortBy]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="h-12 w-12 animate-spin text-clay mb-4" />
        <p className="text-gray-600">{t("Buscando parcelas disponibles...")}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <p className="text-gray-600">{t("Error al buscar disponibilidad")}</p>
      </div>
    );
  }

  if (!data?.parcels || data.parcels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Car className="h-16 w-16 text-gray-300 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">{t("No hay parcelas disponibles")}</h2>
        <p className="text-gray-600">{t("Prueba con otras fechas")}</p>
      </div>
    );
  }

  // Construir objeto searchParams para ParcelCard (espera snake_case)
  const parcelSearchParams = {
    pickup_date: searchParams.get("pickup_date") || "",
    dropoff_date: searchParams.get("dropoff_date") || "",
    pickup_time: searchParams.get("pickup_time") || "10:00",
    dropoff_time: searchParams.get("dropoff_time") || "10:00",
    pickup_location: searchParams.get("pickup_location") || "los-nietos",
    dropoff_location: searchParams.get("dropoff_location") || searchParams.get("pickup_location") || "los-nietos",
    adults: searchParams.get("adults") || "2",
    children: searchParams.get("children") || "0",
  };

  return (
    <div>
      {/* Search Summary con fondo azul */}
      <div className="bg-earth-deep py-6 -mx-4 px-4 mb-8 rounded-xl">
        <SearchSummary
          pickupDate={searchParams.get("pickup_date") || ""}
          dropoffDate={searchParams.get("dropoff_date") || ""}
          pickupTime={searchParams.get("pickup_time") || "10:00"}
          dropoffTime={searchParams.get("dropoff_time") || "10:00"}
          pickupLocation={searchParams.get("pickup_location") || ""}
          dropoffLocation={searchParams.get("dropoff_location") || ""}
          adults={searchParams.get("adults") || "2"}
          children={searchParams.get("children") || "0"}
        />
      </div>

      {/* Contador de resultados */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          {filteredParcels.length} {t("parcela")}{filteredParcels.length !== 1 ? "s" : ""} {t("disponible")}{filteredParcels.length !== 1 ? "s" : ""}
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredParcels.map((parcel: any) => (
          <ParcelCard
            key={parcel.id}
            parcel={parcel}
            pricing={parcel.pricing}
            searchParams={parcelSearchParams}
            searchQueryId={data?.searchQueryId}
          />
        ))}
      </div>
    </div>
  );
}

export function BuscarClient() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-8">
          {t("Resultados de búsqueda")}
        </h1>
        
        <Suspense fallback={<LoadingState />}>
          <SearchResultsContent />
        </Suspense>
      </div>
    </main>
  );
}
