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
  };
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
    };
  });
});

//REMOVENDO OS PARAMETROS DE CAMPOS INVÁLIDOS COM "KEYUP"
arrayData.forEach((element) => {
  element.addEventListener("keyup", () => {
    if (element.classList.contains("invalid")) {
      element.nextSibling.remove();
      element.classList.remove("invalid");
    };
  });
});

//CADASTRO DE NOVO USUÁRIO
btn.addEventListener("click", (event) => {
  const dataPostUser = {
    firstName: handleName.value,
    lastName: handleNick.value,
    email: handleEmail.value,
    password: handlePassword.value,
  };

  const newUser = fetch(window.urlApi + "users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataPostUser),
  });

  newUser
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (typeof data === "object") {
        alert("Cadastro concluído");
        sessionStorage.setItem("jwt", data.jwt);
        window.location.href = "index.html"
      } else {
        alert(data);
      };
    })
    .catch((error) => {
      console.log(error);
    });
  event.preventDefault();
});

