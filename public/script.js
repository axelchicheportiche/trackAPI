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
        ${data.artist}<br>
        ${data.track}<br>
        BPM : ${data.BPM}<br>
        Duration : ${data.duration}
        `
        const youtube = document.getElementById('youtube');
        youtube.innerHTML = `
        <a class="button" href="https://www.youtube.com/results?search_query=${encodeURIComponent(data.artist)}+${encodeURIComponent(data.track)}" target="_blank">
        open in youtube</a>
        `;
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }
}

function test() {
    console.log('test')
}

// //REFRESH
// function refresh(){
//     fetchData()
// }

// const refreshBtn = document.getElementById('refresh');
// refreshBtn.addEventListener("click", refresh());


fetchData();
