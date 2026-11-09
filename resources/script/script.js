
let moradores = JSON.parse(localStorage.getItem("moradores")) || [];
let solicitacoes = JSON.parse(localStorage.getItem("solicitacoes")) || [];
let atividades = JSON.parse(localStorage.getItem("atividades")) || [];

// Navegação entre telas
function mostrarTela(id) {
    document.querySelectorAll(".tela").forEach(tela => {
        tela.classList.remove("ativa");
    });

    document.getElementById(id).classList.add("ativa");
}

// Salvar dados
function salvarDados() {
    localStorage.setItem("moradores", JSON.stringify(moradores));
    localStorage.setItem("solicitacoes", JSON.stringify(solicitacoes));
    localStorage.setItem("atividades", JSON.stringify(atividades));

    atualizarTela();
}

// Atualizar informações
function atualizarTela() {
    document.getElementById("totalMoradores").textContent = moradores.length;
    document.getElementById("totalSolicitacoes").textContent = solicitacoes.length;
    document.getElementById("totalAtividades").textContent = atividades.length;

    listarMoradores();
    listarSolicitacoes();
    listarAtividades();
}

// Cadastro de moradores
document.getElementById("formMorador").addEventListener("submit", function(event) {
    event.preventDefault();

    let id = document.getElementById("moradorId").value;

    let morador = {
        id: id || Date.now(),
        nome: document.getElementById("nome").value,
        telefone: document.getElementById("telefone").value,
        email: document.getElementById("email").value,
        endereco: document.getElementById("endereco").value
    };

    if (id) {
        moradores = moradores.map(m => m.id == id ? morador : m);
    } else {
        moradores.push(morador);
    }

    this.reset();
    document.getElementById("moradorId").value = "";

    salvarDados();
});

// Listar moradores
function listarMoradores() {
    let lista = document.getElementById("listaMoradores");
    let pesquisa = document.getElementById("pesquisa").value.toLowerCase();

    lista.innerHTML = "";

    moradores.filter(m => m.nome.toLowerCase().includes(pesquisa))
    .forEach(m => {
        lista.innerHTML += `
            <div class="item">
                <strong>${m.nome}</strong><br>
                Telefone: ${m.telefone}<br>
                E-mail: ${m.email}<br>
                Endereço: ${m.endereco}<br>

                <button class="editar" onclick="editarMorador(${m.id})">
                    Editar
                </button>

                <button class="excluir" onclick="excluirMorador(${m.id})">
                    Excluir
                </button>
            </div>
        `;
    });

    atualizarSelectMoradores();
}

// Editar morador
function editarMorador(id) {
    let m = moradores.find(m => m.id == id);

    document.getElementById("moradorId").value = m.id;
    document.getElementById("nome").value = m.nome;
    document.getElementById("telefone").value = m.telefone;
    document.getElementById("email").value = m.email;
    document.getElementById("endereco").value = m.endereco;

    mostrarTela("moradores");
}

// Excluir morador
function excluirMorador(id) {
    if (confirm("Deseja excluir este morador?")) {
        moradores = moradores.filter(m => m.id != id);
        salvarDados();
    }
}

// Atualizar opções de moradores
function atualizarSelectMoradores() {
    let select = document.getElementById("moradorSolicitacao");

    select.innerHTML = '<option value="">Selecione o morador</option>';

    moradores.forEach(m => {
        select.innerHTML += `
            <option value="${m.id}">${m.nome}</option>
        `;
    });
}

// Cadastro de solicitações
document.getElementById("formSolicitacao").addEventListener("submit", function(event) {
    event.preventDefault();

    solicitacoes.push({
        id: Date.now(),
        moradorId: document.getElementById("moradorSolicitacao").value,
        descricao: document.getElementById("descricao").value,
        status: document.getElementById("status").value
    });

    this.reset();
    salvarDados();
});

// Listar solicitações
function listarSolicitacoes() {
    let lista = document.getElementById("listaSolicitacoes");

    lista.innerHTML = "";

    solicitacoes.forEach(s => {
        let morador = moradores.find(m => m.id == s.moradorId);

        lista.innerHTML += `
            <div class="item">
                <strong>${morador ? morador.nome : "Morador removido"}</strong><br>
                ${s.descricao}<br>
                Status: ${s.status}

                <button class="excluir" onclick="excluirSolicitacao(${s.id})">
                    Excluir
                </button>
            </div>
        `;
    });
}

// Excluir solicitação
function excluirSolicitacao(id) {
    solicitacoes = solicitacoes.filter(s => s.id != id);
    salvarDados();
}

// Cadastro de atividades
document.getElementById("formAtividade").addEventListener("submit", function(event) {
    event.preventDefault();

    atividades.push({
        id: Date.now(),
        nome: document.getElementById("nomeAtividade").value,
        data: document.getElementById("dataAtividade").value,
        local: document.getElementById("localAtividade").value
    });

    this.reset();
    salvarDados();
});

// Listar atividades
function listarAtividades() {
    let lista = document.getElementById("listaAtividades");

    lista.innerHTML = "";

    atividades.forEach(a => {
        lista.innerHTML += `
            <div class="item">
                <strong>${a.nome}</strong><br>
                Data: ${a.data}<br>
                Local: ${a.local}

                <button class="excluir" onclick="excluirAtividade(${a.id})">
                    Excluir
                </button>
            </div>
        `;
    });
}

// Excluir atividade
function excluirAtividade(id) {
    atividades = atividades.filter(a => a.id != id);
    salvarDados();
}

// Pesquisa de moradores
document.getElementById("pesquisa").addEventListener("input", listarMoradores);

// Inicializar sistema
atualizarTela();
