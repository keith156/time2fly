
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
  },
  {
    id: 'b-gorilla-1',
    title: 'Mountain Gorilla Trekking in Uganda: Everything You Need to Know',
    excerpt: 'Discover the ultimate guide to gorilla trekking in Bwindi. From permits to what to pack, we cover everything for your encounter with the gentle giants.',
    content: `Gorilla trekking in Uganda is often described as a life-changing experience. Standing just meters away from a family of mountain gorillas in their natural habitat is a privilege few get to enjoy. As the "Pearl of Africa," Uganda is home to more than half of the world's remaining mountain gorilla population, primarily in Bwindi Impenetrable National Park and Mgahinga Gorilla National Park.

### Securing Your Gorilla Permits
The most critical step in planning your trek is securing a permit. Permits are in high demand and limited to 8 people per gorilla family per day. At Time2Fly, we specialize in handling the permit acquisition process directly with the Uganda Wildlife Authority (UWA), ensuring you don't miss out on this bucket-list adventure.

### Best Time for Gorilla Trekking
While trekking can be done year-round, the dry seasons (June to August and December to February) offer the best conditions. The trails are less slippery, and the dense forest is easier to navigate. However, the rainy season has its own charm, with lush greenery and fewer crowds.

### What to Pack for the Jungle
Preparation is key to an enjoyable trek. We recommend:
*   Long-sleeved shirts and trousers to protect against nettles.
*   Sturdy, waterproof hiking boots with good grip.
*   Garden gloves for clutching onto vegetation.
*   A light raincoat and plenty of water.

### Conservation and Impact
Your visit directly contributes to the conservation of these endangered primates. A portion of the permit fee goes towards protecting the habitat and supporting local communities, ensuring that future generations can also witness these majestic creatures.`,
    image: 'https://images.unsplash.com/photo-1547407139-3c921a66005c?auto=format&fit=crop&q=80&w=1200',
    date: 'March 15, 2026',
    author: 'Time2Fly Expert',
    category: 'Safari Adventures'
  },
  {
    id: 'b-jinja-1',
    title: 'Adventure on the Nile: White Water Rafting & Bungee Jumping in Jinja',
    excerpt: 'Jinja is the adrenaline capital of East Africa. Explore the thrill of the Nile with our guide to white water rafting and bungee jumping.',
    content: `Jinja, located at the source of the River Nile, is a haven for thrill-seekers. It’s a place where the calm waters of Lake Victoria transform into powerful rapids, offering some of the best white water rafting experiences in the world.

### Conquering the Grade 5 Rapids
White water rafting on the Nile is an exhilarating journey. From "Big Brother" to "The Bad Place," the rapids are challenging but incredibly rewarding. Whether you are a first-timer or a seasoned rafter, the professional guides we partner with ensure a safe and adrenaline-fueled experience.

### Bungee Jumping into the Nile
For those who want to take their adventure to the next level, bungee jumping over the Nile is a must. Plunging 44 meters towards the historic river is a heart-stopping moment that offers a unique perspective of the landscape.

### Beyond the Adrenaline
Jinja isn't just about extreme sports. You can also enjoy:
*   **Quad Biking**: Explore the local villages and riverbanks on four wheels.
*   **Horseback Safaris**: A peaceful way to take in the scenery along the Nile.
*   **Sunset Cruises**: Relax with a drink as the sun dips below the horizon at the source of the Nile.

At Time2Fly, we curate custom Jinja adventure packages that include transportation, accommodation, and all your chosen activities for a seamless trip.`,
    image: 'https://images.unsplash.com/photo-1533727937480-da3a97967e95?auto=format&fit=crop&q=80&w=1200',
    date: 'March 14, 2026',
    author: 'Time2Fly Expert',
    category: 'Adventure Seeker'
  },
  {
    id: 'b-safari-tips-1',
    title: 'Safari 101: How to Spot the Big Five in Murchison Falls & Serengeti',
    excerpt: 'Planning your first safari? Learn the secrets to spotting the Big Five and capturing stunning wildlife photography on your next African adventure.',
    content: `An African safari is a dream for many, and spotting the "Big Five"—Lion, Leopard, Elephant, Buffalo, and Rhino—is usually at the top of the list. Uganda and Tanzania offer some of the most diverse and spectacular wildlife viewing opportunities on the continent.

### Murchison Falls: Where the Nile Meets the Wild
Murchison Falls National Park is Uganda's largest conservation area. Here, you can witness the Nile squeezing through a narrow 7-meter gorge before exploding into the "Devil's Cauldron." The plains are teeming with elephants, giraffes, and various antelope species. For the best chance to see lions and leopards, early morning game drives are essential.

### The Serengeti: The Endless Plains
A safari in the Serengeti is synonymous with the Great Migration. Witnessing millions of wildebeest and zebras crossing the plains is a spectacle like no other. This vast ecosystem is also one of the best places in the world to see large predators in action.

### Expert Tips for Wildlife Spotting
1.  **Be Patient**: Wildlife doesn't run on a schedule. Spend time at watering holes and keep your eyes peeled.
2.  **Listen to Your Guide**: Our expert guides have years of experience and "bush eyes" that can spot a leopard camouflaged in a tree from miles away.
3.  **Invest in Good Optics**: A high-quality pair of binoculars is a game-changer for observing animal behavior from a distance.

### Responsible Safari Practices
Respecting the animals and their environment is paramount. Always stay in your vehicle, keep noise to a minimum, and never throw anything out of the window. We believe in "Take only photos, leave only footprints."`,
    image: 'https://images.unsplash.com/photo-1516422266218-9d686613d9f4?auto=format&fit=crop&q=80&w=1200',
    date: 'March 13, 2026',
    author: 'Time2Fly Expert',
    category: 'Safari Adventures'
  },
  {
    id: 'b-visa-advice-1',
    title: 'Navigating Visa Requirements: Your Step-by-Step Guide for International Travel',
    excerpt: 'Dont let paperwork stop your dreams. Our travel experts share essential visa advice for Ugandans and international travelers.',
    content: `One of the biggest hurdles in international travel is the visa application process. From complex forms to stack of documentation, it can be overwhelming. However, with the right guidance, it doesn't have to be.

### Understanding Your Destination's Requirements
Every country has its own set of rules. Some offer visas on arrival, some require e-visas, and others demand a visit to the embassy. Researching these requirements months in advance is crucial to avoiding last-minute stress.

### The Essential Documentation Checklist
While requirements vary, most visa applications will need:
*   A valid passport with at least 6 months remaining.
*   Recent passport-sized photographs.
*   Proof of travel insurance.
*   Flight itineraries and hotel bookings.
*   Bank statements as proof of funds.

### How Time2Fly Simplifies the Process
We provide end-to-end visa assistance to our clients. Our services include:
*   **Personalized Consultations**: We assess your specific travel needs and advise on the best visa category.
*   **Document Review**: We meticulously check your documents to ensure they meet embassy standards.
*   **Interview Preparation**: For countries that require interviews, we provide coaching to boost your confidence.

By letting us handle the logistics, you can focus on the exciting part—planning what you'll do once you arrive!`,
    image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=1200',
    date: 'March 12, 2026',
    author: 'Time2Fly Expert',
    category: 'Corporate Travel'
  },
  {
    id: 'b-uganda-pearl-1',
    title: 'The Pearl of Africa: Why Uganda Should Be Your Next Travel Destination',
    excerpt: 'From snow-capped mountains to lush rainforests, discover why Winston Churchill famously called Uganda the Pearl of Africa.',
    content: `Uganda is a country of staggering beauty and diversity. It is a place where you can find snow-capped mountains on the equator, vast savannahs teeming with wildlife, and the largest lake in Africa. Here is why Uganda should be at the top of your travel list.

### Diverse Landscapes
Uganda's geography is incredibly varied. The Rwenzori Mountains, also known as the "Mountains of the Moon," offer world-class hiking. In the west, the crater lakes provide a serene backdrop for relaxation, while the Sipi Falls in the east are a sight to behold.

### The Warmth of Ugandan Hospitality
Ugandans are known for being some of the friendliest and most welcoming people in the world. Whether you are in the bustling city of Kampala or a remote village, you will be greeted with genuine smiles and hospitality.

### Unique Wildlife Encounters
Beyond the mountain gorillas and the Big Five, Uganda is a paradise for birdwatchers, with over 1,000 species recorded. You can also find tree-climbing lions in Ishasha and chimpanzees in Kibale Forest.

### Cultural Richness
With over 56 tribes, Uganda has a rich tapestry of cultures, traditions, and cuisines. Exploring the local markets, attending traditional dance performances, and tasting local delicacies like "Luwombo" or "Matooke" is an essential part of the experience.

As a local agency, Time2Fly is uniquely positioned to show you the authentic side of the Pearl of Africa. We don't just take you to places; we immerse you in the soul of Uganda.`,
    image: 'https://images.unsplash.com/photo-1549194388-f61be84a6e9e?auto=format&fit=crop&q=80&w=1200',
    date: 'March 11, 2026',
    author: 'Time2Fly Expert',
    category: 'Cultural Explorer'
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
  { id: 'd1', from: 'Entebbe (EBB)', to: 'Nairobi (NBO)', price_usd_min: 410, price_usd_max: 450, trend: 'stable', airline: 'Uganda Airlines', dates: 'Sun, Mar 1 – Sun, Mar 8', order_index: 0, city_image: '/assets/ticket-destinations/nairobi.jpg' },
  { id: 'd2', from: 'Entebbe (EBB)', to: 'Kigali (KGL)', price_usd_min: 380, price_usd_max: 420, trend: 'stable', airline: 'Kenya Airways', dates: 'Sun, Mar 1 – Sun, Mar 8', order_index: 1, city_image: '/assets/ticket-destinations/kigali.jpg' },
  { id: 'd3', from: 'Entebbe (EBB)', to: 'Addis Ababa (ADD)', price_usd_min: 420, price_usd_max: 460, trend: 'up', airline: 'Ethiopian Airlines', dates: 'Sun, Mar 1 – Sun, Mar 8', order_index: 2, city_image: '/assets/ticket-destinations/addis.jpg' },
  { id: 'd4', from: 'Entebbe (EBB)', to: 'Dubai (DXB)', price_usd_min: 440, price_usd_max: 490, trend: 'down', airline: 'Flynas', dates: 'Sun, Mar 1 – Sun, Mar 8', order_index: 3, city_image: '/assets/ticket-destinations/dubai.jpg' },
  { id: 'd5', from: 'Entebbe (EBB)', to: 'Doha (DOH)', price_usd_min: 520, price_usd_max: 570, trend: 'stable', airline: 'flydubai', dates: 'Sun, Mar 1 – Sun, Mar 8', order_index: 4, city_image: '/assets/ticket-destinations/doha.jpg' },
  { id: 'd6', from: 'Entebbe (EBB)', to: 'Istanbul (IST)', price_usd_min: 540, price_usd_max: 600, trend: 'up', airline: 'flydubai', dates: 'Sun, Mar 1 – Sun, Mar 8', order_index: 5, city_image: '/assets/ticket-destinations/instanbul.jpg' },
  { id: 'd7', from: 'Entebbe (EBB)', to: 'Johannesburg (JNB)', price_usd_min: 370, price_usd_max: 420, trend: 'down', airline: 'Ethiopian Airlines', dates: 'Sun, Mar 1 – Sun, Mar 8', order_index: 6, city_image: '/assets/ticket-destinations/johannesburg.jpg' },
  { id: 'd8', from: 'Entebbe (EBB)', to: 'London (LHR)', price_usd_min: 760, price_usd_max: 820, trend: 'stable', airline: 'Ethiopian Airlines', dates: 'Sun, Mar 1 – Sun, Mar 8', order_index: 7, city_image: '/assets/ticket-destinations/london (1).jpg' },
  { id: 'd9', from: 'Entebbe (EBB)', to: 'Toronto (YYZ)', price_usd_min: 1420, price_usd_max: 1550, trend: 'up', airline: 'Kenya Airways, Air Canada', dates: 'Sun, Mar 1 – Sun, Mar 8', order_index: 8, city_image: '/assets/ticket-destinations/london (3).jpg' },
  { id: 'd10', from: 'Entebbe (EBB)', to: 'Mumbai (BOM)', price_usd_min: 500, price_usd_max: 580, trend: 'stable', airline: 'Ethiopian Airlines', dates: 'Sun, Mar 1 – Sun, Mar 8', order_index: 9, city_image: '/assets/ticket-destinations/london (2).jpg' },
];

