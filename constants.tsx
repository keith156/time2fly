
import React from 'react';
import { Plane, Hotel, Map, Shield, Globe, Landmark, Clock, Award, Compass, Ship, GraduationCap, Car, Briefcase, Zap } from 'lucide-react';
import { Service, Package, BlogPost, Testimonial, Destination, LiveTicket } from './types';

export const APP_VERSION = '2.1-DEBUG';

export const PACKAGE_CATEGORIES = [
  { name: 'Holiday Packages', icon: '✈️' },
  { name: 'Honeymoon Packages', icon: '💍' },
  { name: 'Family Packages', icon: '👨‍👩‍👧‍👦' },
  { name: 'Corporate Travel', icon: '🏢' },
  { name: 'Religious / Pilgrimage Travel', icon: '🕌' },
  { name: 'Safari & Adventure', icon: '🐘' }
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
    category: 'Holiday Packages'
  },
  {
    id: 'h2',
    destination: 'Swiss Alps Ski Retreat',
    price: 2200,
    duration: '7 Days',
    description: 'Breathtaking mountain views, world-class skiing, and cozy alpine chalets.',
    image: 'https://images.unsplash.com/photo-1502901664700-f56a7d1da021?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    category: 'Holiday Packages'
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
    category: 'Honeymoon Packages'
  },
  {
    id: 'hm2',
    destination: 'Bora Bora Luxury',
    price: 4500,
    duration: '5 Days',
    description: 'The ultimate honeymoon destination with turquoise waters and unmatched privacy.',
    image: 'https://images.unsplash.com/photo-1505881502353-a1986add3762?auto=format&fit=crop&q=80&w=800',
    rating: 5,
    category: 'Honeymoon Packages'
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
    category: 'Family Packages'
  },
  {
    id: 'f2',
    destination: 'Diani Beach Family Fun',
    price: 1200,
    duration: '4 Days',
    description: 'White sands and turquoise waters perfect for family bonding and water sports.',
    image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    category: 'Family Packages'
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
    category: 'Corporate Travel'
  },
  {
    id: 'c2',
    destination: 'Singapore Business Summit',
    price: 2500,
    duration: '4 Days',
    description: 'Sophisticated venues and world-class hospitality for your corporate team.',
    image: 'https://images.unsplash.com/photo-1525625239513-35327b9c56b0?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    category: 'Corporate Travel'
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
    image: 'https://images.unsplash.com/photo-1516422317582-c4a0ebd2562d?auto=format&fit=crop&q=80&w=800',
    rating: 5,
    category: 'Safari & Adventure'
  },
  {
    id: 's2',
    destination: 'Bwindi Gorilla Trekking',
    price: 1500,
    duration: '3 Days',
    description: 'An intimate encounter with the rare mountain gorillas in the Impenetrable Forest.',
    image: 'https://images.unsplash.com/photo-1547407139-3c921a66005c?auto=format&fit=crop&q=80&w=800',
    rating: 5,
    category: 'Safari & Adventure'
  }
];

export const BLOG_POSTS: BlogPost[] = [];

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
  { id: 'd1', from: 'Entebbe (EBB)', to: 'Dubai (DXB)', price_ugx: 1850000, price_usd_min: 480, price_usd_max: 520, trend: 'down' },
  { id: 'd2', from: 'Entebbe (EBB)', to: 'Nairobi (NBO)', price_ugx: 950000, price_usd_min: 240, price_usd_max: 270, trend: 'stable' },
  { id: 'd3', from: 'Entebbe (EBB)', to: 'Istanbul (IST)', price_ugx: 2400000, price_usd_min: 620, price_usd_max: 680, trend: 'up' },
  { id: 'd4', from: 'Entebbe (EBB)', to: 'Johannesburg (JNB)', price_ugx: 1600000, price_usd_min: 410, price_usd_max: 450, trend: 'down' },
  { id: 'd5', from: 'Entebbe (EBB)', to: 'London (LHR)', price_ugx: 3200000, price_usd_min: 820, price_usd_max: 890, trend: 'stable' }
];
