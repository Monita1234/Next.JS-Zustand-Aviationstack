import axios from 'axios'; // Importa axios, una librería para realizar solicitudes HTTP
import { ApiResponse } from '../types'; // Importa el tipo ApiResponse, que define la estructura de la respuesta de la API

// Sustituye esto con tu API key de Aviationstack
const API_KEY = 'c83e7fec4b6d294538df28446374484d'; // Clave de API para acceder a Aviationstack
const BASE_URL = 'http://api.aviationstack.com/v1'; // URL base de la API de Aviationstack

interface FetchParams {
  offset?: number; // Parámetro opcional para definir el punto de inicio de los resultados
  limit?: number; // Parámetro opcional para definir el número máximo de resultados a retornar
  search?: string; // Parámetro opcional para buscar aeropuertos por nombre o código
}

/**
 * Función que obtiene una lista de aeropuertos desde la API de Aviationstack.
 * 
 * @param params - Objeto que puede contener los parámetros `offset`, `limit` y `search`
 * @returns Una promesa que resuelve en la respuesta de la API con los aeropuertos
 */
export const fetchAeropuertos = async (params: FetchParams): Promise<ApiResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}/airports`, {
      params: {
        access_key: API_KEY, // Se pasa la clave de API para autenticar la solicitud
        offset: params.offset || 0, // Se utiliza el valor de `offset` o 0 por defecto si no se proporciona
        limit: params.limit || 10, // Se utiliza el valor de `limit` o 10 por defecto si no se proporciona
        search: params.search || '' // Se utiliza el valor de `search` o una cadena vacía por defecto
      }
    });
    
    return response.data; // Devuelve la data contenida en la respuesta de la API
  } catch (error) {
    console.error('Error fetching airports:', error); // Imprime un error en la consola si la solicitud falla
    throw error; // Lanza el error para que sea manejado en el lugar donde se llama la función
  }
};

/**
 * Función que obtiene los detalles de un aeropuerto específico usando su código.
 * 
 * @param codigo - El código IATA del aeropuerto que se desea consultar
 * @returns Una promesa que resuelve en la respuesta de la API con los detalles del aeropuerto
 */
export const fetchAeropuertoPorCodigo = async (codigo: string): Promise<ApiResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}/airports`, {
      params: {
        access_key: API_KEY, // Se pasa la clave de API para autenticar la solicitud
        search: codigo // Se pasa el código IATA del aeropuerto para obtener sus detalles
      }
    });
    
    return response.data; // Devuelve la data contenida en la respuesta de la API
  } catch (error) {
    console.error('Error fetching airport details:', error); // Imprime un error en la consola si la solicitud falla
    throw error; // Lanza el error para que sea manejado en el lugar donde se llama la función
  }
};
