SELECT tag.title
FROM "EventTags" AS eventTags
INNER JOIN "Tags" AS tag
  ON eventTags.tag = tag.id

WHERE eventTags.event = 1
;