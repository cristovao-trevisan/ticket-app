BEGIN;
  WITH
    seat AS (
      UPDATE "GenericSeats"
      SET reserved = reserved + 1 -- amount
      WHERE (occupied + reserved + 1) < capacity
        AND id = 1 -- seat
      RETURNING id
    )

  INSERT INTO "GenericSeatsReservations" (seat, amount, "user")
    SELECT seat.id, COALESCE(reservation.amount, 1), "user".id
    FROM seat, "Users" "user"
    
    LEFT JOIN "GenericSeatsReservations" reservation
      ON reservation.user = "user".id

    WHERE "user".uid = '1'
  ON CONFLICT ON CONSTRAINT "GenericSeatsReservations_pkey"
    DO UPDATE SET amount = EXCLUDED.amount + 1
  ;
COMMIT;
