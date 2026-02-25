
import React from 'react';
import { Plane, Hotel, Map, Shield, Globe, Landmark, Clock, Award, Compass, Ship, GraduationCap, Car, Briefcase, Zap } from 'lucide-react';
import { Service, Package, BlogPost, Testimonial, Destination, LiveTicket } from './types';

export const APP_VERSION = '2.1-DEBUG';

export const PACKAGE_CATEGORIES = [
  { name: 'Holiday Escapes', icon: '🏖️' },
  { name: 'Romantic Retreats', icon: '💖' },
  { name: 'Family Getaways', icon: '👨‍👩‍👧‍👦' },
  { name: 'Business Travel', icon: '💼' },
  { name: 'Religious / Pilgrimage Travel', icon: '🕌' },
  { name: 'Safari Adventures', icon: '🐘' }
];

export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Reservations',
    description: 'Local, regional, and international flight and accommodation bookings tailored to your itinerary.',
    icon: 'Plane',
    image: 'https://images.unsplash.com/photo-1540553016722-983e48a2cd10?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: '24h Emergency Reservations',
    description: 'Round-the-clock support for urgent travel changes and last-minute bookings wherever you are.',
    icon: 'Clock',
    image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    title: 'Adventure Sports',
    description: 'Thrilling water rafting and bungee jumping experiences at world-famous locations.',
    icon: 'Zap',
    image: '/assets/adventure-sports.jpg'
  },
  {
    id: '4',
    title: 'Wildlife Tracking',
    description: 'Exclusive Gorilla and Chimpanzee tracking expeditions in the heart of the pearl of Africa.',
    icon: 'Compass',
    image: 'https://images.unsplash.com/photo-1547407139-3c921a66005c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '5',
    title: 'Visa Advice & Assistance',
    description: 'Expert guidance through complex visa requirements and documentation for smooth international travel.',
    icon: 'Globe',
    image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '6',
    title: 'Charter Arrangements',
    description: 'Private charter services for groups, corporate events, or individual luxury travel requirements.',
    icon: 'Ship',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '7',
    title: 'Educational Tours',
    description: 'Specially curated learning journeys for schools and institutions focusing on culture and history.',
    icon: 'GraduationCap',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '8',
    title: 'Car Hire & Hotels',
    description: 'Seamless integration of ground transportation and premium hotel stays at your destination.',
    icon: 'Car',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '9',
    title: 'Ticketing Services',
    description: 'Automated ticketing and pre-paid ticketing services across all major airline carriers.',
    icon: 'Briefcase',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800'
  }
];

