'use client';

import { useState, useEffect } from 'react'; // Importa hooks de React para manejar el estado y efectos secundarios
import L from 'leaflet'; // Importa la biblioteca Leaflet para trabajar con mapas
import 'leaflet/dist/leaflet.css'; // Importa los estilos de Leaflet
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // Importa componentes de react-leaflet para interactuar con el mapa

// Configuración del icono personalizado para el marcador del mapa
const DefaultIcon = L.icon({
  iconUrl: '/marker-icon.png', // URL del icono para el marcador
  iconRetinaUrl: '/marker-icon-2x.png', // URL del icono de mayor resolución (para pantallas retina)
  shadowUrl: '/marker-shadow.png', // URL de la sombra del marcador
  iconSize: [25, 41], // Tamaño del icono
  iconAnchor: [12, 41], // Ancla del icono (ubicación de referencia para posicionarlo)
  popupAnchor: [1, -34], // Ancla del popup (ubicación de referencia para el popup)
  shadowSize: [41, 41] // Tamaño de la sombra del marcador
});

export default function AirportMap({ 
  latitude,  // Latitud del aeropuerto (proporcionado como string)
  longitude, // Longitud del aeropuerto (proporcionado como string)
  airportName = '' // Nombre del aeropuerto (opcional)
}: { 
  latitude: string; 
  longitude: string;
  airportName?: string; // Propiedad opcional que es el nombre del aeropuerto
}) {
  const [isLoading, setIsLoading] = useState(true); // Estado para indicar si el mapa está cargando

  // Configura el icono por defecto para el marcador y simula la carga del mapa
  useEffect(() => {
    L.Marker.prototype.options.icon = DefaultIcon; // Establece el icono por defecto en los marcadores de Leaflet
    const timer = setTimeout(() => setIsLoading(false), 100); // Simula una carga de 100ms para el mapa
    return () => clearTimeout(timer); // Limpia el temporizador cuando el componente se desmonta
  }, []); // El hook se ejecuta solo una vez después del primer renderizado

  // Validaciones de carga y coordenadas
  if (isLoading) return <div data-testid="loading-message">Cargando mapa...</div>; // Si está cargando, muestra un mensaje
  if (!latitude || !longitude) return <div>Coordenadas no válidas</div>; // Si las coordenadas no son válidas, muestra un mensaje de error

  const lat = parseFloat(latitude); // Convierte la latitud de string a número
  const lng = parseFloat(longitude); // Convierte la longitud de string a número

  // Renderizado del mapa
  return (
    <div 
      data-testid="map-container" // Atributo de prueba para las pruebas automatizadas
      className="h-[400px] w-full relative z-0" // Clase de Tailwind CSS para dar tamaño y estilo al contenedor
    >
      <MapContainer 
        center={[lat, lng]} // Establece el centro del mapa con las coordenadas del aeropuerto
        zoom={13} // Nivel de zoom del mapa
        style={{ height: '100%', width: '100%' }} // Estilo en línea para asegurar que el mapa ocupa todo el contenedor
      >
        {/* Capa de tiles del mapa usando OpenStreetMap */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // URL de los tiles de OpenStreetMap
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' // Atribución de OpenStreetMap
        />
        {/* Marcador con la ubicación del aeropuerto */}
        <Marker position={[lat, lng]}>
          <Popup>{airportName || 'Ubicación del aeropuerto'}</Popup> {/* El popup muestra el nombre del aeropuerto o un texto por defecto */}
        </Marker>
      </MapContainer>
    </div>
  );
}
