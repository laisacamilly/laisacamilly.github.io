// script.js
document.addEventListener("DOMContentLoaded", function() {

    var menuButton = document.getElementById("botao_menu");
    var closeButton = document.getElementById("closeButton");
    var sidebar = document.getElementById("sidebar");
    var mainContent = document.getElementById("mainContent");
    

    menuButton.addEventListener("click", function(event) {
        event.preventDefault(); // Previne o comportamento padrão do link
        sidebar.style.width = "10rem";
        mainContent.style.marginLeft = "10rem";
    });

    closeButton.addEventListener("click", function() {
        sidebar.style.width = "0";
        mainContent.style.marginLeft = "0";
    });
})