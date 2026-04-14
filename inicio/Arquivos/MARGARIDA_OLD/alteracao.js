alert("JS carregado");

function carregarImagem(event) {
    const imagem = document.getElementById("preview");

    if (event.target.files && event.target.files[0]) {
        imagem.src = URL.createObjectURL(event.target.files[0]);
    }
}

function ampliarImagem() {
    const img = document.getElementById("preview");
    window.open(img.src, "_blank");
}

function pegarDadosAluno() {
    return {
        nome: document.getElementById("nome").value,
        idade: document.getElementById("idade").value,
        cpf: document.getElementById("cpf").value,
        ra: document.getElementById("ra").value,
        nomeMae: document.getElementById("nomeMae").value,
        nomePai: document.getElementById("nomePai").value,
        telefoneMae: document.getElementById("telefoneMae").value,
        telefonePai: document.getElementById("telefonePai").value,
        email: document.getElementById("email").value
    };
}

function cadastrarAluno() {
    let aluno = pegarDadosAluno();

    if (!aluno.nome || !aluno.idade) {
        alert("Preencha nome e idade!");
        return;
    }

    let alunos = JSON.parse(localStorage.getItem("alunos")) || [];

    alunos.push(aluno);

    localStorage.setItem("alunos", JSON.stringify(alunos));

    adicionarNaTabela(aluno);

    limparCampos();
}


function excluirAluno(botao) {
    const linha = botao.parentNode.parentNode;
    linha.remove();
}


function editarAluno(botao) {
    const linha = botao.parentNode.parentNode;

    const nome = linha.cells[0].innerText;
    const idade = linha.cells[1].innerText;
    const cpf = linha.cells[2].innerText;

    document.getElementById("nome").value = nome;
    document.getElementById("idade").value = idade;
    document.getElementById("cpf").value = cpf;

    linha.remove();
}

function limparCampos() {
    document.getElementById("nome").value = "";
    document.getElementById("idade").value = "";
    document.getElementById("cpf").value = "";
    document.getElementById("ra").value = "";
    document.getElementById("nomeMae").value = "";
    document.getElementById("nomePai").value = "";
    document.getElementById("telefoneMae").value = "";
    document.getElementById("telefonePai").value = "";
    document.getElementById("email").value = "";
}




function adicionarNaTabela(aluno) {
    const tabela = document.getElementById("tabelaAlunos");

    const linha = tabela.insertRow();

    linha.innerHTML = `
        <td>${aluno.nome}</td>
        <td>${aluno.idade}</td>
        <td>${aluno.cpf}</td>
        <td>
            <button onclick="editarAluno(this)">Editar</button>
            <button onclick="excluirAluno(this)">Excluir</button>
        </td>
    `;
}

window.onload = function () {
    let alunos = JSON.parse(localStorage.getItem("alunos")) || [];

    alunos.forEach(aluno => {
        adicionarNaTabela(aluno);
    });
};


window.onload = function () {
    let alunos = JSON.parse(localStorage.getItem("alunos")) || [];

    const total = document.getElementById("totalAlunos");

    if (total) {
        total.innerText = alunos.length;
    }
};

if (document.getElementById("tabelaAlunos")) {
    // código da tabela
}

window.onload = function () {

    let alunos = JSON.parse(localStorage.getItem("alunos")) || [];

    console.log("DADOS NO DASH:", alunos);

    const total = document.getElementById("totalAlunos");

    if (total) {
        total.innerText = alunos.length;
    }

};


// Avisos simulados
const avisos = [
    { titulo: "Reunião Amanhã", conteudo: "Auditório às 10h. Todos devem comparecer." },
    { titulo: "Entrega de Atividades", conteudo: "Prazo até sexta-feira." },
    { titulo: "Manutenção no Sistema", conteudo: "Será às 18h." },
    { titulo: "Novo Projeto", conteudo: "Lançamento do laboratório de informática na próxima semana." }
];

// Renderiza os avisos no mural
function carregarMural() {
    const container = document.getElementById("avisos-container");
    if (!container) return;

    avisos.forEach((aviso, index) => {
        const div = document.createElement("div");
        div.className = "aviso";
        div.style.animationDelay = `${index * 0.1}s`; // delay progressivo
        div.innerHTML = `<h4>${aviso.titulo}</h4><p>${aviso.conteudo}</p>`;
        div.onclick = () => alert(`${aviso.titulo}\n\n${aviso.conteudo}`);
        container.appendChild(div);
    });
}

// Executa quando a página carrega
window.addEventListener("load", () => {
    carregarMural();
});



