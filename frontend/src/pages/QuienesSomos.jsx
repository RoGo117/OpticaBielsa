"use client";

const QuienesSomos = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Banner principal */}
      <section className="relative">
        <img
          src="src/assets/images/tiendaInterior1Oropesa.jpg"
          alt="Óptica Bielsa Fachada"
          className="w-full h-72 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Bienvenidos a Óptica Bielsa
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
            Tu visión es nuestra prioridad. Descubre nuestros servicios y déjate cuidar por expertos.
          </p>
        </div>
      </section>

      {/* Historia y valores */}
      <section className="container mx-auto py-12 px-4 md:px-0">
        <div className="grid md:grid-cols-2 gap-8 items-center bg-gray-100 dark:bg-slate-800 pr-5">
          <img
            src="src/assets/images/tiendaInterior2Talavera.jpg"
            alt="Interior de la Óptica"
            className="rounded-lg shadow-md"
          />
          <div>
            <h2 className="text-4xl font-semibold mb-4">Nuestra Historia</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Fundada en 1996, Óptica Bielsa es sinónimo de lealtad y compromiso con la salud visual. A lo largo de los
              años, nos hemos consolidado como un referente en el sector óptico, ofreciendo atención personalizada y
              productos de primera calidad a un buen precio.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Nuestra misión es ayudarte a ver el mundo con claridad y estilo, brindando soluciones ópticas adaptadas a
              cada necesidad.
            </p>
          </div>
        </div>
      </section>

      {/* Servicios destacados */}
      <section className="bg-white dark:bg-gray-800 py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">¿Qué nos hace diferentes?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-0">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 shadow hover:shadow-lg transition">
              <img
                src="src/assets/images/cajaGafas1.jpg"
                alt="Amplia gama de productos"
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Variedad de Productos</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Gafas graduadas, de sol y lentes de contacto de marcas reconocidas para cada estilo y necesidad.
              </p>
            </div>

            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 shadow hover:shadow-lg transition">
              <img
                src="src/assets/images/tiendaInterior3Talavera.jpg"
                alt="Atención personalizada"
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Atención Personalizada</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Nuestro equipo está comprometido a brindarte una experiencia única y cercana para cuidar tu visión.
              </p>
            </div>

            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 shadow hover:shadow-lg transition">
              <img
                src="src/assets/images/maquinas.jpg"
                alt="Tecnología de última generación"
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Tecnología Avanzada</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Contamos con tecnología de vanguardia para garantizar un diagnóstico preciso y soluciones a tu medida.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Horarios y contacto */}
      <section className="container mx-auto py-12 px-4 md:px-0">
        <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-6 shadow text-center">
          <h2 className="text-3xl font-semibold mb-4">Horarios de Atención</h2>
          <p className="text-gray-700 dark:text-gray-200 mb-2">
            <strong>Lunes a Viernes:</strong> 9:30 - 13:30 y 17:00 - 20:00
          </p>
          <p className="text-gray-700 dark:text-gray-200 mb-4">
            <strong>Sábados:</strong> 10:00 - 13:30
          </p>
          <p className="text-gray-700 dark:text-gray-200">¡Ven a visitarnos y descubre la diferencia en tu experiencia óptica!</p>
        </div>
      </section>
    </div>
  );
};

export default QuienesSomos;
