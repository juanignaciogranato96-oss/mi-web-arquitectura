export type Proyecto = {
  slug: string;
  nombre: string;
  tipo: "Comercial" | "Residencial";
  categoria: "commercial" | "residential";
  portada: string;
  imagenes: string[];
  descripcion: string;
};

export const proyectos: Proyecto[] = [
  {
    slug: "cafe-chilin",
    nombre: "Café Chilin",
    tipo: "Comercial",
    categoria: "commercial",
    portada: "/images/estudio/cafe-chilin-portada.webp",
    imagenes: [
      "/images/proyectos/cafe-chilin/01.webp",
      "/images/proyectos/cafe-chilin/02.webp",
      "/images/proyectos/cafe-chilin/03.webp",
    ],
    descripcion:
      "Serie de renders interiores que transmiten la identidad cálida del café, resaltando maderas naturales, contrastes de luz y una atmósfera pensada para el encuentro urbano.",
  },
  {
    slug: "casa-hormigon",
    nombre: "Casa Hormigón",
    tipo: "Residencial",
    categoria: "residential",
    portada: "/images/estudio/casa-hormigon-portada.webp",
    imagenes: [
      "/images/proyectos/casa-hormigon/01.webp",
      "/images/proyectos/casa-hormigon/02.webp",
      "/images/proyectos/casa-hormigon/03.webp",
    ],
    descripcion:
      "Visualizaciones que exploran un volumen de hormigón visto integrado al verde. Cada escena trabaja la escala humana, los reflejos y la continuidad entre interior y paisaje.",
  },
  {
    slug: "casa-teros",
    nombre: "Cocina Casa Teros",
    tipo: "Residencial",
    categoria: "residential",
    portada: "/images/estudio/casa-teros-portada.webp",
    imagenes: [
      "/images/proyectos/casa-teros/01.webp",
      "/images/proyectos/casa-teros/02.webp",
      "/images/proyectos/casa-teros/03.webp",
    ],
    descripcion:
      "Renders que ponen en valor la cocina como núcleo social de la vivienda, combinando texturas nobles, iluminación cálida y soluciones funcionales para la vida cotidiana.",
  },
  {
    slug: "departamento-nexus",
    nombre: "Departamento Nexus",
    tipo: "Residencial",
    categoria: "residential",
    portada: "/images/estudio/casa-nexus-portada.webp",
    imagenes: [
      "/images/proyectos/departamento-nexus/01.webp",
      "/images/proyectos/departamento-nexus/02.webp",
      "/images/proyectos/departamento-nexus/03.webp",
    ],
    descripcion:
      "Colección de vistas que refuerzan la amplitud, la luz y la versatilidad del departamento, orientadas a inversores y futuros usuarios de desarrollos urbanos contemporáneos.",
  },
  {
    slug: "casa-kai",
    nombre: "Casa Kai",
    tipo: "Residencial",
    categoria: "residential",
    portada: "/images/estudio/casa-kai-portada.webp",
    imagenes: [
      "/images/proyectos/casa-kai/01.webp",
      "/images/proyectos/casa-kai/02.webp",
      "/images/proyectos/casa-kai/03.webp",
    ],
    descripcion:
      "Visualizaciones que articulan interior y exterior a través de carpinterías generosas, reflejando el equilibrio entre materiales naturales y una atmósfera serena.",
  },
  {
    slug: "local-glam",
    nombre: "Local Glam",
    tipo: "Comercial",
    categoria: "commercial",
    portada: "/images/estudio/local-glam-portada.webp",
    imagenes: [
      "/images/proyectos/local-glam/01.webp",
      "/images/proyectos/local-glam/02.webp",
      "/images/proyectos/local-glam/03.webp",
    ],
    descripcion:
      "Renders comerciales que enfatizan la iluminación escenográfica y la atmósfera sofisticada para posicionar la marca desde la primera impresión.",
  },
];
