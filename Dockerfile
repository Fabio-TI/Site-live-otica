FROM php:8.2-apache

# Instalar extensões necessárias
RUN apt-get update && \
    apt-get install -y git unzip libpng-dev libjpeg-dev libfreetype-dev && \
    docker-php-ext-install pdo_mysql mysqli mbstring exif gd

# Ativar mod_rewrite para URLs amigáveis
RUN a2enmod rewrite headers expires mime

# Definir diretório de trabalho e copiar arquivos
WORKDIR /var/www/html
COPY ./src/ /var/www/html/

# Configurar Apache para servir corretamente
RUN sed -i 's/DocumentRoot \/var\/www\/html/DocumentRoot \/var\/www\/html/g' /etc/apache2/sites-available/000-default.conf
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

EXPOSE 80