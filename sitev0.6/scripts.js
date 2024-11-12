document.addEventListener('DOMContentLoaded', function () {
    // Const contendo as animações e seus seletores
    const animations = {
      'slide-in': 'animate-slide-in',
      'fade-in': 'animate-fade-in'
    };
  
    // Definição dos seletores para cada animação
    const slidin = [
      '.header-content1',
      '.course-container2 h2',
      '.float-div2 p',
      '.about-container3-chd1',
      '.about2-chd2 p',
      '.about2-chd3 p',
      '.float-div4 h3'
    ]; 
  
    const fadein = [
      '.description1',
      '.description2',
      '.course-container1 img',
      '.course-container2 p',
      '.about-child1',
      '.depoiment-content h3',
      '.float-div3 p',
      '.card-location-container',
      '.contact-container h3'
    ];
  
    // Função para obter os elementos baseados em seletores
    function getElements(selectors) {
      return selectors.flatMap(selector => Array.from(document.querySelectorAll(selector)));
    }
  
    // Seleciona os elementos para cada tipo de animação
    const slideInElements = getElements(slidin);
    const fadeInElements = getElements(fadein);
  
    // Configuração do Intersection Observer
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const animationType = entry.target.getAttribute('data-animation');
        const animationClass = animations[animationType];
  
        if (entry.isIntersecting && animationClass) {
          // Adiciona a classe de animação correspondente quando o elemento está visível
          entry.target.classList.add(animationClass);
        } else if (animationClass) {
          // Remove a classe de animação correspondente quando o elemento não está mais visível
          entry.target.classList.remove(animationClass);
        }
      });
    }, {
      threshold: 0.1 // Ajuste o valor conforme necessário
    });
  
    // Observa todos os elementos
    slideInElements.forEach(element => {
      // Adiciona o atributo data-animation para aplicar a animação correspondente
      element.setAttribute('data-animation', 'slide-in');
      observer.observe(element);
    });
  
    fadeInElements.forEach(element => {
      // Adiciona o atributo data-animation para aplicar a animação correspondente
      element.setAttribute('data-animation', 'fade-in');
      observer.observe(element);
    });
  });

  document.addEventListener("DOMContentLoaded", function() {
    // Seleciona o botão e o texto escondido
    const faqButton = document.getElementById("btn-faq");
    const textoEscondido = document.getElementById("textoEscondido");

    // Adiciona o evento de clique ao botão
    faqButton.addEventListener("click", function() {
        // Alterna a classe 'show' no texto escondido
        textoEscondido.classList.toggle("show");

        if (textoEscondido.classList.contains("show")) {
          faqButton.textContent = "-"; // Indica que está expandido
      } else {
          faqButton.textContent = "+"; // Indica que está colapsado
      }
    });
});

  document.addEventListener("DOMContentLoaded", function() {
    // Seleciona o botão e o texto escondido
    const faqButton2 = document.getElementById("btn-faq2");
    const textoEscondido = document.getElementById("textoEscondido2");

    // Adiciona o evento de clique ao botão
    faqButton2.addEventListener("click", function() {
        // Alterna a classe 'show' no texto escondido
        textoEscondido.classList.toggle("show");

        if (textoEscondido.classList.contains("show")) {
          faqButton2.textContent = "-"; // Indica que está expandido
      } else {
          faqButton2.textContent = "+"; // Indica que está colapsado
      }
    });
});

  document.addEventListener("DOMContentLoaded", function() {
    // Seleciona o botão e o texto escondido
    const faqButton2 = document.getElementById("btn-faq3");
    const textoEscondido = document.getElementById("textoEscondido3");

    // Adiciona o evento de clique ao botão
    faqButton2.addEventListener("click", function() {
        // Alterna a classe 'show' no texto escondido
        textoEscondido.classList.toggle("show");

        if (textoEscondido.classList.contains("show")) {
          faqButton2.textContent = "-"; // Indica que está expandido
      } else {
          faqButton2.textContent = "+"; // Indica que está colapsado
      }
    });
});

  document.addEventListener("DOMContentLoaded", function() {
    // Seleciona o botão e o texto escondido
    const faqButton2 = document.getElementById("btn-faq4");
    const textoEscondido = document.getElementById("textoEscondido4");

    // Adiciona o evento de clique ao botão
    faqButton2.addEventListener("click", function() {
        // Alterna a classe 'show' no texto escondido
        textoEscondido.classList.toggle("show");

        if (textoEscondido.classList.contains("show")) {
          faqButton2.textContent = "-"; // Indica que está expandido
      } else {
          faqButton2.textContent = "+"; // Indica que está colapsado
      }
    });
});

  document.addEventListener("DOMContentLoaded", function() {
    // Seleciona o botão e o texto escondido
    const faqButton2 = document.getElementById("btn-faq5");
    const textoEscondido = document.getElementById("textoEscondido5");

    // Adiciona o evento de clique ao botão
    faqButton2.addEventListener("click", function() {
        // Alterna a classe 'show' no texto escondido
        textoEscondido.classList.toggle("show");

        if (textoEscondido.classList.contains("show")) {
          faqButton2.textContent = "-"; // Indica que está expandido
      } else {
          faqButton2.textContent = "+"; // Indica que está colapsado
      }
    });
});

  document.addEventListener("DOMContentLoaded", function() {
    // Seleciona o botão e o texto escondido
    const faqButton2 = document.getElementById("btn-faq6");
    const textoEscondido = document.getElementById("textoEscondido6");

    // Adiciona o evento de clique ao botão
    faqButton2.addEventListener("click", function() {
        // Alterna a classe 'show' no texto escondido
        textoEscondido.classList.toggle("show");

        if (textoEscondido.classList.contains("show")) {
          faqButton2.textContent = "-"; // Indica que está expandido
      } else {
          faqButton2.textContent = "+"; // Indica que está colapsado
      }
    });
});

  document.addEventListener("DOMContentLoaded", function() {
    // Seleciona o botão e o texto escondido
    const faqButton2 = document.getElementById("btn-faq7");
    const textoEscondido = document.getElementById("textoEscondido7");

    // Adiciona o evento de clique ao botão
    faqButton2.addEventListener("click", function() {
        // Alterna a classe 'show' no texto escondido
        textoEscondido.classList.toggle("show");

        if (textoEscondido.classList.contains("show")) {
          faqButton2.textContent = "-"; // Indica que está expandido
      } else {
          faqButton2.textContent = "+"; // Indica que está colapsado
      }
    });
});

  document.addEventListener("DOMContentLoaded", function() {
    // Seleciona o botão e o texto escondido
    const faqButton2 = document.getElementById("btn-faq8");
    const textoEscondido = document.getElementById("textoEscondido8");

    // Adiciona o evento de clique ao botão
    faqButton2.addEventListener("click", function() {
        // Alterna a classe 'show' no texto escondido
        textoEscondido.classList.toggle("show");

        if (textoEscondido.classList.contains("show")) {
          faqButton2.textContent = "-"; // Indica que está expandido
      } else {
          faqButton2.textContent = "+"; // Indica que está colapsado
      }
    });
});

  document.addEventListener("DOMContentLoaded", function() {
    // Seleciona o botão e o texto escondido
    const faqButton2 = document.getElementById("btn-faq9");
    const textoEscondido = document.getElementById("textoEscondido9");

    // Adiciona o evento de clique ao botão
    faqButton2.addEventListener("click", function() {
        // Alterna a classe 'show' no texto escondido
        textoEscondido.classList.toggle("show");

        if (textoEscondido.classList.contains("show")) {
          faqButton2.textContent = "-"; // Indica que está expandido
      } else {
          faqButton2.textContent = "+"; // Indica que está colapsado
      }
    });
});
