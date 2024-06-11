document.addEventListener('DOMContentLoaded', function () {
    // Navegação entre seções
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelectorAll('.content').forEach(content => {
                content.style.display = 'none';
            });
            const section = document.querySelector(this.getAttribute('href'));
            section.style.display = 'block';
        });
    });

    // Evento de scroll para o rodapé
    document.addEventListener('scroll', function () {
        const footer = document.getElementById('footer');
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) { // Ajuste para garantir a visibilidade do rodapé
            footer.style.visibility = 'visible';
            footer.style.opacity = '1';
        } else {
            footer.style.visibility = 'hidden';
            footer.style.opacity = '0';
        }
    });

});

