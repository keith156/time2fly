
import React from 'react';
import { Plane, Hotel, Map, Shield, Globe, Landmark, Clock, Award, Compass, Ship, GraduationCap, Car, Briefcase, Zap } from 'lucide-react';
import { Service, Package, BlogPost, Testimonial, Destination } from './types';

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
  {
    id: '1',
    destination: 'Santorini, Greece',
    price: 1299,
    duration: '7 Days',
    description: 'Experience the iconic blue domes and sunset views of Oia in this luxury island getaway.',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=800',
    rating: 4.9
  },
  {
    id: '2',
    destination: 'Kyoto, Japan',
    price: 1850,
    duration: '10 Days',
    description: 'Explore ancient temples, tranquil gardens, and the vibrant culture of Japan’s cultural heart.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800',
    rating: 4.8
  },
  {
    id: '3',
    destination: 'Bali, Indonesia',
    price: 950,
    duration: '5 Days',
    description: 'Tropical beaches, lush rice terraces, and spiritual retreats await in this island paradise.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800',
    rating: 4.7
  },
  {
    id: '4',
    destination: 'Swiss Alps, Switzerland',
    price: 2100,
    duration: '8 Days',
    description: 'Breathtaking mountain scenery and luxury chalet living in the heart of Europe.',
    image: 'https://images.unsplash.com/photo-1531210483974-4f8c1f33fd35?auto=format&fit=crop&q=80&w=800',
    rating: 4.9
  },
  {
    id: '5',
    destination: 'Cairo, Egypt',
    price: 1150,
    duration: '6 Days',
    description: 'Witness the wonders of the ancient world, including the Great Pyramids and the Sphinx.',
    image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&q=80&w=800',
    rating: 4.6
  },
  {
    id: '6',
    destination: 'Amalfi Coast, Italy',
    price: 1600,
    duration: '7 Days',
    description: 'Charming coastal villages, exquisite cuisine, and dramatic cliffside ocean views.',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800',
    rating: 4.8
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Top 10 Hidden Gems in Europe',
    excerpt: 'Discover off-the-beaten-path destinations that offer authentic experiences without the crowds.',
    date: 'Oct 24, 2023',
    author: 'Elena Rossi',
    image: 'https://images.unsplash.com/photo-1491557345352-5929e343d421?auto=format&fit=crop&q=80&w=800',
    category: 'Travel Tips'
  },
  {
    id: '2',
    title: 'The Ultimate Solo Travel Guide',
    excerpt: 'Everything you need to know about navigating the world safely and confidently on your own.',
    date: 'Nov 12, 2023',
    author: 'James Miller',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800',
    category: 'Adventure'
  },
  {
    id: '3',
    title: 'Sustainable Tourism: Why It Matters',
    excerpt: 'How to minimize your environmental footprint while maximizing your travel impact.',
    date: 'Dec 05, 2023',
    author: 'Sarah Chen',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?auto=format&fit=crop&q=80&w=800',
    category: 'Eco Travel'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '6',
    name: 'WANDERA CALEB',
    role: 'Verified Traveller',
    review: 'Best Travel Company in Uganda, reach out to them.',
    avatar: '/assets/avatars/wandera_caleb.png',
    rating: 5
  },
  {
    id: '7',
    name: 'NIMUSIIMA ANITA',
    role: 'Verified Traveller',
    review: 'Valuable, enjoyable and comfortable',
    avatar: '/assets/avatars/nimusiima_anita.png',
    rating: 5
  },
  {
    id: '8',
    name: 'Keith J',
    role: 'Safari Adventurer',
    review: 'Time2Fly made our safari experience unforgettable! Every detail was perfectly organized, and their expertise ensured we saw incredible wildlife safely and comfortably. Highly recommend for anyone wanting a seamless, once-in-a-lifetime adventure!',
    avatar: '/assets/avatars/keith_j.jpg',
    rating: 5
  },
  {
    id: '2',
    name: 'Namaganda Joy',
    role: 'Global Voyager',
    review: 'Are trusted tours and travel agency that you can use in preparing your visa, tour trips all around the world.. They are the best..',
    avatar: '/assets/avatars/namaganda_joy.png',
    rating: 5
  },
  {
    id: '3',
    name: 'Sarah Ndagire',
    role: 'Adventure Seeker',
    review: 'Time2fly Tours and travel is the best company I would recommend, they have the best professionals with great customer care.',
    avatar: '/assets/avatars/sarah_ndagire.png',
    rating: 5
  }
];

export const DESTINATIONS: Destination[] = [
  {
    id: '1',
    name: 'Uganda',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=800',
    details: 'The Pearl of Africa, known for its gorilla trekking and source of the Nile.'
  },
  {
    id: '2',
    name: 'Kenya',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800',
    details: 'Famous for the Masai Mara National Reserve and coastal beaches.'
  },
  {
    id: '3',
    name: 'Tanzania',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800',
    details: 'Home to Mount Kilimanjaro and the Serengeti.'
  },
  {
    id: '4',
    name: 'Dubai',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800',
    details: 'A global travel hub known for luxury shopping and ultramodern architecture.'
  }
];

export const PARTNERS = [
  { name: 'Emirates', logo: 'https://www.logo.wine/a/logo/Emirates_(airline)/Emirates_(airline)-Logo.wine.svg' },
  { name: 'Air France', logo: 'https://www.logo.wine/a/logo/Air_France/Air_France-Logo.wine.svg' },
  { name: 'Flydubai', logo: 'https://www.logo.wine/a/logo/Flydubai/Flydubai-Logo.wine.svg' },
  { name: 'EgyptAir', logo: 'https://www.logo.wine/a/logo/EgyptAir/EgyptAir-Logo.wine.svg' },
  { name: 'Jambojet', logo: 'https://airhex.com/images/airline-logos/jambojet.png' },
  { name: 'Qatar Airways', logo: 'https://www.logo.wine/a/logo/Qatar_Airways/Qatar_Airways-Logo.wine.svg' },
  { name: 'Turkish Airlines', logo: 'https://www.logo.wine/a/logo/Turkish_Airlines/Turkish_Airlines-Logo.wine.svg' },
  { name: 'Ethiopian Airlines', logo: 'https://www.logo.wine/a/logo/Ethiopian_Airlines/Ethiopian_Airlines-Logo.wine.svg' },
  { name: 'Kenya Airways', logo: 'https://www.logo.wine/a/logo/Kenya_Airways/Kenya_Airways-Logo.wine.svg' },
  { name: 'Uganda Airlines', logo: '/assets/uganda-airlines.png' },
  { name: 'KLM Royal Dutch', logo: 'https://www.logo.wine/a/logo/KLM/KLM-Logo.wine.svg' },
  { name: 'Lufthansa', logo: 'https://www.logo.wine/a/logo/Lufthansa/Lufthansa-Logo.wine.svg' },
  { name: 'British Airways', logo: 'https://www.logo.wine/a/logo/British_Airways/British_Airways-Logo.wine.svg' },
  { name: 'Brussels Airlines', logo: 'https://www.logo.wine/a/logo/Brussels_Airlines/Brussels_Airlines-Logo.wine.svg' }
];
