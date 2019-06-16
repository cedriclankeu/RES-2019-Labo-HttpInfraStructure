# Création d'une couche à partir de l'image Docker php 7.2-apache
FROM php:7.2-apache

RUN apt-get update &&\
	apt-get install -y vim

#Copie le contenu du dossier "content" dans le dossier cible "/var/www/html" 
COPY content/ /var/www/html/