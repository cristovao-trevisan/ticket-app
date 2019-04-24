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
        'number', number,
        'location', location,
        'reserved', reserved,
        'occupied', occupied
      )) AS "numberedSeats"
    FROM "NumberedSeats"
    GROUP BY event
  )

SELECT
  event.name,
  event.description,
  "fixtureAreas",
  "seatAreas",
  "numberedSeats"
FROM "Events" AS event
LEFT JOIN fixtureAreas ON fixtureAreas.event = event.id
LEFT JOIN seatAreas ON seatAreas.event = event.id
LEFT JOIN numberedSeats ON numberedSeats.event = event.id

WHERE event.id = 1
;