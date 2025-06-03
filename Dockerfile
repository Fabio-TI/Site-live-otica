# Usa imagem base do PHP com Apache
FROM php:8.2-apache

# Instalar extensões necessárias
RUN apt-get update && \
    apt-get install -y \
        libpng-dev \
        libjpeg-dev \
        libfreetype-dev \
        unzip \
        git \
        libonig-dev

# Ativar mod_rewrite para URLs amigáveis
RUN a2enmod rewrite

# Configurar diretório de trabalho
WORKDIR /var/www/html

# Copiar arquivos para o container
COPY . /var/www/html/

# Expor porta 80
EXPOSE 80

# Instalar extensões PHP
RUN docker-php-ext-install pdo_mysql mysqli mbstring exif gd