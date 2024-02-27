const express = require('express');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 3000;

const app = express();

app.get('/titre_aleatoire', (req, res) => {
    const filePath = path.join(__dirname, 'track.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erreur interne du serveur');
            return;
        }
        try {
            const chansons = JSON.parse(data).nouvellesDonnees;
            const titreAleatoire = chansons[Math.floor(Math.random() * chansons.length)];
            res.json({ track: titreAleatoire["Track Title"] + ' - ' + titreAleatoire["Artist"] });
        } catch (parseError) {
            console.error(parseError);
            res.status(500).send('Erreur interne du serveur - Impossible de traiter le fichier JSON');
        }


    });
});

app.listen(port, () => {
    console.log("serveur online");
});
