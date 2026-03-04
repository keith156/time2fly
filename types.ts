
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
  itinerary?: string;
  is_starred?: boolean; // Added for Special Offers
  category?: string; // New: Added for categorization
}

export interface Destination {
  id: string;
  name: string;
  image: string;
  details: string;
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

export interface LiveTicket {
  id: string;
  from: string;
  to: string;
  price_ugx?: number;
  price_usd_min?: number;
  price_usd_max?: number;
  trend: 'up' | 'down' | 'stable';
  city_image?: string;   // base64 or URL for the destination city photo
  dates?: string;        // free-text date range, e.g. "Thu. Feb 26 – Sun. Mar 01"
  airline?: string;      // carrier name, e.g. "Uganda Airlines"
  order_index?: number;
  is_available?: boolean;
  created_at?: string;
}
