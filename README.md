# Panel de Control del Clima en React

## Descripción del Proyecto

La aplicación "Panel de Control del Clima" permite a los usuarios buscar el clima actual de cualquier ciudad del mundo. La interfaz es dinámica e incluye una opción para alternar entre un modo claro y un modo oscuro.

### Características

* **Búsqueda de Clima**: Obtiene datos del clima en tiempo real de una API pública.

* **Cambio de Tema**: Alterna entre una interfaz de modo claro y oscuro.

* **Diseño Responsivo**: La interfaz se adapta a diferentes tamaños de pantalla, desde dispositivos móviles hasta escritorios.

## Metodología de Desarrollo

Este proyecto se desarrolló siguiendo las mejores prácticas de React, enfocándose en la modularidad y la gestión eficiente del estado.

### 1. Estructura de Componentes

La aplicación se dividió en componentes lógicos y reutilizables para mantener el código limpio y ordenado.

* **`App`**: El componente principal que maneja la lógica de la aplicación y el estado global.

* **`SearchBar`**: Un componente controlado para la entrada de texto y el botón de búsqueda.

* **`WeatherDisplay`**: Un componente para mostrar la información del clima recibida de la API.

* **`ThemeSwitcher`**: Un componente simple para la funcionalidad de cambiar el tema.

### 2. Gestión de Estado y Datos

* Se usó el hook **`useState`** para manejar el estado de la aplicación, como la ciudad que el usuario busca, los datos del clima y el tema.

* Los datos fluyen de manera unidireccional, pasando las **`props`** desde el componente padre (`App`) a los componentes hijos para que estos puedan mostrar la información y actualizar el estado cuando sea necesario.

### 3. Integración con la API

* Se utilizó el hook **`useEffect`** para realizar la llamada a la API de OpenWeatherMap. Esto asegura que la solicitud de datos se ejecute como un efecto secundario cada vez que el valor de la ciudad cambia.

* La **API Key** se almacenó en un archivo `.env` para mantener las credenciales seguras.

## Cómo Ejecutar el Proyecto

Sigue estos pasos para poner en marcha la aplicación en tu entorno local.

### Requisitos Previos

* Node.js instalado en tu máquina.

### Pasos para la Instalación

1. **Clona el repositorio** o crea un nuevo proyecto con Vite y navega a la carpeta del proyecto.

2. **Instala las dependencias**:

```shell
npm install
```

3. **Configura la API Key**: En la raíz de tu proyecto, crea un archivo llamado `.env` y añade tu clave de API de OpenWeatherMap.

```shell
VITE_API_KEY=tu_clave_de_api
```

4. **Ejecuta la aplicación**:

```shell
npm run dev
```

### Autor

Rodrigo Machaca - Rodrigo.Machaca@jala.university