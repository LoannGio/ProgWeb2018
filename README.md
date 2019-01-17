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