'use client';

import { Mail, Github, Instagram, Youtube } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Contacto</h2>
          <p className="text-gray-300 text-lg">¿Tienes un proyecto en mente? Me encantaría hablar contigo</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-2">Nombre</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                placeholder="Tu nombre"
                required
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                placeholder="volitancrooss@gmail.com"
                required
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Mensaje</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                placeholder="Tu mensaje"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all"
            >
              Enviar Mensaje
            </button>
          </form>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-slate-700/50 rounded-lg p-8 border border-slate-600">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Mail className="text-purple-400" size={24} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-white font-semibold">volitancrooss@gmail.com</p>
                </div>
              </div>

              <p className="text-gray-300 mb-8">
                Estoy disponible para nuevos proyectos y colaboraciones. No dudes en ponerte en contacto.
              </p>

              <div className="space-y-3">
                <p className="text-white font-semibold mb-4">Sígueme en redes</p>
                <div className="flex gap-4">
                  <a href="#" className="p-3 bg-slate-600 rounded-lg hover:bg-purple-600 transition-colors">
                    <Github className="text-white" size={20} />
                  </a>
                  <a href="#" className="p-3 bg-slate-600 rounded-lg hover:bg-purple-600 transition-colors">
                    <Instagram className="text-white" size={20} />
                  </a>
                  <a href="#" className="p-3 bg-slate-600 rounded-lg hover:bg-purple-600 transition-colors">
                    <Youtube className="text-white" size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
