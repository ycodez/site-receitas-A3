document.getElementById('form-receita').addEventListener('submit', function (e) {
    e.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const ingredientes = document.getElementById('ingredientes').value;
    const preparo = document.getElementById('preparo').value;

    const novaReceita = {
        titulo,
        ingredientes,
        preparo
    };

    let receitas = localStorage.getItem('receitas');
    if (receitas === null) {
        receitas = [];
    } else {
        receitas = JSON.parse(receitas);
    }

    receitas.push(novaReceita);
    localStorage.setItem('receitas', JSON.stringify(receitas));

    exibirReceitas();
    document.getElementById('form-receita').reset();
});

function exibirReceitas() {
    const listaReceitas = document.getElementById('lista-receitas');
    listaReceitas.innerHTML = '';

    let receitas = localStorage.getItem('receitas');
    if (receitas === null) {
        receitas = [];
    } else {
        receitas = JSON.parse(receitas);
    }

    receitas.forEach((receita, index) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
            <h2>${receita.titulo}</h2>
            <h3>Ingredientes:</h3>
            <p>${receita.ingredientes.replace(/\n/g, '<br>')}</p>
            <h3>Modo de Preparo:</h3>
            <p>${receita.preparo.replace(/\n/g, '<br>')}</p>
            <button class="botao-remover" onclick="removerReceita(${index})">Remover</button>
        `;
        listaReceitas.appendChild(div);
    });
}

function removerReceita(index) {
    let receitas = localStorage.getItem('receitas');
    if (receitas !== null) {
        receitas = JSON.parse(receitas);
        receitas.splice(index, 1);
        localStorage.setItem('receitas', JSON.stringify(receitas));
        exibirReceitas();
    }
}

document.addEventListener('DOMContentLoaded', exibirReceitas);
