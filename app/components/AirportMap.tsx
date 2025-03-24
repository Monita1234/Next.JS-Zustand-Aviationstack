'use client';
import { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const DefaultIcon = L.icon({
  iconUrl: '/marker-icon.png',
  iconRetinaUrl: '/marker-icon-2x.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function AirportMap({ 
  latitude,
  longitude,
  airportName = ''
}: { 
  latitude: string; 
  longitude: string;
  airportName?: string;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('General');

  // Datos del aeropuerto
  const airportData = {
    generalInfo: [
      "Ubizsalsin",
      "Zems Mensib",
      "Ecrudenskas"
    ],
    technicalDetails: {
      iataCode: "AAA",
      icaoCode: "NTGA",
      country: "French Polynesia (PF)",
      city: "Anaa",
      phone: "No disponible",
      timezone: "UTC-10:00 (TAHT - Tahiti Time)",
      runwayLength: "1,200 m",
      operatingHours: "06:00 - 22:00 (Horario Local)"
    },
    statistics: {
      annualPassengers: "15,000",
      annualOperations: "1,200",
      airlines: "2"
    }
  };

  useEffect(() => {
    L.Marker.prototype.options.icon = DefaultIcon;
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <div className="p-4 text-gray-600">Cargando información del aeropuerto...</div>;
  if (!latitude || !longitude) return <div className="p-4 text-red-500">Coordenadas no válidas</div>;

  const lat = parseFloat(latitude);
  const lng = parseFloat(longitude);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Tarjeta principal */}
        <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl shadow-xl overflow-hidden">
          {/* Encabezado */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
            <h1 className="text-2xl font-bold text-white">{airportName || 'Aeropuerto'}</h1>
            <p className="text-blue-100 opacity-90">Información detallada del aeropuerto</p>
          </div>

          {/* Pestañas */}
          <div className="flex border-b border-blue-300">
            {['General', 'Ubicación', 'Zona Horaria', 'Operaciones'].map((tab) => (
              <button
                key={tab}
                className={`px-6 py-3 font-medium text-sm uppercase tracking-wider transition-colors duration-200 
                  ${activeTab === tab 
                    ? 'text-white bg-blue-500/90' 
                    : 'text-blue-800 hover:bg-blue-400/30'}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Contenido */}
          <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
            {activeTab === 'General' && (
              <div className="grid md:grid-cols-2 gap-6">
                {/* Información General */}
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-blue-200">
                  <h2 className="text-xl font-semibold text-blue-800 mb-4 border-b border-blue-200 pb-2">
                    Información General
                  </h2>
                  <ul className="space-y-3">
                    {airportData.generalInfo.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Detalles Técnicos */}
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-blue-200">
                  <h2 className="text-xl font-semibold text-blue-800 mb-4 border-b border-blue-200 pb-2">
                    Detalles Técnicos
                  </h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-blue-600 font-medium">Código IATA</p>
                        <p className="text-lg font-bold text-blue-800">{airportData.technicalDetails.iataCode}</p>
                      </div>
                      <div>
                        <p className="text-sm text-blue-600 font-medium">Código ICAO</p>
                        <p className="text-lg font-bold text-blue-800">{airportData.technicalDetails.icaoCode}</p>
                      </div>
                      <div>
                        <p className="text-sm text-blue-600 font-medium">País</p>
                        <p className="text-lg font-bold text-blue-800">{airportData.technicalDetails.country}</p>
                      </div>
                      <div>
                        <p className="text-sm text-blue-600 font-medium">Ciudad</p>
                        <p className="text-lg font-bold text-blue-800">{airportData.technicalDetails.city}</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-blue-200">
                      <p className="text-sm text-blue-600 font-medium">Longitud de pista</p>
                      <p className="text-lg font-bold text-blue-800">{airportData.technicalDetails.runwayLength}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Ubicación' && (
              <div className="bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-sm border border-blue-200">
                <div className="h-[500px]">
                  <MapContainer 
                    center={[lat, lng]} 
                    zoom={13}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; OpenStreetMap contributors'
                    />
                    <Marker position={[lat, lng]}>
                      <Popup className="font-medium">{airportName || 'Ubicación del aeropuerto'}</Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>
            )}

            {activeTab === 'Zona Horaria' && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-blue-200">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <span className="text-blue-600 text-xl">🕒</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-blue-800 mb-2">Zona Horaria</h3>
                      <p className="text-2xl font-bold text-blue-700">{airportData.technicalDetails.timezone}</p>
                      <p className="text-sm text-blue-500 mt-2">Huso horario oficial</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-blue-200">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <span className="text-blue-600 text-xl">✈️</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-blue-800 mb-2">Horario de Operación</h3>
                      <p className="text-2xl font-bold text-blue-700">{airportData.technicalDetails.operatingHours}</p>
                      <p className="text-sm text-blue-500 mt-2">Horario local</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Operaciones' && (
              <div className="grid md:grid-cols-3 gap-5">
                {[
                  { 
                    title: "Pasajeros", 
                    value: airportData.statistics.annualPassengers, 
                    description: "Anuales",
                    icon: "👥"
                  },
                  { 
                    title: "Operaciones", 
                    value: airportData.statistics.annualOperations, 
                    description: "Anuales",
                    icon: "🛫"
                  },
                  { 
                    title: "Aerolíneas", 
                    value: airportData.statistics.airlines, 
                    description: "Registradas",
                    icon: "✈️"
                  }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-blue-200"
                  >
                    <div className="flex items-center mb-4">
                      <div className="text-2xl mr-3">{item.icon}</div>
                      <h3 className="text-xl font-semibold text-blue-800">{item.title}</h3>
                    </div>
                    <p className="text-3xl font-bold text-blue-700 mb-2">{item.value}</p>
                    <p className="text-sm text-blue-500">{item.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}