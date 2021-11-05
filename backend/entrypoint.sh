#!/bin/sh
set -e

cd /app
composer install
composer dump
php artisan key:generate
php artisan migrate
php artisan storage:link

exec "$@"
