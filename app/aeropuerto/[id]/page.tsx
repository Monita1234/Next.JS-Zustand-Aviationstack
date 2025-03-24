'use client';

import { useEffect } from 'react'; 
import { useRouter } from 'next/navigation';
import { useAeropuertosStore } from '@/app/store/useAeropuertosStore';
import AirportMap from '@/app/components/AirportMap';

interface PageProps {
  params: {
    id: string;
  };
}

export default function AeropuertoDetalle({ params }: PageProps) {
  const { id } = params; 
  const { aeropuertoSeleccionado, seleccionarAeropuerto, aeropuertos } = useAeropuertosStore();
  const router = useRouter();

  // Busca el aeropuerto en la lista
  const airport = aeropuertos.find(a => a.iata_code === id);

  // Actualiza el aeropuerto seleccionado cuando cambia el id
  useEffect(() => {
    if (airport) {
      seleccionarAeropuerto(airport);
    } else {
      console.error(`Aeropuerto con código ${id} no encontrado`);
    }
  }, [id, airport, seleccionarAeropuerto]);

  // Estado de carga
  if (!aeropuertoSeleccionado) {
    return <div className="p-4">Cargando detalles del aeropuerto...</div>;
  }

  // Renderizado principal
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{aeropuertoSeleccionado.airport_name}</h1>
      <div className="mt-4 h-96">
        <AirportMap 
          latitude={aeropuertoSeleccionado.latitude.toString()} 
          longitude={aeropuertoSeleccionado.longitude.toString()} 
        />
      </div>
    </div>
  );
}