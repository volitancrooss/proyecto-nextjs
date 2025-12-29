import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Projects from '@/components/Socials';

export default function Home() {
  return (
    <div className="bg-slate-900 min-h-screen text-white">
      <Navbar />
      <main className="w-full">
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
