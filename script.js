const addTodo = document.getElementById("addTodo");
if (addTodo) {
  const button = addTodo.querySelector(".modal-footer #addTodoBtn");

  button.addEventListener("click", () => {
    const todoTitle = addTodo.querySelector(".modal-body input#todo-Title");
    const todoDesc = addTodo.querySelector(".modal-body textarea#todo-Desc");
    if (!todoTitle.value.length > 0 || !todoDesc.value.length > 0) {
      clearInputFields(todoDesc, todoTitle);
      return alert("Something went wrong!");
    }

    addTodoToLocalStorage(todoTitle.value, todoDesc.value);
  });
  button.removeEventListener("click", {});
}

const loadModalsFromLS = () => {
  const lwSidePanel = document.getElementById("lw__todoList-wrapper");

  for (let i = 0; i < localStorage.length + 1; i++) {
    const data = JSON.parse(localStorage.getItem(`todo${i + 1}`));

    try {
      const div = document.createElement("div");
      div.setAttribute("id", "lw__tL__Todo");
      div.setAttribute("class", "mb-2 opacity-75");
      div.setAttribute("style", "cursor: pointer");
      div.setAttribute("data-id", i + 1);
      div.setAttribute("onclick", `openDetailedTodo(${i + 1})`);

      const h5Title = document.createElement("h5");
      h5Title.innerHTML = `> ${data["title"] || "Unknown TODO"}`;
      h5Title.setAttribute(
        "class",
        "d-flex justify-content-between text-capitalize"
      );

      // const kukaIkonxd = document.createElement("span");
      // kukaIkonxd.innerHTML = "🗑️";
      // kukaIkonxd.setAttribute("style", "margin-right: 4px");
      // kukaIkonxd.setAttribute("onclick", `deleteTodoFromLS(${i + 1})`);

      // h5Title.appendChild(kukaIkonxd);

      div.appendChild(h5Title);
      lwSidePanel.append(div);
    } catch (error) {}
  }
};

const addTodoToLocalStorage = (todoTitle, todoDesc) => {
  const successFloat = document.getElementById("success-float");
  let todoObj = {
    title: todoTitle,
    desc: todoDesc,
  };

  localStorage.setItem(
    `todo${localStorage.length + 1}`,
    JSON.stringify(todoObj)
  );
  clearInputFields(todoDesc, todoTitle);

  successFloat.style.transform = "translateX(0%)";
  setTimeout(() => {
    successFloat.style.transform = "translateX(110%)";
  }, 1000);

  setTimeout(() => {
    location.reload();
  }, 1500);
};

const clearInputFields = (div, div2) => {
  try {
    div.value = "";
    div2.value = "";
  } catch (err) {
    throw err;
  }
};

const openDetailedTodo = (todoID) => {
  const data = JSON.parse(localStorage.getItem(`todo${todoID}`));
  const rwdTitle = document.getElementById("rw__detailed-title");
  const dtcDesc = document.getElementById("dtc__desc");
  rwdTitle.innerText = data["title"];
  dtcDesc.innerText = data["desc"];
};

const clearDateiledSection = () => {
  const rwdTitle = document.getElementById("rw__detailed-title");
  const dtcDesc = document.getElementById("dtc__desc");

  rwdTitle.innerText = "";
  dtcDesc.innerText = "";
};

// TODO: fixme c:
const deleteTodoFromLS = (todoID) => {
  return alert("This feature is not working yet... 😪");
  localStorage.removeItem(`todo${todoID}`);
  alert(`Todo${todoID} has been removed from localStorage!`);
  location.reload();
};

const clearAllTodos = () => {
  setTimeout(() => {
    localStorage.clear();
    location.reload();
  }, 1000);
};

// const x = localStorage.length + 1;
// const y = [];
// for (let i = 1; i < x; i++) {
//   y.push(JSON.parse(localStorage.getItem(`todo${i}`)));
// }
// console.log(y)

document.body.onload = loadModalsFromLS();
/* Made by Dodzs */
