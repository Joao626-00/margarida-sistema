console.log("CHAMADA CARREGOU");

let chamadasSalvas = [];

let turmas = [
  { nome: "3A", sala: "23" },
  { nome: "3B", sala: "22" }
];

let turmaSelecionada = null;
let statusChamada = {};
function setStatus(ra, valor) {
  statusChamada[ra] = valor;
}

// ================= RENDER TURMAS =================
function renderTurmas() {
  const div = document.getElementById("lista-turmas");
  if (!div) return;

  div.innerHTML = "";

  turmas.forEach((t, i) => {
    div.innerHTML += `
      <div class="card-turma" onclick="abrirChamada(${i})">
        🏫 ${t.nome} - Sala ${t.sala}
      </div>
    `;
  });
}

// ================= ABRIR CHAMADA =================
function abrirChamada(i) {

  turmaSelecionada = turmas[i];

  document.getElementById("lista-turmas").classList.add("oculto");
  document.getElementById("chamada-turma").classList.remove("oculto");

  document.getElementById("titulo-turma").innerText =
    `Turma: ${turmaSelecionada.nome} - Sala ${turmaSelecionada.sala}`;

  const alunosTurma = alunos.filter(a =>
    a.turma === turmaSelecionada.nome
  );

  const body = document.getElementById("chamada-body");
  body.innerHTML = "";

  alunosTurma.forEach(a => {

    body.innerHTML += `
      <tr>
        <td>${a.nome}</td>

        <td>
          <div class="status-group" id="status-${a.ra}">
            <button onclick="setStatus('${a.ra}','Presente')" class="btn-presente">✔</button>
            <button onclick="setStatus('${a.ra}','Falta')" class="btn-falta">✖</button>
            <button onclick="setStatus('${a.ra}','Transferido')" class="btn-transferido">↺</button>
        </div>
        </td>

        <td>
          <input id="obs-${a.ra}" class="obs-input" placeholder="Observação">
        </td>
      </tr>
    `;
  });
}




// ================= SALVAR CHAMADA =================
function salvarChamada() {

  const registros = [];

  let presentes = 0;
  let faltas = 0;
  let transferidos = 0;

  const alunosTurma = alunos.filter(a =>
    a.turma === turmaSelecionada.nome
  );

  alunosTurma.forEach(a => {

    const status = statusChamada[a.ra] || "Sem registro";
    const obsEl = document.getElementById(`obs-${a.ra}`);

    if (status === "Presente") presentes++;
    if (status === "Falta") faltas++;
    if (status === "Transferido") transferidos++;

    registros.push({
      aluno: a.nome,
      ra: a.ra,
      status,
      observacao: obsEl ? obsEl.value : ""
    });
  });

  const chamada = {
    turma: turmaSelecionada.nome,
    sala: turmaSelecionada.sala,
    data: new Date().toISOString().split("T")[0],
    presentes,
    faltas,
    transferidos,
    registros
  };

  chamadasSalvas.push(chamada);

  alert("✔ Chamada salva com sucesso!");

  console.log("CHAMADA:", chamada);

  statusChamada = {};
}

// ================= VOLTAR =================
function voltarTurmas() {
  document.getElementById("lista-turmas").classList.remove("oculto");
  document.getElementById("chamada-turma").classList.add("oculto");
}

function setStatus(ra, status) {
  statusChamada[ra] = status;

  const container = document.getElementById(`status-${ra}`);
  if (!container) return;

  container.querySelectorAll("button").forEach(btn => {
    btn.classList.remove("active");
  });

  if (status === "Presente") {
    container.children[0].classList.add("active");
  }

  if (status === "Falta") {
    container.children[1].classList.add("active");
  }

  if (status === "Transferido") {
    container.children[2].classList.add("active");
  }
}
// INIT
document.addEventListener("DOMContentLoaded", renderTurmas);