// Armazenamento de turmas
function pegarDadosTurma() {
    return {
        nome: document.getElementById("nomeTurma").value,
        periodo: document.getElementById("periodoTurma").value,
        sala: document.getElementById("salaTurma").value
    };
}

function cadastrarTurma() {
    let turma = pegarDadosTurma();
    if (!turma.nome || !turma.periodo) {
        alert("Preencha todos os campos da turma!");
        return;
    }

    let turmas = JSON.parse(localStorage.getItem("turmas")) || [];
    turmas.push(turma);
    localStorage.setItem("turmas", JSON.stringify(turmas));

    adicionarTurmaNaTabela(turma);
    limparCamposTurma();
}

function adicionarTurmaNaTabela(turma) {
    const tabela = document.getElementById("tabelaTurmas");
    const linha = tabela.insertRow();

    linha.innerHTML = `
        <td>${turma.nome}</td>
        <td>${turma.periodo}</td>
        <td>${turma.sala}</td>
        <td>
            <button onclick="editarTurma(this)">Editar</button>
            <button onclick="excluirTurma(this)">Excluir</button>
        </td>
    `;
}

function limparCamposTurma() {
    document.getElementById("nomeTurma").value = "";
    document.getElementById("periodoTurma").value = "";
    document.getElementById("salaTurma").value = "";
}

function excluirTurma(botao) {
    const linha = botao.parentNode.parentNode;
    linha.remove();
}

function editarTurma(botao) {
    const linha = botao.parentNode.parentNode;
    document.getElementById("nomeTurma").value = linha.cells[0].innerText;
    document.getElementById("periodoTurma").value = linha.cells[1].innerText;
    document.getElementById("salaTurma").value = linha.cells[2].innerText;
    linha.remove();
}

// Carregar turmas salvas no localStorage
window.addEventListener("load", () => {
    let turmas = JSON.parse(localStorage.getItem("turmas")) || [];
    turmas.forEach(turma => adicionarTurmaNaTabela(turma));
});





// ------------------- Turmas -------------------
function pegarDadosTurma() {
    return {
        nome: document.getElementById("nomeTurma").value,
        periodo: document.getElementById("periodoTurma").value,
        sala: document.getElementById("salaTurma").value,
        alunos: [] // lista vazia inicialmente
    };
}

function cadastrarTurma() {
    let turma = pegarDadosTurma();
    if (!turma.nome || !turma.periodo) {
        alert("Preencha todos os campos da turma!");
        return;
    }

    let turmas = JSON.parse(localStorage.getItem("turmas")) || [];
    turmas.push(turma);
    localStorage.setItem("turmas", JSON.stringify(turmas));

    adicionarTurmaNaTela(turma);
    limparCamposTurma();
}

function adicionarTurmaNaTela(turma, index) {
    const container = document.getElementById("turmas-container");
    const div = document.createElement("div");
    div.className = "turma-card";
    div.innerHTML = `
        <div class="turma-info">
            <span><b>Turma:</b> ${turma.nome}</span> | 
            <span><b>Período:</b> ${turma.periodo}</span> | 
            <span><b>Sala:</b> ${turma.sala}</span>
            <button onclick="toggleAlunos(this)">Alunos</button>
        </div>
        <div class="alunos-turma"></div>
    `;
    container.appendChild(div);

    // Delay de animação
    div.style.animationDelay = `${index * 0.1 || 0}s`;
}

// Toggle lista de alunos
function toggleAlunos(botao) {
    const containerAlunos = botao.parentNode.nextElementSibling;
    if (containerAlunos.style.display === "none" || containerAlunos.style.display === "") {
        // Exibir lista de alunos
        containerAlunos.style.display = "block";
        renderAlunosTurma(containerAlunos);
    } else {
        containerAlunos.style.display = "none";
    }
}

// Renderiza alunos (exemplo simples usando localStorage de alunos)
function renderAlunosTurma(container) {
    container.innerHTML = "";
    let alunos = JSON.parse(localStorage.getItem("alunos")) || [];

    alunos.forEach(aluno => {
        const div = document.createElement("div");
        div.className = "aluno-presenca";
        div.innerHTML = `
            ${aluno.nome} 
            <label>Presente <input type="checkbox" class="presenca-checkbox"></label>
            <label>Falta <input type="checkbox" class="falta-checkbox"></label>
        `;
        container.appendChild(div);
    });
}

// Limpar campos
function limparCamposTurma() {
    document.getElementById("nomeTurma").value = "";
    document.getElementById("periodoTurma").value = "";
    document.getElementById("salaTurma").value = "";
}

