const API = "http://localhost:3000";

async function login() {

  const user = document.getElementById("user");
  const pass = document.getElementById("pass");
  const msg = document.getElementById("msg");
  const card = document.querySelector(".login-card");

  // segurança
  if (!user || !pass || !msg || !card) {
    console.error("Elementos do login não encontrados");
    return;
  }

  const username = user.value.trim();
  const password = pass.value.trim();

  if (!username || !password) {
    msg.innerText = "Preencha todos os campos";
    return;
  }

  try {

    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    // ❌ ERRO DE LOGIN
    if (!res.ok) {

      card.classList.add("error");
      msg.innerText = data.erro || "Usuário ou senha inválidos";

      setTimeout(() => {
        card.classList.remove("error");
      }, 900);

      return;
    }

    // ✅ SUCESSO
    card.classList.add("success");

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    msg.innerText = "Login confirmado ✔";

    setTimeout(() => {
      window.location.href = "index.html";
    }, 900);

  } catch (err) {

    console.error(err);

    card.classList.add("error");
    msg.innerText = "Erro de conexão com servidor";

    setTimeout(() => {
      card.classList.remove("error");
    }, 900);
  }
}