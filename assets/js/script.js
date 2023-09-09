
// ESTILIZAÇÃO DA PAGINA AO MOVIMENTAR O SCROLL //

function decidirBotaoScroll() {

    if (window.scrollY === 0) {
        let menu = document.querySelector('.menuNav');
        menu.style.backgroundColor = '#d6ebed'; 
        menu.style.height = '90px';

        let logo = document.querySelector('.menuNav .menuLogo');
        logo.style.opacity = 0;
        logo.style.animation = 'slideBottom 1s ease forwards';

        let menuCenter = document.querySelector('.menuList');
        menuCenter.style.justifyContent = 'end';

    } else {
        
        let menu = document.querySelector('.menuNav');
        menu.style.background = 'rgba(208, 243, 247, .9)';
        menu.style.height = '65px';

        let logo = document.querySelector('.menuNav .menuLogo');
        logo.style.opacity = 1;
        logo.style.animation = 'slideScrollBottom 1s ease forwards';

        let menuCenter = document.querySelector('.menuList');
        menuCenter.style.justifyContent = 'center'; 
       
    }

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

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };

    });
};


// FUNÇÃO DE CLICK MENU-PRODUTOS //

const listProdutos = document.querySelectorAll('.Produtos .Produto-area li');
const buttonGeralProdutos = document.querySelectorAll('.Produtos .barraProdutos li');


function removeClick(index) {   
    buttonGeralProdutos.forEach((item)=>{
        item.classList.remove('active');
    })
    buttonGeralProdutos[index].classList.add('active');
}

buttonGeralProdutos.forEach((item, index)=>{
    item.addEventListener('click', ()=>{
        removeClick(index);
    })
});

// FUNÇÃO DE CLICK APARECER IMAGENS //

function showList(lista, button = "b1") {
    

    lista.forEach((item)=>{
        item.classList.remove('active');
    })
    if (button == 'b1') {
    
        for (let i = 0; i < 21; i++) {
            lista[i].classList.add('active');
        }

    }
    if (button == 'b2') {

        for (let i = 21; i < 28; i++) {
            lista[i].classList.add('active');
        }
    }
    if (button == 'b3') {

        for (let i = 28; i < 30; i++) {
            lista[i].classList.add('active');
        }
    }
    if (button == 'b4') {

        for (let i = 30; i < 33; i++) {
            lista[i].classList.add('active');
        }
    }
}

showList(listProdutos, "b1");

buttonGeralProdutos.forEach((item)=>{
    item.addEventListener('click', (e)=>{
        let currentButton = e.target;
        if (currentButton.classList.contains('b1')) {
            showList(listProdutos, "b1");
        }
        if (currentButton.classList.contains('b2')) {
            showList(listProdutos, "b2");
        }
        if (currentButton.classList.contains('b3')) {
            showList(listProdutos, "b3");
        }
        if (currentButton.classList.contains('b4')) {
            showList(listProdutos, "b4");
        }
       
    });
});

;

/*
showListContato(listProdutos, "b1");


// DIRECIONAMENTO ORÇAMENTO-CONTATO //

let buttonContato = document.querySelectorAll('#Kitfesta .orcamento');


function showListContato(button = 'c1') {
    
    if (button == 'c1') {
       
        document.querySelector('textarea')[0].placeholder.textContent = 'Oi tudo bem? Gostaria de saber os valor e mais informações sobre o kit 1';
        
        
        
    }
    if (button == 'c2') {

        
    }
    if (button == 'c3') {


    }
    if (button == 'c4') {

        
    }
}

buttonContato.forEach((item)=>{
    item.addEventListener('click', (e)=>{
        let currentButton = e.target;
        if (currentButton.classList.contains('c1')) {
            showListContato(listProdutos, "c1");
        }
        if (currentButton.classList.contains('c2')) {
            showListContato(listProdutos, "c2");
        }
        if (currentButton.classList.contains('c3')) {
            showListContato(listProdutos, "c3");
        }
        if (currentButton.classList.contains('c4')) {
            showListContato(listProdutos, "c4");
        }
       
    });
});
*/


// VALIDADOR DO FORMULARIO //

let contatoformValidator = {
    verifEnvio:(event)=>{
        event.preventDefault();
    
        let send = true;

        let inputs = form.querySelectorAll('input, textarea');
        
        contatoformValidator.clearError();

        for(let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            let check = contatoformValidator.checkInput(input);
            if(check !== true) {
                send = false;
                contatoformValidator.showError(input, check);
            } 
        }
        
        if(send) {
            form.submit();      
        }
    },

    checkInput:(input) => {
        let rules = input.getAttribute('data-rules');
        if(rules !== null) {
            rules = rules.split('|');
            for (let i in rules) {
                let rDetails = rules[i].split('=');
                switch(rDetails[0]) {
                    case 'required':
                        if (input.value == '') {
                            return 'Campo obrigatorio!';
                        }

                    break;
                    case 'min':
                        if (input.value.length < rDetails[1]) {
                            return 'Campo minimo de '+rDetails[1]+' caracteres!';
                        }

                    break;
                }
            }
        }
        return true;
    },

    showError:(input, error)=>{
        input.style.borderColor = '#ff0000';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    
    },
   
    clearError:()=>{
        let errorElements = document.querySelectorAll('.error');
        let inputs = form.querySelectorAll('input');

        for (let i=0; i <inputs.length;i++) {
            inputs[i].style.borderColor = '';
        }

        for(let i = 0; i < errorElements.length; i++) {
            errorElements[i].remove();    
        }
    }


};



let form = document.querySelector('.formValidator');

form.addEventListener('submit',contatoformValidator.verifEnvio);

let inputs = form.querySelectorAll('input, textarea');



inputs.forEach((item) => {
    item.addEventListener('click', (e)=>{
        let currentInput = e.target;

        if (currentInput.value !== '') { 
            currentInput.style.borderColor = '#65b4d9';
        }
               
                
    })
});



