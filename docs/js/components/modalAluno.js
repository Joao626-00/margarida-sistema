export function abrirModalAluno() {
    const modal = document.createElement("div");
    modal.classList.add("modal");

    modal.innerHTML = `
        <div class="card">
            <h3>Novo Aluno</h3>
            <input placeholder="Nome">
            <input placeholder="RA">
            <button>Salvar</button>
        </div>
    `;

    document.body.appendChild(modal);
}