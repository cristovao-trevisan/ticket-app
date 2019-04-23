SELECT
  seat.id AS seat,
  JSON_AGG(JSON_BUILD_OBJECT(
    'price', price,
    'name', name,
    'id', pricing.id,
    'description', description
  )) AS pricings
FROM "Pricings" AS pricing
INNER JOIN "Seats" AS seat
  ON pricing.seat = seat.id

WHERE seat.event = 1
GROUP BY seat.id
;