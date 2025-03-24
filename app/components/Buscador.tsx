// Indicamos que este componente se renderiza en el cliente
'use client';

import { useState } from 'react'; // Importamos el hook `useState` de React para gestionar el estado local del componente
import { useAeropuertosStore } from '../store/useAeropuertosStore'; // Importamos un hook personalizado para acceder al estado global relacionado con los aeropuertos

// Componente Buscador que permite buscar aeropuertos por nombre o código
export default function Buscador() {
  // Estado local para almacenar el término de búsqueda que el usuario introduce
  const [termino, setTermino] = useState('');

  // Usamos el hook `useAeropuertosStore` para obtener las funciones y el historial de búsqueda global
  const { buscarAeropuertos, historialBusqueda } = useAeropuertosStore();

  // Función que se ejecuta cuando el formulario es enviado
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Previene el comportamiento predeterminado de recargar la página al enviar el formulario
    buscarAeropuertos(termino); // Llama a la función `buscarAeropuertos` con el término ingresado
  };

  // Renderizamos el formulario y las búsquedas previas
  return (
    <div className="mb-6">
      {/* Formulario de búsqueda */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        {/* Campo de entrada de texto donde el usuario escribe el término de búsqueda */}
        <input
          type="text"
          value={termino} // El valor del input es el término actual de búsqueda
          onChange={(e) => setTermino(e.target.value)} // Actualizamos el término cuando el usuario escribe
          placeholder="Buscar por nombre o código" // Texto que aparece cuando el campo está vacío
          className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        {/* Botón de envío del formulario */}
        <button 
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Buscar
        </button>
      </form>

      {/* Si hay historial de búsquedas, lo mostramos */}
      {historialBusqueda.length > 0 && (
        <div className="mt-2">
          <p className="text-sm text-gray-600">Búsquedas recientes:</p>
          {/* Mostramos cada búsqueda en un botón */}
          <div className="flex flex-wrap gap-2 mt-1">
            {historialBusqueda.map((busqueda, index) => (
              <button
                key={index} // Usamos el índice como clave única para cada botón
                onClick={() => {
                  setTermino(busqueda); // Al hacer clic, se actualiza el término con la búsqueda seleccionada
                  buscarAeropuertos(busqueda); // Realiza la búsqueda con el término seleccionado
                }}
                className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded transition-colors"
              >
                {busqueda} {/* Mostramos el nombre o código de la búsqueda */}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