export const PACKAGES: Package[] = [
  // Holiday Packages
  {
    id: 'h1',
    destination: 'Maldives Crystal Waters',
    price: 1500,
    duration: '5 Days',
    description: 'Experience pure bliss in overwater villas with private lagoons and sunset dinners.',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800',
    rating: 5,
    category: 'Holiday Escapes'
  },
  {
    id: 'h2',
    destination: 'Swiss Alps Ski Retreat',
    price: 2200,
    duration: '7 Days',
    description: 'Breathtaking mountain views, world-class skiing, and cozy alpine chalets.',
    image: 'https://images.unsplash.com/photo-1502901664700-f56a7d1da021?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    category: 'Holiday Escapes'
  },
  // Honeymoon Packages
  {
    id: 'hm1',
    destination: 'Santorini Romance',
    price: 3200,
    duration: '6 Days',
    description: 'Iconic blue domes, private infinity pools, and the world\'s most beautiful sunsets.',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=800',
    rating: 5,
    category: 'Romantic Retreats'
  },
  {
    id: 'hm2',
    destination: 'Bora Bora Luxury',
    price: 4500,
    duration: '5 Days',
    description: 'The ultimate honeymoon destination with turquoise waters and unmatched privacy.',
    image: 'https://images.unsplash.com/photo-1543731068-7e0f5beff43a?auto=format&fit=crop&q=80&w=1200',
    rating: 5,
    category: 'Romantic Retreats'
  },
  // Family Packages
  {
    id: 'f1',
    destination: 'Disneyland Adventure',
    price: 3800,
    duration: '5 Days',
    description: 'Magical experiences for all ages with premium theme park access and themed resorts.',
    image: 'https://images.unsplash.com/photo-1502139214982-d0ad755818d8?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    category: 'Family Getaways'
  },
  {
    id: 'f2',
    destination: 'Diani Beach Family Fun',
    price: 1200,
    duration: '4 Days',
    description: 'White sands and turquoise waters perfect for family bonding and water sports.',
    image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    category: 'Family Getaways'
  },
  // Corporate Travel
  {
    id: 'c1',
    destination: 'Dubai Tech Retreat',
    price: 1800,
    duration: '3 Days',
    description: 'High-end networking events in the heart of Dubai\'s business district.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800',
    rating: 4.5,
    category: 'Business Travel'
  },
  {
    id: 'c2',
    destination: 'Singapore Business Summit',
    price: 2500,
    duration: '4 Days',
    description: 'Sophisticated venues and world-class hospitality for your corporate team.',
    image: 'https://images.unsplash.com/photo-1525625239513-35327b9c56b0?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    category: 'Business Travel'
  },
  // Religious / Pilgrimage Travel
  {
    id: 'r1',
    destination: 'Jerusalem Holy Land',
    price: 2800,
    duration: '10 Days',
    description: 'A spiritual journey through the most sacred sites in history.',
    image: 'https://images.unsplash.com/photo-1542820229-081e0c12af0b?auto=format&fit=crop&q=80&w=800',
    rating: 5,
    category: 'Religious / Pilgrimage Travel'
  },
  {
    id: 'r2',
    destination: 'Lourdes & Fatima',
    price: 3100,
    duration: '12 Days',
    description: 'Guided pilgrimage to the most revered Marian shrines in Europe.',
    image: 'https://images.unsplash.com/photo-1548183300-336306e00ed0?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    category: 'Religious / Pilgrimage Travel'
  },
  // Safari & Adventure
  {
    id: 's1',
    destination: 'Serengeti Big Five Safari',
    price: 2400,
    duration: '5 Days',
    description: 'Witness the Great Migration and the majestic Big Five in their natural habitat.',
    image: '/assets/regal-african-safaris-gwZAmtRwxBI-unsplash.jpg',
    rating: 5,
    category: 'Safari Adventures'
  },
  {
    id: 's2',
    destination: 'Bwindi Gorilla Trekking',
    price: 1500,
    duration: '3 Days',
    description: 'An intimate encounter with the rare mountain gorillas in the Impenetrable Forest.',
    image: 'https://images.unsplash.com/photo-1547407139-3c921a66005c?auto=format&fit=crop&q=80&w=800',
    rating: 5,
    category: 'Safari Adventures'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b-seo-1',
    title: 'Why Uganda is the Ultimate Safari Destination for 2026',
    excerpt: 'Discover why the Pearl of Africa is topping the charts for safari enthusiasts in the coming year, from mountain gorillas to the Big Five.',
    content: `Uganda, often referred to as the "Pearl of Africa," is poised to be the premier destination for travelers in 2026. This landlocked gem offers an diversity of wildlife and landscapes that few other places on earth can match.

### The Majestic Mountain Gorillas
Bwindi Impenetrable National Park remains the best place in the world to encounter mountain gorillas in their natural habitat. With conservation efforts proving successful, 2026 offers more opportunities for intimate trekking experiences that directly support local communities.

### The Big Five and Beyond
While Murchison Falls and Queen Elizabeth National Park offer the classic Big Five experience, Uganda adds a unique twist with the tree-climbing lions of Ishasha. The dramatic Murchison Falls, where the world's longest river squeezes through a seven-meter gap, is a sensory experience you won't find anywhere else.

### Sustainable and Authentic Travel
The trend for 2026 is moving away from overcrowded tourist hotspots. Uganda's commitment to low-impact tourism and authentic community engagement makes it the perfect choice for the conscious traveler. Whether you're birdwatching in the wetlands or exploring the snow-capped Rwenzori Mountains, you're experiencing Africa at its most raw and beautiful.`,
    image: '/assets/regal-african-safaris-gwZAmtRwxBI-unsplash.jpg',
    date: 'February 24, 2026',
    author: 'Time2Fly Expert',
    category: 'Safari Adventures'
  },
  {
    id: 'b-seo-2',
    title: 'The Most Romantic Getaways in East Africa',
    excerpt: 'From private islands in the Maldives to secluded luxury lodges in the savannah, explore the ultimate honeymoon destinations.',
    content: `East Africa and its surrounding islands offer some of the most romantic settings on the planet. For couples looking to celebrate their union, the choices are as diverse as they are breathtaking.

### The White Sands of Diani and Zanzibar
There is nothing quite like a beach honeymoon in East Africa. The turquoise waters and powdery white sands of Diani Beach and Zanzibar provide the perfect backdrop for relaxation and romance. Sunset dhow cruises and private beach dinners under the stars are staples of the experience.

### Luxury in the Wild
For those who find romance in adventure, a luxury safari lodge offers an unparalleled experience. Imagine waking up to the sounds of the bush and enjoying a private breakfast as elephants graze in the distance. Many lodges now offer "star beds," allowing couples to sleep safely under the vast African sky.

### Intimacy and Personalization
At Time2Fly, we specialize in tailoring these journeys to each couple's specific desires. Whether it's a helicopter ride over the Victoria Nile or a private aromatherapy session in the heart of the forest, we ensure that every detail contributes to a lifetime of memories.`,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1200',
    date: 'February 20, 2026',
    author: 'Romantic Consultant',
    category: 'Romantic Retreats'
  },
  {
    id: 'b-seo-3',
    title: 'Strategies for Modern Business Travel Management',
    excerpt: 'Optimizing corporate travel in 2026 requires a balance of technology, efficiency, and employee well-being.',
    content: `Business travel is evolving rapidly. In 2026, corporate travel management is no longer just about booking the cheapest flight; it's about strategic optimization of time, budget, and human resources.

### The Rise of "Bleisure"
One of the most significant trends we're seeing is the integration of business and leisure travel. Companies that allow employees to extend their trips for personal exploration often see higher morale and retention. Managing this "bleisure" transition seamlessly is where an expert agency adds immense value.

### Technology and Duty of Care
In an increasingly complex global landscape, the safety of employees is paramount. Modern travel management platforms provide real-time tracking, instant alerts, and 24/7 support. This "Duty of Care" is a legal and moral obligation that businesses must prioritize.

### Cost Optimization Beyond the Ticket Price
True savings come from comprehensive policy management and exclusive corporate rates. By partnering with Time2Fly, businesses gain access to preferred status with airlines and hotels that isn't available to the general public. We don't just reduce costs; we maximize the return on your travel investment.`,
    image: 'https://images.unsplash.com/photo-1554774853-719586f82d77?auto=format&fit=crop&q=80&w=1200',
    date: 'February 15, 2026',
    author: 'Corporate Lead',
    category: 'Business Travel'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Namaganda Joy',
    role: 'Couple Traveller',
    review: 'Time2Fly made our family safari in Murchison Falls absolutely unforgettable. Every detail was handled with such care.',
    rating: 5,
    avatar: '/assets/avatars/namaganda_joy.png'
  },
  {
    id: '2',
    name: 'Sarah Ndagire',
    role: 'Business Traveller',
    review: 'The 24/7 support is real. They helped me rebook my flight at 3 AM when my plans changed. Highly recommended!',
    rating: 5,
    avatar: '/assets/avatars/sarah_ndagire.png'
  },
  {
    id: '3',
    name: 'Wandera Caleb',
    role: 'Adventure Seeker',
    review: 'Professional, reliable, and truly knowledgeable about East African travel. Best agency I have worked with.',
    rating: 5,
    avatar: '/assets/avatars/wandera_caleb.png'
  },
  {
    id: '4',
    name: 'Nimusiima Anita',
    role: 'Cultural Explorer',
    review: 'From visa advice to mountain gorilla permits, they made the complex feel simple. Thank you for the trip of a lifetime!',
    rating: 5,
    avatar: '/assets/avatars/nimusiima_anita.png'
  },
  {
    id: '5',
    name: 'Keith J',
    role: 'Executive Platinum',
    review: 'Exceptional service and attention to detail. Every trip I have booked with Time2Fly has been a masterclass in travel management.',
    rating: 5,
    avatar: '/assets/avatars/keith_j.jpg'
  }
];

