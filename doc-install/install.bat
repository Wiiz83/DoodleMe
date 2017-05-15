@echo off 
CD ../client
echo  Client : npm install
pause
start /min npm install
echo  Client : bower install
pause
start /min bower install
echo  serveur : npm install
pause
CD ../server
start /min npm install
echo  Démarrer le serveur:
pause
start /min  node server.js
start /min http://localhost:3000/
echo  Fin
pause
