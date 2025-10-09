import Link from "next/link";

const backLinkClass =
  "inline-flex items-center gap-2 text-sm font-medium text-neutral-700 transition hover:text-[#1b4332]";
const backLinkButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-full border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:border-[#1b4332] hover:text-[#1b4332]";

export default function PresupuestoPage() {
  return (
    <section className="max-w-lg mx-auto py-16 px-6">
      <Link href="/" className={backLinkClass}>
        <span aria-hidden>←</span>
        Volver al inicio
      </Link>
      <h1 className="text-3xl font-bold text-center text-neutral-900 sm:text-4xl">
        Solicitar presupuesto
      </h1>
      <p className="mt-4 text-center text-neutral-600">
        Completá el formulario y nos pondremos en contacto para acompañarte en
        la próxima etapa de tu proyecto.
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
            <option>Render 3D</option>
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
        <div>
          <label className="block text-sm font-medium text-neutral-800">
            Adjuntar archivos (planos, imágenes, PDFs)
          </label>
          <input
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.pdf"
            className="mt-2 w-full rounded-md border border-dashed border-neutral-300 bg-white px-3 py-6 text-sm text-neutral-600 shadow-sm focus:border-[#1b4332] focus:outline-none focus:ring-2 focus:ring-[#1b4332]/20"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-[#1b4332] py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#2d6a4f]"
        >
          Enviar solicitud
        </button>
      </form>
      <div className="mt-12 flex justify-center">
        <Link href="/" className={backLinkButtonClass}>
          <span aria-hidden>←</span>
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
