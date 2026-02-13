import type {
  Service,
  Promotion,
  FAQ,
  ContactInfo,
  GreenCardFeature,
  BlogPost,
} from "@/types";

export const SITE_CONFIG = {
  name: "Clínica Hispana Nueva Salud Gessner",
  shortName: "Nueva Salud Gessner",
  tagline: "Clínica Hispana en Houston, TX",
  description:
    "Clínica Hispana Nueva Salud Gessner es la clínica hispana de confianza en Houston. Atención médica profesional en español para toda la familia. Exámenes médicos para Green Card (I-693) autorizados por USCIS.",
  baseUrl: "https://clinicagessner.com",
  locale: "es-MX",
} as const;

export const CONTACT_INFO: ContactInfo = {
  address: "1914 Gessner Rd B, Houston, TX 77080",
  phone: "+1 (346) 226-5820",
  hours: "Lunes a Domingo: 9:00 AM - 9:00 PM",
  googleMapsUrl:
    "https://www.google.com/maps/place/CLINICA+HISPANA+NUEVA+SALUD+GESSNER/@29.806681,-95.5442136,17z/data=!3m1!4b1!4m6!3m5!1s0x8640c4de999b36b5:0xdc9d14200d006777!8m2!3d29.806681!4d-95.5442136!16s%2Fg%2F11c58dkqrc?entry=ttu",
  googleReviewUrl:
    "https://search.google.com/local/writereview?placeid=ChIJtTabmd7EQIYRd2cADSAUndw",
};

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/miclinicamedicalcenter/",
  facebook: "https://www.facebook.com/people/Clinica-Hispana-Nueva-Salud-Gessner/61587230040182/",
} as const;

