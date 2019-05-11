WITH
  fixtureAreas AS (
    SELECT
      event,
      JSON_AGG(JSON_BUILD_OBJECT(
        'id', id,
        'name', name,
        'locationStart', "locationStart",
        'locationEnd', "locationEnd"
      )) AS "fixtureAreas"
    FROM "SeatFixtureAreas"
    GROUP BY event
  ),
  genericSeats AS (
    SELECT
      event,
      JSON_AGG(JSON_BUILD_OBJECT(
        'id', id,
        'name', name,
        'capacity', capacity,
        'reserved', reserved,
        'occupied', occupied
      )) AS "genericSeats"
    FROM ONLY "GenericSeats"
    GROUP BY event
  ),
  seatAreas AS (
    SELECT
      event,
      JSON_AGG(JSON_BUILD_OBJECT(
        'id', id,
        'name', name,
        'capacity', capacity,
        'reserved', reserved,
        'occupied', occupied,
        'locationStart', "locationStart",
        'locationEnd', "locationEnd"
      )) AS "seatAreas"
    FROM "SeatAreas"
    GROUP BY event
  ),
  numberedSeats AS (
    SELECT
      event,
      JSON_AGG(JSON_BUILD_OBJECT(
        'id', id,
        'name', name,
        'location', location,
        'reserved', reserved,
        'occupied', occupied
      )) AS "numberedSeats"
    FROM "NumberedSeats"
    GROUP BY event
  ),
  pricings AS (
    SELECT
      event,
      JSON_AGG(JSON_BUILD_OBJECT(
        'seat', seat,
        'pricing', pricing
      )) AS pricings
    FROM (
      SELECT
        seat.event,
        seat.id AS seat,
        ARRAY_AGG(seatPricing.pricing) AS "pricing"
      FROM "Seats" seat
      INNER JOIN "SeatsPricings" seatPricing
        ON seatPricing.seat = seat.id
      GROUP BY 1,2
    ) pricing
    GROUP BY 1
  )

SELECT
  event.name,
  event.description,
  "fixtureAreas",
  "genericSeats",
  "seatAreas",
  "numberedSeats",
  pricings.pricings
FROM "Events" AS event
LEFT JOIN fixtureAreas ON fixtureAreas.event = event.id
LEFT JOIN genericSeats ON genericSeats.event = event.id
LEFT JOIN seatAreas ON seatAreas.event = event.id
LEFT JOIN numberedSeats ON numberedSeats.event = event.id
LEFT JOIN pricings ON pricings.event = event.id

WHERE event.id = 1
;