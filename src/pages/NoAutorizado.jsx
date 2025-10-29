export default function NoAutorizado() {
return (
  <div className="max-w-xl mx-auto mt-20 p-6 bg-red-50 dark:bg-red-900 border-l-4 border-red-600 rounded-lg shadow-md">
    <h1 className="text-2xl font-bold text-red-700 dark:text-red-300 mb-2 flex items-center gap-2">
      🚫 Acceso Denegado
    </h1>
    <p className="text-sm text-gray-700 dark:text-gray-200">
      No tenés permiso para acceder a esta página.
    </p>
  </div>
);}
