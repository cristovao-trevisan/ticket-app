
CREATE TYPE ADDRESS AS (
  "addressLine" VARCHAR(127),
  city VARCHAR(127),
  country VARCHAR(127),
  state VARCHAR(15),
  latitude FLOAT,
  longitude FLOAT
);

CREATE TABLE "Users" (
  id SERIAL UNIQUE NOT NULL PRIMARY KEY,
  email VARCHAR(127) UNIQUE NOT NULL,
  birth VARCHAR(15),
  "fullName" VARCHAR(127) NOT NULL,
  gender VARCHAR(15),
  address ADDRESS
);

-- Show Houses entities

CREATE TABLE "ShowHouses" (
  id SERIAL UNIQUE NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(2047) NOT NULL,
  address ADDRESS
);

CREATE TABLE "ShowHouseSeats" (
  id SERIAL UNIQUE NOT NULL PRIMARY KEY,
  "showHouse" INT REFERENCES "ShowHouses"(id)
);

CREATE TABLE "ShowHouseSeatAreas" (
  name VARCHAR(127),
  capacity INT,
  reserved INT,
  occupied INT,
  "locationStart" POINT,
  "locationEnd" POINT
) INHERITS ("ShowHouseSeats");

CREATE TABLE "ShowHouseNumberedSeats" (
  number VARCHAR(15),
  reserved BOOLEAN,
  occupied BOOLEAN,
  location POINT
) INHERITS ("ShowHouseSeats");

CREATE TABLE "ShowHouseFixtureAreas" (
  name VARCHAR(127),
  "locationStart" POINT,
  "locationEnd" POINT
) INHERITS ("ShowHouseSeats");

---------------

CREATE TABLE "Events" (
  id SERIAL UNIQUE NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(2047),
  "showHouse" INT REFERENCES "ShowHouses"(id)
);

-- Reservation related entities

CREATE TABLE "Seats" (
  id SERIAL UNIQUE NOT NULL PRIMARY KEY,
  event INT REFERENCES "Events"(id)
);

CREATE TABLE "GenericSeats" (
  name VARCHAR(127),
  capacity INT,
  reserved INT,
  occupied INT
) INHERITS ("Seats");

CREATE TABLE "SeatAreas" (
  "locationStart" POINT,
  "locationEnd" POINT
) INHERITS ("GenericSeats");

CREATE TABLE "NumberedSeats" (
  number VARCHAR(15),
  reserved BOOLEAN,
  occupied BOOLEAN,
  location POINT
) INHERITS ("Seats");

CREATE TABLE "SeatFixtureAreas" (
  name VARCHAR(127),
  "locationStart" POINT,
  "locationEnd" POINT
) INHERITS ("Seats");

CREATE TABLE "Pricings" (
  id SERIAL UNIQUE NOT NULL PRIMARY KEY,
  name VARCHAR(127),
  description VARCHAR (255),
  price DECIMAL(11, 4),
  seat INT NOT NULL -- REFERENCES "Seats"(id) -- Can't use reference together with inheritance
);

-- Event extra data

CREATE TABLE "SocialConnections" (
  id SERIAL UNIQUE NOT NULL PRIMARY KEY,
  network VARCHAR(31) NOT NULL,
  link VARCHAR(255) NOT NULL,
  event INT REFERENCES "Events"(id)
);

CREATE TABLE "Tags" (
  id SERIAL UNIQUE NOT NULL PRIMARY KEY,
  title VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE "EventTags" (
  event INT REFERENCES "Events"(id),
  tag INT REFERENCES "Tags"(id),
    PRIMARY KEY (event, tag)
);

-- Order Data

CREATE TABLE "Orders" (
  id SERIAL UNIQUE NOT NULL PRIMARY KEY,
  "user" INT REFERENCES "Users"(id),
  event INT REFERENCES "Events"(id)
);

CREATE TABLE "OrderItems" (
  id SERIAL UNIQUE NOT NULL PRIMARY KEY,
  "order" INT REFERENCES "Orders"(id),
  seat INT NOT NULL,
  -- named order:
  email VARCHAR(127),
  birth VARCHAR(15),
  "fullName" VARCHAR(127) NOT NULL
);