
function initCarrossel() {
    const carrossel = document.querySelector('.carrossel');
    const slides = document.querySelectorAll('.carrossel img');
    const indicadoresContainer = document.querySelector('.carrossel-indicadores');
    let currentIndex = 0;
    const slideCount = slides.length;
    
    // Cria indicadores
    slides.forEach((_, index) => {
        const indicador = document.createElement('div');
        indicador.classList.add('carrossel-indicador');
        if (index === 0) indicador.classList.add('ativo');
        indicador.addEventListener('click', () => goToSlide(index));
        indicadoresContainer.appendChild(indicador);
    });
    
    function updateCarrossel() {
        carrossel.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Atualiza indicadores
        document.querySelectorAll('.carrossel-indicador').forEach((ind, idx) => {
            ind.classList.toggle('ativo', idx === currentIndex);
        });
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateCarrossel();
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateCarrossel();
    }
    
    // Transição automática a cada 5 segundos
    setInterval(nextSlide, 3000);
    
    // Inicia o carrossel
    updateCarrossel();
}

// Chame esta função no DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initCarrossel();
    // ... (o resto do seu código existente)
});
document.addEventListener('DOMContentLoaded', () => {
    const duration = 1000; // 8 segundos de animação
    const startTime = Date.now();
    
    function createHeart() {
        const heart = new Image();
        heart.className = 'heart-img';
        heart.src = "img/heart.png";
        
        // Posição e efeitos aleatórios
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.top = '-50px';
        heart.style.opacity = Math.random() * 0.7 + 0.3;
        
        // Tamanho aleatório entre 30px e 70px
        const size = Math.random() * 40 + 30;
        heart.style.width = `${size}px`;
        
        // Rotação aleatória
        const rotation = Math.random() * 60 - 30;
        heart.style.transform = `rotate(${rotation}deg)`;
        
        document.body.appendChild(heart);
        
        // Animação de queda
        const fallTime = Math.random() * 4 + 3; // 3-7 segundos
        const endPos = window.innerHeight + 100;
        
        const animation = heart.animate([
            { top: '-50px', opacity: 0.8 },
            { top: `${endPos}px`, opacity: 0 }
        ], {
            duration: fallTime * 1000,
            easing: 'cubic-bezier(0.4, 0, 0.6, 1)'
        });
        
        animation.onfinish = () => heart.remove();
    }
    
    function animateHearts() {
        if (Date.now() - startTime < duration) {
            createHeart();
            setTimeout(animateHearts, 150); // Cria corações mais rápido (150ms)
        } 
    }
    
    // Pré-carrega a imagem antes de iniciar
    const preloadImg = new Image();
    preloadImg.src = "img/heart.png";
    preloadImg.onload = animateHearts;
});

