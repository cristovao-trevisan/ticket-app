WITH
  tags AS (
    SELECT
      eventTag.event,
      JSONB_AGG(JSON_BUILD_OBJECT(
        'id', tag.id,
        'title', tag.title
      )) AS result
    FROM "EventTags" eventTag
    INNER JOIN "Tags" tag
      ON tag.id = eventTag.tag
    GROUP BY eventTag.event
  ),
  pricing AS (
    SELECT
      event,
      JSONB_AGG(JSON_BUILD_OBJECT(
        'id', id,
        'name', name,
        'description', description,
        'price', price
      )) AS result
    FROM "Pricings"
    GROUP BY event
  ),
  socialConnections AS (
    SELECT
      event,
      JSONB_AGG(JSON_BUILD_OBJECT(
        'id', id,
        'network', network,
        'link', link
      )) AS result
    FROM "SocialConnections"
    GROUP BY event
  )

SELECT
  event.id,
  event.name,
  event.description,
  tag.result AS tags,
  pricing.result AS pricing,
  socialConnection.result AS "socialConnections"
FROM "Events" event

LEFT JOIN pricing AS pricing ON pricing.event = event.id
LEFT JOIN tags AS tag ON tag.event = event.id
LEFT JOIN socialConnections AS socialConnection ON socialConnection.event = event.id

WHERE event.id = 1
;