document.getElementById("carregarEscolas").addEventListener("click", async () => {
    const municipio = document.getElementById("municipio").value;

    if (!municipio) {
        alert("Informe o município");
        return;
    }

    const response = await fetch("inserir a url da api aqui")
    const escolas = await response.json();

    const select = document.getElementById("escola");
    select.innerHTML = "<option>Selecione uma escola</option>";
    escolas.forEach((escolas) => {
        const option = document.createElement("option");
        option.value = escolas;
        option.textContent = escolas;
        select.appendChild(options)
    });
})

document.getElementById("gravarDados").addEventListener("click", () => {
    const escola = document.getElementById("escolas").value;
    const planilha = documente.getElementById("planilha").value;
    const folderId = document.getElementById("folderId").value;

    if(!escola || !planilha || !folderId) {
        alert("Informe todos os campos");
        return;
    }

    fetch("/submit", {
        method: "POST",
        headers: {
            "content-type": "application/json"},
        body: new URLSearchParams({escola, planilha, folderId})
    })
    .then((response) => {
        if (response.ok){
            window.location.href = "/sucesso";
        } else {
            alert("Erro ao gravar dados");
        }
    })
})