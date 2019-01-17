# ProgWeb2018
Projet de Programmation Web M2 GL 2018 - Loann Giovannangeli, Maxime Mayolini

Ce Github contient la partie Front du projet, réalisée en React.

La séparation avec l'API est nécessaire pour le bon déploiement sur Heroku. 
Cette partie est déployée sur un serveur Heroku à l'adresse : https://progweb-2018.herokuapp.com

La petite API que nous avons développée est disponible à l'adresse : https://github.com/LoannGio/ProgWeb2018API_contracts

La console API Google n'accepte que les requêtes de login provenant des URLs : http://localhost:3000 et https://progweb-2018.herokuapp.com

## Lancement manuel
Après avoir cloné le projet, lancer les commandes suivantes depuis la racine :
* `npm install`
* `npm start`

Par défaut, le port de l'application est 3000. Cela est nécessaire comme énoncé plus tôt à cause de l'API Google.

Pour fonctionner, cette application a besoin de l'API disponible à l'adresse : https://api-contracts1.herokuapp.com

Si cette API est en panne, il est possible de la lancer manuellement en suivant les indications sur le GitHub de l'API.

Si vous effectuez cette manipulation, vous devez changer l'adresse du serveur utilisé pour l'API afin que le requêtage se fasse à l'adresse locale que vous venez de créer. Pour cela, dans le fichier _./src/Contrats.js_, décommentez la ligne 26 et commentez la ligne 27. De plus, si vous avez modifié le port sur lequel vous avez lancé l'API, modifiez ce port dans l'URL de la ligne 26.

## Fonctionnement du site

_Prérequis : avoir un compte Google._

En arrivant sur la SPA, il vous est demandé de vous connecter via Google. Une fois cela fait, vous arrivez sur la page "Contrats".

Vous pouvez observer les contrats sur la carte à droite. Des filtres sur la date et le montant du contrat sont disponibles à gauche.

Pour choisir une entreprise, il faut cliquer sur un marqueur présent sur la carte, puis cliquer sur le nom de l'entreprise qui s'affiche.

En cliquant sur "Entreprise", vous obtenez des informations sur la dernière entreprise consultée. Si jamais vous n'avez pas encore choisi d'entreprise, il vous est
demandé d'en choisir une.