// Carregar turmas salvas
window.addEventListener("load", () => {
    let turmas = JSON.parse(localStorage.getItem("turmas")) || [];
    turmas.forEach((turma, index) => adicionarTurmaNaTela(turma, index));
});


// ------------------- Funções de Alunos -------------------

function pegarDadosAluno() {
    return {
        nome: document.getElementById("nome").value,
        idade: document.getElementById("idade").value,
        cpf: document.getElementById("cpf").value,
        ra: document.getElementById("ra").value,
        nomeMae: document.getElementById("nomeMae").value,
        nomePai: document.getElementById("nomePai").value,
        telefoneMae: document.getElementById("telefoneMae").value,
        telefonePai: document.getElementById("telefonePai").value,
        email: document.getElementById("email").value,
        turma: document.getElementById("turmaAluno") ? document.getElementById("turmaAluno").value : ""
    };
}

function cadastrarAluno() {
    const aluno = pegarDadosAluno();

    if (!aluno.nome || !aluno.idade) {
        alert("Preencha nome e idade!");
        return;
    }

    const alunos = JSON.parse(localStorage.getItem("alunos")) || [];
    alunos.push(aluno);
    localStorage.setItem("alunos", JSON.stringify(alunos));

    adicionarAlunoNaTabela(aluno);
    limparCamposAluno();
}

function adicionarAlunoNaTabela(aluno) {
    const tabela = document.getElementById("tabelaAlunos");
    if (!tabela) return;

    const linha = tabela.insertRow();
    linha.innerHTML = `
        <td>${aluno.nome}</td>
        <td>${aluno.idade}</td>
        <td>${aluno.cpf}</td>
        <td>${aluno.turma || "-"}</td>
        <td>
            <button onclick="editarAluno(this)">Editar</button>
            <button onclick="excluirAluno(this)">Excluir</button>
        </td>
    `;
}

function editarAluno(botao) {
    const linha = botao.parentNode.parentNode;
    const aluno = {
        nome: linha.cells[0].innerText,
        idade: linha.cells[1].innerText,
        cpf: linha.cells[2].innerText,
        turma: linha.cells[3].innerText
    };

    document.getElementById("nome").value = aluno.nome;
    document.getElementById("idade").value = aluno.idade;
    document.getElementById("cpf").value = aluno.cpf;
    if (document.getElementById("turmaAluno")) {
        document.getElementById("turmaAluno").value = aluno.turma === "-" ? "" : aluno.turma;
    }

    linha.remove();
    salvarTodosAlunos();
}

function excluirAluno(botao) {
    botao.parentNode.parentNode.remove();
    salvarTodosAlunos();
}

function limparCamposAluno() {
    const campos = ["nome","idade","cpf","ra","nomeMae","nomePai","telefoneMae","telefonePai","email","turmaAluno"];
    campos.forEach(id => {
        if(document.getElementById(id)) document.getElementById(id).value = "";
    });
}

// Atualiza todos os alunos no localStorage com base na tabela
function salvarTodosAlunos() {
    const tabela = document.getElementById("tabelaAlunos");
    if (!tabela) return;

    const alunos = [];
    for (let i = 1; i < tabela.rows.length; i++) {
        const row = tabela.rows[i];
        alunos.push({
            nome: row.cells[0].innerText,
            idade: row.cells[1].innerText,
            cpf: row.cells[2].innerText,
            turma: row.cells[3].innerText === "-" ? "" : row.cells[3].innerText
        });
    }
    localStorage.setItem("alunos", JSON.stringify(alunos));
}

function carregarAlunosNaTabela() {
    const alunos = JSON.parse(localStorage.getItem("alunos")) || [];
    alunos.forEach(aluno => adicionarAlunoNaTabela(aluno));
}

// ------------------- Funções de Turmas -------------------

function carregarTurmasNoSelect() {
    const select = document.getElementById("turmaAluno");
    select.innerHTML = '<option value="">Selecione a Turma</option>';
    const turmas = JSON.parse(localStorage.getItem("turmas")) || [];
    turmas.forEach(t => {
        const option = document.createElement("option");
        option.value = t.nome;
        option.text = `${t.nome} - ${t.periodo}`;
        select.appendChild(option);
    });
}

function carregarPeriodosNoSelect() {
    const select = document.getElementById("buscarPeriodo");
    if (!select) return;

    const turmas = JSON.parse(localStorage.getItem("turmas")) || [];
    const periodos = [...new Set(turmas.map(t => t.periodo))]; // únicos

    select.innerHTML = '<option value="">Todos os períodos</option>';
    periodos.forEach(p => {
        const option = document.createElement("option");
        option.value = p;
        option.text = p;
        select.appendChild(option);
    });
}

