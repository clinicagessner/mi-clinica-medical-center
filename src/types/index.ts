export interface Service {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  icon: string;
  image?: string;
  category: ServiceCategory;
  keywords: string[];
  features: string[];
  highlighted?: boolean;
  order: number;
}

export type ServiceCategory =
  | "medicina-general"
  | "salud-mujer"
  | "examenes"
  | "laboratorio"
  | "tratamientos";

export interface ServiceFaq {
  question: string;
  answer: string;
  questionEn: string;
  answerEn: string;
}

export interface Promotion {
  slug: string;
  title: string;
  titleEn: string;
  price: string | null;
  blurb: string;
  blurbEn: string;
  includes: string[];
  includesEn: string[];
  alt: string;
  altEn: string;
}

export interface Testimonial {
  id: string;
  name: string;
  service: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  quote: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  hours: string;
  googleMapsUrl: string;
  googleReviewUrl: string;
}

export interface GreenCardFeature {
  id: string;
  text: string;
  included: boolean;
}

export interface BlogPost {
  slug: string;
  publishedAt: string;
  image?: string;
  author: {
    name: string;
    role: string;
  };
  keywords: string[];
  featured?: boolean;
}

