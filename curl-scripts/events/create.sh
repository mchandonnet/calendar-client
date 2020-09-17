#!/bin/bash

API="http://localhost:4741"
URL_PATH="/events"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
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
