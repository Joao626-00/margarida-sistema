console.log("CHAMADA OK");

let API = window.API;

async function renderChamada() {
  try {
    const res = await fetch(`${API}/turmas`);
    const data = await res.json();

    const div = document.getElementById("lista-turmas-chamada");
    if (!div) return;

    div.innerHTML = "";

    (data.dados || []).forEach(t => {
      div.innerHTML += `
        <div class="card">
          <h3>${t.nome}</h3>
          <button onclick="abrirChamadaTurma(${t.id})">Abrir</button>
        </div>
      `;
    });

  } catch (err) {
    console.warn("Chamada sem dados");
  }
}

function abrirChamadaTurma(id) {
  console.log("Chamada turma:", id);
}

document.addEventListener("DOMContentLoaded", renderChamada);

window.abrirChamadaTurma = abrirChamadaTurma;