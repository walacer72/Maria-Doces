
// ESTILIZAÇÃO DA PAGINA AO MOVIMENTAR O SCROLL //

function decidirBotaoScroll() {
    const header = document.querySelector('#header');
    const logo = header.querySelector('.menuLogo');
    const menuCenter = header.querySelector('.menuNav');

    const noScroll = window.scrollY === 0;

    header.style.backgroundColor = noScroll ? '#d6ebed' : 'rgba(208, 243, 247, .8)';
    logo.style.opacity = noScroll ? 0 : 1;
    logo.style.animation = noScroll ? 'slideBottom 1s ease forwards' : 'slideScrollBottom 1s ease forwards';
    menuCenter.style.justifyContent = noScroll ? 'end' : 'center';
}

window.addEventListener('scroll', decidirBotaoScroll);

// FUNÇÃO DE CLICK MENUNAV //

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']')?.classList.add('active');
            });
        };

    });
};

// FUNÇÃO DE CLICK MENUMOBILE //


let btnMobile = document.querySelector(".navbar-menu");
let menuList = document.querySelector('#header .menuList');
let menu = document.querySelector('.navbar-menu');

function toggleMenu(event) {

    if (event.type === 'touchstart') event.preventDefault();


    menuList.classList.toggle('active');
    menu.classList.toggle('active');

    const active = menu.classList.contains('active');
    event.currentTarget.setAttribute('aria-expanded', active);
    event.currentTarget.setAttribute('aria-label', active ? 'Fechar Menu' : 'Abrir Menu');
};

btnMobile.addEventListener("click", toggleMenu);
btnMobile.addEventListener("touchstart", toggleMenu);



// FUNÇÃO DE CLICK MENU-PRODUTOS //

const produtos = document.querySelectorAll('.Produto-area li');
const botoesFiltro = document.querySelectorAll('.barraProdutos li');
const verMaisBtn = document.getElementById('verMaisBtn');
const listaProdutos = document.querySelector('.Produto-area');

// Função para remover classe ativa dos botões e adicionar no clicado
function ativarBotaoAtivo(botaoClicado) {
    botoesFiltro.forEach(btn => btn.classList.remove('active'));
    botaoClicado.classList.add('active');
}

// Função para mostrar somente os itens da categoria selecionada
function filtrarProdutos(categoria) {
    const listaProdutos = document.querySelector('.Produto-area');
    listaProdutos.classList.remove('mostrar-tudo'); // Sempre começa colapsado
    verMaisBtn.textContent = 'Ver mais'; // Resetar texto do botão

    let count = 0;

    produtos.forEach(produto => {
        const tipo = produto.dataset.produto;
        
        if (tipo === categoria) {
            count++;

            // Mostra os 6 primeiros, esconde o resto
            if (count <= 4) {
                produto.style.display = 'block';
            } else {
                produto.style.display = 'none';
            }
        } else {
            produto.style.display = 'none';
        }
    });
}


// Evento de clique nos botões
botoesFiltro.forEach(botao => {
    botao.addEventListener('click', () => {
        const categoria = botao.dataset.filter;
        ativarBotaoAtivo(botao);
        filtrarProdutos(categoria);
    });
});

// Mostrar a categoria inicial (bolos)
filtrarProdutos('bolos');

verMaisBtn.addEventListener('click', () => {
    const categoriaAtual = document.querySelector('.barraProdutos li.active').dataset.filter;

    const produtosCategoria = Array.from(produtos).filter(p => p.dataset.produto === categoriaAtual);

    const estaMostrandoTudo = listaProdutos.classList.toggle('mostrar-tudo');

    produtosCategoria.forEach((produto, index) => {
        if (estaMostrandoTudo) {
            produto.style.display = 'block'; // Mostra todos
        } else {
            produto.style.display = index < 3 ? 'block' : 'none'; // Mostra só os 6 primeiros
        }
    });

    verMaisBtn.textContent = estaMostrandoTudo ? 'Ver menos' : 'Ver mais';
});


let contatoformValidator = {
    verifEnvio: (event) => {
        event.preventDefault();

        let send = true;

        let inputs = form.querySelectorAll('input, textarea');

        contatoformValidator.clearError();

        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            let check = contatoformValidator.checkInput(input);
            if (check !== true) {
                send = false;
                contatoformValidator.showError(input, check);
            }
        }

        if (send) {
            form.submit();
        }
    },

    checkInput: (input) => {
        let rules = input.getAttribute('data-rules');
        if (rules !== null) {
            rules = rules.split('|');
            for (let i in rules) {
                let rDetails = rules[i].split('=');
                switch (rDetails[0]) {
                    case 'required':
                        if (input.value == '') {
                            return 'Campo obrigatorio!';
                        }

                        break;
                    case 'min':
                        if (input.value.length < rDetails[1]) {
                            return 'Campo minimo de ' + rDetails[1] + ' caracteres!';
                        }

                        break;
                }
            }
        }
        return true;
    },

    showError: (input, error) => {
        input.style.borderColor = '#ff0000';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling);

    },

    clearError: () => {
        let errorElements = document.querySelectorAll('.error');
        let inputs = form.querySelectorAll('input');

        for (let i = 0; i < inputs.length; i++) {
            inputs[i].style.borderColor = '';
        }

        for (let i = 0; i < errorElements.length; i++) {
            errorElements[i].remove();
        }
    }


};



let form = document.querySelector('.formValidator');

form.addEventListener('submit', contatoformValidator.verifEnvio);

let inputs = form.querySelectorAll('input, textarea');



inputs.forEach((item) => {
    item.addEventListener('click', (e) => {
        let currentInput = e.target;

        if (currentInput.value !== '') {
            currentInput.style.borderColor = '#65b4d9';
        }


    })
});



