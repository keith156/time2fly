
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
    description: 'Our dedicated reservations team provides seamless booking services for local, regional, and international travel. We specialize in tailoring flight itineraries and luxury accommodation to match your unique schedule and preferences, ensuring a stress-free start to your journey.',
    icon: 'Plane',
    image: 'https://images.unsplash.com/photo-1540553016722-983e48a2cd10?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: '24h Emergency Reservations',
    description: 'Travel with peace of mind knowing our 24/7 emergency support team is always just a call away. Whether it\'s a last-minute flight change, an urgent hotel rebooking, or unexpected transit assistance, we provide immediate solutions whenever and wherever you need them.',
    icon: 'Clock',
    image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    title: 'Adventure Sports',
    description: 'For the thrill-seekers, we offer heart-pounding adventure sports at world-renowned locations. From world-class white water rafting on the Nile to bungee jumping in majestic gorges, we arrange safe, high-octane experiences guided by certified professionals.',
    icon: 'Zap',
    image: '/assets/adventure-sports.jpg'
  },
  {
    id: '4',
    title: 'Wildlife Tracking',
    description: 'Embark on an extraordinary journey into the wild for an intimate encounter with nature\'s giants. We provide exclusive permits and expert-led tracking expeditions for Mountain Gorillas and Chimpanzees in the lush, biodiverse forests of Uganda, the Pearl of Africa.',
    icon: 'Compass',
    image: 'https://images.unsplash.com/photo-1547407139-3c921a66005c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '5',
    title: 'Visa Advice & Assistance',
    description: 'Navigating international travel requirements can be complex. Our visa experts offer personalized advice and end-to-end assistance with documentation, interview preparation, and protocol, ensuring a smooth and successful application process for your global destinations.',
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
    description: 'Surrender to the serene beauty of the Maldives. Stay in luxurious overwater villas with direct access to private lagoons, enjoy candlelight sunset dinners on the sand, and experience world-class snorkeling in crystal-clear turquoise waters.',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800',
    rating: 5,
    category: 'Holiday Escapes'
  },
  {
    id: 'h2',
    destination: 'Swiss Alps Ski Retreat',
    price: 2200,
    duration: '7 Days',
    description: 'Escape to the majestic peaks of the Swiss Alps for the ultimate winter experience. Enjoy world-class skiing on pristine slopes, breathtaking panoramic mountain views, and cozy evenings in traditional high-end alpine chalets with premium amenities.',
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
    description: 'Experience the magic of Santorini with its iconic blue-domed churches and whitewashed villages. Relax in your private infinity pool overlooking the caldera and witness what are widely considered the world\'s most breathtaking sunsets.',
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
    description: 'Journey into the heart of the wild to witness nature\'s most spectacular show. Our expert-led safaris take you through the Serengeti and Murchison Falls to witness the Great Migration and the majestic Big Five—Lion, Leopard, Elephant, Buffalo, and Rhino—in their untouched habitat.',
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
    id: 'b-cairo-1',
    title: 'Ancient Wonders: A Journey Through Cairo',
    excerpt: 'Step back in time to explore the majestic Giza Pyramids and the vibrant streets of Egypt\'s historic capital.',
    content: `Cairo, the "City of a Thousand Minarets," is a mesmerizing blend of ancient history and modern chaos. As the heart of Egypt, it offers an unparalleled journey through time, from the remnants of the Pharaohs to the vibrant culture of the Middle East.

### The Great Pyramids of Giza
No visit to Cairo is complete without witnessing the last remaining wonder of the ancient world. Standing before the Great Pyramid of Khufu is a humbling experience. For a truly premium experience, we recommend a private sunset desert tour on horseback, offering a golden view of the pyramids far from the crowds.

### The Grand Egyptian Museum
The newly opened Grand Egyptian Museum is a masterpiece of modern architecture housing the world's most extensive collection of Pharaonic antiquities. The Tutankhamun gallery, with its gold masks and intricate treasures, is a highlight that demands a guided expert tour to fully appreciate.

### Khan el-Khalili and Islamic Cairo
Lose yourself in the labyrinthine alleys of the Khan el-Khalili bazaar. The scent of spices, the glint of hammered copper, and the call to prayer create an atmosphere that hasn't changed for centuries. Stop at the historic El Fishawy cafe for a traditional mint tea and watch the world go by.`,
    image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&q=80&w=1200',
    date: 'March 9, 2026',
    author: 'Time2Fly Expert',
    category: 'Cultural Explorer'
  },
  {
    id: 'b-bangkok-1',
    title: 'The Pulsing Heart of Thailand: Bangkok Unveiled',
    excerpt: 'From golden temples to world-class street food, discover why Bangkok remains the world\'s most visited city.',
    content: `Bangkok is a sensory explosion. It's a city where ancient tradition meets futuristic innovation, where quiet saffron-robed monks walk alongside bustling skyscrapers. It is a destination that rewards the curious and the adventurous.

### Temples of Gold
The Grand Palace and Wat Phra Kaew (Temple of the Emerald Buddha) are the spiritual heart of Thailand. The intricate architecture and dazzling gold leaf are breathtaking. For a quieter encounter, visit Wat Arun at sunrise, when the first light reflects off its porcelain-encrusted spires across the Chao Phraya River.

### A Culinary Capital
Bangkok is arguably the street food capital of the world. From Michelin-starred roadside stalls like Jay Fai to the buzzing night markets of Sukhumvit, the flavors are bold and unforgettable. We specialize in arranging private "Chef-led" food tours that take you deep into the local neighborhoods to find the city's hidden culinary gems.

### Nightlife and Shopping
As the sun sets, Bangkok transforms. Experience the city from a new perspective at one of its many world-famous rooftop bars, like Lebua or Octave. For shoppers, the city offers everything from the vast Chatuchak Weekend Market to the ultra-luxury malls of Siam Paragon.`,
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&q=80&w=1200',
    date: 'March 8, 2026',
    author: 'Time2Fly Expert',
    category: 'Cultural Explorer'
  },
  {
    id: 'b-bali-1',
    title: 'Bali Bliss: Finding Serenity in the Island of Gods',
    excerpt: 'Uncover the spiritual heart of Indonesia, from the lush terraces of Ubud to the pristine beaches of Uluwatu.',
    content: `Bali is more than just a destination; it's a state of mind. Known for its forested volcanic mountains, iconic rice paddies, and coral reefs, the "Island of the Gods" offers a unique blend of spiritual tranquility and coastal luxury.

### Cultural Ubud
Ubud is the cultural and spiritual center of Bali. Surrounded by emerald-green rice terraces and misty jungles, it's the perfect place for a wellness retreat. Visit the Sacred Monkey Forest Sanctuary or take a traditional Balinese cooking class to connect with the local heritage.

### Majestic Uluwatu
Perched on high cliffs overlooking the Indian Ocean, Uluwatu offers some of Bali's most dramatic scenery. The Uluwatu Temple is a stunning site, especially during the traditional Kecak Fire Dance at sunset. For surfers and beach lovers, the hidden coves below the cliffs are paradise.

### Luxury and Wellness
Bali is famous for its world-class spa and wellness industry. From private flower baths in jungle villas to high-end holistic healing centers, we can curate a personalized wellness itinerary that rejuvenates both body and soul.`,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1200',
    date: 'March 7, 2026',
    author: 'Time2Fly Expert',
    category: 'Holiday Escapes'
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
  { id: 'd1', from: 'Entebbe', to: 'Nairobi', price_usd_min: 410, price_usd_max: 450, trend: 'stable', airline: 'Uganda Airlines', dates: 'Sun, Mar 1 – Sun, Mar 8', order_index: 0, city_image: '/assets/ticket-destinations/nairobi.jpg' },
  { id: 'd2', from: 'Entebbe', to: 'Kigali', price_usd_min: 380, price_usd_max: 420, trend: 'stable', airline: 'Kenya Airways', dates: 'Sun, Mar 1 – Sun, Mar 8', order_index: 1, city_image: '/assets/ticket-destinations/kigali.jpg' },
  { id: 'd3', from: 'Entebbe', to: 'Addis Ababa', price_usd_min: 420, price_usd_max: 460, trend: 'up', airline: 'Ethiopian Airlines', dates: 'Sun, Mar 1 – Sun, Mar 8', order_index: 2, city_image: '/assets/ticket-destinations/addis.jpg' },
  { id: 'd4', from: 'Entebbe', to: 'Dubai', price_usd_min: 440, price_usd_max: 490, trend: 'down', airline: 'Flynas', dates: 'Sun, Mar 1 – Sun, Mar 8', order_index: 3, city_image: '/assets/ticket-destinations/dubai.jpg' },
  { id: 'd5', from: 'Entebbe', to: 'Doha', price_usd_min: 520, price_usd_max: 570, trend: 'stable', airline: 'flydubai', dates: 'Sun, Mar 1 – Sun, Mar 8', order_index: 4, city_image: '/assets/ticket-destinations/doha.jpg' },
  { id: 'd6', from: 'Entebbe', to: 'Istanbul', price_usd_min: 540, price_usd_max: 600, trend: 'up', airline: 'flydubai', dates: 'Sun, Mar 1 – Sun, Mar 8', order_index: 5, city_image: '/assets/ticket-destinations/instanbul.jpg' },
  { id: 'd7', from: 'Entebbe', to: 'Johannesburg', price_usd_min: 370, price_usd_max: 420, trend: 'down', airline: 'Ethiopian Airlines', dates: 'Sun, Mar 1 – Sun, Mar 8', order_index: 6, city_image: '/assets/ticket-destinations/johannesburg.jpg' },
  { id: 'd8', from: 'Entebbe', to: 'London', price_usd_min: 760, price_usd_max: 820, trend: 'stable', airline: 'Ethiopian Airlines', dates: 'Sun, Mar 1 – Sun, Mar 8', order_index: 7, city_image: '/assets/ticket-destinations/london (1).jpg' },
  { id: 'd9', from: 'Entebbe', to: 'Toronto', price_usd_min: 1420, price_usd_max: 1550, trend: 'up', airline: 'Kenya Airways, Air Canada', dates: 'Sun, Mar 1 – Sun, Mar 8', order_index: 8, city_image: '/assets/ticket-destinations/london (3).jpg' },
  { id: 'd10', from: 'Entebbe', to: 'Mumbai', price_usd_min: 500, price_usd_max: 580, trend: 'stable', airline: 'Ethiopian Airlines', dates: 'Sun, Mar 1 – Sun, Mar 8', order_index: 9, city_image: '/assets/ticket-destinations/london (2).jpg' },
];
