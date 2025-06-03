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

# Garantir que o diretório HTML exista
RUN mkdir -p /var/www/html

# Copiar apenas a pasta src/ para o diretório correto
COPY ./src /var/www/html/

# Configurar permissões
RUN chown -R www-data:www-data /var/www/html

# Expor porta 80
EXPOSE 80