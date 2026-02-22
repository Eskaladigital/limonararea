"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, Home, ArrowUpDown, ArrowUp, ArrowDown, Package, Loader2, RefreshCw } from "lucide-react";
import { useAllDataCached } from "@/hooks/use-all-data-cached";
import { useCachedData } from "@/hooks/use-paginated-data";
import ParcelActions from "./parcel-actions";

interface ParcelExtra {
  id: string;
  name: string;
}

interface Parcel {
  id: string;
  name: string;
  slug: string;
  length_m: number | null;
  width_m: number | null;
  base_price_per_day: number | null;
  status: string;
  is_for_rent: boolean;
  internal_code: string | null;
  category: {
    id: string;
    name: string;
  } | null;
  parcel_available_extras?: {
    extras: ParcelExtra;
  }[];
  images?: {
    image_url: string;
    is_primary: boolean;
  }[];
}

interface ParcelCategory {
  id: string;
  name: string;
}

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  available: { bg: "bg-green-100", text: "text-green-700", label: "Disponible" },
  rented: { bg: "bg-blue-100", text: "text-blue-700", label: "Ocupada" },
  maintenance: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Mantenimiento" },
  inactive: { bg: "bg-gray-100", text: "text-gray-700", label: "Inactiva" },
};

export default function ParcelasPage() {
  // Establecer título de la página
  useEffect(() => {
    document.title = "Admin - Parcelas | Eco Area Limonar";
  }, []);

  // Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Ordenamiento - por defecto por código interno
  const [sortField, setSortField] = useState<string>('internal_code');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Cargar categorías con caché
  const { 
    data: categories, 
    loading: categoriesLoading, 
  } = useCachedData<ParcelCategory[]>({
    queryKey: ['parcel_categories'],
    queryFn: async () => {
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      const result = await supabase
        .from('parcel_categories')
        .select('id, name')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
      
      return (result.data || []) as ParcelCategory[];
    },
    staleTime: 1000 * 60 * 60, // 1 hora - las categorías casi nunca cambian
  });

  // Cargar TODAS las parcelas con caché de 30 minutos
  const { 
    data: parcels, 
    loading: parcelsLoading,
    totalCount,
    refetch: refetchParcels,
    isRefetching,
  } = useAllDataCached<Parcel>({
    queryKey: ['parcels'],
    table: 'parcels',
    select: `
      *,
      category:parcel_categories(id, name),
      images:parcel_images(*),
      parcel_available_extras(
        extras(id, name)
      )
    `,
    orderBy: { column: 'internal_code', ascending: true },
    // Caché de 30 minutos para parcelas
    staleTime: 1000 * 60 * 30,
  });

  const loading = categoriesLoading || parcelsLoading;

  // Función para manejar el ordenamiento
  const handleSort = (field: string) => {
    if (sortField === field) {
      // Si ya está ordenado por este campo, cambiar dirección
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Si es un campo nuevo, ordenar ascendente
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Función para renderizar icono de ordenamiento
  const renderSortIcon = (field: string) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4 text-gray-400" />;
    }
    return sortDirection === 'asc' ? (
      <ArrowUp className="h-4 w-4 text-clay" />
    ) : (
      <ArrowDown className="h-4 w-4 text-clay" />
    );
  };

  // Procesar parcelas para obtener imagen principal y extras
  const processedParcels = useMemo(() => {
    if (!parcels) return [];
    
    return parcels.map(parcel => {
      const primaryImage = parcel.images?.find(img => img.is_primary);
      const firstImage = parcel.images?.[0];
      const main_image = primaryImage?.image_url || firstImage?.image_url || null;
      
      const extras = parcel.parcel_available_extras
        ?.map(item => item.extras)
        .filter(Boolean) || [];
      
      return {
        ...parcel,
        main_image,
        extras,
      };
    });
  }, [parcels]);

  // Filtrado
  const filteredParcels = useMemo(() => {
    let filtered = [...processedParcels];
    
    // Búsqueda por texto
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(parcel => 
        parcel.name.toLowerCase().includes(search) ||
        parcel.slug?.toLowerCase().includes(search) ||
        parcel.internal_code?.toLowerCase().includes(search)
      );
    }

    // Filtro por categoría
    if (categoryFilter && categoryFilter !== '') {
      filtered = filtered.filter(v => v.category?.id === categoryFilter);
    }

    // Filtro por estado
    if (statusFilter && statusFilter !== '') {
      filtered = filtered.filter(v => v.status === statusFilter);
    }

    return filtered;
  }, [processedParcels, searchTerm, categoryFilter, statusFilter]);

  // Ordenamiento
  const sortedParcels = useMemo(() => {
    return [...filteredParcels].sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortField) {
        case 'internal_code':
          aValue = a.internal_code || '';
          bValue = b.internal_code || '';
          break;
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'surface':
          aValue = (a.length_m || 0) * (a.width_m || 0);
          bValue = (b.length_m || 0) * (b.width_m || 0);
          break;
        case 'base_price_per_day':
          aValue = a.base_price_per_day || 0;
          bValue = b.base_price_per_day || 0;
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        case 'extras':
          aValue = a.extras?.length || 0;
          bValue = b.extras?.length || 0;
          break;
        default:
          aValue = a.name;
          bValue = b.name;
      }

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [filteredParcels, sortField, sortDirection]);

  const parcelsList = sortedParcels;
  const allParcels = processedParcels || [];

  if (loading && parcelsList.length === 0) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-clay mb-4" />
          <p className="text-gray-500">Cargando parcelas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Parcelas</h1>
          <p className="text-gray-600 mt-1">Gestiona las parcelas del área de autocaravanas</p>
        </div>
        <div className="flex gap-3">
          {/* Botón Actualizar */}
          <button 
            onClick={() => refetchParcels()}
            disabled={isRefetching}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
            title="Actualizar parcelas"
          >
            <RefreshCw className={`h-5 w-5 ${isRefetching ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isRefetching ? 'Actualizando...' : 'Actualizar'}</span>
          </button>
          <Link href="/administrator/parcelas/nuevo" className="btn-primary flex items-center gap-2">
            <Plus className="h-5 w-5" />
            <span className="hidden sm:inline">Añadir parcela</span>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Total parcelas</p>
          <p className="text-2xl font-bold text-gray-900">{allParcels.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Disponibles</p>
          <p className="text-2xl font-bold text-blue-600">{allParcels.filter(v => v.status === 'available').length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Ocupadas</p>
          <p className="text-2xl font-bold text-orange-600">{allParcels.filter(v => v.status === 'rented').length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Mantenimiento</p>
          <p className="text-2xl font-bold text-yellow-600">{allParcels.filter(v => v.status === 'maintenance').length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar parcelas..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-clay focus:border-transparent" 
            />
          </div>
          
          {/* Solo mostrar filtro de categorías si hay más de una */}
          {categories && categories.length > 1 && (
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-clay"
            >
              <option value="">Todas las categorías</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          )}
          
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-clay"
          >
            <option value="">Todos los estados</option>
            <option value="available">Disponible</option>
            <option value="rented">Ocupada</option>
            <option value="maintenance">Mantenimiento</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th 
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('internal_code')}
                >
                  <div className="flex items-center gap-2">
                    Código
                    {renderSortIcon('internal_code')}
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-2">
                    Parcela
                    {renderSortIcon('name')}
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('extras')}
                >
                  <div className="flex items-center gap-2">
                    Extras
                    {renderSortIcon('extras')}
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('surface')}
                >
                  <div className="flex items-center gap-2">
                    Superficie
                    {renderSortIcon('surface')}
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-right text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('base_price_per_day')}
                >
                  <div className="flex items-center justify-end gap-2">
                    €/día
                    {renderSortIcon('base_price_per_day')}
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-center text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center justify-center gap-2">
                    Estado
                    {renderSortIcon('status')}
                  </div>
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {parcelsList.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                    <Home className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium">
                      {searchTerm || categoryFilter || statusFilter 
                        ? 'No se encontraron parcelas con los filtros seleccionados' 
                        : 'No hay parcelas registradas'}
                    </p>
                    <p className="text-sm mt-1">
                      {searchTerm || categoryFilter || statusFilter
                        ? 'Prueba con otros criterios de búsqueda'
                        : 'Añade tu primera parcela para empezar'}
                    </p>
                  </td>
                </tr>
              ) : (
                parcelsList.map((parcel) => (
                  <tr 
                    key={parcel.id} 
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      {parcel.internal_code ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-mono font-bold bg-blue-100 text-blue-800">
                          {parcel.internal_code}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-12 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {parcel.main_image ? (
                            <img 
                              src={parcel.main_image} 
                              alt={parcel.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Home className="h-6 w-6 text-gray-400" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 truncate">{parcel.name}</p>
                          <p className="text-sm text-gray-500 truncate">
                            {parcel.length_m && parcel.width_m ? `${parcel.length_m}×${parcel.width_m} m` : '—'} · {parcel.category?.name || 'Sin categoría'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {parcel.extras && parcel.extras.length > 0 ? (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Package className="h-5 w-5" />
                          <span className="font-medium">{parcel.extras.length}</span>
                          <div className="group relative">
                            <button 
                              className="text-xs text-gray-400 hover:text-gray-600 cursor-help"
                              title="Ver extras"
                            >
                              ⓘ
                            </button>
                            {/* Tooltip con lista de extras */}
                            <div className="hidden group-hover:block absolute left-0 top-6 z-50 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-lg min-w-[200px]">
                              <div className="space-y-1">
                                {parcel.extras.map((extra: any, index) => (
                                  <div key={extra.id || index} className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                                    <span>{extra.name}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {parcel.length_m && parcel.width_m ? (
                        <span>{parcel.length_m}×{parcel.width_m} m</span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {parcel.base_price_per_day ? (
                        <span className="font-semibold text-gray-900">{parcel.base_price_per_day}€</span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${statusColors[parcel.status]?.bg} ${statusColors[parcel.status]?.text}`}>
                        {statusColors[parcel.status]?.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <ParcelActions 
parcelId={parcel.id}
                        parcelSlug={parcel.slug}
                        isForSale={false}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Info de totales */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Mostrando {parcelsList.length} de {totalCount} parcelas
            {(searchTerm || categoryFilter || statusFilter) && ' (filtrados)'}
            {isRefetching && ' • Actualizando...'}
          </p>
        </div>
      </div>

      {/* Leyenda */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <p className="text-sm text-gray-500 mb-3">Estados:</p>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold">✓</span>
            <span className="text-gray-600">Disponible</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">○</span>
            <span className="text-gray-600">Ocupada</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center text-xs font-bold">!</span>
            <span className="text-gray-600">Mantenimiento</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-gray-100 text-gray-700 rounded-full flex items-center justify-center text-xs font-bold">—</span>
            <span className="text-gray-600">Inactiva</span>
          </div>
        </div>
      </div>
    </div>
  );
}
