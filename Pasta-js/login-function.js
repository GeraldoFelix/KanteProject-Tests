document.getElementById("form-login").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o recarregamento da página

    var nome = document.getElementById("nome").value;
    var senha = document.getElementById("senha").value;

    if (nome === "1" && senha === "1") {
        window.location.href = "main.html"; // Redireciona para main.html
    } else {
        alert("Login negado! Nome ou senha incorretos.");
    }

});
