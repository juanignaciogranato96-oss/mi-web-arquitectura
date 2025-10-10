const PROJECTS_BASE = "/images/proyectos";

export type Proyecto = {
  slug: string;
  nombre: string;
  tipo: "Comercial" | "Residencial";
  categoria: "commercial" | "residential";
  portada: string;
  imagenes: string[];
  descripcion: string;
};

function makeProjectImages(...files: string[]) {
  return files.map((file) => `${PROJECTS_BASE}/${file}`);
}

export const proyectos: Proyecto[] = [
  {
    slug: "cafe-chilin",
    nombre: "Café Chilin",
    tipo: "Comercial",
    categoria: "commercial",
    portada: "/images/estudio/cafe-chilin-portada.webp",
    imagenes: makeProjectImages(
      "CAFE-CHILIN (1).webp",
      "CAFE-CHILIN (2).webp",
      "CAFE-CHILIN (3).webp",
      "CAFE-CHILIN (4).webp"
    ),
    descripcion:
      "Desarrollamos una narrativa visual que resalta la calidez de Café Chilin: maderas tostadas, cielorrasos oscuros y lámparas puntuales que realzan la barra y el área de degustación. Las imágenes muestran cómo la iluminación rasante se combina con el mobiliario de hierro para crear un ambiente íntimo, ideal para reuniones y flujo comercial. Cada vista se enfocó en transmitir aromas, texturas y la impronta urbana del local, reforzando el branding del emprendimiento.",
  },
  {
    slug: "casa-hormigon",
    nombre: "Casa Hormigón",
    tipo: "Residencial",
    categoria: "residential",
    portada: "/images/estudio/casa-hormigon-portada.webp",
    imagenes: makeProjectImages("CASA-HA (1).webp", "CASA-HA (2).webp", "CASA-HA (3).webp"),
    descripcion:
      "Las escenas de Casa Hormigón trabajan la contundencia del volumen en hormigón visto en relación con patios verdes y carpinterías de piso a techo. El render exterior enfatiza planos superpuestos y el reflejo del agua que suaviza el material. En los interiores se acentúa la continuidad espacial, los contrastes entre superficies pulidas y textiles cálidos, y el modo en que la luz natural perfila cada ambiente de la vivienda.",
  },
  {
    slug: "casa-teros",
    nombre: "Casa Teros",
    tipo: "Residencial",
    categoria: "residential",
    portada: "/images/estudio/casa-teros-portada.webp",
    imagenes: makeProjectImages(
      "CASA-TEROS (1).webp",
      "CASA-TEROS (2).webp",
      "CASA-TEROS (3).webp",
      "CASA-TEROS (4).webp",
      "CASA-TEROS (5).webp",
      "CASA-TEROS (6).webp"
    ),
    descripcion:
      "Para la cocina de Casa Teros mostramos el corazón social de la vivienda con una isla protagonista, equipamiento a medida y una paleta que combina madera natural, superficies mate y detalles en piedra. Los renders destacan la relación interior-exterior, la iluminación puntual sobre la barra de desayuno y los aportes de vegetación que acompañan la vida diaria. La serie refuerza la idea de un espacio familiar, flexible y preparado para recibir.",
  },
  {
    slug: "departamento-nexus",
    nombre: "Departamento Nexus",
    tipo: "Residencial",
    categoria: "residential",
    portada: "/images/estudio/casa-nexus-portada.webp",
    imagenes: makeProjectImages(
      "NEXUS (1).webp",
      "NEXUS (2).webp",
      "NEXUS (3).webp",
      "NEXUS (4).webp",
      "NEXUS (5).webp"
    ),
    descripcion:
      "El Departamento Nexus se concibió con una estética sobria pensada para desarrolladoras e inversores. Las imágenes muestran ambientes integrados, carpinterías corredizas que abren el estar hacia el exterior y un diseño interior basado en neutros cálidos, acentos en madera y luminarias lineales. Cada toma evidencia versatilidad programática y el estándar de terminaciones que posiciona al proyecto dentro del segmento premium.",
  },
  {
    slug: "casa-kai",
    nombre: "Casa Kai",
    tipo: "Residencial",
    categoria: "residential",
    portada: "/images/estudio/casa-kai-portada.webp",
    imagenes: makeProjectImages(
      "KAI (1).webp",
      "KAI (2).webp",
      "KAI (3).webp",
      "KAI (4).webp",
      "KAI (5).webp"
    ),
    descripcion:
      "Casa Kai se presenta como un refugio contemporáneo que se abre al jardín mediante paños vidriados y pérgolas ligeras. El render exterior enfatiza planos de hormigón, pieles de madera y una pileta lineal que refleja la vivienda. Las vistas interiores explican cómo se articulan los espacios comunes con dobles alturas y mobiliario a medida, generando una atmósfera serena, luminosa y conectada con la naturaleza.",
  },
  {
    slug: "local-glam",
    nombre: "Local Glam",
    tipo: "Comercial",
    categoria: "commercial",
    portada: "/images/estudio/local-glam-portada.webp",
    imagenes: makeProjectImages("GLAM (1).webp", "GLAM (2).webp", "GLAM (3).webp"),
    descripcion:
      "Las visualizaciones de Local Glam trabajan un concepto de retail sofisticado, basado en estanterías curvas, espejos retroiluminados y materiales metálicos que realzan cada producto. Las escenas describen la circulación fluida entre exhibidores, el efecto de la iluminación escenográfica y la identidad gráfica integrada al espacio. El resultado transmite exclusividad y refuerza el posicionamiento comercial de la marca.",
  },
];
