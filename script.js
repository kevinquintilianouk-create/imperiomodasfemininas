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
        nome: "Saída de Praia Elegance",

        categoria: "saida",

        categoriaNome: "Saída de Praia",

        preco: 29.99,

        descricao:
            "Uma peça leve para completar seu look de verão.",

        imagem:
            "https://images.unsplash.com/photo-1583743814966-8936f37f4b5a?auto=format&fit=crop&w=600&q=80",

        novo: false
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

        novo: true
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

        novo: false
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

        novo: false
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

        novo: true
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


        card.innerHTML = `

            <div class="product-image">

                <img
                    src="${produto.imagem}"
                    alt="${produto.nome}"
                    loading="lazy"
                >

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


                <button
                    class="buy-button"
                    onclick="comprar(${index})">

                    Adicionar ao carrinho

                </button>

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
        "Olá! Vim pelo site da Império Moda Feminina e gostaria de fazer este pedido:\n\n";

    const itens = [...new Set(carrinho)];

    itens.forEach((produto, index) => {
        const quantidade = carrinho.filter(item => item === produto).length;
        mensagem += `${index + 1}. ${produto.nome} (${quantidade}x) - R$ ${(produto.preco * quantidade).toFixed(2).replace(".", ",")}\n`;
    });

    const total = carrinho.reduce((soma, produto) => soma + produto.preco, 0);
    mensagem += `\nTotal: R$ ${total.toFixed(2).replace(".", ",")}`;

    window.open(
        `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`,
        "_blank"
    );

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