const express = require('express');
const fs = require('fs');
const port = process.env.PORT || 3000;

const app = express();

app.get('/titre_aleatoire', (req, res) => {
    fs.readFile('track.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erreur interne du serveur');
            return;
        }

        const chansons = JSON.parse(data).nouvellesDonnees;
        const titreAleatoire = chansons[Math.floor(Math.random() * chansons.length)];
        res.json({ track: titreAleatoire["Track Title"] + ' - '+ titreAleatoire["Artist"]});


    });
});

app.listen(port, () => {
    console.log("serveur online");
});
