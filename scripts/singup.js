const handleForm = document.getElementById("handleForm");
const handleName = document.getElementById("handleName");
const handleNick = document.getElementById("handleNick");
const handleEmail = document.getElementById("handleEmail");
const handlePassword = document.getElementById("handlePassword");
const handlePasswordagain = document.getElementById("handlePasswordAgain");
const btn = document.querySelector("button");

//Array dos dados selecionados do HTML
const arrayData = [
  handleName,
  handleNick,
  handleEmail,
  handlePassword,
  handlePasswordagain,
];

//Funções para reaproveitamento
const validadeFields = (field) => {
  if (field.value === "") {
    const text = document.createTextNode("Campo Obrigatório");
    const small = document.createElement("small");
    small.appendChild(text);
    field.after(small);
    field.classList.add("invalid");
  }
};

btn.addEventListener("click", (event) => {
  document.querySelectorAll(".invalid").forEach((element) => {
    element.nextSibling.remove();
    element.classList.remove("invalid");
  });

  //VALIDANDO CAMPOS
  arrayData.forEach((element) => {
    validadeFields(element);
  });

  //APLICANDO PREVENT.DEFAULT()
  arrayData.forEach((element) => {
    if (!element.value || element.value === "") {
      event.preventDefault();
    }
  });
});

arrayData.forEach((element) => {
  element.addEventListener("keyup", () => {
    if (element.classList.contains("invalid")) {
      element.nextSibling.remove();
      element.classList.remove("invalid");
    }
  });
});
