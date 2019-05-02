SELECT
  seat.id AS seat,
  ARRAY_AGG(seatPricing.pricing ORDER BY pricing.price ASC) AS pricings
FROM "Seats" seat
INNER JOIN "SeatsPricings" seatPricing
  ON seatPricing.seat = seat.id
INNER JOIN "Pricings" pricing
  ON pricing.id = seatPricing.pricing

WHERE seat.event = 1
GROUP BY seat.id
;