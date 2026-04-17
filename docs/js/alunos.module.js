console.log("ALUNOS MODULE ON");

let alunosCache = [];
let alunoEditando = null;

// =====================
// FOTO PREVIEW
// =====================
document.addEventListener("DOMContentLoaded", () => {
  const inputFoto = document.getElementById("aluno-foto-input");

  if (inputFoto) {
    inputFoto.addEventListener("change", function(e) {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();

      reader.onload = function(ev) {
        const preview = document.getElementById("preview-foto");
        preview.src = ev.target.result;
        preview.style.display = "block";
      };

      reader.readAsDataURL(file);
    });
  }
});

// ================= FETCH =================
async function fetchAlunos() {
  try {
    const res = await fetch(`${window.API}/alunos`);
    const data = await res.json();

    alunosCache = data.dados || [];
    window.APP.alunos = alunosCache;

    return alunosCache;
  } catch (err) {
    console.error("Erro fetch alunos:", err);
    return [];
  }
}

// ================= RENDER =================
async function renderAlunos() {
  const tbody = document.getElementById("alunos-lista");
  if (!tbody) return;

  const lista = await fetchAlunos();
  tbody.innerHTML = "";

  lista.forEach(a => {
    tbody.innerHTML += `
      <tr>
        <td>${a.nome}</td>
        <td>${a.ra || "-"}</td>
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

document.addEventListener("DOMContentLoaded", renderAlunos);

// ================= MODAL =================
function novoAluno() {
  alunoEditando = null;

  document.getElementById("titulo-modal-aluno").innerText = "Novo Aluno";

  const modal = document.getElementById("modal-aluno");
  modal.classList.remove("oculto");

  modal.querySelectorAll("input").forEach(i => i.value = "");
}

function fecharModalAluno() {
  document.getElementById("modal-aluno").classList.add("oculto");
}

// ================= SALVAR =================
async function salvarAluno() {


 const fotoBase64 = document.getElementById("preview-foto")?.src || "";

const payload = {
  nome: document.getElementById("aluno-nome").value,
  ra: document.getElementById("aluno-ra").value,
  email: document.getElementById("aluno-email").value,
  status: document.getElementById("aluno-status").value,
  turma: document.getElementById("aluno-turma").value,
  serie: document.getElementById("aluno-serie").value,
  sala: document.getElementById("aluno-sala").value,
  foto: fotoBase64
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

  fecharModalAluno();
  renderAlunos();
}

// ================= PRONTUÁRIO =================
function abrirAluno(id) {
  const aluno = alunosCache.find(a => a.id == id);
  if (!aluno) return;

  const card = document.getElementById("card-aluno");

  card.innerHTML = `
    <div class="prontuario-overlay" onclick="fecharCard()">

      <div class="prontuario-modal" onclick="event.stopPropagation()">

        <div class="prontuario-header">
          <h2>${aluno.nome}</h2>
          <button onclick="fecharCard()">✖</button>
        </div>

        <div class="prontuario-body">

          <div class="foto-section">
            <div class="foto-box" onclick="zoomFoto('${aluno.foto || ''}')">
              ${
                aluno.foto
                  ? `<img src="${aluno.foto}" class="foto-aluno">`
                  : `<div class="foto-placeholder">📷</div>`
              }
            </div>
          </div>

          <div class="dados-section">
            <p><b>RA:</b> ${aluno.ra || "-"}</p>
            <p><b>Turma:</b> ${aluno.turma || "-"}</p>
            <p><b>Série:</b> ${aluno.serie || "-"}</p>
            <p><b>Sala:</b> ${aluno.sala || "-"}</p>
            <p><b>Email:</b> ${aluno.email || "-"}</p>
          </div>

        </div>

        <div class="prontuario-actions">
          <button onclick="editarAluno(${aluno.id})">Editar</button>
          <button onclick="imprimirProntuario()">Imprimir</button>
          <button onclick="exportarWord()">Word</button>
          <button onclick="fecharCard()">Fechar</button>
        </div>

      </div>

    </div>
  `;

  card.classList.remove("oculto");
}

function fecharCard() {
  document.getElementById("card-aluno").classList.add("oculto");
}

// ================= EDITAR =================
function editarAluno(id) {
  const aluno = alunosCache.find(a => a.id == id);
  if (!aluno) return;

  alunoEditando = id;

  document.getElementById("titulo-modal-aluno").innerText = "Editar Aluno";

  const modal = document.getElementById("modal-aluno");
  modal.classList.remove("oculto");

  document.getElementById("aluno-nome").value = aluno.nome || "";
  document.getElementById("aluno-ra").value = aluno.ra || "";
  document.getElementById("aluno-email").value = aluno.email || "";
  document.getElementById("aluno-status").value = aluno.status || "";
  document.getElementById("aluno-turma").value = aluno.turma || "";
  document.getElementById("aluno-serie").value = aluno.serie || "";
  document.getElementById("aluno-sala").value = aluno.sala || "";
}

// ================= EXCLUIR =================
async function excluirAluno(id) {
  if (!confirm("Excluir aluno?")) return;

  await fetch(`${window.API}/alunos/${id}`, { method: "DELETE" });
  renderAlunos();
}

// ================= PRINT =================
function imprimirProntuario() {
  const conteudo = document.querySelector(".prontuario-modal").innerHTML;

  const win = window.open("", "", "width=900,height=700");

  win.document.write(`
    <html>
      <head>
        <title>Prontuário</title>
        <style>
          body { font-family: Arial; padding: 20px; }
        </style>
      </head>
      <body>
        ${conteudo}
      </body>
    </html>
  `);

  win.document.close();
  win.print();
}

// ================= WORD =================
function exportarWord() {
  const conteudo = document.querySelector(".prontuario-modal")?.innerHTML || "";

  const blob = new Blob(['\ufeff', conteudo], {
    type: 'application/msword'
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "prontuario.doc";
  a.click();
}
// =====================
// ZOOM FOTO
// =====================
function zoomFoto(src) {
  if (!src) return;

  const zoom = document.createElement("div");
  zoom.style.position = "fixed";
  zoom.style.inset = "0";
  zoom.style.background = "rgba(0,0,0,0.9)";
  zoom.style.display = "flex";
  zoom.style.alignItems = "center";
  zoom.style.justifyContent = "center";
  zoom.style.zIndex = "99999";
  zoom.style.cursor = "zoom-out";

  zoom.innerHTML = `
    <img src="${src}" 
         style="max-width:90%; max-height:90%; border-radius:12px;">
  `;

  zoom.onclick = () => zoom.remove();

  document.body.appendChild(zoom);
}

// ================= GLOBAL =================
window.novoAluno = novoAluno;
window.fecharModalAluno = fecharModalAluno;
window.salvarAluno = salvarAluno;
window.abrirAluno = abrirAluno;
window.fecharCard = fecharCard;
window.editarAluno = editarAluno;
window.excluirAluno = excluirAluno;
window.imprimirProntuario = imprimirProntuario;
window.exportarWord = exportarWord;
window.zoomFoto = zoomFoto;
