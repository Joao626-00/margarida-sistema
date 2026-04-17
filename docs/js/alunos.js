console.log("ALUNOS MODULE ON");

// =====================
// ESTADO GLOBAL SEGURO
// =====================

window.APP = window.APP || {
  alunos: [],
  turmas: []
};

window.API = window.API || "http://localhost:3000";

let alunosCache = [];
let alunoEditando = null;

// =====================
// FETCH SEGURO
// =====================

async function fetchAlunos() {
  try {
    const res = await fetch(`${window.API}/alunos`);

    if (!res.ok) {
      throw new Error("Erro HTTP: " + res.status);
    }

    const data = await res.json();

    const alunos = data.dados || [];

    alunosCache = alunos;
    window.APP.alunos = alunos;

    return alunos;

  } catch (err) {
    console.error("Erro fetch alunos:", err);
    return [];
  }
}

// =====================
// RENDER
// =====================

async function renderAlunos() {
  const tbody = document.getElementById("alunos-lista");
  if (!tbody) return;

  const lista = await fetchAlunos();

  tbody.innerHTML = "";

  lista.forEach(a => {
    tbody.innerHTML += `
      <tr>
        <td>${a.nome || "-"}</td>
        <td>${a.serie || "-"}</td>
        <td>${a.turma || "-"}</td>
        <td>${a.sala || "-"}</td>
        <td>${a.status || "Ativo"}</td>
        <td>
          <button onclick="abrirAluno(${a.id})">Ver</button>
          <button onclick="editarAluno(${a.id})">Editar</button>
          <button onclick="excluirAluno(${a.id})">Excluir</button>
        </td>
      </tr>
    `;
  });
}

// =====================
// INIT (CRÍTICO)
// =====================

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    renderAlunos();
  }, 50);
});

// =====================
// MODAL
// =====================

function novoAluno() {
  alunoEditando = null;
  abrirModalAluno({});
}

function abrirModalAluno(aluno = {}) {
  const modal = document.getElementById("modal-aluno");
  if (!modal) return;

  modal.classList.remove("oculto");

  document.getElementById("aluno-nome").value = aluno.nome || "";
  document.getElementById("aluno-ra").value = aluno.ra || "";
  document.getElementById("aluno-email").value = aluno.email || "";
  document.getElementById("aluno-status").value = aluno.status || "Ativo";
  document.getElementById("aluno-turma").value = aluno.turma || "";
  document.getElementById("aluno-serie").value = aluno.serie || "";
  document.getElementById("aluno-sala").value = aluno.sala || "";
}

// =====================
// FECHAR MODAL
// =====================

function fecharModalAluno() {
  const modal = document.getElementById("modal-aluno");
  if (!modal) return;

  modal.classList.add("oculto");

  modal.querySelectorAll("input").forEach(i => i.value = "");
}

// =====================
// SALVAR
// =====================

async function salvarAluno() {
  const payload = {
    nome: document.getElementById("aluno-nome").value,
    ra: document.getElementById("aluno-ra").value,
    email: document.getElementById("aluno-email").value,
    status: document.getElementById("aluno-status").value,
    turma: document.getElementById("aluno-turma").value,
    serie: document.getElementById("aluno-serie").value,
    sala: document.getElementById("aluno-sala").value
  };

  const url = alunoEditando
    ? `${window.API}/alunos/${alunoEditando}`
    : `${window.API}/alunos`;

  const method = alunoEditando ? "PUT" : "POST";

  await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  alunoEditando = null;

  fecharModalAluno();
  renderAlunos();
}

// =====================
// PRONTUÁRIO (FUNCIONAL E LIMPO)
// =====================

function abrirAluno(id) {
  const aluno = window.APP.alunos.find(a => a.id == id);
  if (!aluno) return;

  const card = document.getElementById("card-aluno");

  card.innerHTML = `
    <div class="prontuario-overlay" onclick="fecharCard()">
      <div class="prontuario-modal" onclick="event.stopPropagation()">

        <div class="prontuario-header">
          <div>
            <h2>📘 Prontuário</h2>
            <small>ID: ${aluno.id}</small>
          </div>

          <button class="btn-fechar" onclick="fecharCard()">✖</button>
        </div>

        <div class="prontuario-body">

          <div class="foto-section">
            <div class="foto-box">
              ${aluno.foto
                ? `<img src="${aluno.foto}" class="foto-aluno">`
                : `<div class="foto-placeholder">📷</div>`
              }
            </div>

            <button onclick="baixarFoto('${aluno.foto || ''}')">
              Download Foto
            </button>
          </div>

          <div class="dados-section">
            <p><b>Nome:</b> ${aluno.nome}</p>
            <p><b>RA:</b> ${aluno.ra}</p>
            <p><b>Turma:</b> ${aluno.turma}</p>
            <p><b>Sala:</b> ${aluno.sala}</p>
            <p><b>Email:</b> ${aluno.email}</p>
          </div>

        </div>

        <div class="prontuario-actions">

          <button onclick="editarAluno(${aluno.id})">Editar</button>

          <button onclick="imprimirProntuario()">
            Imprimir
          </button>

          <button onclick="exportarWord()">
            Word
          </button>

          <button onclick="fecharCard()">
            Fechar
          </button>

        </div>

      </div>
    </div>
  `;

  card.classList.remove("oculto");
}

// FECHAR
function fecharCard() {
  document.getElementById("card-aluno")?.classList.add("oculto");
}

// PRINT
function imprimirProntuario() {
  window.print();
}

// WORD EXPORT (SIMPLE SAAS VERSION)
function exportarWord() {
  const conteudo = document.querySelector(".prontuario-modal").innerHTML;

  const blob = new Blob([`
    <html>
      <body>${conteudo}</body>
    </html>
  `], { type: "application/msword" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "prontuario.doc";
  link.click();
}

// FOTO
function baixarFoto(src) {
  if (!src) return;
  const a = document.createElement("a");
  a.href = src;
  a.download = "aluno.jpg";
  a.click();
}
// =====================
// FECHAR CARD
// =====================

function fecharCard() {
  document.getElementById("card-aluno")?.classList.add("oculto");
}

// =====================
// EDITAR / EXCLUIR
// =====================

function editarAluno(id) {
  const aluno = alunosCache.find(a => a.id == id);
  if (!aluno) return;

  alunoEditando = id;
  abrirModalAluno(aluno);
}

async function excluirAluno(id) {
  if (!confirm("Excluir aluno?")) return;

  await fetch(`${window.API}/alunos/${id}`, {
    method: "DELETE"
  });

  renderAlunos();
}

// =====================
// EXPORT GLOBAL (IMPORTANTE)
// =====================

window.novoAluno = novoAluno;
window.abrirAluno = abrirAluno;
window.editarAluno = editarAluno;
window.excluirAluno = excluirAluno;
window.salvarAluno = salvarAluno;
window.fecharModalAluno = fecharModalAluno;
window.fecharCard = fecharCard;
window.imprimirProntuario = imprimirProntuario;
window.exportarWord = exportarWord;
window.baixarFoto = baixarFoto;