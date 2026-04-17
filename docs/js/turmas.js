console.log("TURMAS MODULE ON");

let API = window.API;

async function carregarTurmas() {
  try {
    const res = await fetch(`${API}/turmas`);
    const data = await res.json();
    renderTurmas(data.dados || []);
  } catch (err) {
    console.warn("Turmas offline");
    renderTurmas([]);
  }
}

function renderTurmas(lista) {
  const div = document.getElementById("listaTurmas");
  if (!div) return;

  div.innerHTML = "";

  lista.forEach(t => {
    div.innerHTML += `
      <div class="card">
        <h3>${t.nome}</h3>
        <p>${t.ano || ""} ${t.turno || ""}</p>
      </div>
    `;
  });
}

function abrirModalTurma() {
  document.getElementById("modalTurma").classList.remove("oculto");
}

function fecharModalTurma() {
  document.getElementById("modalTurma").classList.add("oculto");
}

async function salvarTurma() {
  const payload = {
    nome: nomeTurma.value,
    ano: anoTurma.value,
    turno: turnoTurma.value
  };

  await fetch(`${API}/turmas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  fecharModalTurma();
  carregarTurmas();
}

document.addEventListener("DOMContentLoaded", carregarTurmas);

window.abrirModalTurma = abrirModalTurma;
window.fecharModalTurma = fecharModalTurma;
window.salvarTurma = salvarTurma;