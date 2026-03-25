export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  biomarkers: string[];
  biomarkerCount: number;
  turnaroundDays: string;
  sampleType: string;
  featured: boolean;
  badge?: string;
  color: "coral" | "teal" | "purple" | "sunny";
}

export type ProductCategory =
  | "general"
  | "hormones"
  | "heart"
  | "nutrition"
  | "thyroid"
  | "sports"
  | "sexual-health"
  | "cancer"
  | "single-biomarker"
  | "comprehensive";

export interface Testimonial {
  id: string;
  name: string;
  age: number;
  role: string;
  quote: string;
  rating: number;
  avatar: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Step {
  number: number;
  title: string;
  description: string;
  icon: string;
}

export interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
