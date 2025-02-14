function abrirBarraLateral() {
    const barra = document.querySelector(".barra")
    const menuBtn = document.querySelector(".menu-btn");
    const sobreposicao = document.querySelector(".tela-preta");

    document.querySelector(".tela-preta").classList.toggle("active");
    document.querySelector(".barra").classList.toggle("active");
    document.querySelector(".menu-btn").classList.toggle("active");

    if (barra.classList.contains("active")) {
        menuBtn.innerHTML = "✖";
    } else {
        menuBtn.innerHTML = "☰";
    }
}
