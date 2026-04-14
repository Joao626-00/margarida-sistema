let alunos = [
  { nome: "João Silva", ra: "1001", serie: "7º", turma: "3A", sala: "22", status: "Ativo" },
  { nome: "Maria Souza", ra: "1002", serie: "8º", turma: "3B", sala: "15", status: "Ativo" }
];

let alunoSelecionado = null;

// ================= INICIALIZA =================
document.addEventListener("DOMContentLoaded", () => {
  renderAlunos();
});

// ================= LISTA =================
function renderAlunos(lista = alunos) {

  const div = document.getElementById("alunos-lista");
  if (!div) return;

  div.innerHTML = "";

  lista.forEach((a) => {

    const indexReal = alunos.indexOf(a);

    div.innerHTML += `
      <tr>
        <td>${a.nome}</td>
        <td>${a.ra}</td>
        <td>${a.serie}${a.turma}</td>
        <td>${a.sala}</td>
        <td>${a.status}</td>
        <td>
          <button onclick="abrirAluno(${indexReal})">Ver</button>
          <button onclick="editarAluno(${indexReal})">Editar</button>
          <button onclick="excluirAluno(${indexReal})">Excluir</button>
        </td>
      </tr>
    `;
  });
}

// ================= EDITAR =================
function editarAluno(i) {

  const aluno = alunos[i];

  aluno.nome = prompt("Nome:", aluno.nome) || aluno.nome;
  aluno.ra = prompt("RA:", aluno.ra) || aluno.ra;

  aluno.serie = prompt("Série:", aluno.serie) || aluno.serie;

  aluno.turma = (prompt("Turma (ex: 3A):", aluno.turma) || aluno.turma)
    .trim()
    .toUpperCase();

  aluno.sala = prompt("Sala:", aluno.sala) || aluno.sala;

  renderAlunos();
}

// ================= EXCLUIR =================
function excluirAluno(i) {

  if (!confirm("Deseja excluir este aluno?")) return;

  alunos.splice(i, 1);
  renderAlunos();
}

// ================= NOVO =================
function novoAluno() {

  const nome = prompt("Nome do aluno:");
  if (!nome) return;

  const ra = prompt("RA:");
  const serie = prompt("Série:");
  const turma = prompt("Turma (ex: 3A):");
  const sala = prompt("Sala:");

  alunos.push({
    nome,
    ra,
    serie,
    turma: turma.trim().toUpperCase(),
    sala,
    status: "Ativo"
  });

  renderAlunos();
}

// ================= ABRIR PRONTUÁRIO =================
function abrirAluno(i) {

  alunoSelecionado = alunos[i];

  const a = alunos[i];
  const card = document.getElementById("card-aluno");

  if (!card) return;

  card.innerHTML = `
    <div class="prontuario">

      <div class="foto-area">
        <img id="fotoAluno"
             src="${a.foto || 'https://via.placeholder.com/150'}"
             onclick="zoomAlunoFoto()">

        <div class="upload-box">
          <input type="file" id="uploadAlunoFoto" hidden>
          <button onclick="document.getElementById('uploadAlunoFoto').click()">
            📷 Foto
          </button>
        </div>
      </div>

      <div class="dados">
       <input value="${a.nome}" disabled class="input-bloqueado">
<input value="${a.ra}" disabled class="input-bloqueado">
<input value="${a.turma}" disabled class="input-bloqueado">

        <input id="responsavelAluno" placeholder="Responsável" value="${a.responsavel || ''}">
        <input id="telefoneAluno" placeholder="Telefone" value="${a.telefone || ''}">
        <input placeholder="Pai">
        <input placeholder="Mãe">

        <textarea id="obsAluno" placeholder="Observações">${a.obs || ''}</textarea>
      </div>

      <div class="frequencia">
        <h3>📌 Frequência</h3>
        <button onclick="setFreq('✔ Presente')">✔ Presente</button>
        <button onclick="setFreq('❌ Falta')">❌ Falta</button>
        <p id="freq">${a.freq || 'Sem registro'}</p>
      </div>

      <div class="acoes">
        <button onclick="window.print()">🖨 Imprimir</button>
        <button onclick="exportarWord()">📄 Word</button>
        <button onclick="fecharCard()">Fechar</button>
      </div>

    </div>
  `;

  card.classList.remove("oculto");

  // 🔥 auto-save ao perder foco
  setTimeout(() => {
    document.querySelectorAll("#card-aluno input, #card-aluno textarea")
      .forEach(el => {
        el.addEventListener("blur", autoSalvarAluno);
      });
  }, 100);
}

// ================= AUTO SALVAR =================
function autoSalvarAluno() {

  if (!alunoSelecionado) return;

  alunoSelecionado.responsavel =
    document.getElementById("responsavelAluno")?.value || "";

  alunoSelecionado.telefone =
    document.getElementById("telefoneAluno")?.value || "";

  alunoSelecionado.obs =
    document.getElementById("obsAluno")?.value || "";
}

// ================= FECHAR =================
function fecharCard() {
  const card = document.getElementById("card-aluno");
  if (!card) return;

  card.classList.add("oculto");
  card.innerHTML = "";
}

// ================= WORD =================
function exportarWord() {

  const card = document.getElementById("card-aluno");
  if (!card) return;

  const clone = card.cloneNode(true);
  clone.querySelectorAll("button").forEach(b => b.remove());

  const html = `
    <html>
    <head>
      <meta charset="utf-8">
      <title>Prontuário</title>
    </head>
    <body>${clone.innerHTML}</body>
    </html>
  `;

  const blob = new Blob([html], { type: "application/msword" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "prontuario.doc";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ================= ZOOM =================
function zoomAlunoFoto() {

  const img = document.querySelector("#card-aluno #fotoAluno");
  if (!img) return;

  const zoom = document.createElement("div");
  zoom.className = "zoom";

  zoom.innerHTML = `
    <img src="${img.src}">
  `;

  zoom.addEventListener("click", () => zoom.remove());

  document.body.appendChild(zoom);
}

// ================= FREQUÊNCIA =================
function setFreq(v) {

  const el = document.getElementById("freq");
  if (el) el.innerText = v;

  if (alunoSelecionado) {
    alunoSelecionado.freq = v;
  }
}
function calcularFrequencia(aluno) {
  const total = aluno.presencas?.length || 0;
  const presentes = aluno.presencas?.filter(p => p === "Presente").length || 0;

  return total ? Math.round((presentes / total) * 100) : 0;
}

document.addEventListener("change", function (e) {

  if (e.target && e.target.id === "uploadAlunoFoto") {

    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function () {

      const img = document.getElementById("fotoAluno");

      if (img) {
        img.src = reader.result;
      }

      if (alunoSelecionado) {
        alunoSelecionado.foto = reader.result;
      }
    };

    reader.readAsDataURL(file);
  }
});