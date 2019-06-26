#!/usr/bin/env bash

# Из командой строки получаем имя приложения (cмотри команду ci:heroku:release)
application_name=$1

# Получаем id последнего собранного образа
container_id=$(docker inspect "registry.heroku.com/$application_name/web" --format="{{.Id}}")

# Отправляем запрос в Heroku c просьюой запустить контейнер из этого образа
# Для этого обращаемся в API c действием update и передаём ID контейнера
curl \
    --request PATCH "https://api.heroku.com/apps/$application_name/formation" \
    --netrc \
    --data "{\"updates\": [{ \"type\": \"web\", \"docker_image\": \"$container_id\" }]}" \
    --header "Content-Type: application/json" \
    --header "Accept: application/vnd.heroku+json; version=3.docker-releases" \
    --header "Authorization: Bearer $HEROKU_TOKEN"
