// Indicamos que este componente se renderiza en el cliente
'use client';

import Link from 'next/link'; // Importa el componente `Link` de Next.js para la navegación entre páginas
import { useAeropuertosStore } from '../store/useAeropuertosStore'; // Importa el hook personalizado `useAeropuertosStore` para acceder al estado global de los aeropuertos
import Paginacion from './Paginacion'; // Importa un componente de paginación (aunque no se usa directamente en este fragmento)

export default function AeropuertosTable() {
    // Obtiene el estado de la tienda global (store) usando el hook `useAeropuertosStore`
    const { aeropuertos, cargando, error, busqueda } = useAeropuertosStore();

    // Filtra la lista de aeropuertos según el término de búsqueda
    const aeropuertosFiltrados = aeropuertos.filter((aeropuerto) => {
      return (
        aeropuerto.airport_name.toLowerCase().includes(busqueda.toLowerCase()) || // Filtra por nombre de aeropuerto
        aeropuerto.iata_code.toLowerCase().includes(busqueda.toLowerCase()) // O filtra por código IATA
      );
    });
    
    // Si los datos están cargando, se muestra un mensaje de carga
    if (cargando) {
      return <div className="text-center py-10 text-gray-600">Cargando aeropuertos...</div>;
    }
    
    // Si ocurrió un error al obtener los aeropuertos, se muestra el mensaje de error
    if (error) {
      return <div className="text-center py-10 text-red-500">{error}</div>;
    }
    
    // Si no se encuentran aeropuertos después de aplicar el filtro, se muestra un mensaje indicando que no hay resultados
    if (aeropuertosFiltrados.length === 0) {
      return <div className="text-center py-10 text-gray-600">No se encontraron aeropuertos</div>;
    }
    
    // Renderiza la tabla de aeropuertos filtrados
    return (
      <div className="overflow-x-auto bg-gray-50 p-4 rounded-lg shadow-md">
        {/* Contenedor de la tabla con clases de Tailwind CSS para estilo */}
        <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
          {/* Encabezado de la tabla */}
          <thead className="bg-blue-100">
            <tr>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">Nombre</th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">Código IATA</th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">Ciudad</th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">País</th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {/* Mapea los aeropuertos filtrados y renderiza una fila por cada uno */}
            {aeropuertosFiltrados.map((aeropuerto) => (
              <tr key={aeropuerto.id} className="hover:bg-blue-50 transition-colors ease-in-out duration-300">
                {/* Celdas de la tabla con la información de cada aeropuerto */}
                <td className="py-3 px-4 text-gray-800">{aeropuerto.airport_name}</td>
                <td className="py-3 px-4 text-gray-800">{aeropuerto.iata_code}</td>
                <td className="py-3 px-4 text-gray-800">{aeropuerto.city_name}</td>
                <td className="py-3 px-4 text-gray-800">{aeropuerto.country_name}</td>
                <td className="py-3 px-4">
                  {/* Enlace para ver los detalles del aeropuerto */}
                  <Link 
                    href={`/aeropuerto/${aeropuerto.iata_code}`}
                    className="text-blue-600 hover:text-blue-800 transition-colors ease-in-out duration-300"
                  >
                    Ver detalles
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