// SERVICES - Servicios médicos de la clínica
export const SERVICES: Service[] = [
  // ============================================
  // SERVICIOS PRINCIPALES
  // ============================================
  {
    id: "medicina-familiar",
    slug: "medicina-familiar",
    title: "Medicina Familiar Cerca de Mi",
    shortTitle: "Medicina Familiar",
    description:
      "Medicina familiar en nuestra clínica hispana de Houston. Atención médica integral para toda la familia en español.",
    longDescription:
      "En Clínica Hispana Nueva Salud Gessner ofrecemos medicina familiar completa para pacientes de todas las edades. Nuestros médicos hispanos brindan atención preventiva, diagnóstico y tratamiento de enfermedades comunes, todo 100% en español.",
    icon: "Stethoscope",
    image: "/images/services/family-medicine.webp",
    category: "especial",
    keywords: ["medicina familiar Houston", "médico familiar clínica hispana", "doctor de familia cerca de mi"],
    features: [
      "Atención para toda la familia",
      "Consultas en español",
      "Medicina preventiva",
      "Diagnóstico y tratamiento",
      "Seguimiento personalizado",
      "Sin cita previa",
    ],
    highlighted: true,
    order: 1,
  },
  {
    id: "examenes-inmigracion",
    slug: "examenes-inmigracion",
    title: "Exámenes Médicos de Inmigración",
    shortTitle: "Inmigración",
    description:
      "Clínica hispana autorizada por USCIS para exámenes I-693 en Houston. Médico Civil Surgeon certificado. Todo el proceso en español.",
    longDescription:
      "En Clínica Hispana Nueva Salud Gessner realizamos exámenes médicos de inmigración autorizados por USCIS. Nuestro médico Civil Surgeon certificado completa el formulario I-693 100% en español. Más de 500 familias han completado su proceso con nosotros.",
    icon: "FileCheck",
    image: "/images/services/immigration-exam.webp",
    category: "especial",
    keywords: ["examen Green Card Houston", "I-693 clínica hispana", "civil surgeon", "examen inmigración cerca de mi"],
    features: [
      "Médico Civil Surgeon certificado",
      "Formulario I-693 sellado",
      "100% en español",
      "Resultados en 3-5 días",
      "Análisis de sangre incluidos",
      "Revisión de vacunas",
    ],
    highlighted: true,
    order: 2,
  },
  {
    id: "enfermedades-transmision-sexual",
    slug: "enfermedades-transmision-sexual",
    title: "Enfermedades de Transmisión Sexual (STD)",
    shortTitle: "ETS/STD",
    description:
      "Pruebas y tratamiento de ETS/STD en la clínica hispana de Houston. Diagnóstico confidencial y tratamiento efectivo.",
    longDescription:
      "En Clínica Hispana Nueva Salud Gessner realizamos pruebas confidenciales de enfermedades de transmisión sexual. Diagnóstico y tratamiento en un ambiente de respeto y privacidad total.",
    icon: "TestTube",
    image: "/images/services/std-testing.webp",
    category: "diagnostico",
    keywords: ["prueba ETS Houston", "STD clínica hispana", "VIH test Houston"],
    features: [
      "Pruebas confidenciales",
      "VIH y Sífilis",
      "Clamidia y Gonorrea",
      "Herpes",
      "Resultados rápidos",
      "Tratamiento disponible",
    ],
    order: 3,
  },
  {
    id: "servicios-urologia",
    slug: "servicios-urologia",
    title: "Servicios de Urología",
    shortTitle: "Urología",
    description:
      "Servicios de urología en la clínica hispana de Houston. Atención especializada para hombres en español.",
    longDescription:
      "En Clínica Hispana Nueva Salud Gessner ofrecemos servicios de urología para el cuidado de la salud masculina. Diagnóstico y tratamiento de condiciones urinarias y reproductivas.",
    icon: "User",
    image: "/images/services/urology.webp",
    category: "especialidad",
    keywords: ["urología Houston", "urólogo clínica hispana", "salud masculina Houston"],
    features: [
      "Examen de próstata",
      "Infecciones urinarias",
      "Problemas de vejiga",
      "Salud reproductiva masculina",
      "Atención en español",
      "Consulta confidencial",
    ],
    order: 4,
  },
  {
    id: "condiciones-cronicas",
    slug: "condiciones-cronicas",
    title: "Manejo de Condiciones Crónicas",
    shortTitle: "Crónicas",
    description:
      "Control de enfermedades crónicas en la clínica hispana. Diabetes, hipertensión, colesterol y más.",
    longDescription:
      "En Clínica Hispana Nueva Salud Gessner ofrecemos manejo integral de condiciones crónicas como diabetes, hipertensión, colesterol alto y tiroides. Seguimiento personalizado en español.",
    icon: "Activity",
    image: "/images/services/chronic-conditions.webp",
    category: "especialidad",
    keywords: ["diabetes Houston", "hipertensión clínica hispana", "enfermedades crónicas Houston"],
    features: [
      "Control de diabetes",
      "Manejo de hipertensión",
      "Control de colesterol",
      "Problemas de tiroides",
      "Monitoreo regular",
      "Orientación nutricional",
    ],
    highlighted: true,
    order: 5,
  },
  {
    id: "laboratorio",
    slug: "laboratorio",
    title: "Chequeo y Análisis de Laboratorio",
    shortTitle: "Laboratorio",
    description:
      "Análisis de laboratorio en la clínica hispana de Houston. Resultados rápidos y precisos.",
    longDescription:
      "En Clínica Hispana Nueva Salud Gessner contamos con laboratorio clínico completo. Análisis de sangre, orina, perfil lipídico y más con resultados rápidos.",
    icon: "TestTube",
    image: "/images/services/laboratorio.webp",
    category: "diagnostico",
    keywords: ["laboratorio Houston", "análisis de sangre clínica hispana", "exámenes de laboratorio Houston"],
    features: [
      "Análisis de sangre completo",
      "Perfil lipídico",
      "Glucosa y A1C",
      "Análisis de orina",
      "Resultados rápidos",
      "Interpretación en español",
    ],
    order: 6,
  },
  {
    id: "ultrasonido",
    slug: "ultrasonido",
    title: "Ultrasonido",
    shortTitle: "Ultrasonido",
    description:
      "Ultrasonidos en la clínica hispana de Houston. Embarazo, abdominal, pélvico y más con resultados inmediatos.",
    longDescription:
      "En Clínica Hispana Nueva Salud Gessner ofrecemos ultrasonidos con tecnología moderna. Ultrasonidos de embarazo, abdominales, pélvicos y renales con interpretación en español.",
    icon: "Monitor",
    image: "/images/services/ultrasound.webp",
    category: "diagnostico",
    keywords: ["ultrasonido Houston", "ecografía clínica hispana", "ultrasonido embarazo Houston"],
    features: [
      "Ultrasonido de embarazo",
      "Ultrasonido abdominal",
      "Ultrasonido pélvico",
      "Resultados inmediatos",
      "Tecnología moderna",
      "Interpretación en español",
    ],
    highlighted: true,
    order: 7,
  },
  {
    id: "servicios-ginecologia",
    slug: "servicios-ginecologia",
    title: "Servicios de Ginecología",
    shortTitle: "Ginecología",
    description:
      "Ginecología en la clínica hispana de Houston. Atención integral para la salud de la mujer en español.",
    longDescription:
      "En Clínica Hispana Nueva Salud Gessner ofrecemos servicios ginecológicos completos. Papanicolaou, exámenes de mama, salud reproductiva y más con ginecólogos que hablan español.",
    icon: "Heart",
    image: "/images/services/gynecology.webp",
    category: "mujer",
    keywords: ["ginecología Houston", "ginecólogo español Houston", "salud femenina clínica hispana"],
    features: [
      "Papanicolaou",
      "Examen de mama",
      "Salud reproductiva",
      "Consulta ginecológica",
      "Ginecólogos en español",
      "Ambiente confidencial",
    ],
    highlighted: true,
    order: 8,
  },
  {
    id: "planificacion-familiar",
    slug: "planificacion-familiar",
    title: "Planificación Familiar",
    shortTitle: "Planificación",
    description:
      "Planificación familiar en la clínica hispana de Houston. Asesoría sobre métodos anticonceptivos.",
    longDescription:
      "En Clínica Hispana Nueva Salud Gessner ofrecemos asesoría completa sobre métodos anticonceptivos. Nuestros especialistas te orientan sobre las mejores opciones para tu estilo de vida.",
    icon: "Heart",
    image: "/images/services/family-planning.webp",
    category: "mujer",
    keywords: ["planificación familiar Houston", "anticonceptivos clínica hispana", "métodos anticonceptivos Houston"],
    features: [
      "Asesoría personalizada",
      "Anticonceptivos orales",
      "Inyecciones anticonceptivas",
      "DIU",
      "Implantes hormonales",
      "Seguimiento médico",
    ],
    order: 9,
  },
  {
    id: "vacunas-anticonceptivas",
    slug: "vacunas-anticonceptivas",
    title: "Vacunas Anticonceptivas",
    shortTitle: "Anticonceptivas",
    description:
      "Inyecciones anticonceptivas en la clínica hispana de Houston. Método seguro y efectivo.",
    longDescription:
      "En Clínica Hispana Nueva Salud Gessner aplicamos inyecciones anticonceptivas como Depo-Provera. Método seguro, efectivo y discreto para el control de la natalidad.",
    icon: "Pill",
    image: "/images/services/contraceptive-injection.webp",
    category: "mujer",
    keywords: ["inyección anticonceptiva Houston", "Depo-Provera clínica hispana", "anticonceptivo inyectable Houston"],
    features: [
      "Inyección Depo-Provera",
      "Protección por 3 meses",
      "Método discreto",
      "Alta efectividad",
      "Aplicación rápida",
      "Seguimiento médico",
    ],
    order: 10,
  },
  {
    id: "extraccion-implantes",
    slug: "extraccion-implantes",
    title: "Extracción de Implantes",
    shortTitle: "Implantes",
    description:
      "Extracción de implantes anticonceptivos en la clínica hispana de Houston. Procedimiento rápido y seguro.",
    longDescription:
      "En Clínica Hispana Nueva Salud Gessner realizamos extracción de implantes hormonales anticonceptivos como Nexplanon de forma segura y profesional.",
    icon: "Pill",
    image: "/images/services/implant-removal.webp",
    category: "mujer",
    keywords: ["extracción implante Houston", "Nexplanon clínica hispana", "remover implante anticonceptivo Houston"],
    features: [
      "Procedimiento seguro",
      "Personal capacitado",
      "Mínimas molestias",
      "Anestesia local",
      "Cuidados post-extracción",
      "Opciones anticonceptivas",
    ],
    order: 11,
  },
  {
    id: "electrocardiograma",
    slug: "electrocardiograma",
    title: "Electrocardiograma",
    shortTitle: "EKG",
    description:
      "Electrocardiograma (EKG) en la clínica hispana de Houston. Evaluación del ritmo cardíaco.",
    longDescription:
      "En Clínica Hispana Nueva Salud Gessner realizamos electrocardiogramas para evaluar la salud de tu corazón. Diagnóstico rápido de arritmias y otras condiciones cardíacas.",
    icon: "Heart",
    image: "/images/services/electrocardiogram.webp",
    category: "diagnostico",
    keywords: ["electrocardiograma Houston", "EKG clínica hispana", "examen cardíaco Houston"],
    features: [
      "EKG de 12 derivaciones",
      "Resultados inmediatos",
      "Detección de arritmias",
      "Evaluación cardíaca",
      "Interpretación médica",
      "Referido si es necesario",
    ],
    order: 12,
  },
  {
    id: "enfermedades-respiratorias",
    slug: "enfermedades-respiratorias",
    title: "Enfermedades Respiratorias",
    shortTitle: "Respiratorias",
    description:
      "Tratamiento de enfermedades respiratorias en la clínica hispana de Houston. Gripa, bronquitis, sinusitis y más.",
    longDescription:
      "En Clínica Hispana Nueva Salud Gessner tratamos enfermedades respiratorias como gripa, bronquitis, sinusitis, neumonía y asma. Diagnóstico rápido y tratamiento efectivo.",
    icon: "Activity",
    image: "/images/services/respiratory.webp",
    category: "otro",
    keywords: ["gripa Houston", "bronquitis clínica hispana", "enfermedades respiratorias Houston"],
    features: [
      "Diagnóstico rápido",
      "Tratamiento de gripa",
      "Bronquitis y sinusitis",
      "Neumonía",
      "Control de asma",
      "Medicamentos recetados",
    ],
    order: 13,
  },
  {
    id: "infecciones-urinarias",
    slug: "infecciones-urinarias",
    title: "Infecciones Urinarias",
    shortTitle: "Urinarias",
    description:
      "Tratamiento de infecciones urinarias en la clínica hispana de Houston. Diagnóstico preciso y alivio rápido.",
    longDescription:
      "En Clínica Hispana Nueva Salud Gessner diagnosticamos y tratamos infecciones del tracto urinario con análisis de orina y tratamiento antibiótico efectivo.",
    icon: "Pill",
    image: "/images/services/urinary-infections.webp",
    category: "otro",
    keywords: ["infección urinaria Houston", "cistitis clínica hispana", "UTI Houston"],
    features: [
      "Análisis de orina",
      "Diagnóstico rápido",
      "Tratamiento antibiótico",
      "Alivio de síntomas",
      "Prevención de recurrencia",
      "Seguimiento médico",
    ],
    order: 14,
  },
  {
    id: "infecciones-vaginales",
    slug: "infecciones-vaginales",
    title: "Infecciones Vaginales",
    shortTitle: "Vaginales",
    description:
      "Tratamiento de infecciones vaginales en la clínica hispana de Houston. Atención confidencial y efectiva.",
    longDescription:
      "En Clínica Hispana Nueva Salud Gessner ofrecemos diagnóstico y tratamiento de infecciones vaginales en un ambiente de confianza y privacidad.",
    icon: "Heart",
    image: "/images/services/vaginal-infections.webp",
    category: "mujer",
    keywords: ["infección vaginal Houston", "candidiasis clínica hispana", "vaginitis Houston"],
    features: [
      "Diagnóstico preciso",
      "Tratamiento efectivo",
      "Candidiasis",
      "Vaginosis bacteriana",
      "Atención confidencial",
      "Seguimiento médico",
    ],
    order: 15,
  },
  {
    id: "examen-dot",
    slug: "examen-dot",
    title: "Examen Médico DOT",
    shortTitle: "DOT",
    description:
      "Examen médico DOT en la clínica hispana de Houston. Certificación para conductores comerciales.",
    longDescription:
      "En Clínica Hispana Nueva Salud Gessner realizamos exámenes médicos DOT para conductores comerciales. Certificación requerida para licencias CDL.",
    icon: "FileCheck",
    image: "/images/services/dot-exam.webp",
    category: "especial",
    keywords: ["examen DOT Houston", "físico CDL clínica hispana", "certificación DOT Houston"],
    features: [
      "Examen DOT completo",
      "Certificación médica",
      "Evaluación de vista",
      "Evaluación de audición",
      "Análisis de orina",
      "Tarjeta médica DOT",
    ],
    order: 16,
  },
  {
    id: "examenes-generales",
    slug: "examenes-generales",
    title: "Exámenes Generales",
    shortTitle: "Generales",
    description:
      "Exámenes médicos generales en la clínica hispana de Houston. Chequeos de salud completos.",
    longDescription:
      "En Clínica Hispana Nueva Salud Gessner realizamos exámenes médicos generales y chequeos de salud completos. Físicos escolares, deportivos y de empleo.",
    icon: "Stethoscope",
    image: "/images/services/general-exams.webp",
    category: "especial",
    keywords: ["examen médico Houston", "chequeo de salud clínica hispana", "físico escolar Houston"],
    features: [
      "Examen físico completo",
      "Físicos escolares",
      "Físicos deportivos",
      "Exámenes de empleo",
      "Análisis de sangre",
      "Resultados el mismo día",
    ],
    order: 17,
  },
  {
    id: "dolores-musculares",
    slug: "dolores-musculares",
    title: "Dolores Musculares",
    shortTitle: "Musculares",
    description:
      "Tratamiento de dolores musculares en la clínica hispana de Houston. Alivio rápido y efectivo.",
    longDescription:
      "En Clínica Hispana Nueva Salud Gessner tratamos dolores musculares, esguinces y lesiones menores. Diagnóstico preciso y tratamiento para tu pronta recuperación.",
    icon: "User",
    image: "/images/services/muscle-pain.webp",
    category: "otro",
    keywords: ["dolor muscular Houston", "esguince clínica hispana", "dolor de espalda Houston"],
    features: [
      "Evaluación del dolor",
      "Tratamiento antiinflamatorio",
      "Inyecciones para el dolor",
      "Relajantes musculares",
      "Terapia de calor/frío",
      "Recomendaciones de ejercicio",
    ],
    order: 18,
  },
];

