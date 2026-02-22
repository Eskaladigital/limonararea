import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    
    const tables = [
      'parcels',
      'parcel_categories',
      'parcel_images',
      'parcel_equipment',
      'equipment',
      'extras',
      'bookings',
      'booking_extras',
      'seasons',
      'locations'
    ];
    
    const schemas: any = {};
    
    for (const table of tables) {
      const { data, error } = await supabase
        .from(table as any)
        .select('*')
        .limit(1);
      
      if (!error && data && data.length > 0) {
        schemas[table] = {
          columns: Object.keys(data[0]),
          sample: data[0]
        };
      } else if (!error && data) {
        schemas[table] = {
          columns: [],
          sample: null,
          note: 'Tabla vacía'
        };
      } else {
        schemas[table] = {
          error: error?.message || 'Unknown error'
        };
      }
    }
    
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      schemas
    });
    
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
