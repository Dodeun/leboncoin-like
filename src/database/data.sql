USE leboncoin_db;
-- Insert Users
INSERT INTO user (name, email, password, city, phone_number) VALUES
('Alice Dupont', 'alice@example.com', 'hashed_password1', 'Paris', 123456789),
('Bob Martin', 'bob@example.com', 'hashed_password2', 'Lyon', 234567890),
('Claire Moreau', 'claire@example.com', 'hashed_password3', 'Marseille', 345678901),
('David Bernard', 'david@example.com', 'hashed_password4', 'Toulouse', 456789012);

-- Insert Categories
INSERT INTO category (name) VALUES
('Electronics'),
('Vehicles');

-- Insert Ads
INSERT INTO ad (title, description, price, user_id, category_id) VALUES
('iPhone 12', 'Used iPhone 12 in good condition', 500, 1, 1),
('Samsung TV', '50-inch smart TV, like new', 300, 1, 1),
('Peugeot 208', 'Well maintained Peugeot 208', 7000, 1, 2),

('Laptop Dell', 'Powerful Dell XPS 13', 800, 2, 1),
('Motorbike Yamaha', 'Yamaha 125cc, excellent condition', 1200, 2, 2),

('Canon Camera', 'DSLR camera with 2 lenses', 450, 3, 1),
('Fiat Punto', 'Compact city car', 2800, 3, 2),

('PS5 Console', 'PlayStation 5, barely used', 550, 4, 1),
('Renault Clio', 'Reliable and fuel-efficient', 6000, 4, 2),
('MacBook Air', 'M1 chip, 8GB RAM', 950, 4, 1);

-- Insert Pictures
INSERT INTO picture (url, ad_id) VALUES
('https://example.com/img/iphone12.jpg', 1),
('https://example.com/img/samsungtv.jpg', 2),
('https://example.com/img/peugeot208.jpg', 3),
('https://example.com/img/dellxps.jpg', 4),
('https://example.com/img/yamaha.jpg', 5),
('https://example.com/img/canon.jpg', 6),
('https://example.com/img/fiat.jpg', 7),
('https://example.com/img/ps5.jpg', 8),
('https://example.com/img/clio.jpg', 9),
('https://example.com/img/macbook.jpg', 10);

-- Insert Messages (each user sends/receives at least 3 messages)
INSERT INTO message (content, sender_id, receiver_id, ad_id) VALUES
('Hi, is the iPhone still available?', 2, 1, 1),
('Yes, it is. Do you want to come see it?', 1, 2, 1),
('Sure, when would be a good time?', 2, 1, 1),

('Is the Yamaha motorbike still on sale?', 3, 2, 5),
('Yes, very good condition. Want to test it?', 2, 3, 5),
('Yes please, available this weekend?', 3, 2, 5),

('Interested in the Canon camera.', 4, 3, 6),
('It’s available. Can ship or meet.', 3, 4, 6),
('Let’s meet this afternoon?', 4, 3, 6),

('Still selling the PS5?', 1, 4, 8),
('Yes, barely used.', 4, 1, 8),
('Can I reserve it?', 1, 4, 8);
