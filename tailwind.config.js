// 📁 tailwind.config.js

export default {
  // ✅ Activar modo oscuro por clase (ej. <body class="dark">)
  darkMode: 'class',

  // ✅ Rutas donde Tailwind debe buscar clases usadas
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      // 🎨 Tipografía institucional
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },

      // 🎨 Colores extendidos para identidad visual
      colors: {
        institucional: {
          azul: '#1E3A8A',      // Azul institucional
          celeste: '#60A5FA',   // Celeste claro
          grisOscuro: '#1F2937', // Fondo modo oscuro
        },
      },

      // ✨ Animaciones personalizadas
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },

      // 📐 Espaciado adicional si lo necesitás
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
    },
  },

  // 🧩 Plugins opcionales (formulario, tipografía, etc.)
  plugins: [
    require('@tailwindcss/forms'),       // Mejora formularios
    require('@tailwindcss/typography'),  // Mejora textos largos
  ],
};