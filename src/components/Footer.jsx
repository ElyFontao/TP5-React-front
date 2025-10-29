// 📁 src/components/Footer.jsx

// ✅ Componente institucional Footer
// Representa el pie de página del sistema electoral, con trazabilidad académica, modo oscuro y metadatos de despliegue.

const Footer = () => {
  // 📅 Fecha de despliegue y versión del sistema
  const fechaDespliegue = '29/10/2025';
  const versionSistema = 'v1.0.0';

  return (
    <footer
      className="bg-blue-900 dark:bg-gray-900 text-white py-6 px-4 text-center border-t-4 border-blue-600 dark:border-blue-400"
      aria-label="Pie de página institucional"
    >
      {/* 🧭 Mensaje institucional principal */}
      <p className="text-sm sm:text-base font-medium tracking-wide">
        Sistema Electoral Catamarca · Proyecto académico para trazabilidad democrática.
      </p>

      {/* 🎓 Créditos académicos */}
      <p className="mt-2 text-xs text-blue-200 dark:text-gray-400">
        Diplomatura Universitaria Full Stack · UNCa · NODO 2025
      </p>

      {/* 📅 Metadatos de despliegue */}
      <p className="mt-2 text-xs text-blue-300 dark:text-gray-500 italic">
        Desplegado el {fechaDespliegue} · Versión {versionSistema}
      </p>
    </footer>
  );
};

// ✅ Exportación del componente
export default Footer;
