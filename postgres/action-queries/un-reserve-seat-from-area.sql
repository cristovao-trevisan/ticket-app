BEGIN;
  WITH
    reservation AS (
      UPDATE "GenericSeatsReservations" reservation
      SET amount = GREATEST(reservation.amount - 1, 0) -- amount
      FROM "Users" "user", "GenericSeatsReservations" oldReservation

      WHERE reservation.amount > 0
        AND reservation.seat = 1 -- seat
        AND "user".uid = '1' -- user
        AND "user".id = reservation.user
        AND oldReservation.seat = reservation.seat
        AND oldReservation.user = reservation.user
      RETURNING
        reservation.seat AS seatId,
        oldReservation.amount - reservation.amount AS amount
    )

  UPDATE "GenericSeats" seat
  SET reserved = reserved - reservation.amount
  FROM reservation
  WHERE id = reservation.seatId
  ;
COMMIT;
