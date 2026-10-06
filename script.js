"use strict";

/* ==========================================================
   IMPÉRIO MODA FEMININA — Aplicação
   ========================================================== */

/* --------------------- Constantes --------------------- */

const WHATSAPP = "5511975928045";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP}`;

/* --------------------- Catálogo --------------------- */

const produtos = [
    {
        id: "saida-praia-shortinho-renda",
        nome: "Saída de Praia Shortinho em Renda",
        categoria: "saida",
        categoriaNome: "Saída de Praia",
        preco: 19.99,
        descricao: "Leve, confortável e delicada, perfeita para usar na praia ou piscina.",
        detalhes: [
            "Modelo shortinho com caimento soltinho",
            "Detalhes em renda",
            "Cós com amarração ajustável",
            "Barra trabalhada",
            "Fácil de combinar com biquínis e maiôs",
        ],
        imagem: "imagens/saida de praia - shorthinho de renda.jpeg",
        novo: true,
    },
    {
        id: "biquini-suplex-premium-asa-delta",
        nome: "01 Biquíni Suplex Premium Asa Delta",
        categoria: "biquini",
        categoriaNome: "Biquíni",
        preco: 34.99,
        descricao: "Modelo moderno e confortável, perfeito para praia, piscina e dias de sol.",
        detalhes: [
            "Top triangular com detalhes em contraste",
            "Calcinha asa delta que valoriza a silhueta",
            "Confeccionado em Suplex Premium",
            "Toque macio e ótimo caimento",
        ],
        imagem: "imagens/01biquini suplex premium asa delta.jpeg",
        imagens: [
            "imagens/01biquini suplex premium asa delta.jpeg",
            "imagens/02biquini suplex premium asa delta.jpeg",
            "imagens/03biquini suplex premium asa delta.jpeg",
        ],
        novo: false,
    },
    {
        id: "biquini-babado-asa-delta",
        nome: "03 Biquíni com Babado e Calcinha Asa Delta",
        categoria: "biquini",
        categoriaNome: "Biquíni",
        preco: 34.99,
        descricao: "Delicado, moderno e confortável, perfeito para os dias de sol.",
        detalhes: [
            "Top com babado e detalhe franzido",
            "Calcinha asa delta que valoriza a silhueta",
            "Modelagem confortável e feminina",
            "Ideal para praia, piscina e viagens",
        ],
        imagem: "imagens/01- Biquíni com Babado.jpeg",
        imagens: [
            "imagens/01- Biquíni com Babado.jpeg",
            "imagens/02 -  Biquíni com Babado.jpeg",
        ],
        novo: true,
    },
    {
        id: "biquini-asa-delta-amarracao",
        nome: "04 Biquíni Asa Delta com Amarração",
        categoria: "biquini",
        categoriaNome: "Biquíni",
        preco: 34.99,
        descricao: "Modelo marcante, confortável e versátil, ideal para aproveitar os dias de sol com estilo.",
        detalhes: [
            "Top triangular com amarração ajustável",
            "Calcinha asa delta com laterais reguláveis",
            "Modelagem que valoriza a silhueta",
            "Ideal para praia, piscina e viagens",
        ],
        imagem: "imagens/01 biquini asa delta.jpeg",
        imagens: [
            "imagens/01 biquini asa delta.jpeg",
            "imagens/02 biquini asa delta.jpeg",
            "imagens/03 biquini asa delta.jpeg",
        ],
        novo: true,
    },
];

/* --------------------- Estado --------------------- */

const state = {
    categoria: "todos",
    termo: "",
    carrinho: [],
    detalhesIndex: null,
    galeriaIndex: null,
    galeriaImagem: 0,
};

/* --------------------- Utilitários --------------------- */

const $ = (seletor, contexto = document) => contexto.querySelector(seletor);
const $$ = (seletor, contexto = document) => [...contexto.querySelectorAll(seletor)];

const brl = (valor) =>
    valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const imagensDoProduto = (produto) =>
    produto.imagens && produto.imagens.length ? produto.imagens : [produto.imagem];

/* --------------------- Preparação do catálogo --------------------- */

produtos.forEach((produto, index) => {
    produto.destaque = index < 4;
    produto.tags = [
        produto.categoriaNome,
        produto.categoria,
        produto.novo ? "novidades" : "",
    ].filter(Boolean);
    produto.imagemAlt = `${produto.nome} — Império Moda Feminina`;
});

/* --------------------- Vitrine --------------------- */

function mostrarProdutos(lista) {
    const grid = $("#listaProdutos");

    $("#emptyResults").hidden = lista.length > 0;

    grid.innerHTML = lista
        .map((produto) => {
            const index = produtos.indexOf(produto);
            const emBreve = produto.disponivel === false;

            return `
                <article class="product" data-index="${index}" tabindex="0"
                    aria-label="Ver detalhes de ${produto.nome}">
                    <div class="product-image">
                        <img
                            src="${produto.imagem}"
                            alt="${produto.imagemAlt}"
                            loading="${index < 2 ? "eager" : "lazy"}"
                            decoding="async"
                            data-galeria="${index}"
                        >
                        ${produto.novo ? '<span class="product-tag">Novo</span>' : ""}
                        ${emBreve ? '<span class="product-tag soon">Em breve</span>' : ""}
                    </div>
                    <div class="product-info">
                        <span class="product-category">${produto.categoriaNome}</span>
                        <h3>${produto.nome}</h3>
                        <p class="product-description">${produto.descricao}</p>
                        <div class="product-footer">
                            <span class="price">${brl(produto.preco)}</span>
                            <button type="button" class="details-button"
                                data-detalhes="${index}">Ver detalhes</button>
                        </div>
                        <button type="button" class="buy-button"
                            data-comprar="${index}" ${emBreve ? "disabled" : ""}>
                            ${emBreve ? "Em breve" : "Adicionar à sacola"}
                        </button>
                    </div>
                </article>`;
        })
        .join("");
}

function aplicarFiltros() {
    const resultado = produtos.filter((produto) => {
        const correspondeCategoria =
            state.categoria === "todos" ||
            (state.categoria === "novidades" && produto.novo) ||
            (state.categoria === "destaques" && produto.destaque) ||
            produto.categoria === state.categoria;

        if (!correspondeCategoria) return false;
        if (!state.termo) return true;

        const texto = [
            produto.nome,
            produto.categoria,
            produto.categoriaNome,
            produto.descricao,
            ...produto.tags,
            ...(produto.detalhes || []),
        ]
            .join(" ")
            .toLowerCase();

        return texto.includes(state.termo);
    });

    const resumo = $("#resultadoResumo");
    resumo.textContent = `${resultado.length} ${resultado.length === 1 ? "peça encontrada" : "peças encontradas"}`;

    mostrarProdutos(resultado);
}

function filtrarCategoria(categoria) {
    state.categoria = categoria;

    $$(".category-btn").forEach((botao) => {
        const ativo = botao.dataset.categoria === categoria;
        botao.classList.toggle("active", ativo);
        botao.setAttribute("aria-pressed", String(ativo));
    });

    aplicarFiltros();
}

/* --------------------- Sacola --------------------- */

function agruparCarrinho() {
    const quantidades = new Map();

    state.carrinho.forEach((id) => {
        quantidades.set(id, (quantidades.get(id) || 0) + 1);
    });

    return [...quantidades.entries()]
        .map(([id, quantidade]) => ({
            produto: produtos.find((produto) => produto.id === id),
            quantidade,
        }))
        .filter((item) => item.produto);
}

function salvarCarrinho() {
    try {
        localStorage.setItem("carrinho", JSON.stringify(state.carrinho));
    } catch (erro) {
        /* armazenamento indisponível */
    }
}

function carregarCarrinho() {
    try {
        const salvos = JSON.parse(localStorage.getItem("carrinho") || "[]");
        const idsValidos = new Set(produtos.map((produto) => produto.id));
        state.carrinho = salvos.filter((id) => idsValidos.has(id));
    } catch (erro) {
        state.carrinho = [];
    }
}

function adicionarAoCarrinho(index) {
    const produto = produtos[index];
    if (!produto || produto.disponivel === false) return;

    state.carrinho.push(produto.id);
    salvarCarrinho();
    renderizarCarrinho();
    abrirCarrinho();
}

function alterarQuantidade(id, delta) {
    if (delta > 0) {
        state.carrinho.push(id);
    } else {
        const posicao = state.carrinho.lastIndexOf(id);
        if (posicao !== -1) state.carrinho.splice(posicao, 1);
    }

    salvarCarrinho();
    renderizarCarrinho();
}

function removerDoCarrinho(id) {
    state.carrinho = state.carrinho.filter((item) => item !== id);
    salvarCarrinho();
    renderizarCarrinho();
}

function renderizarCarrinho() {
    const itens = agruparCarrinho();
    const total = itens.reduce(
        (soma, item) => soma + item.produto.preco * item.quantidade,
        0,
    );

    $("#headerCartCount").textContent = state.carrinho.length;
    $("#cartTotal").textContent = brl(total);

    const lista = $("#cartItems");

    if (itens.length === 0) {
        lista.innerHTML = `
            <div class="empty-cart">
                <strong>Sua sacola está vazia</strong>
                <p>Adicione suas peças favoritas para montar seu pedido.</p>
            </div>`;
        return;
    }

    lista.innerHTML = itens
        .map(({ produto, quantidade }) => {
            return `
                <article class="cart-item">
                    <img src="${produto.imagem}" alt="${produto.imagemAlt}"
                        loading="lazy" decoding="async">
                    <div class="cart-item-info">
                        <h3>${produto.nome}</h3>
                        <span class="cart-item-price">${brl(produto.preco)}</span>
                        <div class="quantity-controls">
                            <button type="button" data-decrementar="${produto.id}"
                                aria-label="Remover uma unidade de ${produto.nome}">−</button>
                            <strong>${quantidade}</strong>
                            <button type="button" data-incrementar="${produto.id}"
                                aria-label="Adicionar uma unidade de ${produto.nome}">+</button>
                            <button type="button" class="remove-item"
                                data-remover="${produto.id}">Remover</button>
                        </div>
                    </div>
                    <strong class="cart-item-subtotal">${brl(produto.preco * quantidade)}</strong>
                </article>`;
        })
        .join("");
}

function abrirCarrinho() {
    renderizarCarrinho();

    $("#cartDrawer").classList.add("open");
    $("#cartDrawer").setAttribute("aria-hidden", "false");
    $("#cartOverlay").classList.add("open");
    $("#cartButton").setAttribute("aria-expanded", "true");

    atualizarRolagem();
    $("#cartClose").focus();
}

function fecharCarrinho() {
    if (!$("#cartDrawer").classList.contains("open")) return;

    $("#cartDrawer").classList.remove("open");
    $("#cartDrawer").setAttribute("aria-hidden", "true");
    $("#cartOverlay").classList.remove("open");
    $("#cartButton").setAttribute("aria-expanded", "false");

    atualizarRolagem();
    $("#cartButton").focus();
}

function finalizarPedido() {
    const itens = agruparCarrinho();

    if (itens.length === 0) {
        abrirCarrinho();
        return;
    }

    const linhas = itens.map(
        (item, index) =>
            `${index + 1}. ${item.produto.nome} (${item.quantidade}x) — ${brl(item.produto.preco * item.quantidade)}`,
    );

    const total = itens.reduce(
        (soma, item) => soma + item.produto.preco * item.quantidade,
        0,
    );

    const mensagem = [
        "Olá! Vim pelo site da Império Moda Feminina e gostaria de solicitar uma reserva.",
        "",
        ...linhas,
        "",
        `Total dos produtos: ${brl(total)}`,
        "",
        "Gostaria de confirmar a disponibilidade, a reserva das peças e o valor do frete para envio.",
    ].join("\n");

    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(mensagem)}`, "_blank", "noopener");
}

