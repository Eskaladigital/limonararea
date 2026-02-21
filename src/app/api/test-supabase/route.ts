/**
 * API Route de prueba para verificar la conexión con Supabase
 * Acceder: http://localhost:3000/api/test-supabase
 */

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET() {
  try {
    // Test 1: Verificar categorías de parcelas
    const { data: categories, error: categoriesError } = await supabase
      .from('parcel_categories')
      .select('*')
      .limit(5);

    if (categoriesError) {
      throw new Error(`Error al obtener categorías: ${categoriesError.message}`);
    }

    // Test 2: Verificar ubicaciones
    const { data: locations, error: locationsError } = await supabase
      .from('locations')
      .select('*')
      .limit(5);

    if (locationsError) {
      throw new Error(`Error al obtener ubicaciones: ${locationsError.message}`);
    }

    // Test 3: Verificar extras
    const { data: extras, error: extrasError } = await supabase
      .from('extras')
      .select('*')
      .limit(5);

    if (extrasError) {
      throw new Error(`Error al obtener extras: ${extrasError.message}`);
    }

    // Test 4: Contar parcelas
    const { count: parcelsCount, error: parcelsError } = await supabase
      .from('parcels')
      .select('*', { count: 'exact', head: true });

    if (parcelsError) {
      throw new Error(`Error al contar parcelas: ${parcelsError.message}`);
    }

    return NextResponse.json({
      success: true,
      message: '✅ Conexión con Supabase exitosa!',
      data: {
        categories: {
          count: categories?.length || 0,
          items: categories,
        },
        locations: {
          count: locations?.length || 0,
          items: locations,
        },
        extras: {
          count: extras?.length || 0,
          items: extras,
        },
        parcels: {
          count: parcelsCount || 0,
        },
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('❌ Error en test de Supabase:', error);
    return NextResponse.json(
      {
        success: false,
        message: '❌ Error al conectar con Supabase',
        error: error.message,
      },
      { status: 500 }
    );
  }
}





