'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Página no encontrada
          </h2>
          <p className="text-xl text-gray-300">
            La página que buscas no existe. Por favor, vuelve al inicio.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-gray-400">
            La URL <code className="bg-slate-800 px-3 py-1 rounded text-blue-400 text-sm">{typeof window !== 'undefined' ? window.location.pathname : ''}</code> no existe.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all"
        >
          <ArrowLeft className="mr-2" size={20} />
          Volver al inicio
        </Link>

        <div className="pt-8 border-t border-slate-700">
          <p className="text-gray-400 mb-4">Rutas disponibles:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Link href="/#home" className="text-blue-400 hover:text-blue-300 transition-colors">
              → Inicio
            </Link>
            <Link href="/#projects" className="text-blue-400 hover:text-blue-300 transition-colors">
              → Proyectos
            </Link>
            <Link href="/#about" className="text-blue-400 hover:text-blue-300 transition-colors">
              → Sobre mí
            </Link>
            <Link href="/#contact" className="text-blue-400 hover:text-blue-300 transition-colors">
              → Contacto
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
