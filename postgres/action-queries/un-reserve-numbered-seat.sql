WITH
  variables AS (
    SELECT
      '1' AS "user",
      2 as seat
  ),
  reservation AS (
    DELETE FROM "NumberedSeatsReservations" reservation
    USING variables
    WHERE reservation.seat = variables.seat
      AND reservation.user = variables.user
    RETURNING reservation.seat, reservation.user
  )

UPDATE "NumberedSeats" seat
SET reserved = FALSE
FROM reservation
WHERE reservation.seat = seat.id
RETURNING reservation.seat, seat.event, reservation.user, FALSE AS reserved
;
