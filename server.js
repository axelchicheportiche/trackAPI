const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

// Import module app.js
require('./app')(app);

// Middleware pour servir les fichiers statiques depuis le répertoire 'public'
app.use(express.static(path.join(__dirname, 'public')));


app.listen(port, () => {
    console.log("Serveur en ligne sur le port " + port);
});