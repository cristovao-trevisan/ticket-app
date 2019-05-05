WITH
  mainImages AS (
    SELECT DISTINCT ON (event)
      event,
      reference
    FROM "EventImages" image
    WHERE main IS TRUE
    GROUP BY event, reference
  )

SELECT
  event.id,
  event.name,
  mainImage.reference as image
FROM "Events" event

LEFT JOIN mainImages AS mainImage ON mainImage.event = event.id

LIMIT 5;