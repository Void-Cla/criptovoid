document.addEventListener('DOMContentLoaded', function () {
    // Navegação entre seções
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            // Ocultar todas as seções de conteúdo
            document.querySelectorAll('.content').forEach(content => {
                content.style.display = 'none';
            });
            // Mostrar a seção correspondente ao link clicado
            const section = document.querySelector(this.getAttribute('href'));
            section.style.display = 'block';
        });
    });

    // Evento de scroll para o rodapé
    document.addEventListener('scroll', function () {
        const footer = document.getElementById('footer');
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) { 
            // Garantir visibilidade do rodapé
            footer.style.visibility = 'visible';
            footer.style.opacity = '1';
        } else {
            footer.style.visibility = 'hidden';
            footer.style.opacity = '0';
        }
    });

    // Definir a aba padrão como "Login"
    document.getElementById("defaultTab").click();
});

function openTab(evt, tabName) {
    let i, tabcontent, tablinks;

    // Ocultar todos os conteúdos de aba
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remover a classe "active" de todas as abas
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Exibir a aba atual e adicionar a classe "active" ao botão
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
