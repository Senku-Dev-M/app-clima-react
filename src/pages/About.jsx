const About = () => (
  <div className="page about-page">
    <h1 className="page-title">Acerca de la aplicación</h1>
    <p className="page-subtitle">
      Esta aplicación muestra información meteorológica actualizada utilizando la API de OpenWeatherMap
      e incorpora un sistema de enrutamiento para ofrecer una experiencia de SPA completa.
    </p>
    <section className="section">
      <h2 className="section-title">Características destacadas</h2>
      <ul className="feature-list">
        <li>Consulta del clima actual en diferentes ciudades del mundo.</li>
        <li>Detalles adicionales del pronóstico, como temperaturas extremas, amanecer y atardecer.</li>
        <li>Selector de tema claro/oscuro compartido por toda la aplicación.</li>
        <li>Enrutamiento con división de código para cargar secciones bajo demanda.</li>
      </ul>
    </section>
    <section className="section">
      <h2 className="section-title">Cómo utilizarla</h2>
      <ol className="feature-list ordered">
        <li>Desde la página de inicio, busca una ciudad para ver su información principal.</li>
        <li>Utiliza el enlace “Ver pronóstico detallado” para consultar más datos del mismo lugar.</li>
        <li>Visita esta página para conocer la arquitectura y las funcionalidades principales.</li>
        <li>Cambia de tema en cualquier momento usando el interruptor situado en la barra de navegación.</li>
      </ol>
    </section>
  </div>
);

export default About;
