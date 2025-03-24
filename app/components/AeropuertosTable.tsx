'use client';

import Link from 'next/link';
import { useAeropuertosStore } from '../store/useAeropuertosStore';
import { FiExternalLink, FiLoader, FiAlertCircle, FiSearch, FiMapPin, FiNavigation } from 'react-icons/fi';
import { FaPlane, FaCloud } from 'react-icons/fa';

export default function AeropuertosCards() {
    const { aeropuertos, cargando, error, busqueda } = useAeropuertosStore();

    const aeropuertosFiltrados = aeropuertos.filter((aeropuerto) => {
        return (
            aeropuerto.airport_name.toLowerCase().includes(busqueda.toLowerCase()) ||
            aeropuerto.iata_code.toLowerCase().includes(busqueda.toLowerCase())
        );
    });
    
    if (cargando) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-white">
                <FiLoader className="animate-spin text-3xl mb-3 text-blue-300" />
                <span>Cargando aeropuertos...</span>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-red-300">
                <FiAlertCircle className="text-3xl mb-3" />
                <span className="text-center max-w-md">{error}</span>
            </div>
        );
    }
    
    if (aeropuertosFiltrados.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-blue-100">
                <FiSearch className="text-3xl mb-3" />
                <span className="text-lg font-medium mb-1">No se encontraron aeropuertos</span>
                <p className="text-sm text-blue-200">Intenta con otro término de búsqueda</p>
            </div>
        );
    }
    
    return (
        <div className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 p-6">
            {/* Elementos decorativos */}
            <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                    <FaCloud 
                        key={i}
                        className="absolute text-white animate-float"
                        style={{
                            fontSize: `${Math.random() * 3 + 2}rem`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${Math.random() * 20 + 10}s`
                        }}
                    />
                ))}
            </div>
            
            {/* Contenedor principal */}
            <div className="relative z-10 max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-8 flex items-center">
                    <FiNavigation className="mr-3" />
                    Directorio de Aeropuertos
                </h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {aeropuertosFiltrados.map((aeropuerto) => (
                        <div 
                            key={aeropuerto.id} 
                            className="relative bg-white/10 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-[1.02]"
                        >
                            {/* Fondo decorativo con efecto de vidrio esmerilado */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-blue-600/10"></div>
                            
                            {/* Icono de avión */}
                            <div className="absolute right-4 top-4 text-white/10">
                                <FaPlane className="w-16 h-16 -rotate-45" />
                            </div>
                            
                            {/* Contenido de la card */}
                            <div className="relative z-10 p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-white truncate pr-2">
                                        {aeropuerto.airport_name}
                                    </h3>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-white/20 text-white backdrop-blur-sm">
                                        {aeropuerto.iata_code}
                                    </span>
                                </div>
                                
                                <div className="flex items-center mb-6 text-blue-100">
                                    <FiMapPin className="mr-2" />
                                    <span>{aeropuerto.city_name}, {aeropuerto.country_name}</span>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="bg-white/5 p-3 rounded-lg">
                                        <p className="text-blue-200 text-xs uppercase font-semibold">Ciudad</p>
                                        <p className="text-white font-medium">{aeropuerto.city_name}</p>
                                    </div>
                                    <div className="bg-white/5 p-3 rounded-lg">
                                        <p className="text-blue-200 text-xs uppercase font-semibold">País</p>
                                        <p className="text-white font-medium">{aeropuerto.country_name}</p>
                                    </div>
                                    <div className="bg-white/5 p-3 rounded-lg">
                                        <p className="text-blue-200 text-xs uppercase font-semibold">Código</p>
                                        <p className="text-white font-mono font-medium">{aeropuerto.iata_code}</p>
                                    </div>
                                    <div className="bg-white/5 p-3 rounded-lg">
                                        <p className="text-blue-200 text-xs uppercase font-semibold">Zona</p>
                                        <p className="text-white font-medium">UTC</p>
                                    </div>
                                </div>
                                
                                <div className="mt-6 pt-4 border-t border-white/10">
                                    <Link 
                                        href={`/aeropuerto/${aeropuerto.iata_code}`}
                                        className="inline-flex items-center justify-center w-full py-2 px-4 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-all duration-300 border border-white/20 hover:border-white/40"
                                    >
                                        Ver detalles
                                        <FiExternalLink className="ml-2" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Footer con contador */}
                <div className="mt-8 text-center text-blue-200">
                    <p className="text-sm">
                        Mostrando <span className="font-bold text-white">{aeropuertosFiltrados.length}</span> de{' '}
                        <span className="font-bold text-white">{aeropuertos.length}</span> aeropuertos
                    </p>
                </div>
            </div>
            
            {/* Estilos para animación de nubes */}
            <style jsx global>{`
                @keyframes float {
                    0% { transform: translateX(0) translateY(0); }
                    50% { transform: translateX(50px) translateY(-20px); }
                    100% { transform: translateX(0) translateY(0); }
                }
                .animate-float {
                    animation: float linear infinite;
                }
            `}</style>
        </div>
    );
}