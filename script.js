document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.gallery-wrapper .slider-btn.prev');
    const nextBtn = document.querySelector('.gallery-wrapper .slider-btn.next');

    if (!slider || !prevBtn || !nextBtn || slides.length === 0) {
        console.warn('Slider da galeria não encontrado ou incompleto. Verifique o HTML.');
        return;
    }

    let currentIndex = 0;
    let slideWidth = 0;

    function calculateSlideWidthAndPosition() {

        slideWidth = slides[0].offsetWidth; 
        updateSliderPosition();
        // console.log('Slide width calculated:', slideWidth); // Para depuração
    }

    function updateSliderPosition() {
        slider.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
    }
    calculateSlideWidthAndPosition();

    nextBtn.addEventListener('click', () => {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop infinito
        }
        updateSliderPosition();
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = slides.length - 1; // Loop infinito
        }
        updateSliderPosition();
    });

    // recalcula a largura do slide e a posição sempre que a janela é redimensionada
    window.addEventListener('resize', calculateSlideWidthAndPosition);

    // recalcula a largura do slide e a posição depois que TODOS os recursos (incluindo imagens) foram carregados
    // garante que as imagens tenham suas dimensões finais antes do cálculo
    window.addEventListener('load', calculateSlideWidthAndPosition);
});

function openNav() {
    document.getElementById("contactSidebar").style.width="300px";
}

function closeNav() {
    document.getElementById("contactSidebar").style.width="0";
}

function abrirPopup(nome, preco, imagem) {
    document.getElementById("titulo-pop-up").textContent = nome;
    document.getElementById("preco-pop-up").textContent = preco;
    document.getElementById("foto-pop-up").src = imagem;
    document.getElementById("janela-pop-up").style.display = "block";
}

function fechar() {
    document.getElementById("janela-pop-up").style.display = "none";
}

document.addEventListener('DOMContentLoaded', () => {
    
    // Elementos do Modal
    const modal = document.getElementById('meuModal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-titulo');
    const modalLink = document.getElementById('modal-link');
    const fecharModal = document.querySelector('.fechar-modal');

    // Seleciona todos os links (<a>) de dentro dos cards
    const cardLinks = document.querySelectorAll('.card a');

    // Adiciona o evento de clique em cada card
    cardLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Impede que o clique leve pro Instagram imediatamente

            // Extrai as informações do card clicado
            // Se existir uma foto exclusiva no 'data-popup-img', ele usa ela. Se não, usa a do card mesmo.
            const imgSrc = this.getAttribute('data-popup-img') || this.querySelector('img').src;
            const titleText = this.querySelector('h3').innerText;
            const instaHref = this.href;

            // Injeta as informações no HTML do Modal
            modalImg.src = imgSrc;
            modalTitle.innerText = titleText;
            modalLink.href = instaHref;

            // Exibe o modal
            modal.style.display = 'flex';
        });
    });

    // Fecha o modal ao clicar no 'X'
    if(fecharModal) {
        fecharModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Fecha o modal se o usuário clicar no fundo escuro (fora da caixinha)
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});