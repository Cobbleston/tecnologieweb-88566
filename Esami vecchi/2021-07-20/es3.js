let searchParameters = "";
let html = "";
let listPlaylist = "";

let idUtente = 123456;

$().ready(() => {
    $.get(`./elencoPlaylist`)
        .then(res => JSON.parse(res))
        .then(res => {
            listPlaylist = res;
            html = "";
            for (let playlist in res) {
                html += `<div class="bloccoPlaylist">${playlist[nome]}<br>${playlist[durata]}</div>`;
            }
        });

    updateBrani();
});

function updateBrani(filters, selectedPlaylist) {
    if (!filters && !selectedPlaylist) {
        html = "";
        $.get(`./brani?search=top10`)
            .then((res) => {
                allSongs = res.map(x => JSON.parse(x));
                for (let song in allSongs) {
                    html += `<div class="bloccoCanzone"><span class="durataBlock">${song[durata]}</span><span class="nomeBlock">${song[nome]}</span><span class="artistaBlock">${song[artista]}</span><span class="albumBlock">${song[album]}</span></div>`
                }
                $("#elencoCanzoni").html = html;
            })
            .catch(err => {
                console.error(err);
            });
    }
    else if (selectedPlaylist) {
        html = "";
        $.get(`./programma/${idPlaylist}`)
            .then((res) => JSON.parse(res))
            .then((res) => {
                for (let song in res) {
                    html += `<div class="bloccoCanzone"><span class="durataBlock">${song[durata]}</span><span class="nomeBlock">${song[nome]}</span><span class="artistaBlock">${song[artista]}</span><span class="albumBlock">${song[album]}</span></div>`
                }
                $("#elencoCanzoni").html = html;
            })
            .catch(err => {
                console.error(err);
            });
    }
    else if (filters) {
        html = "";
        $.get(`./brani?search=${filters}`)
            .then((res) => {
                allSongs = res.map(x => JSON.parse(x));
                for (let song in allSongs) {
                    html += `<div class="bloccoCanzone"><span class="durataBlock">${song[durata]}</span><span class="nomeBlock">${song[nome]}</span><span class="artistaBlock">${song[artista]}</span><span class="albumBlock">${song[album]}</span></div>`
                }
                $("#elencoCanzoni").html = html;
            })
            .catch(err => {
                console.error(err);
            });
    }
}

function showFilteredSongs() {
    updateBrani($(searchValue));
}

function showDetailsPlaylistWindow(id) {
    let res = "";

    let playlist = listPlaylist[id];
    res += `${playlist[nome]}, `;
    res += `${playlist[costoAbbonamento]}, `;
    res += `${playlist[durata]}`;

    alert(res);
}

function aggiungiBrano(selectedPlaylist, selectedBrano, idUtente) {
    if (!selectedPlaylist) {
        alert("Seleziona prima una playlist!");
    }
    else if (!selectedBrano) {
        alert("Seleziona prima un brano!");
    }
    else {
        let songDurata = 0;
        html = "";
        $.get(`./brani/${selectedBrano}`)
            .then((res) => {
                song = JSON.parse(res);
                songDurata = song[durata];
                // let songNome = song[nome];
                // let songArtista = song[artista];
                // let songAlbum = song[album];
            })
            .catch(err => {
                console.error(err);
            });

        if (listPlaylist[selectedPlaylist][durata] + songDurata > 1000 * 60 * 60 * 3) {
            alert("Durata troppo alta, prova con queste canzoni");

            let tempoMassimo = 1000 * 60 * 60 * 3 - listPlaylist[selectedPlaylist][durata];

            updateBrani(filters + `durataMassima=${tempoMassimo}`, selectedPlaylist);
        }
        else if (idUtente in listPlaylist[selectedPlaylist][contribuenti]) {
            alert("Hai gia' inserito questa canzone! Prova con queste playlist invece");


            $.get(`./elencoPlaylist`)
                .then(res => JSON.parse(res))
                .then(res => {
                    listPlaylist = res;
                    html = "";
                    for (let playlist in res) {
                        if (playlist != selectedPlaylist)
                            html += `<div class="bloccoPlaylist">${playlist[nome]}<br>${playlist[durata]}</div>`;
                    }
                });
        }
        else {
            $.post(`./aggiungi/${selectedPlaylist}?which=${selectedBrano}`);
            updateBrani();
        }
    }
}