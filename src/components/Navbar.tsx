'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Inicio', href: '#home' },
    { name: 'Proyectos', href: '#projects' },
    { name: 'Sobre mí', href: '#about' },
    { name: 'Contacto', href: '#contact' },
  ];

  return (
    <nav className="fixed w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-700 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-200">
              Volitancrooss
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-baseline space-x-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3 ml-4">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-semibold text-white border border-neutral-600 rounded-lg hover:bg-neutral-800 hover:border-neutral-500 transition-all duration-200"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-500 hover:to-purple-500 transition-all duration-200 shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_20px_rgba(99,102,241,0.5)]"
              >
                Registrarse
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  {item.name}
                </a>
              ))}

              {/* Mobile Auth Buttons */}
              <div className="pt-2 space-y-2">
                <Link
                  href="/login"
                  className="block w-full text-center px-4 py-2 text-sm font-semibold text-white border border-neutral-600 rounded-lg hover:bg-neutral-800 transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="block w-full text-center px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-500 hover:to-purple-500 transition-all duration-200 shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                >
                  Registrarse
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
