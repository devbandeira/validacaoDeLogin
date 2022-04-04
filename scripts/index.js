//SELECIONANDO MEUS ELEMENTOS DO HTML
const formAcess = document.getElementById("handleAcess");
const handleEmail = document.getElementById("inputEmail");
const handlePassword = document.getElementById("inputPassword");
const handleBtnAcess = document.getElementById("btnAcess");

//FUNÇÕES REUTILIZAVEIS
//-> REMOVE A CLASSE E A MSG DE VALIDAÇÕES DE ERRO DO INPUT CASO ATENDA A CONDIÇÃO
const removeError = function (element) {
  if (element.classList.contains("errorLogin")) {
    element.classList.remove("errorLogin");
    element.nextSibling.remove();
  }
};

//-> VALIDA E APLICA ESTILOS NAS MSGS CASO O INPUT ATENDA A CONDIÇÃO
const invalidadeLogin = function (element) {
  if (element.value === "") {
    const small = document.createElement("small");
    const text = document.createTextNode("Campo obrigatório");

    small.appendChild(text);
    small.classList.add("small-error");

    element.after(small);
    element.classList.add("errorLogin");
  }
};

//-> REMOVE O ESTILO DA CAIXA CASO O INPUT ATENDA A CONDIÇÃO
const validateLogin = function (element) {
  if (element.value) {
    element.classList.remove("errorLogin");
  }
};
//FIM DAS FUNÇÕES REUTILIZAVEIS

//-> VALIDA OS CAMPOS DE INPUT QUANDO O EVENTO CLICK É FEITO
handleBtnAcess.addEventListener("click", (event) => {
  if (handleEmail != "") {
    document.querySelectorAll(".small-error").forEach((element) => {
      element.remove();
    });
  }
  if (handlePassword != "") {
    document.querySelectorAll(".small-error").forEach((element) => {
      element.remove();
    });
  }

  //SE A CONDIÇÃO FOR ACEITA STRING""
  invalidadeLogin(handleEmail);
  invalidadeLogin(handlePassword);

  //SE FOR TRUE
  validateLogin(handlePassword);
  validateLogin(handleEmail);

  if (!handleEmail.value || !handlePassword.value) {
    event.preventDefault();
  }
});

handleEmail.addEventListener("keyup", () => {
  removeError(handleEmail);
});
handlePassword.addEventListener("keyup", () => {
  removeError(handlePassword);
});

handleEmail.addEventListener("blur", (element) => {
  removeError(handleEmail);
  invalidadeLogin(handleEmail);
});
handlePassword.addEventListener("blur", (element) => {
  removeError(handlePassword);
  invalidadeLogin(handlePassword);
});
