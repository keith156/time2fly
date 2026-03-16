-- SEED DATA FOR LIVE TICKETS
-- Run this in your Supabase SQL Editor to populate the table with initial flights.
-- Using local assets from /assets/ticket-destinations/

INSERT INTO live_tickets ("from", "to", price_usd_min, price_usd_max, trend, airline, dates, order_index, city_image)
VALUES 
('Entebbe (EBB)', 'Nairobi (NBO)', 410, 450, 'stable', 'Uganda Airlines', 'Sun, Mar 1 – Sun, Mar 8', 0, '/assets/ticket-destinations/nairobi.jpg'),
('Entebbe (EBB)', 'Kigali (KGL)', 380, 420, 'stable', 'Kenya Airways', 'Sun, Mar 1 – Sun, Mar 8', 1, '/assets/ticket-destinations/kigali.jpg'),
('Entebbe (EBB)', 'Addis Ababa (ADD)', 420, 460, 'up', 'Ethiopian Airlines', 'Sun, Mar 1 – Sun, Mar 8', 2, '/assets/ticket-destinations/addis.jpg'),
('Entebbe (EBB)', 'Dubai (DXB)', 440, 490, 'down', 'Flynas', 'Sun, Mar 1 – Sun, Mar 8', 3, '/assets/ticket-destinations/dubai.jpg'),
('Entebbe (EBB)', 'Doha (DOH)', 520, 570, 'stable', 'flydubai', 'Sun, Mar 1 – Sun, Mar 8', 4, '/assets/ticket-destinations/doha.jpg'),
('Entebbe (EBB)', 'Istanbul (IST)', 540, 600, 'up', 'flydubai', 'Sun, Mar 1 – Sun, Mar 8', 5, '/assets/ticket-destinations/instanbul.jpg'),
('Entebbe (EBB)', 'Johannesburg (JNB)', 370, 420, 'down', 'Ethiopian Airlines', 'Sun, Mar 1 – Sun, Mar 8', 6, '/assets/ticket-destinations/johannesburg.jpg'),
('Entebbe (EBB)', 'London (LHR)', 760, 820, 'stable', 'Ethiopian Airlines', 'Sun, Mar 1 – Sun, Mar 8', 7, '/assets/ticket-destinations/london (1).jpg'),
('Entebbe (EBB)', 'Toronto (YYZ)', 1420, 1550, 'up', 'Kenya Airways, Air Canada', 'Sun, Mar 1 – Sun, Mar 8', 8, 'https://images.unsplash.com/photo-1503197979118-c810d0c002c1?auto=format&fit=crop&q=80&w=800'),
('Entebbe (EBB)', 'Mumbai (BOM)', 500, 580, 'stable', 'Ethiopian Airlines', 'Sun, Mar 1 – Sun, Mar 8', 9, 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&q=80&w=800');

