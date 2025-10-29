// Importación de librerías y componentes institucionales
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ClipboardDocumentCheckIcon } from '@heroicons/react/24/solid';
import Footer from '../components/Footer';

// Librería de animaciones al hacer scroll
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = ({ rolUsuario }) => {
  // Inicialización de AOS para animaciones suaves y accesibles
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }, []);

  return (
    // Contenedor principal con fondo blanco y modo oscuro
    <main className="max-w-5xl mx-auto px-6 py-12 mt-12 bg-white dark:bg-gray-900 rounded-3xl shadow-xl border-t-4 border-blue-600 dark:border-blue-400 space-y-12">

      {/* 🏛️ Encabezado institucional con imagen simbólica y capa oscura */}
      <section
        className="relative text-white py-20 px-6 overflow-hidden"
        style={{
          backgroundImage: 'url("https://media.ambito.com/p/80d040be8f6a9a2799820cc322686d16/adjuntos/239/imagenes/040/896/0040896175/urna_02_elecciones_argentina_pais-1jpg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Capa de oscurecimiento para mejorar contraste y legibilidad */}
        <div className="absolute inset-0 bg-black/60 backdrop-brightness-90 z-0"></div>

        {/* Contenido institucional con animación de entrada */}
        <div className="relative z-10 text-center max-w-3xl mx-auto" data-aos="fade-down">
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-tight mb-4">
            Sistema Electoral Catamarca
          </h1>
          <p className="text-lg sm:text-xl font-medium tracking-wide text-blue-100">
            Plataforma de monitoreo, participación y trazabilidad democrática.
          </p>
          <div className="mt-4 flex justify-center">
            <span className="inline-block h-1 w-24 rounded bg-yellow-400"></span>
          </div>
        </div>
      </section>

      {/* 🧠 Zócalo institucional con descripción pedagógica */}
      <section
        className="relative bg-blue-50 dark:bg-gray-800 border-t-4 border-blue-600 dark:border-blue-400 py-10 px-6 text-center shadow-inner"
        data-aos="fade-up"
      >
        <p className="text-gray-700 dark:text-gray-200 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto">
          Esta plataforma forma parte de una propuesta académica orientada a fortalecer la trazabilidad y el análisis del proceso electoral en Catamarca. Integra los resultados oficiales provistos por la API Nacional del Ministerio del Interior con la gestión local de mesas testigo, permitiendo el monitoreo en tiempo real de la participación ciudadana. Su diseño promueve buenas prácticas en visualización de datos.
        </p>
        {/* Separador visual para reforzar jerarquía */}
        <div className="mt-8 flex justify-center">
          <span className="inline-block h-1 w-24 rounded bg-blue-600 dark:bg-blue-400"></span>
        </div>
      </section>

      {/* 🧭 Navegación principal con botones animados y condicionales */}
      <section
        className="flex flex-col md:flex-row justify-center items-center gap-6 py-10 bg-white dark:bg-gray-900 transition-colors"
        data-aos="zoom-in"
      >
  {/* 🌐 Botón institucional para acceso al resumen nacional */}
<Link
  to="/nacional"
  className="group flex items-center justify-between gap-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-4 px-6 rounded-xl shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-700"
  aria-label="Ir al resumen nacional de resultados"
>
  <div className="flex items-center gap-3">
    <img
      src="https://static.vecteezy.com/system/resources/previews/059/253/716/non_2x/3d-render-of-data-analysis-icon-charts-graphs-and-magnifying-glass-free-png.png"
      alt="Ícono de análisis de datos"
      className="w-8 h-8 object-contain transition-transform group-hover:scale-110"
      loading="lazy"
    />
    <div className="text-left">
      <p className="text-base leading-tight">Resumen Nacional</p>
      <p className="text-xs opacity-80">Visualización API de resultados totales</p>
    </div>
  </div>
  <span className="text-xl font-bold group-hover:translate-x-1 transition-transform">→</span>
</Link>

        {/* Botón exclusivo para delegados: acceso al CRUD de mesas */}
       {rolUsuario === 'delegado' && (
  <Link
    to="/items"
    className="group flex items-center justify-between gap-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold py-4 px-6 rounded-xl shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-700"
    aria-label="Ir al panel de control de mesas"
  >
    <div className="flex items-center gap-3">
      <ClipboardDocumentCheckIcon className="w-6 h-6 text-white transition-transform group-hover:scale-110" />
      <div className="text-left">
        <p className="text-base leading-tight">Control de Mesas</p>
        <p className="text-xs opacity-80">Registrar, editar y revisar resultados</p>
      </div>
    </div>
    <span className="text-xl font-bold group-hover:translate-x-1 transition-transform">→</span>
  </Link>
)}
      </section>

      {/* Pie institucional con enlaces y créditos */}
      <Footer />
    </main>
  );
};

export default Home;
