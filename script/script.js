////////////////////////////////////////////////////////////
//         When loading the page, get items from          //
//            LocalStorage to taskArray                   //
////////////////////////////////////////////////////////////
let taskArray = localStorage.getItem("tasks")
  ? JSON.parse(localStorage.getItem("tasks"))
  : [];

////////////////////////////////////////////////////////////
//      For each item in the array, create a list item    //
////////////////////////////////////////////////////////////
taskArray.forEach(addListItem);

////////////////////////////////////////////////////////////
//            Function to create new list items           //
////////////////////////////////////////////////////////////
function addListItem(text) {
  const taskListEntry = document.querySelector(".taskList"); // queryselector for the ul
  let li = document.createElement("li"); // variable for creation of an li-element inside the ul
  let checkbox = document.createElement("input"); // variable for creation of an input-element inside the li
  let p = document.createElement("p"); // variable for creation of a p-element inside the li
  checkbox.setAttribute("type", "checkbox"); // set the type of the input element to checkbox
  checkbox.setAttribute("class", "checkbox"); // set the type of the input element to checkbox
  li.setAttribute("class", "list-item-added"); // set list-item and list-item-added classes to the li-element
  li.append(checkbox, p); // to the new list item, add checkbox and p
  p.innerText = text; // the value of the input text field is assigned to the inner text of the new p-element
  taskListEntry.prepend(li); // add the new list item to the top of the ul
}

////////////////////////////////////////////////////////////
//             Function to add value from input           //
//           text field to array and localstorage         //
////////////////////////////////////////////////////////////
function addToArrayAndStorage() {
  let inputText = document.querySelector(".input-text").value;
  taskArray.push(inputText);
  localStorage.setItem("tasks", JSON.stringify(taskArray));
  addListItem(inputText);
  inputText = "";
}

////////////////////////////////////////////////////////////
//              Function to call addTask                  //
//               when button is pressed                   //
////////////////////////////////////////////////////////////
const inputButton = document.querySelector(".input-button");
inputButton.addEventListener("click", () => {
  addTask();
});

////////////////////////////////////////////////////////////
//             Function to call addTask                   //
//             when enter key is pressed                  //
////////////////////////////////////////////////////////////
const inputText = document.querySelector(".input-text");
inputText.addEventListener("keydown", (keypress) => {
  if (keypress.key === "Enter") {
    addTask();
  }
});

////////////////////////////////////////////////////////////
//      Sequence to run when attempting to add task       //
////////////////////////////////////////////////////////////
function addTask() {
  const inputText = document.querySelector(".input-text").value;
  if (inputText != "") {
    addToArrayAndStorage();
    document.querySelector(".input-text").value = ""; // clear the input field
  } else {
    console.log("input empty!");
    inputEmptyWarning();
  }
}

////////////////////////////////////////////////////////////
//        Function to flash the input field red if        //
//          it is empty when trying to add task.          //
//    It adds and then removes the input-empty-warning    //
//                class to the input field.               //
////////////////////////////////////////////////////////////
function inputEmptyWarning() {
  const inputText = document.querySelector(".input-text");
  inputText.classList.add("input-empty-warning"); // add input-empty-warning class
  setTimeout(() => {
    inputText.classList.remove("input-empty-warning"); // remove input-empty-warning class after 1000ms
  }, 1000);
}

////////////////////////////////////////////////////////////
//                     Clear list when                    //
//                    button is pressed                   //
////////////////////////////////////////////////////////////
function clearWarning() {
  if (confirm("Do you want to clear the list?")) {
    taskArray = [];
    const taskListEntry = document.querySelector(".taskList");
    taskListEntry.innerHTML = "";
    window.localStorage.clear();
  }
}
