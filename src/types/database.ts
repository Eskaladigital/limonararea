export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      // ============================================
      // PARCELS (Eco Area Limonar)
      // ============================================
      parcels: {
        Row: {
          id: string;
          name: string;
          slug: string;
          category_id: string | null;
          internal_code: string | null;
          description: string | null;
          short_description: string | null;
          length_m: number | null;
          width_m: number | null;
          base_price_per_day: number;
          status: "available" | "maintenance" | "rented" | "inactive";
          sort_order: number;
          is_for_rent: boolean;
          features: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          category_id?: string | null;
          internal_code?: string | null;
          description?: string | null;
          short_description?: string | null;
          length_m?: number | null;
          width_m?: number | null;
          base_price_per_day: number;
          status?: "available" | "maintenance" | "rented" | "inactive";
          sort_order?: number;
          is_for_rent?: boolean;
          features?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["parcels"]["Insert"]>;
      };

      parcel_categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          image_url: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          image_url?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["parcel_categories"]["Insert"]>;
      };

      parcel_images: {
        Row: {
          id: string;
          parcel_id: string;
          url: string;
          alt: string | null;
          is_main: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          parcel_id: string;
          url: string;
          alt?: string | null;
          is_main?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["parcel_images"]["Insert"]>;
      };

      locations: {
        Row: {
          id: string;
          name: string;
          slug: string;
          address: string | null;
          city: string | null;
          postal_code: string | null;
          latitude: number | null;
          longitude: number | null;
          phone: string | null;
          email: string | null;
          opening_time: string;
          closing_time: string;
          is_pickup: boolean;
          is_dropoff: boolean;
          extra_fee: number;
          min_days: number | null;
          active_from: string | null;
          active_until: string | null;
          active_recurring: boolean;
          notes: string | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          address?: string | null;
          city?: string | null;
          postal_code?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          phone?: string | null;
          email?: string | null;
          opening_time?: string;
          closing_time?: string;
          is_pickup?: boolean;
          is_dropoff?: boolean;
          extra_fee?: number;
          min_days?: number | null;
          active_from?: string | null;
          active_until?: string | null;
          active_recurring?: boolean;
          notes?: string | null;
          is_active?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["locations"]["Insert"]>;
      };

      bookings: {
        Row: {
          id: string;
          booking_number: string;
          parcel_id: string;
          customer_id: string | null;
          pickup_location_id: string;
          dropoff_location_id: string;
          pickup_date: string;
          pickup_time: string;
          dropoff_date: string;
          dropoff_time: string;
          days: number;
          base_price: number;
          extras_price: number;
          location_fee: number;
          discount: number;
          total_price: number;
          amount_paid: number;
          status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";
          payment_status: "pending" | "partial" | "paid" | "refunded";
          customer_name: string;
          customer_email: string;
          customer_phone: string | null;
          customer_dni: string | null;
          customer_address: string | null;
          customer_city: string | null;
          customer_postal_code: string | null;
          notes: string | null;
          admin_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          booking_number?: string;
          parcel_id: string;
          customer_id?: string | null;
          pickup_location_id: string;
          dropoff_location_id: string;
          pickup_date: string;
          pickup_time: string;
          dropoff_date: string;
          dropoff_time: string;
          days: number;
          base_price: number;
          extras_price?: number;
          location_fee?: number;
          discount?: number;
          total_price: number;
          amount_paid?: number;
          status?: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";
          payment_status?: "pending" | "partial" | "paid" | "refunded";
          customer_name: string;
          customer_email: string;
          customer_phone?: string | null;
          customer_dni?: string | null;
          customer_address?: string | null;
          customer_city?: string | null;
          customer_postal_code?: string | null;
          notes?: string | null;
          admin_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["bookings"]["Insert"]>;
      };

      booking_extras: {
        Row: {
          id: string;
          booking_id: string;
          extra_id: string;
          quantity: number;
          unit_price: number;
          total_price: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          booking_id: string;
          extra_id: string;
          quantity?: number;
          unit_price: number;
          total_price: number;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["booking_extras"]["Insert"]>;
      };

      extras: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          price_per_day: number;
          price_per_rental: number;
          price_type: "per_day" | "per_rental" | "one_time";
          max_quantity: number;
          image_url: string | null;
          is_active: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          price_per_day?: number;
          price_per_rental?: number;
          price_type?: "per_day" | "per_rental" | "one_time";
          max_quantity?: number;
          image_url?: string | null;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["extras"]["Insert"]>;
      };

      customers: {
        Row: {
          id: string;
          user_id: string | null;
          email: string;
          name: string;
          phone: string | null;
          dni: string | null;
          address: string | null;
          city: string | null;
          postal_code: string | null;
          country: string | null;
          driver_license: string | null;
          driver_license_expiry: string | null;
          date_of_birth: string | null;
          notes: string | null;
          total_bookings: number;
          total_spent: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          email: string;
          name: string;
          phone?: string | null;
          dni?: string | null;
          address?: string | null;
          city?: string | null;
          postal_code?: string | null;
          country?: string | null;
          driver_license?: string | null;
          driver_license_expiry?: string | null;
          date_of_birth?: string | null;
          notes?: string | null;
          total_bookings?: number;
          total_spent?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["customers"]["Insert"]>;
      };

      payments: {
        Row: {
          id: string;
          booking_id: string;
          order_number: string;
          amount: number;
          status: "pending" | "authorized" | "cancelled" | "error" | "refunded";
          payment_type: "deposit" | "full" | "partial" | "refund";
          payment_method: string | null;
          response_code: string | null;
          authorization_code: string | null;
          transaction_date: string | null;
          card_country: string | null;
          card_type: string | null;
          refunded_amount: number;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          booking_id: string;
          order_number: string;
          amount: number;
          status?: "pending" | "authorized" | "cancelled" | "error" | "refunded";
          payment_type?: "deposit" | "full" | "partial" | "refund";
          payment_method?: string | null;
          response_code?: string | null;
          authorization_code?: string | null;
          transaction_date?: string | null;
          card_country?: string | null;
          card_type?: string | null;
          refunded_amount?: number;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["payments"]["Insert"]>;
      };

      seasons: {
        Row: {
          id: string;
          name: string;
          slug: string;
          start_date: string;
          end_date: string;
          price_modifier: number;
          min_days: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          start_date: string;
          end_date: string;
          price_modifier?: number;
          min_days?: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["seasons"]["Insert"]>;
      };

      parcel_prices: {
        Row: {
          id: string;
          parcel_id: string;
          season_id: string | null;
          price_per_day: number;
          price_per_week: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          parcel_id: string;
          season_id?: string | null;
          price_per_day: number;
          price_per_week?: number | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["parcel_prices"]["Insert"]>;
      };

      blocked_dates: {
        Row: {
          id: string;
          parcel_id: string;
          start_date: string;
          end_date: string;
          reason: string | null;
          created_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          parcel_id: string;
          start_date: string;
          end_date: string;
          reason?: string | null;
          created_by?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["blocked_dates"]["Insert"]>;
      };

      settings: {
        Row: {
          id: string;
          key: string;
          value: Json;
          description: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          key: string;
          value: Json;
          description?: string | null;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["settings"]["Insert"]>;
      };

      search_queries: {
        Row: {
          id: string;
          session_id: string;
          // Nivel 1: Búsqueda
          searched_at: string;
          pickup_date: string;
          dropoff_date: string;
          pickup_time: string;
          dropoff_time: string;
          rental_days: number;
          advance_days: number;
          // Ubicaciones
          pickup_location_id: string | null;
          dropoff_location_id: string | null;
          same_location: boolean;
          // Filtros y resultados
          category_slug: string | null;
          parcels_available_count: number;
          season_applied: string | null;
          avg_price_shown: number | null;
          had_availability: boolean;
          // Nivel 2: Selección de vehículo
          parcel_selected: boolean;
          selected_parcel_id: string | null;
          selected_parcel_price: number | null;
          parcel_selected_at: string | null;
          time_to_select_seconds: number | null;
          // Nivel 3: Reserva creada
          booking_created: boolean;
          booking_id: string | null;
          booking_created_at: string | null;
          time_to_booking_seconds: number | null;
          total_conversion_seconds: number | null;
          // Estado del funnel
          funnel_stage: "search_only" | "parcel_selected" | "booking_created";
          // Metadatos
          locale: string | null;
          user_agent_type: "mobile" | "desktop" | "tablet" | null;
          // Timestamps
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          searched_at?: string;
          pickup_date: string;
          dropoff_date: string;
          pickup_time?: string;
          dropoff_time?: string;
          rental_days: number;
          advance_days?: number;
          pickup_location_id?: string | null;
          dropoff_location_id?: string | null;
          same_location?: boolean;
          category_slug?: string | null;
          parcels_available_count?: number;
          season_applied?: string | null;
          avg_price_shown?: number | null;
          had_availability?: boolean;
          parcel_selected?: boolean;
          selected_parcel_id?: string | null;
          selected_parcel_price?: number | null;
          parcel_selected_at?: string | null;
          time_to_select_seconds?: number | null;
          booking_created?: boolean;
          booking_id?: string | null;
          booking_created_at?: string | null;
          time_to_booking_seconds?: number | null;
          total_conversion_seconds?: number | null;
          funnel_stage?: "search_only" | "parcel_selected" | "booking_created";
          locale?: string | null;
          user_agent_type?: "mobile" | "desktop" | "tablet" | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["search_queries"]["Insert"]>;
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}

// Helper types
export type Parcel = Database["public"]["Tables"]["parcels"]["Row"];
export type ParcelInsert = Database["public"]["Tables"]["parcels"]["Insert"];
export type ParcelUpdate = Database["public"]["Tables"]["parcels"]["Update"];

export type Booking = Database["public"]["Tables"]["bookings"]["Row"];
export type BookingInsert = Database["public"]["Tables"]["bookings"]["Insert"];
export type BookingUpdate = Database["public"]["Tables"]["bookings"]["Update"];

export type Customer = Database["public"]["Tables"]["customers"]["Row"];
export type Payment = Database["public"]["Tables"]["payments"]["Row"];
export type Location = Database["public"]["Tables"]["locations"]["Row"];
export type Extra = Database["public"]["Tables"]["extras"]["Row"];
export type Season = Database["public"]["Tables"]["seasons"]["Row"];
export type ParcelCategory = Database["public"]["Tables"]["parcel_categories"]["Row"];
export type ParcelImage = Database["public"]["Tables"]["parcel_images"]["Row"];

export type ParcelWithImages = Parcel & {
  images: ParcelImage[];
  category: ParcelCategory | null;
};

export type ParcelForSale = Parcel & {
  images: ParcelImage[];
  category: ParcelCategory | null;
};

export type ParcelCondition = "new" | "like_new" | "excellent" | "good" | "fair";
export type SaleStatus = "available" | "reserved" | "sold";

// Equipamiento
export type Equipment = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string;
  category: string;
  is_active: boolean;
  is_standard: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type ParcelEquipment = {
  id: string;
  parcel_id: string;
  equipment_id: string;
  notes: string | null;
  created_at: string;
  equipment?: Equipment;
};

export type BookingWithRelations = Booking & {
  parcel: Parcel;
  customer: Customer | null;
  pickup_location: Location;
  dropoff_location: Location;
  extras: (Database["public"]["Tables"]["booking_extras"]["Row"] & {
    extra: Extra;
  })[];
  payments: Payment[];
};

/** @deprecated Use Parcel */
export type Vehicle = Parcel;
/** @deprecated Use ParcelWithImages */
export type VehicleWithImages = ParcelWithImages;
/** @deprecated Use ParcelCategory */
export type VehicleCategory = ParcelCategory;
/** @deprecated Use ParcelImage */
export type VehicleImage = ParcelImage;
/** @deprecated Use ParcelEquipment */
export type VehicleEquipment = ParcelEquipment;

// Tipos para búsquedas
export type SearchQuery = Database["public"]["Tables"]["search_queries"]["Row"];
export type SearchQueryInsert = Database["public"]["Tables"]["search_queries"]["Insert"];
export type SearchQueryUpdate = Database["public"]["Tables"]["search_queries"]["Update"];
