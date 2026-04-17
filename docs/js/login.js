function login() {

  const user = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;
  const botao = document.querySelector("button");

  if (!user || !senha) {
    alert("Preencha usuário e senha");
    return;
  }

  botao.innerText = "Entrando...";
  botao.disabled = true;

  // 🔥 REMOVI O DELAY (era o que deixava lento)
  
  if (user === "admin" && senha === "123") {

    localStorage.setItem("auth", JSON.stringify({
      logado: true,
      role: "coordenadora"
    }));

    window.location.replace("index.html"); // mais rápido que href
    return;
  }

  if (user === "prof" && senha === "123") {

    localStorage.setItem("auth", JSON.stringify({
      logado: true,
      role: "professor"
    }));

    window.location.replace("index.html");
    return;
  }

  alert("Login inválido");

  botao.innerText = "Entrar";
  botao.disabled = false;
}