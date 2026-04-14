const API = "http://localhost:3000";

async function login() {

  const user = document.getElementById("user");
  const pass = document.getElementById("pass");
  const msg = document.getElementById("msg");
  const card = document.querySelector(".login-card");

  if (!user || !pass || !msg || !card) return;

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

    if (!res.ok) {
      msg.innerText = data.erro || "Usuário ou senha inválidos";
      card.classList.add("error");

      setTimeout(() => card.classList.remove("error"), 900);
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    msg.innerText = "Login confirmado ✔";
    card.classList.add("success");

    setTimeout(() => {
      window.location.href = "index.html";
    }, 900);

  } catch (err) {
    console.error(err);
    msg.innerText = "Erro de conexão com servidor";
    card.classList.add("error");

    setTimeout(() => card.classList.remove("error"), 900);
  }
}