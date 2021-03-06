WITH
  topTags AS (
    SELECT
      tag,
      COUNT(event)
    FROM "EventTags" eventTags
    GROUP BY tag
    LIMIT 8
  )

SELECT tag.*
FROM topTags
INNER JOIN "Tags" tag
  ON topTags.tag = tag.id
;