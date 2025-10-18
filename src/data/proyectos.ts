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
    nombre: "Cafe Chilin",
    tipo: "Comercial",
    categoria: "commercial",
    portada: "/images/estudio/cafe-chilin-portada.avif",
    imagenes: makeProjectImages(
      "CAFE-CHILIN (1).avif",
      "CAFE-CHILIN (2).avif",
      "CAFE-CHILIN (3).avif",
      "CAFE-CHILIN (4).avif",
    ),
    descripcion:
      "Desarrollamos una narrativa visual que resalta la calidez de Cafe Chilin: maderas tostadas, cielorrasos oscuros y lamparas puntuales que realzan la barra y el area de degustacion. Las imagenes muestran como la iluminacion rasante se combina con el mobiliario de hierro para crear un ambiente intimo, ideal para reuniones y flujo comercial. Cada vista se enfoco en transmitir aromas, texturas y la impronta urbana del local, reforzando el branding del emprendimiento.",
  },
  {
    slug: "casa-hormigon",
    nombre: "Casa Hormigon",
    tipo: "Residencial",
    categoria: "residential",
    portada: "/images/estudio/casa-hormigon-portada.avif",
    imagenes: makeProjectImages(
      "CASA-HA (1).avif",
      "CASA-HA (2).avif",
      "CASA-HA (3).avif",
    ),
    descripcion:
      "Las escenas de Casa Hormigon trabajan la contundencia del volumen en hormigon visto en relacion con patios verdes y carpinterias de piso a techo. El render exterior enfatiza planos superpuestos y el reflejo del agua que suaviza el material. En los interiores se acentua la continuidad espacial, los contrastes entre superficies pulidas y textiles calidos, y el modo en que la luz natural perfila cada ambiente de la vivienda.",
  },
  {
    slug: "casa-teros",
    nombre: "Casa Teros",
    tipo: "Residencial",
    categoria: "residential",
    portada: "/images/estudio/casa-teros-portada.avif",
    imagenes: makeProjectImages(
      "CASA-TEROS (1).avif",
      "CASA-TEROS (2).avif",
      "CASA-TEROS (3).avif",
      "CASA-TEROS (4).avif",
      "CASA-TEROS (5).avif",
      "CASA-TEROS (6).avif",
    ),
    descripcion:
      "Para la cocina de Casa Teros mostramos el corazon social de la vivienda con una isla protagonista, equipamiento a medida y una paleta que combina madera natural, superficies mate y detalles en piedra. Los renders destacan la relacion interior exterior, la iluminacion puntual sobre la barra de desayuno y los aportes de vegetacion que acompanian la vida diaria. La serie refuerza la idea de un espacio familiar, flexible y preparado para recibir.",
  },
  {
    slug: "departamento-nexus",
    nombre: "Departamento Nexus",
    tipo: "Residencial",
    categoria: "residential",
    portada: "/images/estudio/casa-nexus-portada.avif",
    imagenes: makeProjectImages(
      "NEXUS (1).avif",
      "NEXUS (2).avif",
      "NEXUS (3).avif",
      "NEXUS (4).avif",
      "NEXUS (5).avif",
    ),
    descripcion:
      "El Departamento Nexus se concibio con una estetica sobria pensada para desarrolladoras e inversores. Las imagenes muestran ambientes integrados, carpinterias corredizas que abren el estar hacia el exterior y un diseno interior basado en neutros calidos, acentos en madera y luminarias lineales. Cada toma evidencia versatilidad programatica y el estandar de terminaciones que posiciona al proyecto dentro del segmento premium.",
  },
  {
    slug: "casa-kai",
    nombre: "Casa Kai",
    tipo: "Residencial",
    categoria: "residential",
    portada: "/images/estudio/casa-kai-portada.avif",
    imagenes: makeProjectImages(
      "KAI (1).avif",
      "KAI (2).avif",
      "KAI (3).avif",
      "KAI (4).avif",
      "KAI (5).avif",
    ),
    descripcion:
      "Casa Kai se presenta como un refugio contemporaneo que se abre al jardin mediante paneles vidriados y pergolas ligeras. El render exterior enfatiza planos de hormigon, pieles de madera y una pileta lineal que refleja la vivienda. Las vistas interiores explican como se articulan los espacios comunes con dobles alturas y mobiliario a medida, generando una atmosfera serena, luminosa y conectada con la naturaleza.",
  },
  {
    slug: "local-glam",
    nombre: "Local Glam",
    tipo: "Comercial",
    categoria: "commercial",
    portada: "/images/estudio/local-glam-portada.avif",
    imagenes: makeProjectImages(
      "GLAM (1).avif",
      "GLAM (2).avif",
      "GLAM (3).avif",
    ),
    descripcion:
      "Las visualizaciones de Local Glam trabajan un concepto de retail sofisticado, basado en estanterias curvas, espejos retroiluminados y materiales metalicos que realzan cada producto. Las escenas describen la circulacion fluida entre exhibidores, el efecto de la iluminacion escenografica y la identidad grafica integrada al espacio. El resultado transmite exclusividad y refuerza el posicionamiento comercial de la marca.",
  },
];
