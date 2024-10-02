// document.addEventListener('DOMContentLoaded', function () {
//     // Selecione todos os links com href que começam com '#'
//     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//         anchor.addEventListener('click', function (e) {
//             e.preventDefault();  // Impede o comportamento padrão do link

//             const targetId = this.getAttribute('href');  // Pega o ID do link
//             const targetElement = document.querySelector(targetId);  // Seleciona o elemento com esse ID

//             // Verifica se o elemento existe
//             if (targetElement) {
//                 window.scrollTo({
//                     top: targetElement.offsetTop,  // Calcula a posição do elemento
//                     behavior: 'smooth'  // Define a rolagem suave
//                 });
//             }
//         });
//     });
// });

function scrollToSmoothly(element, duration) {
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset; // Posição do elemento
    const startPosition = window.pageYOffset;  // Posição inicial
    const distance = targetPosition - startPosition;  // Distância a percorrer
    let startTime = null;

    // Função que realiza a animação
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation); // Continua a animação
    }

    // Função de easing (suavização)
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);  // Inicia a animação
}

// Aplicar aos links com href que começam com '#'
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();  // Impede o comportamento padrão do link

        const targetId = this.getAttribute('href');  // Pega o ID do link
        const targetElement = document.querySelector(targetId);  // Seleciona o elemento com esse ID

        if (targetElement) {
            scrollToSmoothly(targetElement, 1000);  // 1000 milissegundos = 1 segundo (pode ajustar aqui)
        }
    });
});
