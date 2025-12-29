'use client';

import { socials } from '@/data/data';
import { ExternalLink, Github } from 'lucide-react';

export default function Socials() {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Social Media</h2>
          <p className="text-gray-300 text-lg">Algunas de mis redes sociales más relevantes de ámbito Personal.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {socials.map((social) => (
            <div
              key={social.id}
              className="bg-slate-700/50 rounded-lg overflow-hidden border border-slate-600 hover:border-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/20 group"
            >
              <div className="h-48 bg-gradient-to-br from-slate-100/10 to-purple-500/90 flex items-center justify-center overflow-hidden">
                <img src={social.image} alt={social.title} className="object-cover w-15 h-15 transition-transform duration-300 group-hover:scale-150"/>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{social.title}</h3>
                <p className="text-gray-300 mb-4 line-clamp-2">{social.description}</p>

                

                <div className="flex gap-4">
                  <a
                    href={social.link}
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <ExternalLink size={18} />
                    <span>Link</span>
                  </a>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
