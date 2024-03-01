const fs = require('fs');
const path = require('path');

//API Call
let apiCalls = 0;

module.exports = function (app) {

    //Compteur d'appel API
    app.use('/titre_aleatoire', (req, res, next) => {
        apiCalls++;
        next();
    });


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

    // Endpoint pour récupérer le nombre d'appels API
    app.get('/statistiques', (req, res) => {
        res.json({ apiCalls });
    });
};
