import { Link } from 'react-router-dom';
import { AcademicCapIcon, ChartBarIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/solid';
import Footer from '../components/Footer'; // ajustá la ruta según tu estructura

const Home = ({ rolUsuario }) => {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12 mt-12 bg-white rounded-3xl shadow-xl border-t-4 border-blue-600">
      
      {/* Encabezado institucional */}
      <section
        className="relative bg-blue-900 text-white py-20 px-6 overflow-hidden"
        style={{
          backgroundImage: 'url("https://media.ambito.com/p/80d040be8f6a9a2799820cc322686d16/adjuntos/239/imagenes/040/896/0040896175/urna_02_elecciones_argentina_pais-1jpg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backdropFilter: 'blur(2px)',
        }}
      >
        <div className="relative z-10 text-center max-w-3xl mx-auto">
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

        {/* Capa de oscurecimiento para mejorar contraste */}
        <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
      </section>

      {/* Zócalo institucional con descripción pedagógica */}
      <section className="relative bg-blue-50 dark:bg-gray-800 border-t-4 border-blue-600 dark:border-blue-400 py-10 px-6 text-center shadow-inner">
        <p className="text-gray-700 dark:text-gray-200 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto">
          Esta plataforma forma parte de una propuesta académica orientada a fortalecer la trazabilidad institucional y el análisis pedagógico del proceso electoral en Catamarca. Integra los resultados oficiales provistos por la API Nacional del Ministerio del Interior con la gestión local de mesas testigo, permitiendo el monitoreo en tiempo real de la participación ciudadana. Su diseño promueve buenas prácticas en visualización de datos, transparencia democrática y formación cívica.
        </p>

        {/* Separador visual */}
        <div className="mt-8 flex justify-center">
          <span className="inline-block h-1 w-24 rounded bg-blue-600 dark:bg-blue-400"></span>
        </div>
      </section>

      {/* Botones de navegación con ícono externo */}
      <section className="flex flex-col md:flex-row justify-center items-center gap-6 py-10 bg-white dark:bg-gray-900 transition-colors">
        {/* Siempre visible para cualquier rol */}
        <Link
          to="/nacional"
          className="flex items-center gap-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-full shadow-lg transition-transform duration-300 hover:scale-105"
        >
          <img
            src="https://static.vecteezy.com/system/resources/previews/059/253/716/non_2x/3d-render-of-data-analysis-icon-charts-graphs-and-magnifying-glass-free-png.png"
            alt="Ícono de análisis de datos"
            className="w-7 h-15 object-contain"
            loading="lazy"
          />
          <span>Resumen Nacional (API)</span>
        </Link>

        {/* Solo visible para rol delegado */}
        {rolUsuario === 'delegado' && (
          <Link
            to="/items"
            className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-full shadow-lg transition-transform duration-300 hover:scale-105"
          >
            <ClipboardDocumentCheckIcon className="w-6 h-6 text-white" />
            <span>Control de Mesas (CRUD)</span>
          </Link>
        )}
      </section>
         <Footer />
    </main>
  );
};

export default Home;
