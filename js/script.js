let input = document.querySelector("#list-input");
let todoStuff = document.querySelector(".todo-stuff");
let checkAll = document.querySelector(".check-all");
// add todo item to the output function
function addItem() {
  let item = document.createElement("div");
  item.classList.add("item");
  item.classList.add("check");

  let i = document.createElement("i");
  i.classList.add("fas");
  i.classList.add("fa-check-square");

  let p = document.createElement("p");
  p.innerHTML = input.value;

  item.appendChild(i);
  item.appendChild(p);

  todoStuff.appendChild(item);
}

input.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    addItem();
  }
});

// check items
let checks = document.querySelectorAll(".item > i");

checks.forEach((check) => {
  check.addEventListener("click", () => {
    let checkDiv = check.parentElement;
    checkDiv.classList.toggle("checked");
    // check if all items are checked
    ifAllChecked();
  });
});

// check if all items are checked function
function ifAllChecked() {
  let todoChildren = todoStuff.children;
  for (let i = 0; i < todoChildren.length; i++) {
    if (todoChildren[i].classList[todoChildren[i].classList.length - 1] !== "checked") {
      return checkAll.classList.remove("all-checked");
    } else {
      checkAll.classList.add("all-checked");
    }
  }
}

// check all items

let checkAllItem = document.querySelector(".check-all i");

checkAllItem.addEventListener("click", () => {
  checkAllItems();
});

// check all items function

function checkAllItems() {
  let todoChildren = todoStuff.children;
  for (let i = 0; i < todoChildren.length; i++) {
    todoChildren[i].classList.toggle("checked");
  }
  ifAllChecked();
}
