/**
 * Tipos de alojamiento disponibles.
 * Por ahora solo "parcelas". Cuando se añadan bungalows u otros, agregar aquí.
 * El selector en el buscador solo aparece si hay más de un tipo.
 */
export interface AccommodationType {
  id: string;
  name: string;
  slug: string;
}

export const ACCOMMODATION_TYPES: AccommodationType[] = [
  { id: "parcela", name: "Parcelas", slug: "parcela" },
  // Cuando se añadan bungalows:
  // { id: "bungalow", name: "Bungalows", slug: "bungalow" },
];

export function getAccommodationTypes(): AccommodationType[] {
  return ACCOMMODATION_TYPES;
}

/** True si debe mostrarse el selector de tipo de alojamiento (solo cuando hay > 1 tipo) */
export function shouldShowAccommodationTypeSelector(): boolean {
  return ACCOMMODATION_TYPES.length > 1;
}
