'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-slate-700 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Volitancrooss - Portfolio</h3>
            <p className="text-gray-400">Un desarrollador apasionado por crear soluciones web modernas.</p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">Enlaces</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Proyectos
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  Sobre mí
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">Tecnologías</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Next.js & React</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
              <li>Node.js</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8">
          <p className="text-center text-gray-400">
            © {currentYear} Mi Portfolio. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
