"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, Edit, Trash2 } from "lucide-react";
import supabase from "@/lib/supabase/client";

interface ParcelActionsProps {
  parcelId: string;
  parcelSlug: string;
  isForSale?: boolean;
}

export default function ParcelActions({ parcelId, parcelSlug }: ParcelActionsProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('¿Estás seguro de eliminar esta parcela? Esta acción no se puede deshacer.')) return;

    try {
      const { data, error } = await supabase
        .from('parcels')
        .delete()
        .eq('id', parcelId)
        .select('id');

      if (error) throw error;
      if (!data || data.length === 0) {
        throw new Error('No se pudo eliminar la parcela (permisos insuficientes o el registro ya no existe).');
      }
      
      // Recargar la página para reflejar los cambios
      router.refresh();
    } catch (error) {
      console.error('Error deleting parcel:', error);
      alert(error instanceof Error ? error.message : 'Error al eliminar la parcela');
    }
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <Link 
        href={`/es/parcelas/${parcelSlug}`} 
        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" 
        title="Ver en web"
      >
        <Eye className="h-5 w-5" />
      </Link>
      <Link 
        href={`/administrator/parcelas/${parcelId}/editar`} 
        className="p-2 text-gray-400 hover:text-clay hover:bg-clay/10 rounded-lg transition-colors" 
        title="Editar"
      >
        <Edit className="h-5 w-5" />
      </Link>
      <button 
        onClick={handleDelete}
        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
        title="Eliminar"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );
}
