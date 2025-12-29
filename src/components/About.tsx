'use client';

import { skills, experience } from '@/data/data';

export default function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Sobre mí</h2>
            <p className="text-gray-300 mb-4 text-lg">
              Soy un desarrollador apasionado por la programación web y las nuevas tecnologías.
              Me encanta aprender, resolver problemas y crear soluciones elegantes y funcionales.
            </p>
            <p className="text-gray-300 mb-6 text-lg">
              Tengo experiencia trabajando con tecnologías modernas como React, Next.js, TypeScript
              y Tailwind CSS. Siempre busco mejorar mis habilidades y estar al día con las últimas tendencias.
            </p>
            <p className="text-gray-300 text-lg">
              Cuando no estoy programando, me gusta explorar nuevos frameworks, contribuir a proyectos open source
              y compartir conocimiento con la comunidad.
            </p>
          </div>

          <div className="space-y-8">
            {skills.map((skillGroup) => (
              <div key={skillGroup.category}>
                <h3 className="text-2xl font-bold text-white mb-4">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-3">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-blue-300 rounded-lg border border-blue-400/30 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className='mt-12 border-slate-700 pt-12'>
            <h3 className='text-3xl font-bold text-white mb-8'>Experiencia Laboral</h3>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-purple-500 pl-4">
                  <h4 className="text-xl font-bold text-white">{exp.position}</h4>
                  <p className="text-gray-300">{exp.company} - {exp.period}</p>
                  <p className="text-gray-400 mt-2">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
