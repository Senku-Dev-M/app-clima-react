# Panel de Control del Clima en React

**URL en vivo:** [https://app-clima-react-git-main-rodrigos-projects-ff595fcd.vercel.app](https://app-clima-react-git-main-rodrigos-projects-ff595fcd.vercel.app?_vercel_share=zOVCoQGLXnIvwNBNP0hIEZK02ZXdvIXh)

## Descripción general

Esta versión del "Panel de Control del Clima" evoluciona la práctica de la Semana 3 hacia una aplicación de página única (SPA). La interfaz permite buscar ciudades, consultar información meteorológica detallada y alternar entre temas claro y oscuro desde cualquier sección del sitio.



## Flujo de Autenticación

El sistema de autenticación permite a los usuarios registrarse e iniciar sesión para acceder a las funcionalidades de la aplicación. El flujo es el siguiente:

1.  **Registro**: Los nuevos usuarios pueden crear una cuenta proporcionando un nombre, email y contraseña. La información se envía a la API de `platzi` para crear el perfil.
2.  **Inicio de Sesión**: Los usuarios existentes inician sesión con su email y contraseña. La API valida las credenciales.
3.  **Gestión de Token**: Tras un inicio de sesión exitoso, la API devuelve un `access_token` (JWT), que se almacena en el `localStorage` del navegador.
4.  **Rutas Protegidas**: El componente `ProtectedRoute` verifica la existencia del token en `localStorage`. Si el token no está presente, redirige al usuario a la página de inicio de sesión, impidiendo el acceso a rutas protegidas.
5.  **Cierre de Sesión**: La función de `logout` elimina el token del `localStorage`, finalizando la sesión del usuario.

## Gestión de estado y hooks

- **AuthContext**: Provee el estado de autenticación (`token`) y las funciones (`login`, `register`, `logout`) a toda la aplicación.
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

## Pruebas

El proyecto está configurado con Jest y React Testing Library. Los archivos de prueba se encuentran en el directorio `src/__tests__`, siguiendo la misma estructura de carpetas que el código fuente.

Para ejecutar las pruebas unitarias, utiliza el siguiente comando:

```bash
npm test
```

## Recursos útiles

- [Documentación de React Router](https://reactrouter.com)
- [API de OpenWeatherMap](https://openweathermap.org/current)
- [Documentación de Vite](https://vitejs.dev)
- [Documentación Platzi API Auth](https://fakeapi.platzi.com/en/rest/auth-jwt/)
- [Documentación Platzi API Users](https://fakeapi.platzi.com/en/rest/users/)
