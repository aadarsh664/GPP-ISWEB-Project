export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  imageUrl: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  options: string[];
  images: Record<string, string>;
  brands: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  designation: string;
  content: string;
  avatarUrl?: string;
}

export interface WhyChooseUsCard {
  id: string;
  title: string;
  icon: string;
  content: string;
}
