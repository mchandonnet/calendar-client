#!/bin/bash

API="http://localhost:4741"
URL_PATH="/events"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "event": {
      "eventName": "'"${NAME}"'",
      "eventNotes": "'"${NOTES}"'",
      "startDate": "'"${STARTDATE}"'",
      "startTime": "'"${STARTTIME}"'",
      "endTime": "'"${ENDTIME}"'",
      "allDay": "'"${ALLDAY}"'"
    }
  }'

echo