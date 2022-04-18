const keyJwt = sessionStorage.getItem("jwt");
const userInfo = document.getElementsByClassName("user-info");
const btnNew = document.querySelector(".btnNew");
const inputNewTask = document.getElementById("novaTarea");
const logout = document.getElementById("closeApp");
//formatando a data
function date(date) {
  const formatDate = new Date(date);
  return formatDate.toLocaleDateString("pt-BR");
}

//pega as informacoes do usuario logado
fetch(window.urlApi + "users/getMe/", {
  method: "GET",
  headers: {
    "Content-type": "application/json",
    authorization: keyJwt,
  },
})
  .then((resp) => resp.json())
  .then((data) => {
    const name = document.querySelector(".userName");
    name.innerHTML = `${data.firstName} ${data.lastName}`;
  });

//pega as informacoes das tasks do usuario logado
fetch(window.urlApi + "tasks/", {
  method: "GET",
  headers: {
    "Content-type": "application/json",
    authorization: keyJwt,
  },
})
  .then((resp) => resp.json())
  .then((data) => {
    data.forEach((element) => {
      const creatTasks = document.querySelector(".creat-tasks");

      const pTime = document.createElement("p");
      pTime.classList.add("timestamp");
      pTime.innerText = `Criado em: ${date(element.createdAt)}`;

      const pNome = document.createElement("p");
      pNome.classList.add("nome");
      pNome.innerText = `${element.description}`;

      const divDescricao = document.createElement("div");
      divDescricao.classList.add("descricao");

      const divNotDone = document.createElement("div");
      divNotDone.classList.add("not-done");

      const liTarefa = document.createElement("li");
      liTarefa.classList.add("tarefa");

      //colocando os elementos um dentro do outro
      creatTasks.appendChild(liTarefa);
      liTarefa.appendChild(divNotDone);
      liTarefa.appendChild(divDescricao);
      divDescricao.appendChild(pNome);
      divDescricao.appendChild(pTime);
    });
    const divNone = document.getElementById("skeleton");
    divNone.classList.add("divnone");
  });

//Criar nova tarefa do usuario logado
btnNew.onclick = (event) => {
  event.preventDefault();
  const newTasks = {
    description: inputNewTask.value,
    completed: false,
  };
  fetch(window.urlApi + "tasks/", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      authorization: keyJwt,
    },
    body: JSON.stringify(newTasks),
  })
    .then((resp) => resp.json())
    .then((data) => {
      const pTime = document.createElement("p");
      pTime.classList.add("timestamp");
      pTime.innerHTML = `${data.createdAt}`;

      const pNome = document.createElement("p");
      pNome.classList.add("nome");
      pNome.innerHTML = `${data.description}`;

      const divDescricao = document.createElement("div");
      divDescricao.classList.add("descricao");

      const divNotDone = document.createElement("div");
      divNotDone.classList.add("not-done");

      const liTarefa = document.createElement("li");
      liTarefa.classList.add("tarefa");

      liTarefa.appendChild(divNotDone);
      liTarefa.appendChild(divDescricao);
      divDescricao.appendChild(pNome);
      divDescricao.appendChild(pTime);

      if (typeof data === "object") {
        location.reload();
      }
    });
};

//finalizar sessao
logout.onclick = () =>{
  sessionStorage.removeItem("jwt", keyJwt);
  window.location.href = "index.html"
}
