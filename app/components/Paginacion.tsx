'use client';

import { useAeropuertosStore } from '../store/useAeropuertosStore'; // Importa el hook customizado para acceder al estado de los aeropuertos desde el store

export default function Paginacion() {
  const { paginacion, cargarAeropuertos } = useAeropuertosStore(); // Accede al estado de paginación y a la función de carga de aeropuertos desde el store
  const { pagina, total, porPagina } = paginacion; // Desestructura los valores de la paginación del estado (número de página actual, total de resultados y cantidad de resultados por página)
  
  const totalPaginas = Math.ceil(total / porPagina); // Calcula el número total de páginas basado en el total de resultados y la cantidad de resultados por página
  
  if (totalPaginas <= 1) return null; // Si hay una sola página o ninguna, no se muestra el componente de paginación
  
  return (
    <div className="flex justify-center mt-6"> {/* Contenedor centrado para la paginación */}
      <div className="flex items-center gap-2"> {/* Contenedor de los botones de paginación */}
        
        {/* Botón para retroceder a la página anterior */}
        <button
          onClick={() => cargarAeropuertos(pagina - 1)} // Dispara la función cargarAeropuertos con la página anterior
          disabled={pagina === 1} // Deshabilita el botón si ya estamos en la primera página
          className={`px-3 py-1 rounded ${
            pagina === 1 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' // Estilo para cuando el botón está deshabilitado
              : 'bg-blue-500 text-white hover:bg-blue-600' // Estilo normal para el botón
          } transition-colors`} // Clase de transición para el cambio de colores en hover
        >
          Anterior
        </button>
        
        {/* Texto que muestra la página actual y el total de páginas */}
        <span className="px-3 py-1">
          Página {pagina} de {totalPaginas}
        </span>
        
        {/* Botón para avanzar a la página siguiente */}
        <button
          onClick={() => cargarAeropuertos(pagina + 1)} // Dispara la función cargarAeropuertos con la página siguiente
          disabled={pagina === totalPaginas} // Deshabilita el botón si ya estamos en la última página
          className={`px-3 py-1 rounded ${
            pagina === totalPaginas 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' // Estilo para cuando el botón está deshabilitado
              : 'bg-blue-500 text-white hover:bg-blue-600' // Estilo normal para el botón
          } transition-colors`} // Clase de transición para el cambio de colores en hover
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
