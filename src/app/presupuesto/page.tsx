"use client";

import {
  type ChangeEvent,
  type FormEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft, CheckCircle2 } from "lucide-react";

const backLinkClass =
  "inline-flex items-center gap-2 text-sm font-medium text-neutral-700 transition duration-200 ease-out hover:-translate-x-1 hover:text-[#1b4332]";
const backLinkButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-full border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-700 transition duration-200 ease-out hover:-translate-x-1 hover:border-[#1b4332] hover:text-[#1b4332]";
const baseFieldClass =
  "mt-2 w-full rounded-md bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md focus:-translate-y-0.5 focus:outline-none focus:ring-2 focus:shadow-lg";
const neutralFieldBorder =
  "border border-neutral-300 focus:border-[#1b4332] focus:ring-[#1b4332]/25";
const errorFieldBorder =
  "border border-red-500 focus:border-red-500 focus:ring-red-300/40";

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  projectDescription: string;
};

type FormField = keyof FormValues;
type FormErrors = Partial<Record<FormField, string>>;
type Feedback =
  | {
      type: "success" | "error";
      message: string;
    }
  | null;

const INITIAL_VALUES: FormValues = {
  fullName: "",
  email: "",
  phone: "",
  service: "",
  projectDescription: "",
};

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/;

function validate(values: FormValues): FormErrors {
  const result: FormErrors = {};

  const trimmedName = values.fullName.trim();
  if (!trimmedName) {
    result.fullName = "Ingresa tu nombre y apellido.";
  } else if (!trimmedName.includes(" ")) {
    result.fullName =
      "Suma al menos un apellido para personalizar la propuesta.";
  }

  const trimmedEmail = values.email.trim();
  if (!trimmedEmail) {
    result.email = "Ingresa un correo electronico.";
  } else if (!EMAIL_REGEX.test(trimmedEmail)) {
    result.email = "El formato del correo no parece valido.";
  }

  if (!values.service) {
    result.service = "Elegi el servicio principal que necesitas.";
  }

  const projectCopy = values.projectDescription.trim();
  if (!projectCopy) {
    result.projectDescription = "Contanos de que se trata el proyecto.";
  } else if (projectCopy.length < 24) {
    result.projectDescription =
      "Agrega mas detalles (minimo 24 caracteres) para estimar el alcance.";
  }

  return result;
}

function mergeDescribedBy(baseId: string, hasError: boolean) {
  return hasError ? `${baseId} ${baseId}-error` : baseId;
}

