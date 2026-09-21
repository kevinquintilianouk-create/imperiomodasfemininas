/* ==========================================
   CONFIGURAÇÃO
========================================== */

const WHATSAPP = "5511975928045";


/* ==========================================
   PRODUTOS
========================================== */

const produtos = [

    {
        nome: "Saída de Praia Shortinho em Renda",

        categoria: "saida",

        categoriaNome: "Saída de Praia",

        preco: 19.99,

        descricao:
            "Leve, confortável e delicada, perfeita para usar na praia ou piscina.",

        detalhes: [
            "Modelo shortinho com caimento soltinho",
            "Detalhes em renda",
            "Cós com amarração ajustável",
            "Barra trabalhada",
            "Fácil de combinar com biquínis e maiôs"
        ],

        imagem:
            "imagens/saida de praia - shorthinho de renda.jpeg",

        novo: true
    },


    {
        nome: "01 Biquíni Suplex Premium Asa Delta",

        categoria: "biquini",

        categoriaNome: "Biquíni",

        preco: 34.99,

        descricao:
            "Modelo moderno e confortável, perfeito para praia, piscina e dias de sol.",

        detalhes: [
            "Top triangular com detalhes em contraste",
            "Calcinha asa delta que valoriza a silhueta",
            "Confeccionado em Suplex Premium",
            "Toque macio e ótimo caimento"
        ],

        imagem:
            "imagens/01biquini suplex premium asa delta.jpeg",

        imagens: [
            "imagens/01biquini suplex premium asa delta.jpeg",
            "imagens/02biquini suplex premium asa delta.jpeg",
            "imagens/03biquini suplex premium asa delta.jpeg"
        ],

        novo: false
    },


    {
        nome: "03 Biquíni com Babado e Calcinha Asa Delta",

        categoria: "biquini",

        categoriaNome: "Biquíni",

        preco: 34.99,

        descricao:
            "Delicado, moderno e confortável, perfeito para os dias de sol.",

        detalhes: [
            "Top com babado e detalhe franzido",
            "Calcinha asa delta que valoriza a silhueta",
            "Modelagem confortável e feminina",
            "Ideal para praia, piscina e viagens"
        ],

        imagem:
            "imagens/01- Biquíni com Babado.jpeg",

        imagens: [
            "imagens/01- Biquíni com Babado.jpeg",
            "imagens/02 -  Biquíni com Babado.jpeg"
        ],

        novo: true
    },


    {
        nome: "04 Biquíni Asa Delta com Amarração",

        categoria: "biquini",

        categoriaNome: "Biquíni",

        preco: 34.99,

        descricao:
            "Modelo marcante, confortável e versátil, ideal para aproveitar os dias de sol com estilo.",

        detalhes: [
            "Top triangular com amarração ajustável",
            "Calcinha asa delta com laterais reguláveis",
            "Modelagem que valoriza a silhueta",
            "Ideal para praia, piscina e viagens"
        ],

        imagem:
            "imagens/01 biquini asa delta.jpeg",

        imagens: [
            "imagens/01 biquini asa delta.jpeg",
            "imagens/02 biquini asa delta.jpeg",
            "imagens/03 biquini asa delta.jpeg"
        ],

        novo: true
    },


    {
        nome: "Biquíni Verão",

        categoria: "biquini",

        categoriaNome: "Biquíni",

        preco: 49.99,

        descricao:
            "Confortável e perfeito para os dias de sol.",

        imagem:
            "https://images.unsplash.com/photo-1561715276-a2d087060f1d?auto=format&fit=crop&w=600&q=80",

        novo: true,

        disponivel: false
    },


    {
        nome: "Maiô Elegance",

        categoria: "maio",

        categoriaNome: "Maiô",

        preco: 59.99,

        descricao:
            "Modelo elegante e versátil.",

        imagem:
            "https://images.unsplash.com/photo-1562817804-7c4e4f0a5b80?auto=format&fit=crop&w=600&q=80",

        novo: false,

        disponivel: false
    },


    {
        nome: "Vestido Feminino",

        categoria: "feminino",

        categoriaNome: "Moda Feminina",

        preco: 69.99,

        descricao:
            "Leve e confortável para diversas ocasiões.",

        imagem:
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",

        novo: false,

        disponivel: false
    },


    {
        nome: "Conjunto Feminino",

        categoria: "feminino",

        categoriaNome: "Moda Feminina",

        preco: 79.99,

        descricao:
            "Prático, moderno e fácil de combinar.",

        imagem:
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",

        novo: true,

        disponivel: false
    }

];


