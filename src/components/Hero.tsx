'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section id="home" className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-purple-400 text-lg">Bienvenido a mi portafolio</p>
              <h1 className="text-5xl md:text-6xl font-bold text-white">
                Desarrollador
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200/70 to-purple-600"> Full Stack</span>
              </h1>
              <p className="text-xl text-gray-300">
                Mi nombre es <strong>Alexander</strong>, apasionado por crear aplicaciones web modernas y funcionales.
                Con  experiencia en React, Next.js y distintas tecnologías web actuales.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#projects"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-purple-600 text-white font-semibold hover:shadow-lg hover:-translate-y-2 hover:shadow-purple-500/20 transition-all"
              >
                Redes Sociales
                <ArrowRight className="ml-2" size={20} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-gray-600 text-white font-semibold hover:border-white transition-colors"
              >
                Contactar
              </a>
            </div>
          </div>

          <div className="flex sm:flex sm:justify-start md:items-center md:items-left sm:ml-5 align-items justify-center">
            <div className="relative bg-slate-800 rounded-2xl p-4 md:p-8 border border-slate-600 flex items-center justify-center w-64 md:w-80 lg:w-96 h-64 md:h-80 lg:h-96 transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50">
              <Image
                src="/logov.jpg"
                alt="Logo V"
                width={300}
                height={300}
                className="w-48 md:w-56 lg:w-64 h-48 md:h-56 lg:h-64 rounded-2xl transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
