import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const backLinkClass =
  "inline-flex items-center gap-2 text-sm font-medium text-neutral-700 transition duration-200 ease-out hover:-translate-x-1 hover:text-[#1b4332]";
const backLinkButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-full border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-700 transition duration-200 ease-out hover:-translate-x-1 hover:border-[#1b4332] hover:text-[#1b4332]";

export default function PresupuestoPage() {
  return (
    <section className="mx-auto max-w-lg py-16 px-6">
      <Link href="/" className={backLinkClass}>
        <ArrowLeft className="h-4 w-4" aria-hidden />
        <span>Volver al inicio</span>
      </Link>
      <h1 className="text-center text-3xl font-bold text-neutral-900 sm:text-4xl">
        Solicitar presupuesto
      </h1>
      <p className="mt-4 text-center text-neutral-600">
        Completa el formulario y nos pondremos en contacto para acompanar la
        proxima etapa de tu proyecto.
      </p>
      <form className="mt-10 space-y-6" noValidate>
        <div className="group">
          <label
            className="block text-sm font-medium text-neutral-800"
            htmlFor="full-name"
          >
            Nombre completo
          </label>
          <input
            id="full-name"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            className="mt-2 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md focus:-translate-y-0.5 focus:border-[#1b4332] focus:outline-none focus:ring-2 focus:ring-[#1b4332]/25 focus:shadow-lg"
          />
        </div>
        <div className="group">
          <label
            className="block text-sm font-medium text-neutral-800"
            htmlFor="email"
          >
            Correo electronico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-2 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md focus:-translate-y-0.5 focus:border-[#1b4332] focus:outline-none focus:ring-2 focus:ring-[#1b4332]/25 focus:shadow-lg"
          />
        </div>
        <div className="group">
          <label
            className="block text-sm font-medium text-neutral-800"
            htmlFor="phone"
          >
            Telefono
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className="mt-2 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md focus:-translate-y-0.5 focus:border-[#1b4332] focus:outline-none focus:ring-2 focus:ring-[#1b4332]/25 focus:shadow-lg"
          />
        </div>
        <div className="group">
          <label
            className="block text-sm font-medium text-neutral-800"
            htmlFor="service"
          >
            Servicio de interes
          </label>
          <select
            id="service"
            name="service"
            defaultValue=""
            className="mt-2 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md focus:-translate-y-0.5 focus:border-[#1b4332] focus:outline-none focus:ring-2 focus:ring-[#1b4332]/25 focus:shadow-lg"
          >
            <option value="" disabled>
              Selecciona una opcion
            </option>
            <option value="render">Render 3D</option>
            <option value="diseno-integral">Diseno arquitectonico integral</option>
            <option value="regularizacion">Regularizacion de obra</option>
          </select>
        </div>
        <div className="group">
          <label
            className="block text-sm font-medium text-neutral-800"
            htmlFor="project-description"
          >
            Descripcion del proyecto
          </label>
          <textarea
            id="project-description"
            name="projectDescription"
            rows={4}
            placeholder="Contanos tipo de proyecto, m2, objetivos o plazos estimados."
            className="mt-2 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md focus:-translate-y-0.5 focus:border-[#1b4332] focus:outline-none focus:ring-2 focus:ring-[#1b4332]/25 focus:shadow-lg"
          />
        </div>
        <div className="group">
          <label
            className="block text-sm font-medium text-neutral-800"
            htmlFor="attachments"
          >
            Adjuntar archivos (planos, imagenes, PDFs)
          </label>
          <input
            id="attachments"
            name="attachments"
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.pdf"
            className="mt-2 w-full rounded-md border border-dashed border-neutral-300 bg-white px-3 py-6 text-sm text-neutral-600 shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#1b4332] hover:shadow-md focus:-translate-y-0.5 focus:border-[#1b4332] focus:outline-none focus:ring-2 focus:ring-[#1b4332]/25 focus:shadow-lg"
          />
          <p className="mt-2 text-xs text-neutral-500">
            Peso maximo 10MB por archivo. Puedes adjuntar imagenes y planos en
            PDF.
          </p>
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-[#1b4332] py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-[#2d6a4f] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b4332]/30 active:scale-[0.99]"
        >
          Enviar solicitud
        </button>
      </form>
      <div className="mt-12 flex justify-center">
        <Link href="/" className={backLinkButtonClass}>
          <ArrowLeft className="h-4 w-4" aria-hidden />
          <span>Volver al inicio</span>
        </Link>
      </div>
    </section>
  );
}
