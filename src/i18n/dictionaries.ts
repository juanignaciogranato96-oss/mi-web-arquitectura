export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

export type SiteDictionary = {
  metadata: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    services: string;
    studio: string;
    contact: string;
    whatsapp: string;
    menu: string;
    tagline: string;
  };
  footer: {
    rights: string;
    followUs: string;
    contact: string;
  };
  home: {
    hero: {
      eyebrow: string;
      title: string;
      description: string;
      primaryCta: string;
      secondaryCta: string;
    };
    services: {
      title: string;
      description: string;
      items: Array<{
        title: string;
        description: string;
      }>;
    };
    whatsappCta: {
      title: string;
      description: string;
      button: string;
    };
  };
  services: {
    hero: {
      title: string;
      description: string;
    };
    sections: Array<{
      title: string;
      points: string[];
    }>;
    cta: {
      title: string;
      description: string;
      button: string;
    };
  };
  studio: {
    hero: {
      title: string;
      description: string;
    };
    team: {
      title: string;
      members: Array<{
        name: string;
        role: string;
        bio: string;
      }>;
    };
    philosophy: {
      title: string;
      description: string;
    };
    clients: {
      title: string;
      items: string[];
    };
    process: {
      title: string;
      steps: Array<{
        title: string;
        description: string;
      }>;
    };
    location: {
      title: string;
      description: string;
    };
  };
  contact: {
    hero: {
      title: string;
      description: string;
    };
    form: {
      name: string;
      email: string;
      message: string;
      submit: string;
    };
    whatsapp: {
      title: string;
      description: string;
      button: string;
    };
  };
};

