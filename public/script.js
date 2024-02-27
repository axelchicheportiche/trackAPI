async function fetchData() {
    try {
        const response = await fetch("./titre_aleatoire", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        console.log(data);
        const trackid = document.getElementById('trackid');
        trackid.innerHTML = `
        Artist : ${data.artist} <br>
        Track : ${data.track}<br>
        BPM : ${data.BPM}<br>
        Duration : ${data.duration}
        `
        const youtube = document.getElementById('youtube');
        youtube.innerHTML =`
        <a id="button" href="https://www.youtube.com/results?search_query=${data.artist}+${data.track}" target="_blank">
            open in youtube
        </a>
        `
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }
}

fetchData();
