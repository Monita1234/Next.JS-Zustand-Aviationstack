import { create } from 'zustand'; // Importa la función `create` de Zustand para crear el store
import { fetchAeropuertos } from '../services/aviationstack'; // Importa la función para obtener aeropuertos desde la API
import { Aeropuerto, ApiResponse } from '../types'; // Importa los tipos Aeropuerto y ApiResponse

// Define la estructura del estado que almacenará el store de los aeropuertos
interface AeropuertosState {
  aeropuertos: Aeropuerto[]; // Lista de aeropuertos cargados
  aeropuertoSeleccionado: Aeropuerto | null; // El aeropuerto seleccionado
  busqueda: string; // Término de búsqueda actual
  historialBusqueda: string[]; // Historial de términos de búsqueda
  cargando: boolean; // Indicador de carga
  error: string | null; // Mensaje de error si ocurre algún problema
  paginacion: { // Datos relacionados con la paginación
    pagina: number; // Página actual
    total: number; // Total de resultados
    porPagina: number; // Número de resultados por página
  };
  darkMode: boolean; // Indicador de si el modo oscuro está activado o no
  
  // Acciones disponibles en el store
  cargarAeropuertos: (pagina?: number) => Promise<void>; // Acción para cargar los aeropuertos desde la API
  buscarAeropuertos: (termino: string) => Promise<void>; // Acción para buscar aeropuertos por término
  seleccionarAeropuerto: (aeropuerto: Aeropuerto) => void; // Acción para seleccionar un aeropuerto
  toggleDarkMode: () => void; // Acción para alternar entre modo claro y oscuro
}

// Crea el store usando Zustand
export const useAeropuertosStore = create<AeropuertosState>((set, get) => ({
  // Estado inicial
  aeropuertos: [], // Lista vacía de aeropuertos
  aeropuertoSeleccionado: null, // Ningún aeropuerto seleccionado inicialmente
  busqueda: '', // Sin término de búsqueda inicialmente
  historialBusqueda: [], // Historial de búsqueda vacío
  cargando: false, // No está cargando inicialmente
  error: null, // No hay errores inicialmente
  paginacion: {
    pagina: 1, // Página inicial es la 1
    total: 0, // Total de aeropuertos es 0 inicialmente
    porPagina: 10 // Se cargan 10 aeropuertos por página
  },
  darkMode: false, // El modo oscuro está desactivado inicialmente

  // Acción para cargar los aeropuertos desde la API
  cargarAeropuertos: async (pagina = 1) => {
    set({ cargando: true, error: null }); // Establece que se está cargando y no hay errores
    try {
      // Calcula el offset para la paginación
      const offset = (pagina - 1) * get().paginacion.porPagina;
      // Llama a la función fetchAeropuertos para obtener los aeropuertos
      const respuesta: ApiResponse = await fetchAeropuertos({
        offset,
        limit: get().paginacion.porPagina, // Límite de aeropuertos por página
        search: get().busqueda, // Pasa el término de búsqueda actual
      });
      
      // Actualiza el estado con los aeropuertos obtenidos y la información de paginación
      set({
        aeropuertos: respuesta.data, // Asigna los aeropuertos a la propiedad
        paginacion: {
          ...get().paginacion,
          pagina, // Establece la página actual
          total: respuesta.pagination.total // Total de aeropuertos disponibles
        },
        cargando: false // Deja de cargar
      });
    } catch (error) {
      set({ error: 'Error al cargar aeropuertos', cargando: false }); // Si ocurre un error, lo maneja
      console.error(error); // Imprime el error en la consola
    }
  },

  // Acción para buscar aeropuertos
  buscarAeropuertos: async (termino: string) => {
    // Actualiza el término de búsqueda y el historial de búsquedas
    set({
      busqueda: termino,
      historialBusqueda: termino ? 
        [termino, ...get().historialBusqueda.filter(item => item !== termino).slice(0, 4)] : 
        get().historialBusqueda
    });
    
    // Carga los aeropuertos según el término de búsqueda
    await get().cargarAeropuertos(1); // Pasa 1 para cargar desde la primera página
  },

  // Acción para seleccionar un aeropuerto
  seleccionarAeropuerto: (aeropuerto: Aeropuerto) => {
    set({ aeropuertoSeleccionado: aeropuerto }); // Actualiza el aeropuerto seleccionado en el estado
  },

  // Acción para alternar el modo oscuro
  toggleDarkMode: () => {
    set({ darkMode: !get().darkMode }); // Alterna entre modo claro y oscuro
  }
}));
