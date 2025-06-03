FROM php:8.2-apache

RUN apt-get update && \
    apt-get install -y \
        libpng-dev \
        libjpeg-dev \
        libfreetype-dev \
        unzip \
        git \
        libonig-dev

RUN docker-php-ext-install pdo_mysql mysqli mbstring exif

RUN a2enmod rewrite

WORKDIR /var/www/html