function comprarPeloWhatsApp(index) {
    const produto = produtos[index];
    const mensagem = `Olá! Vi o produto ${produto.nome} no site da Império Moda Feminina e gostaria de saber mais sobre disponibilidade, tamanhos e cores.`;

    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(mensagem)}`, "_blank", "noopener");
}

/* --------------------- Modais --------------------- */

let elementoAnterior = null;

function atualizarRolagem() {
    const bloqueado =
        $("#cartDrawer").classList.contains("open") ||
        $("#galleryModal").classList.contains("open") ||
        $("#productModal").classList.contains("open");

    document.body.classList.toggle("no-scroll", bloqueado);
}

function abrirModal(modal) {
    elementoAnterior = document.activeElement;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");

    atualizarRolagem();

    const botaoFechar = $(".modal-close", modal);
    if (botaoFechar) botaoFechar.focus();
}

function fecharModal(modal) {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");

    atualizarRolagem();

    if (elementoAnterior && typeof elementoAnterior.focus === "function") {
        elementoAnterior.focus();
    }
}

/* --------------------- Detalhes do produto --------------------- */

function abrirDetalhes(index) {
    const produto = produtos[index];
    state.detalhesIndex = index;

    $("#productModalCategory").textContent = produto.categoriaNome;
    $("#productModalTitle").textContent = produto.nome;
    $("#productModalDescription").textContent =
        produto.descricao || "Consulte disponibilidade, tamanhos e cores com nosso atendimento.";
    $("#productModalPrice").textContent = brl(produto.preco || 0);
    $("#productModalDetails").innerHTML = (produto.detalhes || [])
        .map((item) => `<li>${item}</li>`)
        .join("");

    const botaoSacola = $("#productModalCart");
    const emBreve = produto.disponivel === false;
    botaoSacola.disabled = emBreve;
    botaoSacola.textContent = emBreve ? "Em breve" : "Adicionar à sacola";

    renderizarThumbnails(produto, index);
    abrirModal($("#productModal"));
}

function renderizarThumbnails(produto, index) {
    const imagens = imagensDoProduto(produto);
    const container = $("#productModalThumbs");

    container.hidden = imagens.length < 2;

    container.innerHTML = imagens
        .map(
            (src, imagem) => `
                <button type="button" class="${imagem === 0 ? "active" : ""}"
                    data-indice="${index}" data-imagem="${imagem}"
                    aria-label="Ver imagem ${imagem + 1} de ${produto.nome}">
                    <img src="${src}" alt="" loading="lazy" decoding="async">
                </button>`,
        )
        .join("");

    const principal = $("#productModalImage");
    principal.src = imagens[0];
    principal.alt = produto.imagemAlt;
}

function fecharDetalhes() {
    fecharModal($("#productModal"));
    state.detalhesIndex = null;
}

/* --------------------- Galeria --------------------- */

function abrirGaleria(index, imagem = 0) {
    state.galeriaIndex = index;
    state.galeriaImagem = imagem;

    atualizarGaleria();
    abrirModal($("#galleryModal"));
}

function atualizarGaleria() {
    const produto = produtos[state.galeriaIndex];
    const imagens = imagensDoProduto(produto);

    const principal = $("#galleryMainImage");
    principal.src = imagens[state.galeriaImagem];
    principal.alt = `Imagem ${state.galeriaImagem + 1} de ${produto.nome}`;

    $("#galleryCounter").textContent = `${state.galeriaImagem + 1} / ${imagens.length}`;
}

function imagemAnterior() {
    const imagens = imagensDoProduto(produtos[state.galeriaIndex]);
    state.galeriaImagem = (state.galeriaImagem - 1 + imagens.length) % imagens.length;
    atualizarGaleria();
}

function proximaImagem() {
    const imagens = imagensDoProduto(produtos[state.galeriaIndex]);
    state.galeriaImagem = (state.galeriaImagem + 1) % imagens.length;
    atualizarGaleria();
}

function fecharGaleria() {
    fecharModal($("#galleryModal"));
    state.galeriaIndex = null;
}

/* --------------------- Tema --------------------- */

function alternarTema() {
    const escuro = document.documentElement.classList.toggle("dark-theme");

    $("#themeToggle").setAttribute("aria-pressed", String(escuro));
    localStorage.setItem("tema", escuro ? "escuro" : "claro");
}

/* --------------------- Menu mobile --------------------- */

function alternarMenu() {
    const aberto = $("#mobileNav").classList.toggle("open");
    const botao = $("#menuToggle");

    botao.setAttribute("aria-expanded", String(aberto));
    botao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
}

function fecharMenu() {
    const menu = $("#mobileNav");
    if (!menu.classList.contains("open")) return;

    menu.classList.remove("open");

    const botao = $("#menuToggle");
    botao.setAttribute("aria-expanded", "false");
    botao.setAttribute("aria-label", "Abrir menu");
}

/* --------------------- Navegação --------------------- */

function voltarAoTopo() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function focarBusca() {
    $("#produtos").scrollIntoView({ behavior: "smooth" });
    $("#busca").focus({ preventScroll: true });
}

/* --------------------- Eventos --------------------- */

function vincularEventos() {
    /* Vitrine */
    const grid = $("#listaProdutos");

    grid.addEventListener("click", (event) => {
        const comprar = event.target.closest("[data-comprar]");
        if (comprar && !comprar.disabled) {
            adicionarAoCarrinho(Number(comprar.dataset.comprar));
            return;
        }

        const detalhes = event.target.closest("[data-detalhes]");
        if (detalhes) {
            abrirDetalhes(Number(detalhes.dataset.detalhes));
            return;
        }

        const imagem = event.target.closest("img[data-galeria]");
        if (imagem) {
            abrirGaleria(Number(imagem.dataset.galeria), 0);
            return;
        }

        const card = event.target.closest(".product");
        if (card) {
            abrirDetalhes(Number(card.dataset.index));
        }
    });

    grid.addEventListener("keydown", (event) => {
        const card = event.target.closest(".product");
        if (!card || event.target !== card) return;
        if (event.key !== "Enter" && event.key !== " ") return;

        event.preventDefault();
        abrirDetalhes(Number(card.dataset.index));
    });

    /* Filtros e busca */
    $$(".category-btn").forEach((botao) => {
        botao.addEventListener("click", () => filtrarCategoria(botao.dataset.categoria));
    });

    $("#busca").addEventListener("input", (event) => {
        state.termo = event.target.value.trim().toLowerCase();
        aplicarFiltros();
    });

    $("#searchButton").addEventListener("click", focarBusca);

    /* Sacola */
    $("#cartButton").addEventListener("click", abrirCarrinho);
    $("#cartClose").addEventListener("click", fecharCarrinho);
    $("#cartOverlay").addEventListener("click", fecharCarrinho);
    $("#checkoutButton").addEventListener("click", finalizarPedido);

    $("#cartItems").addEventListener("click", (event) => {
        const incrementar = event.target.closest("[data-incrementar]");
        const decrementar = event.target.closest("[data-decrementar]");
        const remover = event.target.closest("[data-remover]");

        if (incrementar) {
            alterarQuantidade(incrementar.dataset.incrementar, 1);
        } else if (decrementar) {
            alterarQuantidade(decrementar.dataset.decrementar, -1);
        } else if (remover) {
            removerDoCarrinho(remover.dataset.remover);
        }
    });

    /* Detalhes do produto */
    $("#productClose").addEventListener("click", fecharDetalhes);

    $("#productModal").addEventListener("click", (event) => {
        if (event.target === event.currentTarget) fecharDetalhes();
    });

    $("#productModalCart").addEventListener("click", () => {
        if (state.detalhesIndex === null) return;

        adicionarAoCarrinho(state.detalhesIndex);
        fecharDetalhes();
    });

    $("#productModalWhatsApp").addEventListener("click", () => {
        if (state.detalhesIndex === null) return;

        comprarPeloWhatsApp(state.detalhesIndex);
    });

    $("#productModalThumbs").addEventListener("click", (event) => {
        const botao = event.target.closest("button[data-imagem]");
        if (!botao) return;

        $$("#productModalThumbs button").forEach((item) => item.classList.remove("active"));
        botao.classList.add("active");

        const produto = produtos[Number(botao.dataset.indice)];
        $("#productModalImage").src = imagensDoProduto(produto)[Number(botao.dataset.imagem)];
    });

    /* Galeria */
    $("#galleryClose").addEventListener("click", fecharGaleria);
    $("#galleryPrev").addEventListener("click", imagemAnterior);
    $("#galleryNext").addEventListener("click", proximaImagem);

    $("#galleryModal").addEventListener("click", (event) => {
        if (event.target === event.currentTarget) fecharGaleria();
    });

    /* Tema e menu */
    $("#themeToggle").addEventListener("click", alternarTema);
    $("#menuToggle").addEventListener("click", alternarMenu);

    $$("#mobileNav a").forEach((link) => {
        link.addEventListener("click", fecharMenu);
    });

    /* Flutuantes */
    $("#backToTop").addEventListener("click", voltarAoTopo);

    window.addEventListener(
        "scroll",
        () => {
            $("#backToTop").classList.toggle("visible", window.scrollY > 500);
        },
        { passive: true },
    );

    /* Teclado */
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            fecharCarrinho();
            fecharGaleria();
            fecharDetalhes();
            fecharMenu();
        }

        if (state.galeriaIndex === null) return;
        if (event.key === "ArrowLeft") imagemAnterior();
        if (event.key === "ArrowRight") proximaImagem();
    });
}

/* --------------------- Inicialização --------------------- */

(function iniciar() {
    carregarCarrinho();
    renderizarCarrinho();
    aplicarFiltros();

    const escuro = document.documentElement.classList.contains("dark-theme");
    $("#themeToggle").setAttribute("aria-pressed", String(escuro));

    vincularEventos();
})();
