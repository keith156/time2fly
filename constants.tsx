
import React from 'react';
import { Plane, Hotel, Map, Shield, Globe, Landmark, Clock, Award, Compass, Ship, GraduationCap, Car, Briefcase, Zap } from 'lucide-react';
import { Service, Package, BlogPost, Testimonial, Destination, LiveTicket } from './types';

export const APP_VERSION = '2.1-DEBUG';

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

export const PACKAGES: Package[] = [];

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