// Helper function to get service by slug
export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

// Helper function to get highlighted services
export function getHighlightedServices(): Service[] {
  return SERVICES.filter((service) => service.highlighted);
}

// Helper function to get services by category
export function getServicesByCategory(
  category: Service["category"]
): Service[] {
  return SERVICES.filter((service) => service.category === category);
}

export const PROMOTIONS: Promotion[] = [
  {
    id: "ginecologia",
    title: "Consulta con Ginecólogo que Habla Español",
    badge: "¡Más Popular!",
    description:
      "En nuestra clínica hispana, ginecólogos certificados que hablan español te atienden con profesionalismo y calidez. Más de 500 pacientes atendidas.",
    price: "$75",
    originalPrice: "$120",
    includes: [
      "Consulta ginecológica completa",
      "Evaluación de salud femenina",
      "Orientación en español",
      "Seguimiento personalizado",
    ],
  },
  {
    id: "inmigracion",
    title: "Exámenes Médicos de Inmigración",
    badge: "Precio Especial",
    description:
      "Clínica hispana autorizada para exámenes de inmigración. Todo el proceso en español con médico Civil Surgeon certificado.",
    price: "$200",
    originalPrice: "$275",
    includes: [
      "Examen físico completo",
      "Análisis de sangre requeridos",
      "Formulario I-693 sellado",
      "Médico Civil Surgeon certificado",
    ],
  },
  {
    id: "ultrasonido-embarazo",
    title: "Ultrasonido de Embarazo",
    badge: "Oferta Limitada",
    description:
      "En nuestra clínica hispana familiar, ultrasonidos de embarazo con tecnología moderna y atención en español.",
    price: "$85",
    originalPrice: "$130",
    includes: [
      "Ultrasonido obstétrico",
      "Imágenes para llevar",
      "Interpretación médica",
      "Seguimiento prenatal",
    ],
  },
];

