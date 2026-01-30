
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
}

export interface Package {
  id: string;
  destination: string;
  price: number;
  duration: string;
  description: string;
  image: string;
  rating: number;
  itinerary?: string; // Added for admin management
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string; // Added for full blog reading
  date: string;
  author: string;
  image: string;
  category: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  review: string;
  avatar: string;
  rating: number;
}
