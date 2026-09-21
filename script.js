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


/* ==========================================
   MOSTRAR PRODUTOS
========================================== */

function mostrarProdutos(lista = produtos) {

    const container =
        document.getElementById(
            "listaProdutos"
        );


    container.innerHTML = "";


    if (lista.length === 0) {

        container.innerHTML = `

            <div style="
                grid-column:1/-1;
                text-align:center;
                padding:60px;
                color:#777;
            ">

                Nenhum produto encontrado.

            </div>

        `;

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

        card.innerHTML = `

            <div class="product-image">

                ${imagemDisponivel ? `<img
                    src="${produto.imagem}"
                    alt="${produto.nome}"
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
                <img src="${produto.imagem}" alt="${produto.nome}">
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


    botao.classList.add(
        "active"
    );


    if (
        categoria === "todos"
    ) {

        mostrarProdutos(
            produtos
        );

        return;

    }


    const filtrados =
        produtos.filter(
            produto =>
                produto.categoria ===
                categoria
        );


    mostrarProdutos(
        filtrados
    );

}


/* ==========================================
   BUSCA
========================================== */

function buscarProduto() {

    const termo =
        document
            .getElementById(
                "busca"
            )
            .value
            .toLowerCase()
            .trim();


    const resultado =
        produtos.filter(
            produto =>

                produto.nome
                    .toLowerCase()
                    .includes(termo)

                ||

                produto.descricao
                    .toLowerCase()
                    .includes(termo)

                ||

                produto.categoriaNome
                    .toLowerCase()
                    .includes(termo)

        );


    mostrarProdutos(
        resultado
    );

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


/* ==========================================
   INICIAR
========================================== */

mostrarProdutos();
carregarTema();
atualizarCarrinho();