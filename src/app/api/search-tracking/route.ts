import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/**
 * POST /api/search-tracking
 *
 * Actualiza el estado de tracking de búsquedas (selección de parcela)
 *
 * Body:
 * - search_query_id: ID de la búsqueda
 * - action: 'parcel_selected'
 * - parcel_id: ID de la parcela seleccionada
 * - parcel_price: Precio mostrado
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { search_query_id, action, parcel_id, parcel_price } = body;
    const selectedParcelId = parcel_id;
    const selectedPrice = parcel_price;

    if (!search_query_id || !action) {
      return NextResponse.json(
        { error: "search_query_id y action son requeridos" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    if (action === "parcel_selected") {
      if (!selectedParcelId) {
        return NextResponse.json(
          { error: "parcel_id es requerido para parcel_selected" },
          { status: 400 }
        );
      }

      const { error } = await supabase
        .from("search_queries")
        .update({
          parcel_selected: true,
          selected_parcel_id: selectedParcelId,
          selected_parcel_price: selectedPrice || null,
          parcel_selected_at: new Date().toISOString(),
          funnel_stage: "parcel_selected",
        })
        .eq("id", search_query_id);

      if (error) {
        console.error("Error actualizando tracking:", error);
        return NextResponse.json(
          { error: "Error al actualizar tracking" },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "Acción no soportada" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error en search-tracking:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
