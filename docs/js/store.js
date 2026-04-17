console.log("CORE ON");

window.API = "http://localhost:3000";

window.APP = {
  alunos: [],
  turmas: []
};

function abrirAba(id) {
  document.querySelectorAll(".section").forEach(s => s.classList.add("oculto"));
  document.getElementById(id)?.classList.remove("oculto");
}

function sair() {
  localStorage.removeItem("auth");
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const auth = JSON.parse(localStorage.getItem("auth"));

  if (!auth || !auth.logado) {
    window.location.href = "login.html";
    return;
  }

  abrirAba("alunos");
});

window.abrirAba = abrirAba;
window.sair = sair;