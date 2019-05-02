WITH
  tags AS (
    SELECT
      event.id AS event,
      tag.title
    FROM "Events" event,
      "EventTags" eventTag,
      "Tags" tag
    WHERE eventTag.event = event.id
      AND eventTag.tag = tag.id
  ),
  fullSearch AS (
    SELECT
      event.id AS event,
      ts_rank(
        ARRAY[ 0.1, 0.2, 0.3, 1.0 ],
        SETWEIGHT(TO_TSVECTOR(event.name), 'B')
          || SETWEIGHT(TO_TSVECTOR(event.description), 'D')
          || SETWEIGHT(TO_TSVECTOR(tags.value), 'A'),
        TO_TSQUERY('superFun & games')
      ) AS rank
    FROM "Events" event

    INNER JOIN (
      SELECT event, STRING_AGG(title, ' ') AS value
      FROM tags
      GROUP BY event
    ) tags
      ON tags.event = event.id

    ORDER BY rank DESC
  )

SELECT
  event.id,
  event.name,
  event.description,
  fullSearch.rank,
  ARRAY_AGG(tag.title) AS tags
FROM fullSearch

INNER JOIN "Events" event ON event.id = fullSearch.event
INNER JOIN tags AS tag ON tag.event = event.id 

WHERE fullSearch.rank > 0

GROUP BY 1,2,3,4
ORDER BY fullSearch.rank DESC

LIMIT 10;
