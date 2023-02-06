let input = document.querySelector("#list-input");
let todoStuff = document.querySelector(".todo-stuff");
let checkAll = document.querySelector(".check-all");

// add todo item to the output function

window.onload = () => {
  getItemsFromLocalStorage();
  checkItems();
  itemsLeftCountFunction();
  clearItemsCountFunction();
  doubleClickEvent();
};

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addItem();
    checkItems();
    ifAllChecked();
    itemsLeftCountFunction();
    clearItemsCountFunction();
    doubleClickEvent();
    addItemsToLocalStorage();
  }
});

input.onblur = () => {
  checkItems();
  ifAllChecked();
  itemsLeftCountFunction();
  clearItemsCountFunction();
  doubleClickEvent();
};

function addItem() {
  let fragment = document.createDocumentFragment();
  let item = document.createElement("div");
  item.classList.add("item");
  item.classList.add("check");

  let i = document.createElement("i");
  i.classList.add("fas");
  i.classList.add("fa-check-square");

  let p = document.createElement("p");
  p.innerHTML = input.value || "Nothing to show!";

  item.appendChild(i);
  item.appendChild(p);

  fragment.appendChild(item);
  todoStuff.appendChild(fragment);
  return (input.value = "");
}

// check items
function checkItems() {
  let checks = document.querySelectorAll(".item > i");
  for (let i = 0; i < checks.length; i++) {
    checks[i].onclick = () => {
      let checkDiv = checks[i].parentElement;
      checkDiv.classList.toggle("checked");
      // check if all items are checked
      ifAllChecked();
      itemsLeftCountFunction();
      clearItemsCountFunction();
    };
  }
}

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
  itemsLeftCountFunction();
  clearItemsCountFunction();
});

// check all items function

function checkAllItems() {
  let todoChildren = todoStuff.children;
  if (checkAll.classList[checkAll.classList.length - 1] !== "all-checked") {
    for (let i = 0; i < todoChildren.length; i++) {
      if (todoChildren[i].classList[todoChildren[i].classList.length - 1] !== "checked") {
        todoChildren[i].classList.add("checked");
      }
    }
  } else {
    for (let i = 0; i < todoChildren.length; i++) {
      todoChildren[i].classList.remove("checked");
    }
  }

  ifAllChecked();
}

// counter for items left

let itemsLeft = document.querySelector(".counter-clear .item-count");

function itemsLeftCountFunction() {
  let itemsCount = document.querySelectorAll(".item").length;
  let checkItemsCount = document.querySelectorAll(".checked").length;

  let itemsLeftCount = itemsCount - checkItemsCount;

  if (itemsLeftCount === 1) {
    itemsLeft.innerHTML = `${itemsLeftCount} item left`;
  } else {
    itemsLeft.innerHTML = `${itemsLeftCount} items left`;
  }
}

// counter for clear items
let clearItem = document.querySelector(".clear");

function clearItemsCountFunction() {
  let checkItemsCount = document.querySelectorAll(".checked").length;

  if (checkItemsCount === 1) {
    clearItem.innerHTML = `clear ${checkItemsCount} item`;
  } else {
    clearItem.innerHTML = `clear ${checkItemsCount} items`;
  }

  if (checkItemsCount === 0) {
    clearItem.style.display = "none";
  } else {
    clearItem.style.display = "block";
  }
}

// clear items event
clearItem.onclick = () => {
  deleteItemFromLocalStorage();
  let checKedItems = document.querySelectorAll(".checked");
  for (let i = 0; i < checKedItems.length; i++) {
    checKedItems[i].remove();
  }
  clearItemsCountFunction();
};

// double click to change the input value

function doubleClickEvent() {
  let items = document.querySelectorAll(".todo-stuff > *");
  for (let i = 0; i < items.length; i++) {
    let itemText = items[i].lastElementChild.innerText;
    items[i].addEventListener("dblclick", () => {
      items[i].innerHTML = `
      <input type="text" name="list" class="edit-item" placeholder="Nothing to show!" ">
      `;

      items[i].firstElementChild.value = itemText;

      let editItem = items[i].firstElementChild;
      function editItems() {
        items[i].innerHTML = `
                  <i class="fas fa-check-square"></i>
                  <p>${editItem.value || "Nothing to show!"}</p>
                  `;
        checkItems();
      }
      let end = editItem.value.length;
      editItem.setSelectionRange(end, end);
      editItem.focus();
      editItem.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
          editItems();
        }
      });
      editItem.addEventListener("blur", editItems);
    });
  }
}

// adding all the to do list to local storage
function addItemsToLocalStorage() {
  let items = document.querySelectorAll(".todo-stuff > *");
  let itemsText = [];
  items.forEach((item) => {
    itemsText.push(item.lastElementChild.innerText);
  });
  window.localStorage.setItem("itemsText", itemsText);
}

function getItemsFromLocalStorage() {
  if (window.localStorage.getItem("itemsText")) {
    let localItems = window.localStorage.getItem("itemsText").split(",");

    localItems.forEach((localItem) => {
      let fragment = document.createDocumentFragment();
      let item = document.createElement("div");
      item.classList.add("item");
      item.classList.add("check");

      let i = document.createElement("i");
      i.classList.add("fas");
      i.classList.add("fa-check-square");

      let p = document.createElement("p");
      p.innerHTML = localItem;

      item.appendChild(i);
      item.appendChild(p);

      fragment.appendChild(item);
      todoStuff.appendChild(fragment);
    });
  }
}

function deleteItemFromLocalStorage() {
  let items = document.querySelectorAll(".todo-stuff > .checked");
  let localItems = window.localStorage.getItem("itemsText").split(",");

  items.forEach((item) => {
    for (let i = 0; i < localItems.length; i++) {
      let itemText = item.lastElementChild.innerText;
      if (itemText === localItems[i]) {
        localItems.splice(i, 1);
        window.localStorage.setItem("itemsText", localItems);
      }
    }
  });
}
