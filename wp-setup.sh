#!/bin/sh

# Automatically stop and remove docker container. If does not exist,
# continue executing
docker stop wp-backend || true && docker rm wp-backend || true
docker stop wp-backend-db || true && docker rm wp-backend-db || true

# Setup network
docker network create wp-network

# MariaDB / MySQL Setup
docker run --name wp-backend-db \
    --network wp-network \
    -e MYSQL_RANDOM_ROOT_PASSWORD='yes' \
    -e MYSQL_DATABASE='g2lab_woocommerce_db' \
    -e MYSQL_USER='g2lab_woocommerce' \
    -e MYSQL_PASSWORD='g2lab_secret' \
    -d mariadb:latest


# Wordpress setup
docker run --name wp-backend \
    --network wp-network \
    -e WORDPRESS_DB_HOST='wp-backend-db' \
    -e WORDPRESS_DB_NAME='g2lab_woocommerce_db' \
    -e WORDPRESS_DB_USER='g2lab_woocommerce' \
    -e WORDPRESS_DB_PASSWORD='g2lab_secret' \
    -p 8080:80 \
    -d wordpress:latest
