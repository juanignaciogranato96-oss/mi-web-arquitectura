export type Proyecto = {
  slug: string;
  nombre: string;
  tipo: "Comercial" | "Residencial";
  categoria: "commercial" | "residential";
  imagenes: string[];
  descripcion: string;
};

export const proyectos: Proyecto[] = [
  {
    slug: "cafe-chilin",
    nombre: "Café Chilin",
    tipo: "Comercial",
    categoria: "commercial",
    imagenes: [
      "/images/proyectos/cafe-chilin/01.webp",
      "/images/proyectos/cafe-chilin/02.webp",
      "/images/proyectos/cafe-chilin/03.webp",
    ],
    descripcion:
      "Render que comunica la calidez y materialidad del espacio comercial, destacando iluminación natural y texturas cálidas.",
  },
  {
    slug: "casa-hormigon",
    nombre: "Casa Hormigón",
    tipo: "Residencial",
    categoria: "residential",
    imagenes: [
      "/images/proyectos/casa-hormigon/01.webp",
      "/images/proyectos/casa-hormigon/02.webp",
      "/images/proyectos/casa-hormigon/03.webp",
    ],
    descripcion:
      "Diseño minimalista en hormigón visto. El render busca reflejar la integración del proyecto con el entorno natural.",
  },
  {
    slug: "casa-teros",
    nombre: "Cocina Casa Teros",
    tipo: "Residencial",
    categoria: "residential",
    imagenes: [
      "/images/proyectos/casa-teros/01.webp",
      "/images/proyectos/casa-teros/02.webp",
      "/images/proyectos/casa-teros/03.webp",
    ],
    descripcion:
      "Visualización de interiorismo enfocada en destacar la funcionalidad y los materiales nobles del espacio cotidiano.",
  },
  {
    slug: "departamento-nexus",
    nombre: "Departamento Nexus",
    tipo: "Residencial",
    categoria: "residential",
    imagenes: [
      "/images/proyectos/departamento-nexus/01.webp",
      "/images/proyectos/departamento-nexus/02.webp",
      "/images/proyectos/departamento-nexus/03.webp",
    ],
    descripcion:
      "Render que resalta la amplitud espacial, luz y confort visual, pensado para desarrollos urbanos contemporáneos.",
  },
  {
    slug: "casa-kai",
    nombre: "Casa Kai",
    tipo: "Residencial",
    categoria: "residential",
    imagenes: [
      "/images/proyectos/casa-kai/01.webp",
      "/images/proyectos/casa-kai/02.webp",
      "/images/proyectos/casa-kai/03.webp",
    ],
    descripcion:
      "Espacio residencial cálido con integración entre interior y exterior. El render refleja texturas naturales y equilibrio visual.",
  },
  {
    slug: "local-glam",
    nombre: "Local Glam",
    tipo: "Comercial",
    categoria: "commercial",
    imagenes: [
      "/images/proyectos/local-glam/01.webp",
      "/images/proyectos/local-glam/02.webp",
      "/images/proyectos/local-glam/03.webp",
    ],
    descripcion:
      "Render comercial que destaca la iluminación escenográfica y la experiencia sensorial del espacio de venta.",
  },
];
