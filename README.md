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















## Etape 4: requêtes AJAX avec JQuery

### 

















































## Etape 5: Configuration du proxy inverse dynamique

### 































































































































































