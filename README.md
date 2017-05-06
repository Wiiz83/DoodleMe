## DoodleMe

On souhaite mettre en œuvre une application web gérant les disponibilités d’un groupe de personnes pour fixer des évènements (style « doodle® »).

# Lancement du projet :
## Premier lancement du programme :
npm install
bower install 
grunt
node /server/server.js

## Base de données
Executer le fichier doc-install/moodleme.sql sur PhpMyAdmin
Vérifier la configuration de la connexion à cette base dans server/js

## Lancement du programme : 
node /server/serveur.js

## Sources :
https://www.sitepoint.com/kickstart-your-angularjs-development-with-yeoman-grunt-and-bower/
http://vegas.univ-tlse3.fr/chamilo/main/document/showinframes.php?cidReq=LM6STI6&id_session=45&gidReq=0&origin=&id=87
_____________________________________________________________________________________________________________

Version 1

Le système fonctionne sur la base d’évènements qui sont constitués d’une description et d’une liste de créneaux (date et heure).

a) Chaque utilisateur doit pouvoir créer un événement et proposer des créneaux.

b) Lors de la connexion à l’application, la liste totale des évènements doit apparaitre. Un utilisateur lambda doit pouvoir fournir une réponse à l’évènement de son choix. Une réponse pourra être considérée comme l’association d’un créneau d’un évènement avec un utilisateur et une disponibilité (oui/non). Ces réponses seront publiques.
_____________________________________________________________________________________________________________

Version 2

a) Dans cette étape, on souhaite ajouter la notion de profil utilisateur au système. On définira un profil comme un objet associant un nom d’utilisateur, un nom, un prénom (à minima).

b) Un utilisateur pourra dès lors se « connecter » à l’application (la saisie du compte utilisateur sera suffisante). L’authentification n’est pas comprise dans cette version. A partir de son profil, un utilisateur doit pouvoir accéder à la liste des évènements qu’il a créé et à la liste des évènements auxquels il a participé (ie: donné une réponse).
_____________________________________________________________________________________________________________

Version 3

a) Un utilisateur ayant créé un événement pourra le clôturer et ainsi fixer une date (créneau) finale. Ce choix sera automatiquement proposé par l’application et se fera en fonction du plus grand nombre de participant ayant positivement répondu à un créneau.

b) Les utilisateurs ayant répondu à un événement clôturé seront « notifiés » par un message lors de leur prochaine connexion à l’application.

_____________________________________________________________________________________________________________

Version 4

Dans cette version, nous vous laissons choisir la fonctionnalité à ajouter :

a) Géolocalisation de utilisateurs et proposition d’un lieu pour la tenue de l’événement ;

b) Notification « Temps-Réel » des clôtures d’évènements via des WebSockets.

c) Gestion des authentifications

d) Internationalisation de l’application (via les modules Angular idoines).

_____________________________________________________________________________________________________________
_____________________________________________________________________________________________________________
_____________________________________________________________________________________________________________

Organisation du projet et travail attendu

La réalisation du projet comporte deux parties :
_____________________________________________________________________________________________________________

Partie I : Conception de l’application

Concevez et rédigez l’application permettant de répondre aux spécifications précédemment énoncées. 

Constituez un dossier qui comportera les diagrammes UML adéquats exprimant le résultat de l’analyse de cette application.

_____________________________________________________________________________________________________________

Partie II : Développement d’une maquette de l’application

Une maquette de la solution envisagée doit être développée. 

Celle-ci devra donner une image fidèle de la solution réelle ensuite déployée.

_____________________________________________________________________________________________________________
_____________________________________________________________________________________________________________
_____________________________________________________________________________________________________________

Évaluation

Le projet donnera lieu à une soutenance. A cette échéance, chaque trinôme devra présenter son projet et faire une démonstration. Ce même jour, vous devez rendre le rapport et votre code sous chamilo. Votre projet sera évalué en fonction des choix techniques que vous effectuerez, de la qualité technique du code produit, de la qualité de la documentation, de son respect du sujet, du respect de l’échéance, de l’ergonomie de votre application et de son allure générale. Tout retard dans la fourniture des livrables sera sanctionné dans l’évaluation.
_____________________________________________________________________________________________________________
_____________________________________________________________________________________________________________
_____________________________________________________________________________________________________________

Consignes diverses :

- Les fonctionnalités supplémentaires que vous mettrez en œuvre seront aussi comptabilisées à la condition que tous les éléments du projet aient été correctement traités au préalable ET sont soumises à l'accord préalable de l'équipe enseignante.

- RAPPEL DES ÉCHEANCES : 27/03/2017 FI et 29/05/2017 FA
