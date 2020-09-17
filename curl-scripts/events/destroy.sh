API="http://localhost:4741"
URL_PATH="/events"
curl "${API}${URL_PATH}/${EVENTID}" \
--include \
--request DELETE \
--header "Authorization: Bearer ${TOKEN}"

echo