// ------------------- Inicialização -------------------

window.addEventListener("load", () => {
    carregarTurmasNoSelect();
    carregarPeriodosNoSelect();
    carregarAlunosNaTabela();
});


function pegarDadosAluno() {
    return {
        nome: document.getElementById("nome").value,
        idade: document.getElementById("idade").value,
        cpf: document.getElementById("cpf").value,
        ra: document.getElementById("ra").value,
        turma: document.getElementById("turmaAluno").value, // <--- turma selecionada
        periodo: document.getElementById("periodoAluno")?.value || "", // se quiser
        nomeMae: document.getElementById("nomeMae").value,
        nomePai: document.getElementById("nomePai").value,
        telefoneMae: document.getElementById("telefoneMae").value,
        telefonePai: document.getElementById("telefonePai").value,
        email: document.getElementById("email").value
    };
}

function renderAlunosTurma(container, nomeTurma) {
    container.innerHTML = "";
    let alunos = JSON.parse(localStorage.getItem("alunos")) || [];

    // Filtra só os alunos da turma correta
    alunos = alunos.filter(a => a.turma === nomeTurma);

    alunos.forEach(aluno => {
        const div = document.createElement("div");
        div.className = "aluno-presenca";
        div.innerHTML = `
            ${aluno.nome} 
            <label>Presente <input type="checkbox" class="presenca-checkbox"></label>
            <label>Falta <input type="checkbox" class="falta-checkbox"></label>
        `;
        container.appendChild(div);
    });
}

function toggleAlunos(botao) {
    const containerAlunos = botao.parentNode.nextElementSibling;
    const nomeTurma = botao.parentNode.querySelector("span").innerText.split(":")[1].trim();
    
    if (containerAlunos.style.display === "none" || containerAlunos.style.display === "") {
        containerAlunos.style.display = "block";
        renderAlunosTurma(containerAlunos, nomeTurma); // <- aqui
    } else {
        containerAlunos.style.display = "none";
    }
}


function buscarAlunos() {
    const periodo = document.getElementById("buscarPeriodo").value;
    const ra = document.getElementById("buscarRA").value.toLowerCase();
    
    const alunos = JSON.parse(localStorage.getItem("alunos")) || [];
    const turmas = JSON.parse(localStorage.getItem("turmas")) || [];

    // filtra alunos pelo RA e período
    let resultados = alunos.filter(aluno => {
        let condRA = ra ? aluno.ra.toLowerCase().includes(ra) : true;
        let condPeriodo = periodo ? aluno.periodo === periodo : true;
        return condRA && condPeriodo;
    });

    // monta a tabela
    const tabela = document.getElementById("tabelaBuscaAlunos");
    tabela.innerHTML = "<tr><th>Nome</th><th>Período</th><th>Turma</th><th>Sala</th></tr>";

    resultados.forEach(aluno => {
        // pega a turma e sala do aluno
        const turmaAluno = turmas.find(t => t.nome === aluno.turma && t.periodo === aluno.periodo) || {};
        const linha = tabela.insertRow();
        linha.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.periodo || "-"}</td>
            <td>${aluno.turma || "-"}</td>
            <td>${turmaAluno.sala || "-"}</td>
        `;
    });
}

// Carrega selects de turmas e períodos no filtro
function carregarFiltrosBusca() {
    const selectPeriodo = document.getElementById("buscarPeriodo");
    const turmas = JSON.parse(localStorage.getItem("turmas")) || [];
    const periodos = [...new Set(turmas.map(t => t.periodo))];

    selectPeriodo.innerHTML = '<option value="">Todos os períodos</option>';
    periodos.forEach(p => {
        const option = document.createElement("option");
        option.value = p;
        option.text = p;
        selectPeriodo.appendChild(option);
    });
}


function pegarDadosAluno() {
    return {
        nome: document.getElementById("nome").value,
        idade: document.getElementById("idade").value,
        cpf: document.getElementById("cpf").value,
        ra: document.getElementById("ra").value,
        turma: document.getElementById("turmaAluno").value, // turma selecionada
        periodo: document.getElementById("buscarPeriodo").value, // período da turma
        nomeMae: document.getElementById("nomeMae").value,
        nomePai: document.getElementById("nomePai").value,
        telefoneMae: document.getElementById("telefoneMae").value,
        telefonePai: document.getElementById("telefonePai").value,
        email: document.getElementById("email").value
    };
}


window.addEventListener("load", () => {
    carregarFiltrosBusca();
    // outras funções de inicialização
});

window.addEventListener("load", () => {
    carregarTurmasNoSelect();
    carregarPeriodosNoSelect();
});