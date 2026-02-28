-- SEED DATA FOR LIVE TICKETS
-- Run this in your Supabase SQL Editor to populate the table with initial flights.

INSERT INTO live_tickets ("from", "to", price_usd_min, price_usd_max, trend, airline, dates, order_index, city_image)
VALUES 
('Entebbe', 'Nairobi', 410, 450, 'stable', 'Uganda Airlines', 'Sun, Mar 1 – Sun, Mar 8', 0, 'https://images.unsplash.com/photo-1583037189850-1921ae73293c?auto=format&fit=crop&q=80&w=800'),
('Entebbe', 'Kigali', 380, 420, 'stable', 'Kenya Airways', 'Sun, Mar 1 – Sun, Mar 8', 1, 'https://images.unsplash.com/photo-1589196720078-4ea7464010e9?auto=format&fit=crop&q=80&w=800'),
('Entebbe', 'Addis Ababa', 420, 460, 'up', 'Ethiopian Airlines', 'Sun, Mar 1 – Sun, Mar 8', 2, 'https://images.unsplash.com/photo-1543884841-3829598c0678?auto=format&fit=crop&q=80&w=800'),
('Entebbe', 'Dubai', 440, 490, 'down', 'Flynas', 'Sun, Mar 1 – Sun, Mar 8', 3, 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800'),
('Entebbe', 'Doha', 520, 570, 'stable', 'flydubai', 'Sun, Mar 1 – Sun, Mar 8', 4, 'https://images.unsplash.com/photo-1560670760-337626941865?auto=format&fit=crop&q=80&w=800'),
('Entebbe', 'Istanbul', 540, 600, 'up', 'flydubai', 'Sun, Mar 1 – Sun, Mar 8', 5, 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=800'),
('Entebbe', 'Johannesburg', 370, 420, 'down', 'Ethiopian Airlines', 'Sun, Mar 1 – Sun, Mar 8', 6, 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=800'),
('Entebbe', 'London', 760, 820, 'stable', 'Ethiopian Airlines', 'Sun, Mar 1 – Sun, Mar 8', 7, 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800'),
('Entebbe', 'Toronto', 1420, 1550, 'up', 'Kenya Airways, Air Canada', 'Sun, Mar 1 – Sun, Mar 8', 8, 'https://images.unsplash.com/photo-1503197979118-c810d0c002c1?auto=format&fit=crop&q=80&w=800'),
('Entebbe', 'Mumbai', 500, 580, 'stable', 'Ethiopian Airlines', 'Sun, Mar 1 – Sun, Mar 8', 9, 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&q=80&w=800');
