"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import dynamic from "next/dynamic";
import supabase from "@/lib/supabase/client";
import { ArrowLeft, Save, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { ImageGalleryManager, type GalleryImage } from "@/components/media/image-gallery-manager";
import { EquipmentIcon } from "@/components/parcel/equipment-display";

const TinyEditor = dynamic(
  () => import("@/components/admin/tiny-editor").then((mod) => mod.TinyEditor),
  { 
    ssr: false, 
    loading: () => (
      <div className="h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    )
  }
);

interface Extra {
  id: string;
  name: string;
  price_per_day: number;
  price_type: string;
}

interface Equipment {
  id: string;
  name: string;
  slug: string;
  icon: string;
  category: string;
  is_standard: boolean;
  is_active: boolean;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function EditarVehiculoPage() {
  const router = useRouter();
  const params = useParams();
  const parcelId = params.id as string;
  
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [extras, setExtras] = useState<Extra[]>([]);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [internalCode, setInternalCode] = useState("");
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category_id: '',
    description: '',
    short_description: '',
    length_m: null as number | null,
    width_m: null as number | null,
    is_for_rent: true,
    base_price_per_day: 0 as number,
    status: 'available' as 'available' | 'maintenance' | 'rented' | 'inactive',
    features: null as Record<string, unknown> | null,
  });

  useEffect(() => {
    const loadInitialData = async () => {
      // Cargar categorías
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('parcel_categories')
        .select('id, name, slug')
        .eq('is_active', true)
        .order('sort_order');
      
      if (categoriesError) {
        console.error('Error loading categories:', categoriesError);
        console.error('Error details:', JSON.stringify(categoriesError, null, 2));
      } else if (categoriesData) {
        console.log('Categories loaded:', categoriesData);
        setCategories(categoriesData);
      } else {
        console.warn('No categories found or empty result');
      }

      // Cargar extras
      const { data: extrasData, error: extrasError } = await supabase
        .from('extras')
        .select('id, name, price_per_day, price_type')
        .eq('is_active', true)
        .order('name');
      
      if (extrasError) {
        console.error('Error loading extras:', extrasError);
        console.error('Error details:', JSON.stringify(extrasError, null, 2));
      } else if (extrasData) {
        console.log('Extras loaded:', extrasData);
        setExtras(extrasData);
      } else {
        console.warn('No extras found or empty result');
      }

      // Cargar equipamiento
      const { data: equipmentData, error: equipmentError } = await supabase
        .from('equipment')
        .select('id, name, slug, icon, category, is_standard, is_active')
        .eq('is_active', true)
        .order('category')
        .order('sort_order');
      
      if (equipmentError) {
        console.error('Error loading equipment:', equipmentError);
        console.error('Error details:', JSON.stringify(equipmentError, null, 2));
      } else if (equipmentData) {
        console.log('Equipment loaded:', equipmentData);
        setEquipmentList(equipmentData);
      } else {
        console.warn('No equipment found or empty result');
      }
    };

    loadInitialData();
    loadVehicleData();
  }, [parcelId]);

  const loadVehicleData = async () => {
    try {
      setLoadingData(true);
      const { data, error } = await supabase
        .from('parcels')
        .select('*')
        .eq('id', parcelId)
        .single();

      if (error) throw error;
      
      if (data) {
        setFormData({
          name: data.name || '',
          slug: data.slug || '',
          category_id: data.category_id || '',
          description: data.description || '',
          short_description: data.short_description || '',
          length_m: data.length_m ?? undefined,
          width_m: data.width_m ?? undefined,
          is_for_rent: data.is_for_rent ?? true,
          base_price_per_day: data.base_price_per_day ?? 0,
          status: (data.status || 'available') as 'available' | 'inactive' | 'maintenance' | 'rented',
          features: data.features ?? undefined,
        });
        
        // Cargar internal_code
        setInternalCode(data.internal_code || '');
        
        // Cargar imágenes de la galería
        const { data: imagesData, error: imagesError } = await supabase
          .from('parcel_images')
          .select('*')
          .eq('parcel_id', parcelId)
          .order('sort_order', { ascending: true });

        if (!imagesError && imagesData) {
          setGalleryImages(imagesData);
        }
      }

      // Cargar extras asignados
      const { data: parcelExtras } = await supabase
        .from('parcel_available_extras')
        .select('extra_id')
        .eq('parcel_id', parcelId);

      if (parcelExtras) {
        setSelectedExtras(parcelExtras.map(ve => ve.extra_id));
      }

      // Cargar equipamiento asignado
      const { data: parcelEquipment } = await supabase
        .from('parcel_equipment')
        .select('equipment_id')
        .eq('parcel_id', parcelId);

      if (parcelEquipment) {
        setSelectedEquipment(parcelEquipment.map(ve => ve.equipment_id));
      }
    } catch (error: any) {
      console.error('Error loading parcel:', error);
      setMessage({ type: 'error', text: 'Error al cargar los datos de la parcela' });
    } finally {
      setLoadingData(false);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      slug: generateSlug(name)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) {
      setMessage({ type: 'error', text: 'El nombre es obligatorio' });
      return;
    }

    if (!formData.category_id) {
      setMessage({ type: 'error', text: 'Debes seleccionar una categoría para la parcela' });
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase
        .from('parcels')
        .update({
          name: formData.name,
          slug: formData.slug,
          category_id: formData.category_id || null,
          description: formData.description || null,
          short_description: formData.short_description || null,
          length_m: formData.length_m,
          width_m: formData.width_m,
          is_for_rent: formData.is_for_rent,
          base_price_per_day: formData.base_price_per_day,
          status: formData.status,
          features: formData.features,
          internal_code: internalCode || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', parcelId);

      if (error) throw error;

      // Actualizar los extras disponibles
      // Primero eliminamos todos los extras actuales
      const { error: deleteError } = await supabase
        .from('parcel_available_extras')
        .delete()
        .eq('parcel_id', parcelId);

      if (deleteError) {
        console.error('Error deleting old extras:', deleteError);
      }

      // Luego insertamos los nuevos extras seleccionados
      if (selectedExtras.length > 0) {
        const extrasToInsert = selectedExtras.map(extraId => ({
          parcel_id: parcelId,
          extra_id: extraId
        }));

        console.log('Inserting extras:', extrasToInsert);

        const { error: extrasError } = await supabase
          .from('parcel_available_extras')
          .insert(extrasToInsert);

        if (extrasError) {
          console.error('Error updating extras:', extrasError);
          throw new Error('Error al asignar los extras: ' + extrasError.message);
        } else {
          console.log('Extras inserted successfully');
        }
      } else {
        console.log('No extras selected');
      }

      // Actualizar las imágenes de la galería
      // Primero eliminar todas las imágenes actuales
      const { error: deleteImagesError } = await supabase
        .from('parcel_images')
        .delete()
        .eq('parcel_id', parcelId);

      if (deleteImagesError) {
        console.error('Error deleting old images:', deleteImagesError);
      }

      // Luego insertar las nuevas imágenes
      if (galleryImages.length > 0) {
        const imagesToInsert = galleryImages.map((img) => ({
          parcel_id: parcelId,
          image_url: img.image_url,
          alt_text: img.alt_text || '',
          sort_order: img.sort_order,
          is_primary: img.is_primary,
        }));

        const { error: imagesError } = await supabase
          .from('parcel_images')
          .insert(imagesToInsert);

        if (imagesError) {
          console.error('Error updating images:', imagesError);
          throw new Error('Error al guardar las imágenes: ' + imagesError.message);
        }
      }

      // Actualizar equipamientos del vehículo
      // Primero eliminar todos los equipamientos actuales
      const { error: deleteEquipmentError } = await supabase
        .from('parcel_equipment')
        .delete()
        .eq('parcel_id', parcelId);

      if (deleteEquipmentError) {
        console.error('Error deleting old equipment:', deleteEquipmentError);
      }

      // Luego insertar los nuevos equipamientos seleccionados
      if (selectedEquipment.length > 0) {
        const equipmentToInsert = selectedEquipment.map(equipmentId => ({
          parcel_id: parcelId,
          equipment_id: equipmentId
        }));

        const { error: equipmentError } = await supabase
          .from('parcel_equipment')
          .insert(equipmentToInsert);

        if (equipmentError) {
          console.error('Error updating equipment:', equipmentError);
          throw new Error('Error al asignar los equipamientos: ' + equipmentError.message);
        }
      }

      setMessage({ type: 'success', text: 'Parcela actualizada correctamente' });
      
      setTimeout(() => {
        router.push('/administrator/parcelas');
      }, 1500);
    } catch (error: any) {
      console.error('Error updating parcel:', error);
      setMessage({ type: 'error', text: error.message || 'Error al actualizar la parcela' });
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-clay" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link 
            href="/administrator/parcelas" 
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Editar Parcela</h1>
            <p className="text-gray-600 mt-1">Modifica los datos de la parcela</p>
          </div>
        </div>

      {message && (
        <div className={`p-4 rounded-lg flex items-center gap-3 ${
          message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          <AlertCircle className="h-5 w-5" />
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Información Básica */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Información Básica</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de la parcela *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-clay focus:border-transparent"
                placeholder="Ej: Adria Twin Plus 600 SP"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug (URL)
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-clay focus:border-transparent bg-gray-50"
                placeholder="adria-twin-plus-600-sp"
              />
              <p className="text-xs text-gray-500 mt-1">Se genera automáticamente desde el nombre</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoría *
              </label>
              <select
                value={formData.category_id}
                onChange={(e) => setFormData(prev => ({ ...prev, category_id: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-clay focus:border-transparent"
                required
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-clay focus:border-transparent"
              >
                <option value="available">Disponible</option>
                <option value="rented">Alquilado</option>
                <option value="maintenance">Mantenimiento</option>
                <option value="inactive">Inactivo</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Código Interno
              </label>
              <input
                type="text"
                value={internalCode}
                onChange={(e) => setInternalCode(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-clay focus:border-transparent"
                placeholder="FU0000"
              />
              <p className="text-xs text-gray-500 mt-1">Código de identificación interna de la parcela</p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción corta
              </label>
              <input
                type="text"
                value={formData.short_description}
                onChange={(e) => setFormData(prev => ({ ...prev, short_description: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-clay focus:border-transparent"
                placeholder="Descripción breve para listados"
                maxLength={200}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción completa
              </label>
              <TinyEditor
                value={formData.description}
                onChange={(html) => setFormData(prev => ({ ...prev, description: html }))}
                height={400}
                placeholder="Descripción detallada de la parcela..."
              />
            </div>
          </div>
        </div>

        {/* Galería de Imágenes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <ImageGalleryManager
            images={galleryImages}
            onChange={setGalleryImages}
            maxImages={20}
            bucket="parcels"
            suggestedFolder={internalCode}
          />
        </div>

        {/* Dimensiones parcela */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Dimensiones</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Largo (m)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.length_m || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, length_m: e.target.value ? parseFloat(e.target.value) : null }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-clay focus:border-transparent"
                placeholder="5.99"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ancho (m)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.width_m || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, width_m: e.target.value ? parseFloat(e.target.value) : null }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-clay focus:border-transparent"
                placeholder="5.00"
              />
            </div>
          </div>
        </div>

        {/* Características Dinámico */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Características</h2>
          <p className="text-sm text-gray-600 mb-6">
            Selecciona las características que tiene esta parcela (agua, césped, orientación, etc.)
          </p>
          
          {equipmentList.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No hay características configuradas.</p>
              <Link href="/administrator/caracteristicas" className="text-clay hover:underline mt-2 inline-block">
                Ir a configurar características →
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Agrupar por categoría */}
              {['parcela', 'agua', 'exterior', 'confort', 'energia', 'general'].map(category => {
                const categoryEquipment = equipmentList.filter(eq => eq.category === category);
                if (categoryEquipment.length === 0) return null;
                
                const categoryNames: Record<string, string> = {
                  parcela: 'Parcela (superficie, orientación, césped)',
                  agua: 'Agua',
                  exterior: 'Exterior',
                  confort: 'Confort',
                  energia: 'Energía',
                  general: 'Otros',
                };

                const categoryColors: Record<string, string> = {
                  parcela: 'border-emerald-200 bg-emerald-50',
                  agua: 'border-cyan-200 bg-cyan-50',
                  exterior: 'border-green-200 bg-green-50',
                  confort: 'border-blue-200 bg-blue-50',
                  energia: 'border-yellow-200 bg-yellow-50',
                  general: 'border-gray-200 bg-gray-50',
                };

                return (
                  <div key={category}>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      {categoryNames[category]}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {categoryEquipment.map(eq => (
                        <div 
                          key={eq.id} 
                          className={`flex items-center gap-3 p-3 border rounded-lg transition-colors cursor-pointer ${
                            selectedEquipment.includes(eq.id) 
                              ? categoryColors[category]
                              : 'border-gray-200 hover:bg-gray-50'
                          }`}
                          onClick={() => {
                            if (selectedEquipment.includes(eq.id)) {
                              setSelectedEquipment(prev => prev.filter(id => id !== eq.id));
                            } else {
                              setSelectedEquipment(prev => [...prev, eq.id]);
                            }
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={selectedEquipment.includes(eq.id)}
                            onChange={() => {}}
                            className="w-4 h-4 text-clay focus:ring-clay border-gray-300 rounded"
                          />
                          <EquipmentIcon iconName={eq.icon} className="h-5 w-5 text-gray-600" />
                          <span className="font-medium text-gray-900 flex-1">{eq.name}</span>
                          {eq.is_standard && (
                            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                              Estándar
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
              
              {/* Contador */}
              <div className="pt-4 border-t border-gray-200 text-sm text-gray-500">
                {selectedEquipment.length} características seleccionadas
              </div>
            </div>
          )}
        </div>

        {/* Características Legacy (oculto pero funcional para compatibilidad) */}
        <input type="hidden" value={formData.has_kitchen ? '1' : '0'} />
        <input type="hidden" value={formData.has_bathroom ? '1' : '0'} />
        <input type="hidden" value={formData.has_ac ? '1' : '0'} />
        <input type="hidden" value={formData.has_heating ? '1' : '0'} />
        <input type="hidden" value={formData.has_solar_panel ? '1' : '0'} />
        <input type="hidden" value={formData.has_awning ? '1' : '0'} />

        {/* Extras Disponibles */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Extras Disponibles</h2>
          <p className="text-sm text-gray-600 mb-6">
            Selecciona qué extras estarán disponibles para esta parcela
          </p>
          
          {extras.length === 0 ? (
            <p className="text-sm text-gray-500 italic">No hay extras configurados en el sistema</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {extras.map(extra => (
                <div key={extra.id} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    id={`extra-${extra.id}`}
                    checked={selectedExtras.includes(extra.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedExtras(prev => [...prev, extra.id]);
                      } else {
                        setSelectedExtras(prev => prev.filter(id => id !== extra.id));
                      }
                    }}
                    className="w-4 h-4 text-clay focus:ring-clay border-gray-300 rounded mt-0.5"
                  />
                  <label htmlFor={`extra-${extra.id}`} className="flex-1 cursor-pointer">
                    <span className="font-medium text-gray-900">{extra.name}</span>
                    <span className="text-sm text-gray-600 ml-2">
                      {extra.price_per_day > 0 && (
                        <>
                          ({extra.price_per_day}€
                          {extra.price_type === 'per_day' && '/día'}
                          {extra.price_type === 'per_rental' && '/alquiler'})
                        </>
                      )}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Alquiler */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-6">
            <input
              type="checkbox"
              id="is_for_rent"
              checked={formData.is_for_rent}
              onChange={(e) => setFormData(prev => ({ ...prev, is_for_rent: e.target.checked }))}
              className="w-4 h-4 text-clay focus:ring-clay border-gray-300 rounded"
            />
            <label htmlFor="is_for_rent" className="text-xl font-bold text-gray-900">
              Disponible para alquiler
            </label>
          </div>
          
          {formData.is_for_rent && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Precio base por día (€)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.base_price_per_day || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, base_price_per_day: e.target.value ? parseFloat(e.target.value) : null }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-clay focus:border-transparent"
                  placeholder="120.00"
                />
              </div>
            </div>
          )}
        </div>

        {/* Botones */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="h-5 w-5" />
                Guardar cambios
              </>
            )}
          </button>
          <Link
            href="/administrator/parcelas"
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </Link>
        </div>
      </form>
      </div>
    </div>
  );
}

