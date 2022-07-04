$(document).ready(function () {
    let id = 1;
    // Assumo di avere una API loadArticle che carica l'articolo
    $.get('./loadArticle/${id}')
        .then(res => JSON.parse(res))
        .then(res => $("#articleContainer").html(res))
        .catch(err => console.log(err));

    $.get('./showComments/${id}')
        .then(res => {
            res = JSON.parse(res);
            let commSec = $("#commentsContainer");
            let html = "";
            // Esempio di commento
            // {id: 2, author: "...", text: "", replies: [ {id: 4, author: "...", text: ""}, ...]}
            for (let comment in res) {
                html += `<div id="${comment[id]}" class="comment">
                        <h5>Posted by ${comment[author]}</h5>
                        <p>${comment[text]}</p>
                        <input type="text" placeholder="Rispondi">
                        <button onclick="rispondi(${comment[id]})">
                            Rispondi al commento
                        </button>`;

                for (let reply in comment[replies]) {
                    html += `<div id=${reply[id]}>
                            <h6>Reply by ${reply[author]}</h5>
                            <p>${reply[text]}</p>
                            <input type="text" placeholder="Rispondi"/>
                            <button onclick="rispondi(${reply[id]})">Rispondi al sotto commento</button>
                        </div>`;
                }
                html += "</div>";
                commSec.append(html);
            }
        })
        .catch(err => console.log(err));
})

function rispondi(id) {
    let container = $('#comment' + id);

    let text = $(`#${id} > input[name="text"]`);
    let author = $(`#${id} > input[name="author"]`);

    if (!text) {
        alert("Manca il testo!");
    }
    else if (!author) {
        alert("I commenti anonimi sono vietati!");
    }
    else {
        $.post(`./addComment/{id}?text=${text}&author=${author}`)
            .then(res => {
                let comment = JSON.parse(res);
                let commSec = $("#commentsContainer");
                let html = "";
                // Esempio di commento restituito da POST
                // {id: 2, author: "...", text: "", replies: [ {id: 4, author: "...", text: "", ...]}
                html +=`<div id=${comment[id]}>
						    <h5>Posted by ${comment[autore]}</h5>
							<p>${comment[testo]}</p>
							<input type="text" placeholder="Nome" name="autore"/>
							<input type="text" placeholder="Rispondi" name="testo"/>
							<button onclick='rispondi(${comment[id]})'>Rispondi al commento</button>`;

                for (let reply in comment[replies]) {
                    html += `<div id=${reply[id]}>
                            <h6>Reply by ${reply[author]}</h5>
                            <p>${reply[text]}</p>
                            <input type="text" placeholder="Rispondi"/>
                            <button onclick="rispondi(${reply[id]})">Rispondi al sotto commento</button>
                        </div>`;
                }
                html += "</div>";
                commSec.append(html);
            })
            .catch(err => console.log(err));
    }
}

function commentaArticolo() {
    // Non richiesta
}