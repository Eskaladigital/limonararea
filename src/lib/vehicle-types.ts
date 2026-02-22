/**
 * Tipos de vehículo del CLIENTE (autocaravana, caravana, tienda, etc.).
 * Eco Area Limonar: indica qué tipo de vehículo ocupará la parcela.
 * Se usa en search-widget y API (vehicle_type en query params).
 * length_m = longitud mínima de parcela (metros) que necesita el vehículo.
 */
export interface VehicleType {
  id: string;
  name: string;
  slug: string;
  length_m: number; // longitud mínima parcela en metros
}

export const VEHICLE_TYPES: VehicleType[] = [
  { id: "autocaravana", name: "Autocaravana", slug: "autocaravana", length_m: 6 },
  { id: "camper-gran-volumen", name: "Camper gran volumen", slug: "camper-gran-volumen", length_m: 8 },
  { id: "furgoneta-camper", name: "Furgoneta camper", slug: "furgoneta-camper", length_m: 5 },
  { id: "caravana", name: "Caravana", slug: "caravana", length_m: 6 },
  { id: "tienda", name: "Tienda", slug: "tienda", length_m: 2 },
];

export function getVehicleTypes(): VehicleType[] {
  return VEHICLE_TYPES;
}

export function getVehicleTypeBySlug(slug: string): VehicleType | undefined {
  return VEHICLE_TYPES.find((v) => v.slug === slug);
}
