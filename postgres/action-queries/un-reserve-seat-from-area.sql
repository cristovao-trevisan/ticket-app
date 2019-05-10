WITH
  reservation AS (
    UPDATE "GenericSeatsReservations" reservation
    SET amount = GREATEST(reservation.amount - 1, 0) -- amount
    FROM "GenericSeatsReservations" oldReservation

    WHERE reservation.amount > 0
      AND reservation.seat = 1 -- seat
      AND reservation.user = '1' -- user
      AND oldReservation.seat = reservation.seat
      AND oldReservation.user = reservation.user
    RETURNING
      reservation.seat AS seatId,
      oldReservation.amount - reservation.amount AS diff,
      reservation.amount
  )

UPDATE "GenericSeats" seat
SET reserved = reserved - reservation.diff
FROM reservation
WHERE id = reservation.seatId
RETURNING reserved, occupied, reservation.amount, event
;
