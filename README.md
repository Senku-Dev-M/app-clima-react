# Panel de Control del Clima en React

## Descripción general

Esta versión del "Panel de Control del Clima" evoluciona la práctica de la Semana 3 hacia una aplicación de página única (SPA). La interfaz permite buscar ciudades, consultar información meteorológica detallada y alternar entre temas claro y oscuro desde cualquier sección del sitio.

## Características principales

- **Búsqueda interactiva**: Consulta el clima actual de cualquier ciudad utilizando la API pública de OpenWeatherMap.
- **Rutas dinámicas**: Navega entre Inicio, Detalles del pronóstico (`/forecast/:city`) y Acerca de, con un layout y barra de navegación compartidos.
- **Tema global**: El modo claro/oscuro se gestiona con un `ThemeContext`, disponible en todas las rutas.
- **Hook personalizado**: La obtención de datos se realiza mediante el hook `useFetch`, que retorna `{ data, isLoading, error }` para simplificar el manejo de estados de red.
- **Lazy loading**: La página "Acerca de" se carga bajo demanda para optimizar el rendimiento.

## Estructura de enrutamiento

```text
/
├── (layout) AppLayout
│   ├── /                 → Home: búsqueda y vista rápida del clima
│   ├── /forecast/:city   → ForecastDetails: detalles extendidos para la ciudad seleccionada
│   └── /about            → About (carga diferida)
└── *                     → Redirección al inicio
```

La barra de navegación y el selector de tema forman parte del `AppLayout`, que utiliza `<Outlet />` para renderizar las rutas anidadas.

## Gestión de estado y hooks

- **ThemeContext**: expone `theme` y `toggleTheme`, permitiendo alternar el modo claro/oscuro desde cualquier página.
- **useFetch(url)**: ejecuta la solicitud HTTP indicada, controla abortos de petición y maneja errores comunes (incluyendo mensajes personalizados para respuestas 404).

## Configuración y ejecución

1. **Instalar dependencias**
   ```bash
   npm install
   ```

2. **Configurar la API Key**
   Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:
   ```bash
   VITE_API_KEY=tu_clave_de_api
   ```

3. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

## Recursos útiles

- [Documentación de React Router](https://reactrouter.com)
- [API de OpenWeatherMap](https://openweathermap.org/current)
- [Documentación de Vite](https://vitejs.dev)
