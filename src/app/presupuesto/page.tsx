export default function PresupuestoPage() {
  return (
    <section className="mx-auto max-w-xl px-6 py-20">
      <h1 className="text-center text-3xl font-bold text-neutral-900 sm:text-4xl">
        Solicitar presupuesto
      </h1>
      <p className="mt-4 text-center text-neutral-600">
        Completá el formulario y nos pondremos en contacto para acompañarte en la
        próxima etapa de tu proyecto.
      </p>
      <form className="mt-10 space-y-6">
        <div>
          <label className="block text-sm font-medium text-neutral-800">
            Nombre completo
          </label>
          <input
            type="text"
            className="mt-2 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-[#1b4332] focus:outline-none focus:ring-2 focus:ring-[#1b4332]/20"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-800">
            Correo electrónico
          </label>
          <input
            type="email"
            className="mt-2 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-[#1b4332] focus:outline-none focus:ring-2 focus:ring-[#1b4332]/20"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-800">
            Teléfono
          </label>
          <input
            type="tel"
            className="mt-2 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-[#1b4332] focus:outline-none focus:ring-2 focus:ring-[#1b4332]/20"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-800">
            Servicio de interés
          </label>
          <select
            className="mt-2 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-[#1b4332] focus:outline-none focus:ring-2 focus:ring-[#1b4332]/20"
          >
            <option>Render 3D hiperrealista</option>
            <option>Diseño arquitectónico integral</option>
            <option>Regularización de obra</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-800">
            Descripción del proyecto
          </label>
          <textarea
            className="mt-2 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-[#1b4332] focus:outline-none focus:ring-2 focus:ring-[#1b4332]/20"
            rows={4}
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-[#1b4332] py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#2d6a4f]"
        >
          Enviar solicitud
        </button>
      </form>
    </section>
  );
}