let carrinho = [];
let categoriaAtual = "todos";
let termoAtual = "";
let produtoDetalheAtual = null;

produtos.forEach((produto, index) => {
    produto.destaque = index < 4;
    produto.tags = [produto.categoriaNome, produto.categoria, produto.novo ? "novidades" : ""].filter(Boolean);
    produto.imagemAlt = produto.imagemAlt || `${produto.nome} - Império Moda Feminina`;
});


/* ==========================================
   MOSTRAR PRODUTOS
========================================== */

function mostrarProdutos(lista = produtos) {

    const container =
        document.getElementById(
            "listaProdutos"
        );


    container.innerHTML = "";

    const emptyResults = document.getElementById("emptyResults");
    if (emptyResults) {
        emptyResults.hidden = lista.length > 0;
    }


    if (lista.length === 0) {

        return;

    }


    lista.forEach((produto) => {

        const index =
            produtos.indexOf(produto);


        const card =
            document.createElement(
                "article"
            );


        card.className = "product";


        const imagens = produto.imagens || [produto.imagem];

        const imagemDisponivel = produto.disponivel !== false;

        card.setAttribute("tabindex", "0");
        card.setAttribute("aria-label", `Ver detalhes de ${produto.nome}`);
        card.addEventListener("click", (event) => {
            if (!event.target.closest("button, a, img")) {
                abrirDetalhes(index);
            }
        });
        card.addEventListener("keydown", (event) => {
            if ((event.key === "Enter" || event.key === " ") && event.target === card) {
                event.preventDefault();
                abrirDetalhes(index);
            }
        });

        card.innerHTML = `

            <div class="product-image">

                ${imagemDisponivel ? `<img
                    src="${produto.imagem}"
                    alt="${produto.imagemAlt}"
                    loading="${index < 2 ? "eager" : "lazy"}"
                    decoding="async"
                    onclick="abrirGaleria(${index}, 0)"
                >` : `
                    <div class="product-placeholder">
                        <span>Imagem em breve</span>
                    </div>
                `}

                ${
                    produto.novo
                    ?
                    `<span class="badge">
                        NOVIDADE
                    </span>`
                    :
                    ""
                }

            </div>

            ${imagens.length > 1 ? `
                <div class="product-thumbnails" aria-label="Outras imagens do produto">
                    ${imagens.map((imagem, imagemIndex) => `
                        <button
                            class="product-thumbnail ${imagemIndex === 0 ? "active" : ""}"
                            onclick="abrirGaleria(${index}, ${imagemIndex})"
                            aria-label="Visualizar imagem ${imagemIndex + 1} de ${produto.nome}">
                            <img src="${imagem}" alt="${produto.nome} - imagem ${imagemIndex + 1}" loading="lazy" decoding="async">
                        </button>
                    `).join("")}
                </div>
            ` : ""}


            <div class="product-info">

                <span class="product-category">

                    ${produto.categoriaNome}

                </span>


                <h3>

                    ${produto.nome}

                </h3>

                <button class="details-button" onclick="abrirDetalhes(${index})">
                    Ver detalhes
                </button>


                <p class="product-description">

                    ${produto.descricao}

                </p>

                ${produto.detalhes ? `
                    <ul class="product-details">
                        ${produto.detalhes.map(detalhe => `<li>${detalhe}</li>`).join("")}
                    </ul>
                ` : ""}


                <div class="price">

                    R$
                    ${produto.preco
                        .toFixed(2)
                        .replace(".", ",")}

                </div>


                ${imagemDisponivel ? `
                    <button
                        class="buy-button"
                        onclick="comprar(${index})">
                        Adicionar ao pedido
                    </button>
                ` : `
                    <button class="buy-button unavailable" disabled>
                        Em breve
                    </button>
                `}

            </div>

        `;


        container.appendChild(card);

    });

}