export const DESTINATIONS: Destination[] = [];

export const PARTNERS = [
  { name: 'Emirates', logo: 'https://www.logo.wine/a/logo/Emirates_(airline)/Emirates_(airline)-Logo.wine.svg' },
  { name: 'Air France', logo: 'https://www.logo.wine/a/logo/Air_France/Air_France-Logo.wine.svg' },
  { name: 'Flydubai', logo: 'https://www.logo.wine/a/logo/Flydubai/Flydubai-Logo.wine.svg' },
  { name: 'EgyptAir', logo: 'https://www.logo.wine/a/logo/EgyptAir/EgyptAir-Logo.wine.svg' },
  { name: 'Jambojet', logo: '/assets/image-removebg-preview.png' },
  { name: 'Qatar Airways', logo: 'https://www.logo.wine/a/logo/Qatar_Airways/Qatar_Airways-Logo.wine.svg' },
  { name: 'Turkish Airlines', logo: 'https://www.logo.wine/a/logo/Turkish_Airlines/Turkish_Airlines-Logo.wine.svg', scale: 1.5 },
  { name: 'Ethiopian Airlines', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Ethiopian_Airlines_Logo.svg/1024px-Ethiopian_Airlines_Logo.svg.png', scale: 1.5 },
  { name: 'Kenya Airways', logo: 'https://www.logo.wine/a/logo/Kenya_Airways/Kenya_Airways-Logo.wine.svg', scale: 1.5 },
  { name: 'Uganda Airlines', logo: '/assets/uganda-airlines-logo.png' },
  { name: 'KLM Royal Dutch', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/KLM_logo.svg', scale: 0.6 },
  { name: 'Lufthansa', logo: 'https://www.logo.wine/a/logo/Lufthansa/Lufthansa-Logo.wine.svg', scale: 1.6 },
  { name: 'British Airways', logo: 'https://www.logo.wine/a/logo/British_Airways/British_Airways-Logo.wine.svg', scale: 1.5 },
  { name: 'Brussels Airlines', logo: '/assets/brussel-logo.svg', scale: 0.8 },
  { name: 'South African Airways', logo: '/assets/South_African_Airways-Logo.wine.svg', scale: 1.7 },
  { name: 'RwandAir', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/RwandAir_logo.svg/1024px-RwandAir_logo.svg.png', scale: 1.5 }
];

export const DUMMY_TICKETS: LiveTicket[] = [
  { id: 'd1', from: 'Entebbe', to: 'Dubai', price_ugx: 1850000, price_usd_min: 480, price_usd_max: 520, trend: 'down', airline: 'Emirates', dates: 'Mon. Mar 03 – Fri. Mar 07' },
  { id: 'd2', from: 'Entebbe', to: 'Nairobi', price_ugx: 950000, price_usd_min: 240, price_usd_max: 270, trend: 'stable', airline: 'Kenya Airways', dates: 'Thu. Mar 06 – Sun. Mar 09' },
  { id: 'd3', from: 'Entebbe', to: 'Istanbul', price_ugx: 2400000, price_usd_min: 620, price_usd_max: 680, trend: 'up', airline: 'Turkish Airlines', dates: 'Sat. Mar 08 – Sat. Mar 15' },
  { id: 'd4', from: 'Entebbe', to: 'Johannesburg', price_ugx: 1600000, price_usd_min: 410, price_usd_max: 450, trend: 'down', airline: 'South African Airways', dates: 'Tue. Mar 11 – Sat. Mar 15' },
  { id: 'd5', from: 'Entebbe', to: 'London', price_ugx: 3200000, price_usd_min: 820, price_usd_max: 890, trend: 'stable', airline: 'British Airways', dates: 'Fri. Mar 14 – Fri. Mar 21' },
];
