let turmas = [
  { nome: "3ºA", sala: "23" },
  { nome: "3ºB", sala: "22" }
];

let turmaSelecionada = null;

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

  // simulação de alunos (depois vem do banco)
  const alunosTurma = alunos.filter(a =>
    a.turma === turmaSelecionada.nome.replace("º","")
  );

  const body = document.getElementById("chamada-body");
  body.innerHTML = "";

  alunosTurma.forEach(a => {

    body.innerHTML += `
      <tr>
        <td>${a.nome}</td>

        <td>
          <select>
            <option>Presente</option>
            <option>Falta</option>
            <option>Transferido</option>
          </select>
        </td>

        <td>
          <input placeholder="Observação">
        </td>
      </tr>
    `;
  });
}

// ================= VOLTAR =================
function voltarTurmas() {
  document.getElementById("lista-turmas").classList.remove("oculto");
  document.getElementById("chamada-turma").classList.add("oculto");
}

// chama ao carregar
document.addEventListener("DOMContentLoaded", renderTurmas);