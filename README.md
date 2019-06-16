# RES-2019-Labo-HttpInfraStructure




## Etape 1:  Serveur HTTP statique avec Apache httpd



1. #### créer un fichier Docker à base d' une image php

   Notre contenaire sera creer grace à notre Dockerfile qui chargera  une image php trouvée sur docker Hub: <https://hub.docker.com/_/php/>

   ![](D:\Cours\2018-2019\semestre 2\RES\labo_res\RES-2019-Labo-HttpInfraStructure\Captures des resultats\Dokerfile apache_php.PNG)

   `/var/www/html`:  C'est un dossier qui contient tous les sites web qui seront hébergés.

   Dans le répertoire `./content` (situé dans `docker-images/apache-php-image`), nous avons inclus le fichier `index.html`dans lequel nous aurons le contenu de notre page Web.

   En mettant un texte dans le fichier `index.html` , il est posssible de le visualiser sur le navigateur ,mais son aspect restera médiocre.

   Pour avoir  une page Web bien concu, nous avons utiliser un modèle  disponible sur le site [https://startbootstrap.com](https://startbootstrap.com/) .

   Pour pouvoir appliquer ce modèle, nous avons copié le contenu du fichier téléchargé dans le `./content/`répertoire. Ce modèle lui-même contient lui aussi un fichier `index.html` qui est par la suite  modifié .

2. **Lancer le conteneur Docker**

   Votre repertoire courant doit etre : docker-images\apache-php-image

   Ensuite, exécutez les commandes docker suivante pour construire l'image et le lancer : 

   $ docker build -t res/apache_static . 

   $docker run -d -p 9090:80 res/apache_static 

   Les fichiers du site web peuvent etre vu en entrant la commande: 

   $docker exec -it res/apache_static /bin/bash 

   $ls 

Vous pouvez enfin voir les résultat dans votre navigateur à l’ [adresse http://localhost:80 Vous devriez voir la charge utile json avec une liste de contenu differents et à chaque fois qu'on actualise, vous l'actualise,  elle devrait changer.

## Etape 2: Serveur HTTP dynamique avec express.js



Nous avons créé Dockerfile, à partir  d'une image de node, disponible sur [https://hub.docker.com/_/node/.](https://hub.docker.com/_/node/)

Nous avons utilisé l'image  node:10.16.0 , qui nous a permi de lancer un serveur  et  gracce aux commandes npm, nous avons pu gérer les paquet que nous souhaitons utiliser.

le répertoire de travail principal se trouve dans /opt/app/ c'est pourquoi nous faisons le copions avec en faisant "COPY  src /opt/app/ "  .  Ensuite, nous exécutons immédiatement l'application après l'exécution d'un menu fixe avec CMD ["node" , "/opt/app/index.js"] . L'application écoute simplement toute requête http sur le port 3000.

Notre appliaction a pour but de renvoyer ä chaque execution la Profession, la date d'entree et le pays d'origine.  

Pour construire notre serveur nous utiliserons le framework express js.

Pour pouvoir garder une trace des dépendances, On devra installer "npm"sur Docker afin de faire fonctionner le serveur, nous avons créer un paquet json contenant toutes des infos sur ces dépendances. Cette commande a ete utilisée : 

$`npm init` 

Ensuite , faudra remplir le questionnaire envoyé.



Installer express.js, :

`npm install express --save` 



Pour installer chance.js, nous utilisons la commande

npm install --save chance



Pour Configuration du serveur express, voir notre script dans le repo "docker-images\express-image"



Après cela, vous pouvez revenir en arrière: cd D: / Semestre4 / RES / Labo2 / Enseignement-HEIGVD-RES-2018-Labo-HTTPInfra et créer et exécuter l'application de menu fixe: 

$docker build -t res/express_dynamic .

$docker run -d -p 9091:3000 res/express_dynamic

Vous pouvez enfin voir les résultat dans votre navigateur à l’ [adresse http://localhost:3000 Vous devriez voir la charge utile json avec une liste de contenu differents et à chaque fois qu'on actualise, vous l'actualise,  elle devrait changer.



Remarque: 

Penser à faire un  nettoyage avec: 

$ docker kill $ (docker ps -q) 

$ docker rm $ (docker ps -a -q) 

$ docker rmi $ (images du menu fixe -q) 



## Etape 3: Reverse proxy avec apache (configuration statique)



Dans cette partie, nous devons creer un point de redirection vers les deux service differents. l'un statique et l'autre dynamique. Pour ce faire, nous allons devoir coder les adresses en dur.

Nous allons créer un serveur proxy inverse auquel nous pouvons accéder en utilisant l'URL  "demo.res.ch"

Pour créer notre reverse proxy , nous devons connaître l’adresse IP des deux services(apache_static et express_dinamic). 

Si nos deux services ne sont pas encore fonctionnel , il faut les démarrer :

$ docker run -d --name apache_static res/apache_static
$ docker run -d --name express_dynamic res/express_dynamic

Maintenant que les conteneurs fonctionnent, nous pouvons obtenir leur adresse IP avec la commande:

$ docker inspect <nom du contenaire> | grep -i ipaddress



Nous devions vérifier à nouveau l'adresse et mettre à jour le conteneur de proxy inverse , ceci afin d'estre surs que nos contenaire possedent la meme adresse

Afin de configurer notre proxy inverse afin qu'il puisse accéder à la page html créée dans la partie 1, nous devons exécuter un conteneur de menu fixe, directement sur l'image "php:7.2-apache" en mode interactif: 

$ docker run -it -p 8080:80 php:7.2-apache /bin/bash

Les fichiers de configuration du conteneur se trouvent dans le dossier  "" /etc/apache2/ "   du conteneur  et dans ce dossier se trouve : "sites-available" et "mods-available" qui contient tous les sites et modules disponibles dans le conteneur.  "sites-enable"  et "mode-enable" qui  respectivement contiennennt tous les sites et modules activés.

\#### Ajouter un nouvel hôte virtuel

Dans `sites-available`, on peut trouver le fichier 000-default.conf qui donne la configuration de la redirection par défaut

Pour un lien vers la nouvelle redirection, nous copions le fichier conf dans un nouveau fichier :

$ cp 000-default.conf 001-reverse-proxy.conf



Ensuite nous devons aussi installer "vim"  et configurer l'hote Pour ce faire , écrire avec la commande vim dans le fichier "001-reverse-proxy.conf". 

$ apt-get update & apt-get install vim

Dans le fichier "001-reverse-proxy.conf  " nous configurons l'hôte virtuel de la manière suivante:

 172.17.0.3 :	adresse ip express du serveur de la partie 2 et  172.17.0.2  :  correspond à la partie statique de la partie 1.

Nous devons aussi activer le site à partir du dossier `/etc/apache2/`avec la commande:  " a2ensite 001* et ensuite activer les modules proxy et proxy_http avec la commande  "a2enmod proxy"` et `a2enmod proxy_http

Cette configuration  nous permet de se  connecter au serveur proxy avec docker (en utilisant le port 8080 comme port exterieur) et rediriger vers apache_static ou express_dynamic

Pour éviter de faire ces configirations à chaque redemarrage, nous allons utiliser le fichier Dockerfile pour tout préconfigurer et une hiérarchie de dossiers qui automatiseront cette configuration.

Voir le Dockerfile de cette branche dans le repo pour plus de details.



La dernière chose à faire sera de configurer la redirection des adresses IP , afin qu'en tapant demo.res.ch`nous sommes redirigés sur le bon port. C'est dans cette étape que nous  donnons un alias IP 192.168.99.100(adresse de notre Docker machine). Ensuite, nous modifions le fichier Hôtes. Sous Windows 10, vous pouvez trouver dans: C: \ Windows \ System32 \ drivers \ etc 

 ajouter une ligne: 192.168.99.100 demo.res.ch

`demo.res.ch:8080/` =>  redirige vers la page index.html (partie 1)

`demo.res.ch:8080/api/students/` => redirige vers les serveurs  (partie 2)





## Etape 4: requêtes AJAX avec JQuery

### 

Ici, le plus important sera d'indiquer le script à exécuter  qui se trouve dans le dossier js. Dans ce script, on va definir  une fonction qui sera appelée par le module JQuery . 

Pour faire les tests, les commandes à executer sont :  

Construire les images comme indiqué aux etapes  precedentes.

Construire les contenaire static et dynamic et les lancer. Ensuite construire le contenaire du reverse-proxy en mappant le port 80 de notre serveur sur le port 8080 de notre machine.

Voir capture ecran dans le dossier resultats.



## Etape 5: Configuration du proxy inverse dynamique

Pour les test, on peut faire exactement les meme commandes qu'à l'etape 4.