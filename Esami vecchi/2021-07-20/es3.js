let searchParameters = "";
let html = "";

$().ready(() => {
    $.get(`./brani?search=${searchParameters}`)
        .then((res) => {
            dresses = res.map(x => JSON.parse(x));
            render();
        })
        .catch(err => {
            console.error(err)
        });
    
    $.get(`./programma`)
        .then((res) => JSON.parse(res))
        .then((res) => {
            for (let song in res) {
                html += `<div class="bloccoCanzone"><span class="durataBlock">${song[durata]}</span><span class="nomeBlock">${song[nome]}</span><span class="artistaBlock">${song[artista]}</span><span class="albumBlock">${song[album]}</span></div>`
            }
        })
});