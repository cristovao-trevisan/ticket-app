INSERT INTO "Users" (uid, email, "fullName", gender, address) VALUES
  ('1', 'super@mario.com', 'Super Mario', 'MALE', ROW('Peach Blv, 12', 'Mushroom City', 'Peach''s Kingdown', 'PC', 123.456, 654.321)),
  ('2', 'bad@bowser.com', 'Bowser', 'NOT_DEFINED', ROW('Lava Streat, 666', 'Floating Boat', 'Sky', NULL, 123.456, 654.321))
;

INSERT INTO "ShowHouses" (id, name, description, address) VALUES
  (1, 'Mario House', 'A very welcoming place', ROW('Peach Blv, 12', 'Mushroom City', 'Peach''s Kingdown', 'PC', 123.456, 654.321)),
  (2, 'Bowser''s ship', 'A dreadful place', ROW('Lava Streat, 666', 'Floating Boat', 'Sky', NULL, 123.456, 654.321))
;

INSERT INTO "ShowHouseFixtureAreas" ("showHouse", name, "locationStart", "locationEnd") VALUES
  (1, 'Stage', POINT(200, 20), POINT(1800, 300))
;

INSERT INTO "ShowHouseSeatAreas" ("showHouse", name, capacity, reserved, occupied, "locationStart", "locationEnd") VALUES
  (1, 'Main Seat Area', 100, 0, 0, POINT(200, 500), POINT(1800, 925))
;

INSERT INTO "ShowHouseNumberedSeats" ("showHouse", name, reserved, occupied, location) VALUES
  (1, 'A1', FALSE, FALSE, POINT(200, 350)),
  (1, 'A2', FALSE, FALSE, POINT(300, 350)),
  (1, 'A3', FALSE, FALSE, POINT(400, 350)),
  (1, 'A4', FALSE, FALSE, POINT(500, 350)),
  (1, 'A5', FALSE, FALSE, POINT(600, 350)),
  (1, 'A6', FALSE, FALSE, POINT(700, 350)),
  (1, 'A7', FALSE, FALSE, POINT(800, 350)),
  (1, 'A8', FALSE, FALSE, POINT(900, 350)),
  (1, 'A9', FALSE, FALSE, POINT(1000, 350)),
  (1, 'A10', FALSE, FALSE, POINT(1100, 350)),
  (1, 'A11', FALSE, FALSE, POINT(1200, 350)),
  (1, 'A12', FALSE, FALSE, POINT(1300, 350)),
  (1, 'A13', FALSE, FALSE, POINT(1400, 350)),
  (1, 'A14', FALSE, FALSE, POINT(1500, 350)),
  (1, 'A15', FALSE, FALSE, POINT(1500, 350)),
  (1, 'A15', FALSE, FALSE, POINT(1700, 350)),
  (1, 'A17', FALSE, FALSE, POINT(1800, 350)),
  (1, 'B1', FALSE, FALSE, POINT(200, 450)),
  (1, 'B2', FALSE, FALSE, POINT(300, 450)),
  (1, 'B3', FALSE, FALSE, POINT(400, 450)),
  (1, 'B4', FALSE, FALSE, POINT(500, 450)),
  (1, 'B5', FALSE, FALSE, POINT(600, 450)),
  (1, 'B6', FALSE, FALSE, POINT(700, 450)),
  (1, 'B7', FALSE, FALSE, POINT(800, 450)),
  (1, 'B8', FALSE, FALSE, POINT(900, 450)),
  (1, 'B9', FALSE, FALSE, POINT(1000, 450)),
  (1, 'B10', FALSE, FALSE, POINT(1100, 450)),
  (1, 'B11', FALSE, FALSE, POINT(1200, 450)),
  (1, 'B12', FALSE, FALSE, POINT(1300, 450)),
  (1, 'B13', FALSE, FALSE, POINT(1400, 450)),
  (1, 'B14', FALSE, FALSE, POINT(1500, 450)),
  (1, 'B15', FALSE, FALSE, POINT(1500, 450)),
  (1, 'B15', FALSE, FALSE, POINT(1700, 450)),
  (1, 'B17', FALSE, FALSE, POINT(1800, 450))
;


INSERT INTO "Events" (id, name, "showHouse", description) VALUES
  (1, 'Mario Party', 1, 'A funny festival with lots of games'),
  (2, 'The Beatles: return', 1, 'The world''s most famous band returns from the grave for this amazing and unique show')
;

INSERT INTO "SeatAreas" (event, name, capacity, reserved, occupied, "locationStart", "locationEnd")
  SELECT 1 AS event, name, capacity, reserved, occupied, "locationStart", "locationEnd"
  FROM "ShowHouseSeatAreas"
  WHERE "showHouse" = 1;

INSERT INTO "NumberedSeats" (event, name, reserved, occupied, location)
  SELECT 1 AS event, name, reserved, occupied, location
  FROM "ShowHouseNumberedSeats"
  WHERE "showHouse" = 1;

INSERT INTO "SeatFixtureAreas" (event, name, "locationStart", "locationEnd")
  SELECT 1 AS event, name, "locationStart", "locationEnd"
  FROM "ShowHouseFixtureAreas"
  WHERE "showHouse" = 1;

INSERT INTO "Pricings" (id, name, price, event) VALUES
  (1, 'Full Ticket', 20, 1),
  (2, 'Student Ticket', 15, 1),
  (3, 'Full Ticket', 40, 1),
  (4, 'Student Ticket', 25, 1)
;

-- Seat area pricings
INSERT INTO "SeatsPricings" (seat, pricing)
  SELECT id AS seat, 1 AS pricing
  FROM "SeatAreas"
  WHERE event = 1;
INSERT INTO "SeatsPricings" (seat, pricing)
  SELECT id AS seat, 2 AS pricing
  FROM "SeatAreas"
  WHERE event = 1;

-- Numbered seat pricings
INSERT INTO "SeatsPricings" (seat, pricing)
  SELECT id AS seat, 3 AS pricing
  FROM "NumberedSeats"
  WHERE event = 1;
INSERT INTO "SeatsPricings" (seat, pricing)
  SELECT id AS seat, 4 AS pricing
  FROM "NumberedSeats"
  WHERE event = 1;


INSERT INTO "Tags" (id, title) VALUES
  (1, 'superFun'), (2 ,'games'), (3, 'kidnapping'), (4, 'evil')
;

INSERT INTO "EventTags" (event, tag) VALUES
  (1, 1), (1, 2), -- Mario's party tags
  (2, 3), (2, 4) --Bowser tags
;


INSERT INTO "EventImages" (event, reference, main) VALUES
  (1, 'event-images/1/1-147c872a-e5a2-4739-a697-180686e6abd6.jpeg', TRUE),
  (1, 'event-images/1/1-99dd8135-f92e-4289-8cfa-b0e74e889879.jpeg', FALSE),
  (2, 'event-images/2/2-15e6f874-8293-4276-a0f5-d89c1e335ef0.jpeg', TRUE),
  (2, 'event-images/2/2-3c37d82d-5c04-4f64-98b8-472060dad6f3.jpg', FALSE)
;

