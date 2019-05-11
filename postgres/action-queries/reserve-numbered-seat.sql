WITH
  variables AS (
    SELECT
      '1' AS inputUser,
      2 AS inputSeat
  ),
  seat AS (
    UPDATE "NumberedSeats" seat
    SET reserved = TRUE
    FROM "Users" "user", variables
    WHERE reserved = FALSE
      AND seat.id = inputSeat
      AND "user".uid = inputUser
    RETURNING seat.id, uid AS userUid
  ),
  insertion AS (
    INSERT INTO "NumberedSeatsReservations" (seat, "user")
      SELECT id, userUid FROM seat
    RETURNING "user", seat
  )

SELECT
  "user",
  seat.event,
  insertion.seat,
  TRUE AS reserved
FROM insertion
INNER JOIN "NumberedSeats" seat
  ON seat.id = insertion.seat
;