export default function PresupuestoPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);

  const getFieldClass = useMemo(
    () => (hasError: boolean, extra = "") =>
      `${baseFieldClass} ${hasError ? errorFieldBorder : neutralFieldBorder} ${extra}`.trim(),
    [],
  );

  const handleFieldChange =
    (field: FormField) =>
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const value = event.target.value;
      setValues((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
      if (feedback?.type === "error") {
        setFeedback(null);
      }
    };

  const handleFieldBlur = (field: FormField) => () => {
    const fieldErrors = validate(values);
    setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setFeedback({
        type: "error",
        message: "Revisa los campos marcados e intenta nuevamente.",
      });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);
    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 900);
      });
      setValues(INITIAL_VALUES);
      setErrors({});
      setFeedback({
        type: "success",
        message:
          "Gracias! Registramos tu solicitud y te contactaremos a la brevedad.",
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch {
      setFeedback({
        type: "error",
        message:
          "Ocurrio un problema al enviar la solicitud. Intenta nuevamente en unos minutos.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-lg px-6 py-16">
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
      <form
        className="mt-10 space-y-6"
        noValidate
        onSubmit={handleSubmit}
        aria-describedby={feedback ? "form-feedback" : undefined}
      >
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
            value={values.fullName}
            onChange={handleFieldChange("fullName")}
            onBlur={handleFieldBlur("fullName")}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={mergeDescribedBy(
              "full-name-help",
              Boolean(errors.fullName),
            )}
            className={getFieldClass(Boolean(errors.fullName))}
          />
          <p id="full-name-help" className="mt-2 text-xs text-neutral-500">
            Indicanos nombre y apellido para personalizar el presupuesto.
          </p>
          {errors.fullName ? (
            <p
              id="full-name-error"
              className="mt-2 text-xs font-semibold text-red-600"
            >
              {errors.fullName}
            </p>
          ) : null}
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
            value={values.email}
            onChange={handleFieldChange("email")}
            onBlur={handleFieldBlur("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={mergeDescribedBy(
              "email-help",
              Boolean(errors.email),
            )}
            className={getFieldClass(Boolean(errors.email))}
          />
          <p id="email-help" className="mt-2 text-xs text-neutral-500">
            Utilizaremos este correo para enviarte la propuesta y novedades.
          </p>
          {errors.email ? (
            <p
              id="email-error"
              className="mt-2 text-xs font-semibold text-red-600"
            >
              {errors.email}
            </p>
          ) : null}
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
            value={values.phone}
            onChange={handleFieldChange("phone")}
            onBlur={handleFieldBlur("phone")}
            aria-describedby="phone-help"
            className={getFieldClass(false)}
          />
          <p id="phone-help" className="mt-2 text-xs text-neutral-500">
            Opcional, pero nos ayuda a agilizar el contacto si es necesario.
          </p>
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
            value={values.service}
            onChange={handleFieldChange("service")}
            onBlur={handleFieldBlur("service")}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={mergeDescribedBy(
              "service-help",
              Boolean(errors.service),
            )}
            className={getFieldClass(Boolean(errors.service))}
          >
            <option value="" disabled>
              Selecciona una opcion
            </option>
            <option value="render">Render 3D</option>
            <option value="diseno-integral">
              Diseno arquitectonico integral
            </option>
            <option value="regularizacion">Regularizacion de obra</option>
          </select>
          <p id="service-help" className="mt-2 text-xs text-neutral-500">
            Elegi el servicio principal para adaptar la propuesta a tu
            necesidad.
          </p>
          {errors.service ? (
            <p
              id="service-error"
              className="mt-2 text-xs font-semibold text-red-600"
            >
              {errors.service}
            </p>
          ) : null}
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
            value={values.projectDescription}
            onChange={handleFieldChange("projectDescription")}
            onBlur={handleFieldBlur("projectDescription")}
            aria-invalid={Boolean(errors.projectDescription)}
            aria-describedby={mergeDescribedBy(
              "project-description-help",
              Boolean(errors.projectDescription),
            )}
            className={getFieldClass(Boolean(errors.projectDescription))}
          />
          <p
            id="project-description-help"
            className="mt-2 text-xs text-neutral-500"
          >
            Brinda detalles clave para estimar esfuerzo, complejidad y
            entregables.
          </p>
          {errors.projectDescription ? (
            <p
              id="project-description-error"
              className="mt-2 text-xs font-semibold text-red-600"
            >
              {errors.projectDescription}
            </p>
          ) : null}
        </div>
        <div className="group">
          <label
            className="block text-sm font-medium text-neutral-800"
            htmlFor="attachments"
          >
            Adjuntar archivos (planos, imagenes, PDFs)
          </label>
          <input
            ref={fileInputRef}
            id="attachments"
            name="attachments"
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.pdf,.avif,.webp"
            aria-describedby="attachments-help"
            className={`${baseFieldClass} border border-dashed border-neutral-300 bg-white py-6 text-sm text-neutral-600 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#1b4332] hover:shadow-md focus:-translate-y-0.5 focus:border-[#1b4332] focus:outline-none focus:ring-2 focus:ring-[#1b4332]/25 focus:shadow-lg`}
          />
          <p
            id="attachments-help"
            className="mt-2 text-xs text-neutral-500"
          >
            Peso maximo 10MB por archivo. Podes adjuntar imagenes, planos en PDF
            o renders previos.
          </p>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full rounded-md bg-[#1b4332] py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b4332]/30 active:scale-[0.99] ${
            isSubmitting
              ? "cursor-not-allowed opacity-70"
              : "hover:-translate-y-1 hover:bg-[#2d6a4f] hover:shadow-lg"
          }`}
        >
          {isSubmitting ? "Enviando..." : "Enviar solicitud"}
        </button>
        {feedback ? (
          <div
            id="form-feedback"
            role={feedback.type === "error" ? "alert" : "status"}
            aria-live={feedback.type === "error" ? "assertive" : "polite"}
            className={`flex items-start gap-3 rounded-md border px-4 py-3 text-sm ${
              feedback.type === "success"
                ? "border-[#1b4332]/30 bg-[#1b4332]/10 text-[#1b4332]"
                : "border-red-500/30 bg-red-50 text-red-700"
            }`}
          >
            {feedback.type === "success" ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0" aria-hidden />
            ) : (
              <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" aria-hidden />
            )}
            <span>{feedback.message}</span>
          </div>
        ) : null}
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
