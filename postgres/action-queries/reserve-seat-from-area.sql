WITH
  variables AS (
    SELECT
      '1' AS inputUser,
      2 AS inputAmount,
      1 AS inputSeat
  ),
  seat AS (
    UPDATE "GenericSeats"
    SET reserved = reserved + inputAmount
    FROM "Users" "user", variables
    WHERE (occupied + reserved + inputAmount) < capacity
      AND id = inputSeat -- seat
      AND "user".uid = inputUser
    RETURNING id, uid AS userUid
  )

INSERT INTO "GenericSeatsReservations" (seat, amount, "user")
  SELECT seat.id, COALESCE(reservation.amount, inputAmount), "user".uid
  FROM seat, "Users" "user"
  
  INNER JOIN variables ON TRUE
  LEFT JOIN "GenericSeatsReservations" reservation
    ON reservation.user = "user".uid

  WHERE "user".uid = userUid
ON CONFLICT (seat, "user")
  DO UPDATE SET amount = EXCLUDED.amount + 2 -- inputAmount
RETURNING amount
;