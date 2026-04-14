let alunos = [
  { nome: "João Silva", ra: "1001", turma: "A" },
  { nome: "Maria Souza", ra: "1002", turma: "A" }
];

let alunoSelecionado = null;

// ================= INICIALIZA =================
document.addEventListener("DOMContentLoaded", () => {
  renderAlunos();
});

// ================= LISTA DE ALUNOS =================
function renderAlunos() {

  const div = document.getElementById("alunos-lista");
  if (!div) return;

  div.innerHTML = "";

  alunos.forEach((a, i) => {

    div.innerHTML += `
      <div class="card" onclick="abrirAluno(${i})">
        <h3>${a.nome}</h3>
        <p>${a.ra}</p>
        <p>${a.turma}</p>
      </div>
    `;
  });
}

// ================= ABRIR PRONTUÁRIO =================
function abrirAluno(i) {

  alunoSelecionado = alunos[i];

  const a = alunos[i];
  const card = document.getElementById("card-aluno");

  card.innerHTML = `
    <div class="prontuario">

     <!-- FOTO -->
<div class="foto-area">
  <img id="fotoAluno"
       src="${a.foto || 'https://via.placeholder.com/150'}"
       onclick="zoomAlunoFoto()">

  <div class="upload-box">
    <input type="file" id="uploadAlunoFoto" hidden>

    <button type="button"
      onclick="document.getElementById('uploadAlunoFoto').click()">
      📷 Foto
    </button>
  </div>
</div>

      <!-- DADOS -->
      <div class="dados">
        <input value="${a.nome}" disabled>
        <input value="${a.ra}" disabled>
        <input value="${a.turma}" disabled>

        <input id="responsavelAluno" placeholder="Responsável" value="${a.responsavel || ''}">
        <input id="telefoneAluno" placeholder="Telefone" value="${a.telefone || ''}">
        <input placeholder="Pai">
        <input placeholder="Mãe">
      </div>

      <!-- FREQUÊNCIA -->
      <div class="frequencia">
        <h3>📌 Frequência</h3>

        <button onclick="setFreq('✔ Presente')">✔ Presente</button>
        <button onclick="setFreq('❌ Falta')">❌ Falta</button>

        <p id="freq">${a.freq || 'Sem registro'}</p>
      </div>

      <!-- OBSERVAÇÃO -->
      <div class="obs">
        <textarea id="obsAluno" placeholder="Observações">${a.obs || ''}</textarea>
      </div>

      <!-- AÇÕES -->
      <div class="acoes">
        <button onclick="salvarAluno()">💾 Salvar</button>
        <button onclick="window.print()">🖨 Imprimir</button>
        <button onclick="exportarWord()">📄 Word</button>
        <button onclick="fecharCard()">Fechar</button>
      </div>

    </div>
  `;

  card.classList.remove("oculto");
}

// ================= FREQUÊNCIA =================
function setFreq(v) {

  const card = document.getElementById("card-aluno");
  const freq = card.querySelector("#freq");

  if (freq) freq.innerText = v;

  if (alunoSelecionado) {
    alunoSelecionado.freq = v;
  }
}

// ================= SALVAR ALUNO =================
function salvarAluno() {

  if (!alunoSelecionado) return;

  alunoSelecionado.responsavel = document.getElementById("responsavelAluno").value;
  alunoSelecionado.telefone = document.getElementById("telefoneAluno").value;
  alunoSelecionado.obs = document.getElementById("obsAluno").value;

  alert("✔ Dados salvos com sucesso");
}

// ================= FECHAR =================
function fecharCard() {
  document.getElementById("card-aluno").classList.add("oculto");
}

// ================= EXPORT WORD =================
function exportarWord() {

  const aluno = document.getElementById("card-aluno").cloneNode(true);

  // remove botões antes de exportar
  aluno.querySelectorAll("button").forEach(btn => btn.remove());

  const html = `
    <html>
    <head>
      <meta charset="utf-8">
      <title>Prontuário</title>
    </head>
    <body>
      ${aluno.innerHTML}
    </body>
    </html>
  `;

  const blob = new Blob([html], {
    type: "application/msword"
  });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "prontuario.doc";

  link.click();
}

// ================= ZOOM FOTO =================
function zoomAlunoFoto() {

  const img = document.getElementById("fotoAluno").src;

  const zoom = document.createElement("div");
  zoom.className = "zoom";

  zoom.innerHTML = `
    <img src="${img}" id="zoomImg">
  `;

  // fecha clicando no fundo
  zoom.addEventListener("click", (e) => {
    if (e.target === zoom) {
      zoom.remove();
    }
  });

  document.body.appendChild(zoom);
}
// ================= UPLOAD FOTO (CORRIGIDO GLOBAL) =================
document.addEventListener("change", function (e) {

  if (e.target && e.target.id === "uploadAlunoFoto") {

    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function () {

      const img = document.getElementById("fotoAluno");
      if (img) img.src = reader.result;

      if (alunoSelecionado) {
        alunoSelecionado.foto = reader.result;
      }
    };

    reader.readAsDataURL(file);
  }
});