/* ==========================================
   COMPRAR
========================================== */

function comprar(index) {

    const produto =
        produtos[index];

    if (!produto || produto.disponivel === false) {
        return;
    }


    carrinho.push(produto);


    atualizarCarrinho();

    abrirCarrinho();

}


/* ==========================================
   CARRINHO
========================================== */

function atualizarCarrinho() {

    document.getElementById(
        "cartCount"
    ).textContent =
        carrinho.length;

    const headerCount = document.getElementById("headerCartCount");
    if (headerCount) {
        headerCount.textContent = carrinho.length;
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho.map(produto => produtos.indexOf(produto))));

    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    if (!cartItems || !cartTotal) {
        return;
    }

    if (carrinho.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <strong>Sua sacola está vazia</strong>
                <p>Adicione suas peças favoritas para montar seu pedido.</p>
            </div>
        `;
        cartTotal.textContent = "R$ 0,00";
        return;
    }

    const itens = [...new Set(carrinho)].map((produto) => ({
        produto,
        quantidade: carrinho.filter(item => item === produto).length
    }));

    cartItems.innerHTML = itens.map(({ produto, quantidade }) => {
        const index = produtos.indexOf(produto);
        const subtotal = produto.preco * quantidade;

        return `
            <article class="cart-item">
                <img src="${produto.imagem}" alt="${produto.imagemAlt || produto.nome}">
                <div class="cart-item-info">
                    <h3>${produto.nome}</h3>
                    <span>R$ ${produto.preco.toFixed(2).replace(".", ",")}</span>
                    <div class="quantity-controls">
                        <button onclick="alterarQuantidade(${index}, -1)" aria-label="Remover uma unidade">−</button>
                        <strong>${quantidade}</strong>
                        <button onclick="alterarQuantidade(${index}, 1)" aria-label="Adicionar uma unidade">+</button>
                        <button class="remove-item" onclick="removerProduto(${index})">Remover</button>
                    </div>
                </div>
                <strong class="cart-item-subtotal">R$ ${subtotal.toFixed(2).replace(".", ",")}</strong>
            </article>
        `;
    }).join("");

    const total = carrinho.reduce((soma, produto) => soma + produto.preco, 0);
    cartTotal.textContent = `R$ ${total.toFixed(2).replace(".", ",")}`;

}


function alterarQuantidade(index, quantidade) {

    const produto = produtos[index];

    if (quantidade > 0) {
        carrinho.push(produto);
    } else {
        const itemIndex = carrinho.lastIndexOf(produto);

        if (itemIndex !== -1) {
            carrinho.splice(itemIndex, 1);
        }
    }

    atualizarCarrinho();

}


function removerProduto(index) {

    carrinho = carrinho.filter(produto => produto !== produtos[index]);
    atualizarCarrinho();

}


function abrirCarrinho() {

    atualizarCarrinho();

    document.getElementById("cartDrawer").classList.add("open");
    document.getElementById("cartOverlay").classList.add("open");
    document.getElementById("cartDrawer").setAttribute("aria-hidden", "false");

}


function carregarCarrinho() {

    try {
        const salvos = JSON.parse(localStorage.getItem("carrinho") || "[]");
        carrinho = salvos
            .map(index => produtos[index])
            .filter(Boolean);
    } catch (error) {
        carrinho = [];
    }

}


function fecharCarrinho() {

    document.getElementById("cartDrawer").classList.remove("open");
    document.getElementById("cartOverlay").classList.remove("open");
    document.getElementById("cartDrawer").setAttribute("aria-hidden", "true");

}


function finalizarPedido() {

    if (carrinho.length === 0) {
        abrirCarrinho();
        return;
    }

    let mensagem =
        "Olá! Vim pelo site da Império Moda Feminina e gostaria de solicitar uma reserva.\n\n";

    const itens = [...new Set(carrinho)];

    itens.forEach((produto, index) => {
        const quantidade = carrinho.filter(item => item === produto).length;
        mensagem += `${index + 1}. ${produto.nome} (${quantidade}x) - R$ ${(produto.preco * quantidade).toFixed(2).replace(".", ",")}\n`;
    });

    const total = carrinho.reduce((soma, produto) => soma + produto.preco, 0);
    mensagem += `\nTotal dos produtos: R$ ${total.toFixed(2).replace(".", ",")}\n`;
    mensagem += "\nGostaria de confirmar a disponibilidade, a reserva das peças e o valor do frete para envio.";

    window.open(
        `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`,
        "_blank"
    );

}


function comprarPeloWhatsApp(index) {

    const produto = produtos[index];
    const mensagem = `Olá! Vi o produto ${produto.nome} no site da Império Moda Feminina e gostaria de saber mais sobre disponibilidade, tamanhos e cores.`;

    window.open(
        `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`,
        "_blank"
    );

}


/* ==========================================
   DETALHES DO PRODUTO
========================================== */

function abrirDetalhes(index) {

    const produto = produtos[index];
    produtoDetalheAtual = index;
    document.getElementById("productModalImage").src = produto.imagem;
    document.getElementById("productModalImage").alt = produto.imagemAlt || produto.nome;
    document.getElementById("productModalCategory").textContent = produto.categoriaNome;
    document.getElementById("productModalTitle").textContent = produto.nome;
    document.getElementById("productModalDescription").textContent = produto.descricao || "Consulte os detalhes com nosso atendimento.";
    document.getElementById("productModalPrice").textContent = `R$ ${(produto.preco || 0).toFixed(2).replace(".", ",")}`;
    document.getElementById("productModalDetails").innerHTML = (produto.detalhes || []).map(item => `<li>${item}</li>`).join("");
    const botaoSacola = document.getElementById("productModalCart");
    botaoSacola.disabled = produto.disponivel === false;
    botaoSacola.textContent = produto.disponivel === false ? "Em breve" : "Adicionar à sacola";
    botaoSacola.onclick = () => {
        comprar(index);
        fecharDetalhes();
    };
    document.getElementById("productModalWhatsApp").onclick = () => comprarPeloWhatsApp(index);
    document.getElementById("productModal").classList.add("open");
    document.getElementById("productModal").setAttribute("aria-hidden", "false");

}


function fecharDetalhes() {

    document.getElementById("productModal").classList.remove("open");
    document.getElementById("productModal").setAttribute("aria-hidden", "true");
    produtoDetalheAtual = null;

}


/* ==========================================
   GALERIA DE PRODUTO
========================================== */

let galeriaProduto = null;
let galeriaImagemAtual = 0;


function abrirGaleria(index, imagemIndex = 0) {

    const produto = produtos[index];
    galeriaProduto = produto.imagens || [produto.imagem];
    galeriaImagemAtual = imagemIndex;

    atualizarGaleria();

    document.getElementById("galleryModal").classList.add("open");
    document.getElementById("galleryModal").setAttribute("aria-hidden", "false");

}


function atualizarGaleria() {

    const imagem = galeriaProduto[galeriaImagemAtual];
    const imagemPrincipal = document.getElementById("galleryMainImage");

    imagemPrincipal.src = imagem;
    imagemPrincipal.alt = `Imagem ${galeriaImagemAtual + 1} do produto`;
    document.getElementById("galleryCounter").textContent = `${galeriaImagemAtual + 1} / ${galeriaProduto.length}`;

}


function fecharGaleria() {

    document.getElementById("galleryModal").classList.remove("open");
    document.getElementById("galleryModal").setAttribute("aria-hidden", "true");

}


function imagemAnterior() {

    galeriaImagemAtual = (galeriaImagemAtual - 1 + galeriaProduto.length) % galeriaProduto.length;
    atualizarGaleria();

}


function proximaImagem() {

    galeriaImagemAtual = (galeriaImagemAtual + 1) % galeriaProduto.length;
    atualizarGaleria();

}


/* ==========================================
   FILTRO
========================================== */

function filtrarCategoria(
    categoria,
    botao
) {

    document
        .querySelectorAll(
            ".category-btn"
        )
        .forEach(
            btn =>
                btn.classList.remove(
                    "active"
                )
        );


    if (botao) {
        botao.classList.add("active");
    }

    categoriaAtual = categoria;
    aplicarFiltros();

}


function aplicarFiltros() {

    const termo = termoAtual;
    const resultado = produtos.filter((produto) => {
        const correspondeCategoria = categoriaAtual === "todos"
            || (categoriaAtual === "novidades" && produto.novo)
            || (categoriaAtual === "destaques" && produto.destaque)
            || produto.categoria === categoriaAtual;

        const texto = [
            produto.nome,
            produto.categoria,
            produto.categoriaNome,
            produto.descricao,
            ...(produto.tags || []),
            ...(produto.detalhes || [])
        ].join(" ").toLowerCase();

        return correspondeCategoria && texto.includes(termo);
    });

    const resumo = document.getElementById("resultadoResumo");
    if (resumo) {
        resumo.textContent = `${resultado.length} ${resultado.length === 1 ? "PEÇA ENCONTRADA" : "PEÇAS ENCONTRADAS"}`;
    }

    mostrarProdutos(resultado);

}


/* ==========================================
   BUSCA
========================================== */

function buscarProduto() {

    termoAtual = document.getElementById("busca").value.toLowerCase().trim();
    aplicarFiltros();

}


function renderizarColecoes() {

    const disponiveis = produtos.filter(produto => produto.disponivel !== false);
    const novidades = disponiveis.filter(produto => produto.novo);
    const escolhas = disponiveis.filter(produto => produto.destaque).slice(0, 4);

    [
        ["novidadesGrid", novidades],
        ["choicesGrid", escolhas]
    ].forEach(([id, lista]) => {
        const container = document.getElementById(id);
        if (!container) return;
        container.innerHTML = lista.map((produto) => {
            const index = produtos.indexOf(produto);
            return `
                <article class="mini-product">
                    <img src="${produto.imagem}" alt="${produto.imagemAlt}" loading="lazy" decoding="async">
                    <div><span>${produto.categoriaNome}</span><h3>${produto.nome}</h3><strong>R$ ${produto.preco.toFixed(2).replace(".", ",")}</strong><button onclick="abrirDetalhes(${index})">Ver peça</button></div>
                </article>
            `;
        }).join("");
    });

}


/* ==========================================
   FOCAR BUSCA
========================================== */

function focarBusca() {

    const busca =
        document.getElementById(
            "busca"
        );


    busca.focus();


    document
        .getElementById(
            "produtos"
        )
        .scrollIntoView({
            behavior: "smooth"
        });

}


function alternarMenu() {

    const menu = document.getElementById("mobileNav");
    const botao = document.querySelector(".menu-toggle");
    const aberto = menu.classList.toggle("open");
    botao.setAttribute("aria-expanded", String(aberto));

}


function fecharMenu() {

    const menu = document.getElementById("mobileNav");
    const botao = document.querySelector(".menu-toggle");
    menu.classList.remove("open");
    botao.setAttribute("aria-expanded", "false");

}


function voltarAoTopo() {

    window.scrollTo({ top: 0, behavior: "smooth" });

}


function atualizarBotaoTopo() {

    const botao = document.getElementById("backToTop");
    if (botao) {
        botao.classList.toggle("visible", window.scrollY > 500);
    }

}


/* ==========================================
   TEMA
========================================== */

function alternarTema() {

    const escuro = document.body.classList.toggle("dark-theme");
    document.getElementById("themeIcon").textContent = escuro ? "Claro" : "Escuro";
    localStorage.setItem("tema", escuro ? "escuro" : "claro");

}


function carregarTema() {

    const escuro = localStorage.getItem("tema") === "escuro";
    document.body.classList.toggle("dark-theme", escuro);
    document.getElementById("themeIcon").textContent = escuro ? "Claro" : "Escuro";

}


document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    fecharCarrinho();
    fecharGaleria();
    fecharDetalhes();
    fecharMenu();
});

document.getElementById("galleryModal").addEventListener("click", (event) => {
    if (event.target.id === "galleryModal") fecharGaleria();
});

document.getElementById("productModal").addEventListener("click", (event) => {
    if (event.target.id === "productModal") fecharDetalhes();
});

window.addEventListener("scroll", atualizarBotaoTopo, { passive: true });


/* ==========================================
   INICIAR
========================================== */

carregarTema();
carregarCarrinho();
mostrarProdutos();
renderizarColecoes();
atualizarCarrinho();
atualizarBotaoTopo();