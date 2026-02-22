import { NextRequest } from "next/server";
import { handleCalendarRequest } from "@/lib/calendar/calendar-handler";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * GET /api/calendar/entregas
 * 
 * Endpoint para suscripción a calendario de entregas y recogidas
 * Devuelve un archivo .ics que se actualiza automáticamente
 * 
 * Query params:
 * - token: Token de autenticación (requerido)
 * 
 * Uso:
 * https://limonar.com/api/calendar/entregas?token=TU_TOKEN_SECRETO
 */
export async function GET(request: NextRequest) {
  return handleCalendarRequest(request);
}
