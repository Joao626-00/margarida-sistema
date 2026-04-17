console.log("UI CARD ON");

window.UI = window.UI || {};

// =====================
// ABRIR PRONTUÁRIO
// =====================
window.UI.abrirAlunoCard = function (aluno) {

  const card = document.getElementById("card-aluno");

  if (!card) {
    console.error("card-aluno não existe no HTML");
    return;
  }

  card.innerHTML = `
    <div class="prontuario-overlay" onclick="UI.fecharAlunoCard()">
      
      <div class="prontuario-modal" onclick="event.stopPropagation()">

        <div class="prontuario-header">
          <h2>${aluno.nome}</h2>
          <button onclick="UI.fecharAlunoCard()">✖</button>
        </div>

        <div class="prontuario-body">
          <p><b>RA:</b> ${aluno.ra}</p>
          <p><b>Turma:</b> ${aluno.turma || "-"}</p>
          <p><b>Série:</b> ${aluno.serie || "-"}</p>
          <p><b>Email:</b> ${aluno.email || "-"}</p>
        </div>

        <div class="prontuario-actions">
          <button onclick="UI.fecharAlunoCard()">Fechar</button>
        </div>

      </div>

    </div>
  `;

  card.classList.remove("oculto");
};


// =====================
// FECHAR PRONTUÁRIO
// =====================
window.UI.fecharAlunoCard = function () {
  const card = document.getElementById("card-aluno");
  if (!card) return;

  card.classList.add("oculto");
  card.innerHTML = "";
};