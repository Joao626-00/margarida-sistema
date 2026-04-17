window.API = "http://localhost:3000";

window.APP = {
  alunos: [],
  turmas: []
};

console.log("CORE OK");

function abrirAba(id) {
  document.querySelectorAll(".section").forEach(s => s.classList.add("oculto"));
  document.getElementById(id)?.classList.remove("oculto");
}

function sair() {
  localStorage.clear();
  location.reload();
}