export const GREEN_CARD_FEATURES: GreenCardFeature[] = [
  { id: "1", text: "Médico Civil Surgeon certificado por USCIS", included: true },
  { id: "2", text: "Formulario I-693 completado y sellado", included: true },
  { id: "3", text: "Examen físico completo", included: true },
  { id: "4", text: "Análisis de sangre requeridos", included: true },
  { id: "5", text: "Historial de vacunas revisado", included: true },
  { id: "6", text: "Resultados en 3-5 días hábiles", included: true },
  { id: "7", text: "Atención 100% en español", included: true },
  { id: "8", text: "Sin cita previa necesaria", included: true },
];

export const FAQS: FAQ[] = [
  {
    question:
      "¿Clínica Hispana Nueva Salud Gessner es una clínica hispana con atención en español?",
    answer:
      "Sí, Clínica Hispana Nueva Salud Gessner es una clínica hispana ubicada en Houston, TX. Todo nuestro personal habla español y ofrecemos atención médica completamente en tu idioma para que te sientas cómodo y comprendido durante tu visita.",
  },
  {
    question: "¿Qué servicios ofrece esta clínica hispana en Houston?",
    answer:
      "Nuestra clínica hispana ofrece medicina general, ginecología, pediatría, laboratorio clínico, ultrasonido, exámenes de Green Card I-693, urgencias menores y control de enfermedades crónicas. Todos los servicios están disponibles en español.",
  },
  {
    question:
      "¿Necesito cita para visitar la clínica hispana Clínica Hispana Nueva Salud Gessner?",
    answer:
      "Aceptamos pacientes con y sin cita en nuestra clínica hispana. Sin embargo, recomendamos agendar una cita para reducir el tiempo de espera. Puede llamar al +1 (346) 226-5820.",
  },
  {
    question: "¿Cuál es el horario de atención de la clínica hispana?",
    answer:
      "Nuestra clínica hispana en Houston está abierta de Lunes a Domingo de 9:00 AM a 9:00 PM. Ofrecemos horarios extendidos para que pueda visitarnos después del trabajo o los fines de semana.",
  },
  {
    question:
      "¿La clínica hispana está autorizada para exámenes de Green Card I-693?",
    answer:
      "Sí, Clínica Hispana Nueva Salud Gessner es una clínica hispana autorizada por USCIS para realizar exámenes médicos de inmigración I-693. Contamos con un médico Civil Surgeon certificado que completa y sella el formulario oficial.",
  },
  {
    question:
      "¿Cuánto cuesta una consulta médica en la clínica hispana Clínica Hispana Nueva Salud Gessner?",
    answer:
      "Las consultas médicas generales en nuestra clínica hispana comienzan desde $50. Ofrecemos precios accesibles y planes de pago para que toda la comunidad hispana de Houston tenga acceso a atención médica de calidad.",
  },
  {
    question: "¿La clínica hispana acepta seguro médico?",
    answer:
      "Nuestra clínica hispana trabaja con varios seguros médicos. Le recomendamos llamarnos al +1 (346) 226-5820 para verificar si aceptamos su seguro. También ofrecemos precios especiales para pacientes sin seguro.",
  },
  {
    question: "¿Dónde está ubicada la clínica hispana Clínica Hispana Nueva Salud Gessner?",
    answer:
      "Nuestra clínica hispana está ubicada en 1914 Gessner Rd B, Houston, TX 77080. Estamos en una ubicación conveniente con amplio estacionamiento gratuito para nuestros pacientes.",
  },
];

export const LOCATION_FEATURES = [
  "Estacionamiento gratuito",
  "Accesible para sillas de ruedas",
  "Cerca de transporte público",
  "Área segura y bien iluminada",
];

// BLOG POSTS
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "bienvenidos-nueva-pagina-web",
    publishedAt: "2026-02-07",
    image: "/images/logo.webp",
    author: {
      name: "Equipo Nueva Salud Gessner",
      role: "Administración",
    },
    keywords: [
      "clínica hispana Houston",
      "nueva página web",
      "Nueva Salud Gessner",
      "atención médica español Houston",
    ],
    featured: true,
  },
];

// Helper function to get blog post by slug
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

// Helper function to get featured blog posts
export function getFeaturedBlogPosts(): BlogPost[] {
  return BLOG_POSTS.filter((post) => post.featured);
}

