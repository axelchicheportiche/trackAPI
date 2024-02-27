//Rekordbox playlist.txt to Json

const fs = require('fs');
const rekordboxTxtPlaylist = require('./textData.js')


// Séparer les lignes du texte
const lines = rekordboxTxtPlaylist.trim().split('\n');

// En-têtes de colonnes
const headers = lines[0].split('\t');

// Tableau pour stocker les données
const table = [];

// Parcourir chaque ligne après l'en-tête
for (let i = 1; i < lines.length; i++) {
    const columns = lines[i].split('\t');
    const rowData = {};

    // Associer chaque valeur à son en-tête correspondant
    for (let j = 0; j < headers.length; j++) {
        rowData[headers[j]] = columns[j].trim();
    }

    // Ajouter la ligne au tableau
    table.push(rowData);
}

//console.log(table);

// filtrer le tableau avec la/les playlists indésirables
const donneesFiltrees = table.filter(objet => objet["Date Added"] !== "2023-11-18");

// Afficher le tableau filtré
console.log(donneesFiltrees);

const jsonDataArray = JSON.stringify(donneesFiltrees, null, 2);

const trackJson = 'track.json';

fs.readFile(trackJson, 'utf8', (err, data) => {
    if (err) {
        console.error('Erreur lors de la lecture du fichier :', err);
        return;
    }

    // Convertir le contenu en objet JavaScript
    const fichierExistant = JSON.parse(data);

    // Ajouter nouvelles données à l'objet existant
    fichierExistant.nouvellesDonnees = JSON.parse(jsonDataArray);

    // Convertir l'objet mis à jour en chaîne JSON
    const nouveauContenu = JSON.stringify(fichierExistant, null, 2);

    // Réécrire le fichier avec le contenu MAJ
    fs.writeFile(trackJson, nouveauContenu, 'utf8', (err) => {
        if (err) {
            console.error('Erreur lors de l\'écriture du fichier :', err);
            return;
        }
        console.log('Le fichier a été mis à jour avec succès.');
    });
});
