"use client";

import { useEffect, useState } from 'react';
import { useAeropuertosStore } from './store/useAeropuertosStore';
import AeropuertosTable from './components/AeropuertosTable';
import Paginacion from './components/Paginacion';
import Buscador from './components/Buscador';

export default function Home() {
  const { cargarAeropuertos, aeropuertos, cargando, paginacion } = useAeropuertosStore();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    cargarAeropuertos(page, search);
  }, [page, search]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Listado de Aeropuertos</h1>
      <Buscador setSearch={setSearch} />
      <AeropuertosTable aeropuertos={aeropuertos} cargando={cargando} />
      <Paginacion 
        paginaActual={paginacion.pagina} 
        totalPaginas={Math.ceil(paginacion.total / paginacion.porPagina)} 
        onPaginaChange={setPage} 
      />
    </div>
  );
}