const dictionaries: Record<Locale, SiteDictionary> = {
  es: {
    metadata: {
      title: "J.G. Diseño y Visualización Arquitectónica",
      description:
        "Estudio de renders hiperrealistas, diseño arquitectónico integral y regularización de obra en Rosario y Funes.",
    },
    nav: {
      home: "Inicio",
      services: "Servicios",
      studio: "Estudio",
      contact: "Contacto",
      whatsapp: "WhatsApp",
      menu: "Menú",
      tagline: "Diseñamos y visualizamos arquitectura que se vive.",
    },
    footer: {
      rights: "© {year} J.G. Diseño y Visualización Arquitectónica. Todos los derechos reservados.",
      followUs: "Seguinos",
      contact: "Contacto",
    },
    home: {
      hero: {
        eyebrow: "Estudio boutique · Rosario & Funes",
        title: "Diseñamos y visualizamos arquitectura que se vive.",
        description:
          "Transformamos ideas en experiencias visuales inmersivas para desarrolladores, estudios y constructoras que buscan excelencia en cada detalle.",
        primaryCta: "Agendar asesoría",
        secondaryCta: "Ver servicios",
      },
      services: {
        title: "Especialistas en visualización y diseño",
        description:
          "Acompañamos cada etapa del proyecto con soluciones de alto impacto, combinando creatividad, precisión técnica y una narrativa visual cuidada.",
        items: [
          {
            title: "Renders hiperrealistas",
            description:
              "Imágenes fotorrealistas para proyectos residenciales, comerciales y corporativos con control total de iluminación, materiales y ambiente.",
          },
          {
            title: "Diseño arquitectónico integral",
            description:
              "Desarrollo de propuestas conceptuales y ejecutivas que conectan la visión del cliente con soluciones espaciales de alto rendimiento.",
          },
          {
            title: "Regularización de obra",
            description:
              "Gestión completa de planos, documentación y trámites para la regularización municipal en las zonas de Rosario y Funes.",
          },
        ],
      },
      whatsappCta: {
        title: "¿Listo para darle forma a tu próximo proyecto?",
        description:
          "Coordinemos una reunión y conversemos sobre necesidades, plazos y entregables. Respondemos rápidamente vía WhatsApp.",
        button: "Escribir por WhatsApp",
      },
    },
    services: {
      hero: {
        title: "Servicios orientados a resultados tangibles",
        description:
          "Creamos experiencias visuales y soluciones arquitectónicas que potencian decisiones, ventas y la gestión de proyectos.",
      },
      sections: [
        {
          title: "Renders hiperrealistas",
          points: [
            "Producción de imágenes exteriores e interiores con enfoque en storytelling visual.",
            "Integración de paisajismo, iluminación natural y artificial según la hora del día.",
            "Paquetes de imágenes optimizados para lanzamientos comerciales y presentaciones ejecutivas.",
          ],
        },
        {
          title: "Diseño arquitectónico integral",
          points: [
            "Anteproyectos y proyectos ejecutivos adaptados a normativas locales vigentes.",
            "Documentación técnica completa: planos, detalles, memorias descriptivas y cómputos.",
            "Coordinación interdisciplinaria con ingenierías y especialistas durante todo el proceso.",
          ],
        },
        {
          title: "Regularización de obra",
          points: [
            "Relevamiento arquitectónico y diagnóstico normativo inicial.",
            "Preparación de planos conforme a obra y documentación legal requerida.",
            "Gestión ante municipalidades de Rosario y Funes hasta la aprobación final.",
          ],
        },
      ],
      cta: {
        title: "Necesitás un alcance personalizado?",
        description:
          "Trabajamos proyectos a medida para estudios, desarrolladoras y constructoras. Coordiná una reunión para profundizar en requerimientos y cronograma.",
        button: "Agendar reunión",
      },
    },
    studio: {
      hero: {
        title: "Somos J.G. Diseño y Visualización Arquitectónica",
        description:
          "Un estudio enfocado en materializar visiones arquitectónicas con realismo, estrategia y sensibilidad. Inspirados en referentes como Render3R, combinamos tecnología y criterio proyectual para entregar resultados consistentes.",
      },
      team: {
        title: "Equipo",
        members: [
          {
            name: "Juan Gómez",
            role: "Director & Lead 3D Artist",
            bio: "Arquitecto con más de 10 años creando visualizaciones inmersivas para desarrollos residenciales y comerciales.",
          },
          {
            name: "María López",
            role: "Arquitecta Proyectista",
            bio: "Especialista en diseño integral, planificación y documentación técnica enfocada en normativas locales.",
          },
          {
            name: "Lucía Fernández",
            role: "Project Manager",
            bio: "Coordina equipo, cronogramas y entregables asegurando un flujo de trabajo claro y transparente.",
          },
        ],
      },
      philosophy: {
        title: "Filosofía",
        description:
          "Creemos en la precisión técnica al servicio de la emoción. Cada entrega busca comunicar atmósferas, materiales y la esencia de cada proyecto.",
      },
      clients: {
        title: "Clientes",
        items: [
          "Desarrolladoras inmobiliarias",
          "Estudios de arquitectura",
          "Constructoras",
          "Inversores privados",
        ],
      },
      process: {
        title: "Proceso",
        steps: [
          {
            title: "Brief colaborativo",
            description: "Definimos objetivos visuales, plazos y entregables clave.",
          },
          {
            title: "Desarrollo iterativo",
            description: "Trabajamos en etapas con revisiones guiadas y feedback estructurado.",
          },
          {
            title: "Entrega final",
            description: "Entregamos archivos optimizados para presentaciones, marketing y documentación técnica.",
          },
        ],
      },
      location: {
        title: "Ubicación",
        description:
          "Base en Rosario, proyectos en toda Argentina y colaboraciones remotas para estudios internacionales.",
      },
    },
    contact: {
      hero: {
        title: "Contanos sobre tu próximo proyecto",
        description:
          "Coordinemos una reunión para conocer objetivos, tiempos y materiales disponibles. Respondemos dentro de las 24 horas hábiles.",
      },
      form: {
        name: "Nombre",
        email: "Email",
        message: "Mensaje",
        submit: "Enviar mensaje",
      },
      whatsapp: {
        title: "Contacto directo",
        description: "Preferís coordinar por WhatsApp? Escribinos y respondemos a la brevedad.",
        button: "Chatear por WhatsApp",
      },
    },
  },
  en: {
    metadata: {
      title: "J.G. Architectural Design & Visualization",
      description:
        "Studio specialized in hyper-realistic renders, integrated architectural design and permitting support around Rosario and Funes.",
    },
    nav: {
      home: "Home",
      services: "Services",
      studio: "Studio",
      contact: "Contact",
      whatsapp: "WhatsApp",
      menu: "Menu",
      tagline: "We design and visualize architecture you can feel.",
    },
    footer: {
      rights: "© {year} J.G. Architectural Design & Visualization. All rights reserved.",
      followUs: "Follow us",
      contact: "Contact",
    },
    home: {
      hero: {
        eyebrow: "Boutique studio · Rosario & Funes",
        title: "We design and visualize architecture you can feel.",
        description:
          "We transform ideas into immersive visual experiences for developers, studios and builders seeking excellence in every detail.",
        primaryCta: "Book a consultation",
        secondaryCta: "View services",
      },
      services: {
        title: "Visual storytelling experts",
        description:
          "We support every project stage with high-impact solutions that combine creativity, technical accuracy and a refined narrative.",
        items: [
          {
            title: "Hyper-realistic renders",
            description:
              "Photorealistic imagery for residential, commercial and corporate projects with full control over lighting, materials and mood.",
          },
          {
            title: "Integrated architectural design",
            description:
              "Conceptual and executive proposals that connect the client vision with high-performance spatial solutions.",
          },
          {
            title: "Building regularization",
            description:
              "End-to-end management of drawings, documents and permits for municipal approvals in Rosario and Funes.",
          },
        ],
      },
      whatsappCta: {
        title: "Ready to bring your next project to life?",
        description:
          "Let's schedule a meeting to discuss needs, timelines and deliverables. We reply quickly on WhatsApp.",
        button: "Message on WhatsApp",
      },
    },
    services: {
      hero: {
        title: "Services geared toward tangible results",
        description:
          "We create visual experiences and architectural solutions that drive decisions, sales and project management.",
      },
      sections: [
        {
          title: "Hyper-realistic renders",
          points: [
            "Exterior and interior imagery crafted with a strong visual storytelling approach.",
            "Comprehensive lighting design including natural and artificial mood variations.",
            "Image packages optimized for commercial launches and executive presentations.",
          ],
        },
        {
          title: "Integrated architectural design",
          points: [
            "Preliminary and executive projects adapted to current local regulations.",
            "Complete technical documentation: plans, details, specifications and quantity takeoffs.",
            "Interdisciplinary coordination with engineers and specialists throughout the process.",
          ],
        },
        {
          title: "Building regularization",
          points: [
            "Architectural survey and initial regulatory assessment.",
            "Preparation of as-built drawings and required legal documentation.",
            "Municipal management in Rosario and Funes until final approval.",
          ],
        },
      ],
      cta: {
        title: "Need a tailored scope?",
        description:
          "We work on bespoke projects for studios, developers and construction firms. Schedule a meeting to dive into requirements and timeline.",
        button: "Schedule a meeting",
      },
    },
    studio: {
      hero: {
        title: "We are J.G. Architectural Design & Visualization",
        description:
          "A studio focused on materializing architectural visions with realism, strategy and sensitivity. Inspired by studios like Render3R, we blend technology and design expertise to deliver consistent results.",
      },
      team: {
        title: "Team",
        members: [
          {
            name: "Juan Gómez",
            role: "Director & Lead 3D Artist",
            bio: "Architect with 10+ years crafting immersive visualizations for residential and commercial developments.",
          },
          {
            name: "María López",
            role: "Architectural Designer",
            bio: "Specialist in holistic design, planning and technical documentation aligned with local regulations.",
          },
          {
            name: "Lucía Fernández",
            role: "Project Manager",
            bio: "Coordinates the team, schedules and deliverables ensuring a clear and transparent workflow.",
          },
        ],
      },
      philosophy: {
        title: "Philosophy",
        description:
          "We believe technical precision should evoke emotion. Each deliverable communicates atmosphere, materials and the essence of every project.",
      },
      clients: {
        title: "Clients",
        items: [
          "Real estate developers",
          "Architecture studios",
          "Construction companies",
          "Private investors",
        ],
      },
      process: {
        title: "Process",
        steps: [
          {
            title: "Collaborative brief",
            description: "We define visual objectives, timelines and key deliverables together.",
          },
          {
            title: "Iterative development",
            description: "We work in stages with guided reviews and structured feedback loops.",
          },
          {
            title: "Final delivery",
            description: "Optimized files ready for presentations, marketing assets and technical documentation.",
          },
        ],
      },
      location: {
        title: "Location",
        description:
          "Based in Rosario with projects across Argentina and remote collaborations with international studios.",
      },
    },
    contact: {
      hero: {
        title: "Tell us about your next project",
        description:
          "Let's schedule a meeting to understand objectives, timelines and available materials. We reply within one business day.",
      },
      form: {
        name: "Name",
        email: "Email",
        message: "Message",
        submit: "Send message",
      },
      whatsapp: {
        title: "Direct contact",
        description: "Prefer coordinating via WhatsApp? Message us and we'll get back shortly.",
        button: "Chat on WhatsApp",
      },
    },
  },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDictionary(locale: string): SiteDictionary {
  if (isLocale(locale)) {
    return dictionaries[locale];
  }
  return dictionaries[defaultLocale];
}
