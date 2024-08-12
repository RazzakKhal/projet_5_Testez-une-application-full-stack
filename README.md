Clonez le dépôt Git :
Aller dans le dossier :

Commande : 'cd Testez-une-application-full-stack/front'

Installer les dépendances :
Commande : ' NPM INSTALL'

Lancer le front-end :
Commande : ' ng serve'

Ressources
Environnement Mockoon Collection Postman Pour Postman, importez la collection en suivant la documentation :

Documentation Postman

Le fichier de collection se trouve ici :
ressources/postman/yoga.postman_collection.json

MySQL
Le script SQL pour créer le schéma est disponible ici :

ressources/sql/script.sql

Par défaut, le compte administrateur est :
Login : yoga@studio.com Mot de passe : test!1234

Tests
Vous pouvez lancer les tests E2E avec cette commande : ' npx cypress run'

Tests End-to-End (E2E) Pour lancer les tests e2e :

Commande : npm run e2e Le Html coverage ce trouve à ce chemin : front/coverage/lcov-report/index.html

Les test unitaires :
Commande :

'npm run test'

Commande pour le coverage des test unitaire :

'npm run test:coverage'

BACK END
Vous avez cloner le projet sur intelliJ :

Vous allez générer le coverage de test avec jacoco :

Commande : 'mvn clean test'

Vous pouvez ensuite ouvre le fichier html de ce chemin :

back/target/site/jacoco/index.html
