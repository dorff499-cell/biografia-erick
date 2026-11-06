document.addEventListener("DOMContentLoaded", () => {

/* ========================================= ELEMENTOS PRINCIPAIS ========================================= */

const intro = document.getElementById("intro"); 
const botaoEntrar = document.getElementById("entrar"); 
const links = document.querySelectorAll("header a"); 
const secoes = document.querySelectorAll("main section");

/* ========================================= INTRO — ESTILO PUNK ========================================= */

if (intro && botaoEntrar) {
    document.body.style.overflow = "hidden";
    intro.classList.add("punk-intro");

    botaoEntrar.addEventListener("click", () => {
        intro.classList.add("punk-exit");
        tocarSomEntrada();
        setTimeout(() => {
            intro.style.display = "none";
            document.body.style.overflow = "";
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 900);
    });
}

/* ========================================= NAVEGAÇÃO SUAVE ========================================= */

links.forEach(link => {
    link.addEventListener("click", function(event) {
        const destino = this.getAttribute("href");
        if (destino && destino.startsWith("#")) {
            const elemento = document.querySelector(destino);
            if (elemento) {
                event.preventDefault();
                elemento.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    });
});

/* ========================================= ANIMAÇÃO DAS SEÇÕES ========================================= */

if ("IntersectionObserver" in window) {
    const observador = new IntersectionObserver((entradas, observer) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visivel");
                observer.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.15 });

    secoes.forEach(secao => {
        secao.classList.add("animar");
        observador.observe(secao);
    });
}

/* ========================================= PARALLAX ========================================= */

const guitarras = document.querySelectorAll(".guitarra");
const notas = document.querySelectorAll(".nota");

document.addEventListener("mousemove", event => {
    const mouseX = (event.clientX / window.innerWidth) - 0.5;
    const mouseY = (event.clientY / window.innerHeight) - 0.5;

    guitarras.forEach((guitarra, indice) => {
        const intensidade = (indice + 1) * 10;
        // CORRIGIDO: Adicionadas crases na template string e a função translate CSS
        guitarra.style.transform = `translate(${mouseX * intensidade}px, ${mouseY * intensidade}px)`;
    });

    notas.forEach((nota, indice) => {
        const intensidade = (indice + 1) * 3;
        // CORRIGIDO: Adicionadas crases
        nota.style.marginLeft = `${mouseX * intensidade}px`;
    });
});

/* ========================================= FORMULÁRIO DE CONTATO ========================================= */

const formulario = document.querySelector("#Contato form");

if (formulario) {
    formulario.addEventListener("submit", event => {
        event.preventDefault();

        const nome = document.getElementById("nome");
        const email = document.getElementById("email");
        const mensagem = document.getElementById("mensagem");

        if (!nome || !email || !mensagem) { return; }

        const nomeValor = nome.value.trim();
        const emailValor = email.value.trim();
        const mensagemValor = mensagem.value.trim();

        if (nomeValor === "") {
            mostrarMensagem("DIGITE SEU NOME.", "erro");
            nome.focus();
            return; 
        }

        if (!validarEmail(emailValor)) {
            mostrarMensagem("DIGITE UM E-MAIL VÁLIDO.", "erro");
            email.focus();
            return; 
        }

        if (mensagemValor === "") {
            mostrarMensagem("ESCREVA UMA MENSAGEM.", "erro");
            mensagem.focus();
            return; 
        }

        const assunto = encodeURIComponent("Mensagem enviada pelo site de CJ");
        // CORRIGIDO: Adicionadas crases na template string do corpo do e-mail
        const corpo = encodeURIComponent(`Nome: ${nomeValor}\n\nE-mail: ${emailValor}\n\nMensagem:\n${mensagemValor}`);

        /* COLOQUE SEU E-MAIL AQUI */
        const seuEmail = "SEUEMAIL@EXEMPLO.COM";

        // CORRIGIDO: Adicionadas crases no link mailto
        window.location.href = `mailto:${seuEmail}?subject=${assunto}&body=${corpo}`;

        mostrarMensagem("ABRINDO SEU APLICATIVO DE E-MAIL...", "sucesso");
        formulario.reset();
    });
}

/* ========================================= CURRÍCULO ========================================= */

const linkCurriculo = document.querySelector('#Curriculo a[href="curriculo.pdf"]');

if (linkCurriculo) {
    linkCurriculo.addEventListener("click", () => {
        console.log("Abrindo currículo em PDF...");
    });
}

/* ========================================= HABILIDADES ========================================= */

const habilidades = document.querySelectorAll("#Habilidades li");

habilidades.forEach(habilidade => {
    habilidade.style.transition = "0.2s";
    habilidade.addEventListener("mouseenter", () => {
        habilidade.style.transform = "translateX(15px) rotate(-1deg)";
        habilidade.style.color = "#ff1744";
    });
    habilidade.addEventListener("mouseleave", () => {
        habilidade.style.transform = "translateX(0)";
        habilidade.style.color = "#ECECEC";
    });
});

/* ========================================= BOTÃO ENTRAR ========================================= */

if (botaoEntrar) {
    botaoEntrar.addEventListener("mousedown", () => {
        botaoEntrar.style.transform = "scale(0.88) rotate(-2deg)";
    });
    botaoEntrar.addEventListener("mouseup", () => {
        botaoEntrar.style.transform = "scale(1.08) rotate(1deg)";
    });
}

/* ========================================= ANO AUTOMÁTICO ========================================= */

const footer = document.querySelector("footer p");

if (footer) {
    // CORRIGIDO: Adicionadas crases no ano automático
    footer.textContent = `© ${new Date().getFullYear()} CJ. TODOS OS DIREITOS RESERVADOS.`;
}

/* ========================================= VALIDAÇÃO DE E-MAIL ========================================= */

function validarEmail(email) {
    // CORRIGIDO: Adicionada a barra invertida (\.) para escapar o ponto corretamente na Regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/* ========================================= MENSAGENS ========================================= */

function mostrarMensagem(texto, tipo) {
    const antiga = document.querySelector(".mensagem-formulario");
    if (antiga) { antiga.remove(); }

    const mensagem = document.createElement("div");
    mensagem.className = "mensagem-formulario";
    mensagem.textContent = texto;
    mensagem.style.padding = "15px"; 
    mensagem.style.marginTop = "20px"; 
    mensagem.style.borderRadius = "4px"; 
    mensagem.style.textAlign = "center"; 
    mensagem.style.fontWeight = "bold";

    if (tipo === "erro") {
        mensagem.style.background = "rgba(180,20,40,.25)";
        mensagem.style.border = "2px solid #ff1744";
        mensagem.style.color = "#ff526d";
    } else {
        mensagem.style.background = "rgba(40,180,100,.2)";
        mensagem.style.border = "1px solid #42c77a";
        mensagem.style.color = "#7dffad";
    }

    if (formulario) { formulario.appendChild(mensagem); }

    setTimeout(() => {
        mensagem.style.opacity = "0"; 
        mensagem.style.transition = "0.5s";
        setTimeout(() => { mensagem.remove(); }, 500);
    }, 4000);
}

/* ========================================= SOM PUNK DA INTRO ========================================= */

function tocarSomEntrada() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) { return; }

        const audio = new AudioContext();
        const oscilador = audio.createOscillator();
        const ganho = audio.createGain();

        oscilador.type = "sawtooth";
        oscilador.frequency.setValueAtTime(110, audio.currentTime);
        oscilador.frequency.exponentialRampToValueAtTime(55, audio.currentTime + 0.18);

        ganho.gain.setValueAtTime(0.0001, audio.currentTime);
        ganho.gain.exponentialRampToValueAtTime(0.18, audio.currentTime + 0.02);
        ganho.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + 0.25);

        oscilador.connect(ganho);
        ganho.connect(audio.destination);

        oscilador.start();
        oscilador.stop(audio.currentTime + 0.3);
    } catch (erro) {
        console.log("Áudio não disponível:", erro);
    }
}

/* ========================================= ESC — PULAR INTRO ========================================= */

document.addEventListener("keydown", event => {
    if (event.key === "Escape" && intro && intro.style.display !== "none") {
        intro.classList.add("punk-exit");
        setTimeout(() => {
            intro.style.display = "none";
            document.body.style.overflow = "";
        }, 900);
    }
});

/* ========================================= LOG ========================================= */

console.log("CJ — SITE CARREGADO. NO RULES. NO FILTER.");

});