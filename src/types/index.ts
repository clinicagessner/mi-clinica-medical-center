export interface Service {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  icon: string;
  image?: string;
  category: "especialidad" | "diagnostico" | "mujer" | "especial" | "otro";
  keywords: string[];
  features: string[];
  highlighted?: boolean;
  order: number;
}

export interface Promotion {
  id: string;
  title: string;
  badge: string;
  description: string;
  price?: string;
  originalPrice?: string;
  includes: string[];
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

