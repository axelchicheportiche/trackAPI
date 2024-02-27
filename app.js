const fs = require('fs');
const path = require('path');

module.exports = function (app) {
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
                res.json({
                    artist: titreAleatoire["Artist"],
                    track: titreAleatoire["Track Title"],
                    BPM: titreAleatoire["BPM"],
                    duration: titreAleatoire["Time"],
                });

            } catch (parseError) {
                console.error(parseError);
                res.status(500).send('Erreur interne du serveur - Impossible de traiter le fichier JSON');
            }
        });
    });
};
